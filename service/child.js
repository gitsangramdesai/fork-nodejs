process.on('message', (arr) => {
    var sqr=[]
    try
    {
        if(arr.params.length == 10){
            throw new Error("Invalid param length")
        }
        else{
            for(i=0;i<arr.params.length;i++){
                sqr.push(arr.params[i] *  arr.params[i])
            }
            process.send({ result: sqr });
        }

    }
    catch(exp)
    {
        console.log("inside catch",exp)
        process.send({ "error":exp.toString().replace("Error:","") });
    }
});

