// Given an integer x and a sorted array a of N distinct integers, design a linear-time algorithm to determine if there exists two distinct indices i and j such that a[i] + a[j] == x

// For example, if the array is [3, 5, 2, -4, 8, 11] and the sum is 7, your program should return [[11, -4], [2, 5]] because 11 + -4 = 7 and 2 + 5 = 7.
// Answer
// The algorithm below makes use of hash tables which have a constant lookup time. As we pass through each element in the array, we check to see if S minus the current element exists in the hash table. We only need to loop through the array once, resulting in a running time of O(n) since each lookup and insertion in a hash table is O(1)

// our two sum function which will return
// all pairs in the array that sum up to S
function twoSum(arr, S) {

    var sums = [];
    var hashTable = {};
  
    // check each element in array
    for (var i = 0; i < arr.length; i++) {
   
      // calculate S - current element
      var sumMinusElement = S - arr[i];
  
      // check if this number exists in hash table
      // if so then we found a pair of numbers that sum to S
      if (hashTable[sumMinusElement.toString()] !== undefined) { 
        sums.push([arr[i], sumMinusElement]);
      }
  
      // add the current number to the hash table
      hashTable[arr[i].toString()] = arr[i];
  
    }
  
    // return all pairs of integers that sum to S
    return sums;
  
  }
  
  console.log(twoSum([3, 5, 2, -4, 8, 11], 7));


  // O(n) - time complexity