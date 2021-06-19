// O(n^3) time complexity

// Approach - Iterate combination of all 3 items 
// & also check if their sum is equal to zero

const findTriplets = (arr) => {
    let result = [];
    
    for(let i =0 ;i<arr.length-2;i++){
       for(let j= i+1 ; j <arr.length-1 ;j++){
       for(let k= j+1 ; k <arr.length ;k++){

           let v1 = arr[i] ,v2 = arr[j] ,v3=arr[k];
           if(v1+v2+v3 ===0){
               result.push([v1,v2,v3])
           }
       }
    }
     
    }
    return result;
    }
    
    console.log(findTriplets([0,-1,2,-3,1]))
    //[[0,1,-1],[2,1,-3]]
    
    