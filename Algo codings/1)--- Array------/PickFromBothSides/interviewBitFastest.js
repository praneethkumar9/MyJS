module.exports = { 
    //param A : array of integers
    //param B : integer
    //return an integer
       solve : function(A, B){
           let sum=0;
       for (let i = 0; i < B; i++) sum+=A[i];
       
       if(B==A.length) return sum;
       
       let maxSum=sum;
    //    for (let i= 1; i<=B;i++) {
    //     sum = sum - (A[B-i]) + (A[A.length-i])- // mine simple
    //     maxSum=Math.max(sum,maxSum);

    // }
       for (let i= 0; i<B;i++) {
           
           sum=sum-A[B-1-i]+A[A.length-i-1]; // adding right window element & removing left window element
           maxSum=Math.max(sum,maxSum);
   
       }
   return maxSum
       }
   };
   
   // O(n)

   // sliding window approach