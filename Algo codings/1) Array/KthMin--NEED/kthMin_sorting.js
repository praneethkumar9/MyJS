// mine - using inbuilt sort method
const find = (arr,n) =>{
    arr.sort((a,b)=>a-b);
    return arr[n-1];
 }
 
 console.log(find([7,10,4,20,15],4))  //15