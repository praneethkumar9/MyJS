let A = [ 0, 3, 7, 6 ];
 let multiply = 10, found=false,result=-1;
 for(let i= 0 ;i<A.length;i++){
     if(!found && A[i] == 0){
         continue;
     }
     found = true;
     console.log(result,multiply,A[i])
     if(result==-1){
        result = A[i] ;
       
     }else{
        result = ( result * multiply ) + A[i];
         //multiply = multiply *10;
     }
 }
 result = result +1;
 
console.log(String(result).split("").map(x=>Number(x)))

