module.exports = { 
    //param A : array of integers
    //return an integer
       maxSubArray : function(A){
           let a = [...A] ,size = A.length;
   var maxint = Math.pow(2, 53)
       var max_so_far = -maxint - 1
       var max_ending_here = 0
          
       for (var i = 0; i < size; i++)
       {
           max_ending_here = max_ending_here + a[i]
           if (max_so_far < max_ending_here)
               max_so_far = max_ending_here
     
           if (max_ending_here < 0)
               max_ending_here = 0 
       }
       return max_so_far
       }
   };

// Here max_ending_here at any iteration at i indicates max sum of all subarrays ending at i  ----

/*
   Solution with Kadane's algorithm 
   Expected Time Complexity: O(N)
   Expected Auxiliary Space: O(1)
Ref :- https://www.geeksforgeeks.org/largest-sum-contiguous-subarray/
Note: The above algorithm only works if and only if at least one positive number should be present otherwise it does not work i.e if an Array contains all negative numbers it doesn’t work.

*/