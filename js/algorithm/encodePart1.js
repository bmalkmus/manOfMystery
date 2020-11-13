let input = "Java"

// ---------------trim string to constraints-------------------
if (input.length > 4) {
    input = input.slice(0,4)
}

console.log(input)

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

function getByValue(map, searchValue) {
    for (let [key, value] of map.entries()) {
      if (value === searchValue)
        return key;
    }
  }

function encode(input){
    const rawDecoded = []
    const encoded = []
    const encodedHex = []
    let decimalValue = 0 


    // -------------------Split String and Reverse for least significant byte----------------
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
        hexSplit[i] = hexBinary.get(hexSplit[i])
    }

    for (let i = 0; i < hexSplit.length; i+=2){
        rawDecoded.push(hexSplit[i]+hexSplit[i+1])
    }

    // --------------------------------encode--------------------------------------------------
    for (let i = 0; i < rawDecoded[0].length; i+=2){
        temp = []
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
        encodedHex.push(getByValue(hexBinary, first))
        encodedHex.push(getByValue(hexBinary, second))
    }
    const finalHex = encodedHex.join('')

    // ------------------------------Hex to Decimal---------------------------------------------

    for (let i = 0; i < encodedHex.length; i++){
        let value = hexDecimalValue.get(encodedHex[i])
        decimalValue += value*16**(encodedHex.length-1-i)
    }

    console.log(`Your encoded Hex Value is ${finalHex} and your encoded Decimal Value is ${decimalValue}`)
    // return (
    //     [finalHex, decimalValue]
    // )
}

encode(input)
// const values = encode(input)
// console.log(values)