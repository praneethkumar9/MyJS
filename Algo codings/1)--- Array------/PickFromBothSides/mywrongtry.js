let A = [1, 2];
//[5, -2, 3 , 1, 2]
let  B = 1;
//3

let f = (A,B) =>{
  let maxSum = Number.MIN_VALUE ,  tempSum =0;
  for(let i=0;i<B;i++){
      tempSum += A[i];
       let tempSum2 = tempSum;
     for(let j= (A.length)-(B-i-1) ; j<A.length;j++){
          tempSum2 += A[j];
          if(tempSum2>maxSum){
             maxSum = tempSum2
          } 
     }
  }
 
 
 
 return maxSum
 
 
}

console.log(f(A,B)) 


// This works only if pick is compuslory on left side