let A = [
    [ 1, 2, 3 ],
    [ 4, 5, 6 ],
    [ 7, 8, 9 ]
];

const f = (A) =>{
 let m = A.length;
 let n = A[0].length;
 let t=0,b=m-1,l=0,r=n-1;
 let dir = "right";
 let result =[];
 while(t<=b && l<=r){
 
 switch(dir){
  case "right" : 
         for(let left=l ; left<=r;left++){
             result.push(A[t][left])
         }
         t++;
         dir = "down";
       break;
  case "down" : 
   			for(let top=t ; top<=b;top++){
             result.push(A[top][r])
         }
         r--;
         dir = "left";
       break;
  case "left" : 
        for(let right=r ; right>=l;right--){
             result.push(A[b][right])
         }
         b--;
           dir = "up";
       break;
  case "up" : 
  			for(let down=b ; down>=t;down--){
             result.push(A[down][l])
         }
         l++;
        dir = "right";
       break;		
 }
 
 
 
 }
 
 
 return result;
}

console.log(f(A))
