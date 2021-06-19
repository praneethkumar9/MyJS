function sum_array(arr) {
    // store our final answer
    var sum = 0;
    // loop through entire array
    for (var i = 0; i < arr.length; i++) {
      // loop through each inner array
      for (var j = 0; j < arr[i].length; j++) {
        // add this number to the current final sum
        sum += arr[i][j];
      }
    }
    
    return sum;
  }
  let input = [[3, 2], [1], [4, 12]]
 console.log( sum_array(input));
 console.log(input.flat().reduce((x1,x2)=>x1+x2))

 function sumArray(arr) {
    return arr.reduce((t, e) => t.concat(e)).reduce((t, e) => t + e)
  }