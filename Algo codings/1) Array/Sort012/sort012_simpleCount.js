const sort012 = (arr) =>
    {
          let result =[];
    let count1 =0 ,count2=0;
    for(let value of arr){
        if(value==0){
           result.push(value);
        }else if(value==1){
            count1++;
        }else if(value==2){
             count2++;
        }
    }
  let index = result.length;
  for(let i=0;i<count1;i++){
      result[index++] = 1;
  }
  for(let i=0;i<count2;i++){
      result[index++] = 2;
  }
    return result;
    }

    console.log(sort012([2,0,1,0,2,1]))

    // This is not IN-Place algorithm
    // Time complexity - O(n) + O(n-a) // a is number of zeros
    // space complexity - O(n)