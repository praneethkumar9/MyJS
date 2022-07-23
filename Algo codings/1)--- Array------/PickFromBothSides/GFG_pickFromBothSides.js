module.exports = { 
    //param A : array of integers
    //param B : integer
    //return an integer
       solve : function(A, B){
           let arr= A,K=B,size=A.length;
       // Initialize variables
       let curr_points = 0;
       let max_points = 0;
     
       // Iterate over first K elements
       // of array and update the value
       // for curr_points
       for(let i = 0; i < K; i++)
           curr_points += arr[i];
     
       // Update value for max_points
       max_points = curr_points;
     
       // j points to the end of the array
       let j = size - 1;
     
       for(let i = K - 1; i >= 0; i--)
       {
           curr_points = curr_points +
                         arr[j] - arr[i];
           max_points = Math.max(curr_points,
                                 max_points);
           j--;
       }
     
       // Return the final result
       return max_points;
       
       
       }
   };
   
   // Time Complexity: O(N), where N is size of the array.
// Auxiliary Space Complexity: O(1).