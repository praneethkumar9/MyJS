const survivor = (arr ,k) => {
    k = k-1
    let index = k;
   while(arr.length>1){   
     arr.splice(index,1);
     index = ((index+k)%(arr.length));
   }
   return arr[0];
}

//console.log(survivor([1,2,3,4,5,6,7],2)) -- gives number in the array who will survive with given array,k