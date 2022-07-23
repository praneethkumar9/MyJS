let A = [5, -2, 3 , 1, 2];
//
let  B = 3;

// 5 - (5-3) 


const MaxSUmAns = (A,B)=>{
  let sum=0;
       for (let i = 0; i < A.length; i++) sum+=A[i];
       
       if(B==A.length) return sum;
       let minSum = Number.MAX_VALUE;
     for(let i=0;i<=A.length-(A.length-B);i++){
           let tempSum = 0;
           let tempIndex =i;
           while(tempIndex<i+(A.length-B)){
                 tempSum+=A[tempIndex];
               
                 tempIndex++
           }
           if(tempSum<minSum){
           
               minSum = tempSum;
           }  
   
       } 
      
       return sum-minSum
      
        
}
console.log(MaxSUmAns(A,B))
// https://www.youtube.com/watch?v=M7wV11xOM-k 