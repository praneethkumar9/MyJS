// Merge Sort 
// Divide & Conquer Strategy 
// Space Complexity :- O(n)      ( Not In place algorithm ) 
// Time complexity  :- O(nlogn)  ( worst case scenerio )

// Reference : https://stackabuse.com/merge-sort-in-javascript/



// recurisively call divide method to split array into one
// then merge to full array


function merge(left, right) {
    let arr = []
    // Break out of loop if any one of the array gets empty
    while (left.length && right.length) {
        // Pick the smaller among the smallest element of left and right sub arrays 
        if (left[0] < right[0]) {
            arr.push(left.shift())  
        } else {
            arr.push(right.shift()) 
        }
    }
    
    // Concatenating the leftover elements
    // (in case we didn't go through the entire left or right array)
    return [ ...arr, ...left, ...right ]
}

function mergeSort(array) {
    const half = array.length / 2
    
    // Base case or terminating case
    if(array.length < 2){
      return array 
    }
    
    const left = array.splice(0, half)
    return merge(mergeSort(left),mergeSort(array))
  }

  array = [4, 8, 7, 2, 11, 1, 3];
console.log(mergeSort(array));  //sorted array 1,2,3,4,7,8,11


