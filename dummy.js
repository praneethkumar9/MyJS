const sort012 = arr =>{
    let low=0,mid=0,high=arr.length-1;
    while(mid<high){
        switch(arr[mid]){
            case 0 : {
               [arr[low],arr[mid]] =[arr[mid],arr[low]];
               low++;
               mid++;
            }
            case 1 : {
               mid++;
            }
            case 2 : {
                [arr[high],arr[mid]] =[arr[mid],arr[high]];
                high--;
             }
        }
    }
    return arr;
}