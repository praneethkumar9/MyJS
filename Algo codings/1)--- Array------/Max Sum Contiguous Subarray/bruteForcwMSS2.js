let A = [3,-2,5,1];

const bruteForceMSS = (A) =>{
     let length = A.length;
     let maxSum = Number.MIN_VALUE;
     
     for(let i=0 ; i<length; i++){
       let tempSum_At_i =0
         for(let subArrSize = 1 ; subArrSize<=length;subArrSize++){
               if(i+subArrSize>length){
                  continue;
               }
               tempSum_At_i += A[i+subArrSize-1];
               if(tempSum_At_i>maxSum){
               		maxSum = tempSum_At_i;
               }
             
          } 
     } 
     
     return maxSum;
}
console.log(bruteForceMSS(A))

/*
   Solution with brute force algorithm 2
   Expected Time Complexity: O(N^2)
   # Ref :- youtube.com/watch?v=ohHWQf1HDfU
   */
