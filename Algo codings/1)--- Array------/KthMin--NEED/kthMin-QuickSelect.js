// partition process - Making array such that pivot is placed between start & end where all left are smaller and all right are bigger
const partition = (arr,start,end) =>{
    let pivot = arr[end];
    let pIndex = start;
    for(let i=start;i<end;i++){
        if(arr[i]<pivot){
            [arr[i],arr[pIndex]] = [arr[pIndex],arr[i]];
            pIndex++;
        }
    }
    [arr[end],arr[pIndex]] = [arr[pIndex],arr[end]]
    return pIndex;
}

const kthMin = (arr,start,end,k) =>{
      // Base case or terminating case
    if(start==end){
        return arr[start];
    }
    let pIndex = partition(arr,start,end);
    let count = pIndex-start+1;
    // Returning last element since we get first k smallest items
    if(count==k){
        return arr[pIndex];
    }else if(k<count){
        return kthMin(arr,start,pIndex-1,k);  // Checking left of the subset of array since k is smaller than count
    }else{
        return kthMin(arr,pIndex+1,end,k-count); // Checking right of the subset of array since k is greater than count
        // k-count because we skipped left subset plus pivot element
    }
}
console.log(kthMin([5, -8, 10, 37, 101, 2, 9],0,6,6))

// Time complexity O(n)
// space complexity O(logn)