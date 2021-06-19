const sort012 = arr =>{
    let low=0,mid=0,high=arr.length-1;
    while(mid<high){
        switch(arr[mid]){
            case 0 : {
               [arr[low],arr[mid]] =[arr[mid],arr[low]];
               low++;
               mid++;
               break;
            }
            case 1 : {
               mid++;
               break;
            }
            case 2 : {
                [arr[high],arr[mid]] =[arr[mid],arr[high]];
                high--;
                break;
             }
             default:{}
        }
    }
    return arr;
}

    console.log(sort012([2,0,1,0,2,2,1,1]))

     // This is IN-Place algorithm
    // Time complexity - O(n)
    // space complexity - O(1)

    //Reference:-https://www.youtube.com/watch?v=oaVa-9wmpns