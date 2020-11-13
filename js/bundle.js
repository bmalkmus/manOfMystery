(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/* 
########################################################
                ENCRYPTION LIBRARY 
########################################################
*/

class Encrpytion {
    // HashMaps for Binary, Hex, and Decimal Values
    constructor() {

        this.hexBinary = new Map([
        ["0", "0000"],
        ["1", "0001"],
        ["2", "0010"],
        ["3", "0011"],
        ["4", "0100"],
        ["5", "0101"],
        ["6", "0110"],
        ["7", "0111"],
        ["8", "1000"],
        ["9", "1001"],
        ["a", "1010"],
        ["b", "1011"],
        ["c", "1100"],
        ["d", "1101"],
        ["e", "1110"],
        ["f", "1111"],
        ])
        this.hexDecimalValue = new Map([
            ["0", 0],
            ["1", 1],
            ["2", 2],
            ["3", 3],
            ["4", 4],
            ["5", 5],
            ["6", 6],
            ["7", 7],
            ["8", 8],
            ["9", 9],
            ["a", 10],
            ["b", 11],
            ["c", 12],
            ["d", 13],
            ["e", 14],
            ["f", 15],
        ])
      }
    

    // gets key values by value lookup
    getByValue(map, searchValue) {
        for (let [key, value] of map.entries()) {
        if (value === searchValue)
            return key;
        }
    }


    // enocodes the input value of string.length >= 4
    encode(input) {

        const rawDecoded = []
        const encoded = []
        const encodedHex = []
        let decimalValue = 0


        let split = input.split("")
        let reversed = split.reverse()

        // --------------------convert to ACSii Hex and adjust to lenght of 8--------------------
        for (let i = 0; i < reversed.length; i++){
            reversed[i]=reversed[i].charCodeAt(0).toString(16)
        }
        reversed = reversed.join('')
        const spaceFiller = "0".repeat(8-reversed.length)
        reversed = spaceFiller + reversed
        
        // ----------------------Convert to Binary byte-------------------------------------------
        let hexSplit = reversed.split("")

        for (let i = 0; i <hexSplit.length; i++){
            hexSplit[i] = this.hexBinary.get(hexSplit[i])
        }

        for (let i = 0; i < hexSplit.length; i+=2){
            rawDecoded.push(hexSplit[i]+hexSplit[i+1])
        }

        // --------------------------------encode--------------------------------------------------
        for (let i = 0; i < rawDecoded[0].length; i+=2){
            let temp = []
            rawDecoded.forEach(item => {
                temp.push(item[i])
            })
            rawDecoded.forEach(item => {
                temp.push(item[i+1])
            })
            temp = temp.join("")
            encoded.push(temp)
        }

        // -----------------------------encoded to Hex---------------------------------------------
        for (let i = 0; i < encoded.length; i++){
            let first = encoded[i].slice(0, 4)
            const second = encoded[i].slice(4)
            encodedHex.push(this.getByValue(this.hexBinary, first))
            encodedHex.push(this.getByValue(this.hexBinary, second))
        }
        const finalHex = encodedHex.join('')

        // ------------------------------Hex to Decimal---------------------------------------------

        for (let i = 0; i < encodedHex.length; i++){
            let value = this.hexDecimalValue.get(encodedHex[i])
            decimalValue += value*16**(encodedHex.length-1-i)
        }

        return decimalValue
    }

    // decodes decimal values
    decode(input) {
        let inputInt = parseInt(input)
        let quotient = inputInt
        let hex = []
        let decodedBinary = ["", "", "", ""]
        let ascii = []
        let decodedString = ""

        // -------------------------decimal to hex value-----------------------------
        while (quotient != 0) {
            let remainder;
            remainder = quotient % 16
            quotient = Math.floor(quotient/16)
            hex.push(this.getByValue(this.hexDecimalValue, remainder))
        }
        // ------------------------------extend hex value to true value-------------------------------
        if (hex.length != 8){
            let diff = 8 - hex.length
            for (let i = 0; i < diff; i ++){
                hex.push("0")
            }
        }
        hex = hex.reverse()

        // -------------------------hex to encoded binary to decoded binary-----------------------------

        for (let i = 0; i < hex.length; i++) {
            let binary = this.hexBinary.get(hex[i])
            for (let j = 0; j < binary.length; j++){
                decodedBinary[j] += binary[j]
            }
        }

        // -------------------------binary to ascii values to decoded string----------------------------------------------
        decodedBinary = decodedBinary.join('')
        for (let i = 0; i < decodedBinary.length; i+=4){
            let substring = decodedBinary.slice(i, i+4)
            ascii.push(this.getByValue(this.hexBinary, substring))
        }
        for (let i =0; i< ascii.length; i +=2){
            let temp = ascii[i]+ascii[i+1]
            temp = parseInt(temp, 16)
            decodedString += String.fromCharCode(temp)

        }
        const regex = /\u0000/gi;
        decodedString = decodedString.split('').reverse().join('').replace(regex, '')
        

        return(decodedString)
    }
}

const encryption = new Encrpytion()

module.exports=encryption

},{}],2:[function(require,module,exports){
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
},{"./lib/encryption":1}]},{},[2]);
