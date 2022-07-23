module.exports = { 
    //param A : array of integers
    //return an integer
       maxArr : function(A){
           let maxSum = Number.MIN_VALUE,tempSum;
   for(let i=0 ;i<A.length;i++){
           for(let j=i+1 ;j<A.length;j++){
          tempSum = Math.abs(A[i]-A[j]) + Math.abs(i-j)
         maxSum = Math.max(maxSum,tempSum)
       }
   }
   
   return maxSum
           
   
       }
   };
   

  // Time complexity: O(n2)

// Auxiliary Space: O(1)

   // It is optimal solution for large numbers
