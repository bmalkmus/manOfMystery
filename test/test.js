const encryption = require('../js/lib/encryption')


function sameValue(){
    // creates random string
    const randomLength = Math.floor(Math.random()*5)
    let string = ""
    for (let i = 1; i <= randomLength; i++){
        let charCode = 0
        while (charCode <= 31){
            charCode=Math.floor(Math.random()*127)
            if (charCode > 31){
                let ascii = String.fromCharCode(charCode)
                string += ascii
            }
        }
       
    }
    // gets results from decoding the encoding function with random string
    let test = encryption.decode(encryption.encode(string))

    // compares test result to original string
    if (test == string){
        return true
    }
    else{
        return false
    }
}

// runs compare function length of for loop and console log results in an object view
function test(){
    const totalRuns = {
        "true":0,
        "false":0
    }
    for (let i = 0; i< 1000000; i++){
        const run = sameValue()
        if(run){
            totalRuns.true++
        }
        else{
            totalRuns.false++
        }
    
    }
    console.log(totalRuns)
}
test()
