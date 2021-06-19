let input = [1,2,3,4,5]

// static methods

/**
 * @description  to check if it is an array or not
 *  Array.isArray(inputArray)
 * @returns Returns true if the argument is an array, or false otherwise.
 * @param array to check
 */

Array.isArray(input)   //true
input = 'k';
Array.isArray(input)   //false


// instance methods

/**
 * array.flat(inputArray)
 * @description The flat() method creates a new array with all sub-array elements concatenated into it recursively up to the specified depth.
 * @param depth (Optional) - The depth level specifying how deep a nested array structure should be flattened. Defaults to 1.
 * @returns A new array with the sub-array elements concatenated into it.
 **/
 
 input = [[2],3,4,5,[[2],[2,3]]]
 input.flat() // [2,3,4,[2],[2,3]]

 input= [0, 1, 2, [[[3, 4]]]];
 input.flat(2); //[0, 1, 2, [3, 4]]



/**
 * array.reverse(inputArray)
 * @description The reverse() method reverses an array in place. The first array element becomes the last, and the last array element becomes the first.
 * @returns Modifies same array by reversing it
 **/
 
 input = [1,2,3,4]
 input.reverse() // [2,3,4,[2],[2,3]]

/**
 * array.flat(inputArray)
 * @description The flatMap() method returns a new array formed by applying a given callback function to each element of the array, and then flattening the result by one level. It is identical to a map() followed by a flat() of depth 1, but slightly more efficient than calling those two methods separately.
 * @param callback Function that produces an element of the new Array, taking three arguments:
 *        currentValue
               The current element being processed in the array.
          index - Optional
              The index of the current element being processed in the array.
          array - Optional
            The array map was called upon.
 * @param thisArg (Optional) Value to use as this when executing callback.
 * @returns A new array with each element being the result of the callback function and flattened to a depth of 1.
 **/

//Syntax
/*

var new_array = arr.flatMap(function callback(currentValue[, index[, array]]) {
    // return element for new_array
}[, thisArg])

*/

 
input = [1, 2, 3, 4];

input.flatMap(x => [x, x * 2]);
// is equivalent to
input.reduce((acc, x) => acc.concat([x, x * 2]), []);// [1, 2, 2, 4, 3, 6, 4, 8]


/**
 * array.forEach(inputArray)
 * @description The forEach() method executes a provided function once for each array element.
 * @param callback Function to execute on each element. It accepts between one and three arguments:
 *        currentValue
               The current element being processed in the array.
          index - Optional
              The index of the current element being processed in the array.
          array - Optional
            The array map was called upon.
 * @param thisArg (Optional) Value to use as this when executing callback.
 **/
 
//Syntax
/*

arr.forEach(callback(currentValue[, index[, array]]) {
  // execute something
}[, thisArg]);

*/
 input = ['a','b','c']
 input.forEach(element => console.log(element)); 
 // expected output: "a"
// expected output: "b"
// expected output: "c"

//There is no way to stop or break a forEach() loop other than by throwing an exception. If you need such behavior, the forEach() method is the wrong tool.


/**
 * array.some(inputArray)
 * @description The some() method tests whether at least one element in the array passes the test implemented by the provided function. It returns true if, in the array, it finds an element for which the provided function returns true; otherwise it returns false. It doesn't modify the array
 * @param callback Function to execute on each element. It accepts between one and three arguments:
 *        currentValue
               The current element being processed in the array.
          index - Optional
              The index of the current element being processed in the array.
          array - Optional
            The array map was called upon.
 * @param thisArg (Optional) Value to use as this when executing callback.
 **/
 
//Syntax
/*

arr.some(callback(element[, index[, array]])[, thisArg])

*/
 input = [1, 2, 3, 4, 5];

// checks whether an element is even
const even = (element) => element % 2 === 0;

input.some(even);
// expected output: true


console.log([1,2,2].join(''))



