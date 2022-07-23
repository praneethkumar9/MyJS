module.exports = { 
    //param A : array of integers
    //return an integer
       maxArr : function(A){
           let array = A;
           // max and min variables as described
           // in algorithm.
          var max1 = A[0]; 
           var min1 = A[0]; 
           var max2 = A[0]; 
           var min2 = A[0];
     
           for (let i = 0; i < array.length; i++)
           {
     
               // Updating max and min variables
               // as described in algorithm.
               max1 = Math.max(max1, array[i] + i);
               min1 = Math.min(min1, array[i] + i);
               max2 = Math.max(max2, array[i] - i);
               min2 = Math.min(min2, array[i] - i);
           }
     
           // Calculating maximum absolute difference.
           return Math.max(max1 - min1, max2 - min2);
       
           }
   
   
           
   
       
   };

   // https://www.youtube.com/watch?v=Ov4weYCIipg
   