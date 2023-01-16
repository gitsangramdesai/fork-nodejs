var express = require('express');
var router = express.Router();
const { fork } = require('child_process');
const forked = fork('./service/child.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  var arr=[]

  for(i=0;i<1000000;i++){
    arr.push(i)
  }

  forked.on('message', (msg) => {
    if(msg.error){
      res.send({"error":msg.error});
    }else{
      res.send(msg);
    }

  }); 
  forked.send({ params: arr });

  forked.on("close", function (code) {
    res.send({"error":"true"});
  });
});

module.exports = router;
