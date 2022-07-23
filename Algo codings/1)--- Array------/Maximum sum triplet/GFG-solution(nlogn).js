module.exports = { 
    //param A : array of integers
    //return an integer
       solve : function(A){
           let arr = A ,n= A.length;
           // Initialize the answer
           arr.sort();
 
           // After sorting the array.
           // Add last three element of the given array
           return arr[n - 1] + arr[n - 2] + arr[n - 3];
       }
            
   };
   
// This will be efficient one 
// if there is no rule as below
// You need to find the maximum sum of triplet ( Ai + Aj + Ak ) such that 0 <= i < j < k < N and Ai < Aj < Ak.
