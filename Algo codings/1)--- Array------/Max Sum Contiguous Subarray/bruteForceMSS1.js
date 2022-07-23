let A = [3,-2,5,1];

const bruteForceMSS = (A) =>{
     let length = A.length;
     let maxSum = Number.MIN_VALUE;
     for(let subArrSize = 1 ; subArrSize<=length;subArrSize++){
         for(let i=0 ; i<length; i++){
              if(i+subArrSize > length){
                  continue;
              }
              let tempSum = 0;
              for(let tempIndex=i ; tempIndex<i+subArrSize ;tempIndex++){
                      tempSum += A[tempIndex];
              }
              if(maxSum<tempSum){
                  maxSum = tempSum;
              }
             
        } 
     } 
     
     return maxSum;
}

console.log(bruteForceMSS(A))

/*
   Solution with brute force algorithm 
   Expected Time Complexity: O(N^3)
   # Ref :- youtube.com/watch?v=ohHWQf1HDfU
   */
