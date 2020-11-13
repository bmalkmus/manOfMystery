const input = "266605658"


let inputInt = parseInt(input)
let quotient = inputInt
let hex = []
let decodedBinary = ["", "", "", ""]
let ascii = []
decodedString = ""

const hexDecimalValue = new Map([
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

const hexBinary = new Map([
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

function getByValue(map, searchValue) {
    for (let [key, value] of map.entries()) {
      if (value === searchValue)
        return key;
    }
  }

// -------------------------decimal to hex value-----------------------------
while (quotient != 0) {
    let remainder;
    remainder = quotient % 16
    quotient = Math.floor(quotient/16)
    hex.push(getByValue(hexDecimalValue, remainder))
}
// ------------------------------extend hex value to true value-------------------------------
if (hex.length != 8){
    let diff = 8 - hex.length
    for (i = 0; i < diff; i ++){
        hex.push("0")
    }
}
hex = hex.reverse()

// -------------------------hex to encoded binary to decoded binary-----------------------------

for (let i = 0; i < hex.length; i++) {
    let binary = hexBinary.get(hex[i])
    for (let j = 0; j < binary.length; j++){
        decodedBinary[j] += binary[j]
    }
}

// -------------------------binary to ascii values to decoded string----------------------------------------------
decodedBinary = decodedBinary.join('')
for (let i = 0; i < decodedBinary.length; i+=4){
    let substring = decodedBinary.slice(i, i+4)
    ascii.push(getByValue(hexBinary, substring))
}
for (let i =0; i< ascii.length; i +=2){
    temp = ascii[i]+ascii[i+1]
    temp = parseInt(temp, 16)
    decodedString += String.fromCharCode(temp)

}
const regex = /\u0000/gi;
decodedString = decodedString.split('').reverse().join('').replace(regex, '')

console.log(decodedString)