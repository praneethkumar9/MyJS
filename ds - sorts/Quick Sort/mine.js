const quickSort = (arr,start,end) =>{
    if(start<end){
        const pIndex = partition(arr,start,end);
        quickSort(arr,start,pIndex-1);
        quickSort(arr,pIndex+1,end);
    }
    return arr;
}
const swap = (arr,index1,index2) =>{
    let temp = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = temp;
}
const partition = (arr,start,end) =>{
    const pivotIndex = end;
    let pIndex = start;
    for(let i=start;i<=end-1;i++){
        if(arr[i]<arr[pivotIndex]){
            swap(arr,i,pIndex)
            pIndex++
        }
    }
    swap(arr,pIndex,pivotIndex)
    return pIndex;
}

const sort = (arr)=>{
    return quickSort(arr,0,arr.length-1)
}
console.log(sort([7,2,1,6,8,0,3,4]))