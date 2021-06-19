// O(n^2) time complexity

// Approach - Iterate combination of all 2 items 
// & also check if there is value equal to negative of their sum so that whose 3 pair will give sum to zero

const findTriplets = (arr) => {
let result = [];

for(let i =0 ;i<arr.length-1;i++){
    let hash ={};
   for(let j= i+1 ; j <arr.length ;j++){
       let x = arr[i] , y = arr[j];
       let sub = -(x+y);
       if(hash[sub.toString()]){
           result.push([x,y,sub])
       }else{
           hash[arr[j].toString()] = arr[j];
       }
   }
 
}
return result;
}

console.log(findTriplets([0,-1,2,-3,1]))
//[[0,1,-1],[2,1,-3]]

