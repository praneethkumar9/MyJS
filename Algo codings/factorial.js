let getFactorial = (n) =>  {
    return n > 1 ? n * getFactorial(n - 1) : n;
  }

  function extraLongFactorials(n) {
    // Write your code here
//      let getFactorial = (n) =>  {
//     return n > 1 ? n * getFactorial(n - 1) : n;
//   }
// //   console.log(BigInt.asUintN(64,getFactorial(n)))
//   console.log(BigInt(getFactorial(n)).toString())

var bigInt = BigInt(n);
   var factorial = 1n;
   for (let i = 0n; i < bigInt ; i++) {
      factorial *= bigInt - i;
   }
    console.log(String(factorial));
}