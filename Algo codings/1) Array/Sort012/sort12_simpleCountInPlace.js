const sort012 = (arr) =>
    {
    let count1 =0 ,count2=0 ,count0 =0;
    for(let value of arr){
        if(value==0){
           count0++;
        }else if(value==1){
            count1++;
        }else if(value==2){
             count2++;
        }
    }
  let index = 0;
  for(let i=0;i<count0;i++){
      arr[index++] = 0;
  }
  for(let i=0;i<count1;i++){
      arr[index++] = 1;
  }
  for(let i=0;i<count2;i++){
      arr[index++] = 2;
  }
  
    return arr;
    }

      // This is IN-Place algorithm
    // Time complexity - O(n) + O(n) 
    // space complexity - O(1)