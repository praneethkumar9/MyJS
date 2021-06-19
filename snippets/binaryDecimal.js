//polyfill for converting integer to binary number
function findBinary(decimal){
    if(decimal == 0) {
        return 0
    }
    else{

       return (decimal % 2 + 10 * (findBinary(Math.floor(decimal / 2))));
    };
    
};

console.log(findBinary(10))


let f = 10 , d =1010
console.log(f.toString(2),parseInt(d,2))


// using ES6
f.toString(2)  // -- converting to findBinary
parseInt(d,2)  // -- converting binary to number