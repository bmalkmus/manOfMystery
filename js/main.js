const encryptions = require('./lib/encryption')

const encodeInput = document.getElementById("inputEncode");
const encodeResult = document.getElementById('encodedResult');
const decodeInput = document.getElementById("inputDecode");
const decodeResult = document.getElementById('decodedResult');
const decodedButton = document.getElementById('decodeButton');
const encodedButton = document.getElementById('encodeButton');


decodedButton.addEventListener("click", decodedResult)
encodedButton.addEventListener("click", encodedResult)
encodeInput.addEventListener("click", clearEncode)
decodeInput.addEventListener("click", clearDecode)


function encodedResult(){
    const splitText = []
    const encoded = []
    for (let i = 0; i<encodeInput.value.length;i+=4){
        let substrings = encodeInput.value.slice(i, i+4)
        splitText.push(substrings)
    }
    console.log(splitText)
    for (let i = 0; i<splitText.length; i++){
        encoded.push(encryptions.encode(splitText[i]))
    }
    encodeResult.innerHTML = encoded
}

function decodedResult(){
    let decoded = []
    let splitDecode = decodeInput.value.split(",")
    for (let i = 0; i< splitDecode.length; i++){
        let reg = /^\d+$/.test(splitDecode[i])
        if(!reg){
            return decoded.push("Error in submission")
        }
        decoded.push(encryptions.decode(splitDecode[i]))
    }
    decoded = decoded.join('')
    decodeResult.innerHTML = decoded
}

function clearEncode(){
    encodeInput.innerHTML = ''
}
function clearDecode(){
    decodeInput.innerHTML = ''
}
console.log("Photo by Francesco Ungaro from Pexels\nPngio.com Stock Photo #2409913\nPhoto by David Peterson from Pexels")