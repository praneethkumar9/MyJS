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

const kthMax = (arr,start,end,k) =>{
    k = end-k+2 // THis is main part like we are doing in different way like for kth largest we find its respective smallest k item 
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
console.log(kthMax([5, -8, 10, 37, 101, 2, 9],0,6,1)) // 101

// Time complexity O(n)
// space complexity O(logn)

/**
 * 
 * Above alogorithm is quick select to get kth smallest item in array
 * So in the function , we made relation equation so that k will become value respect to the smallest 
 * Ex :-  In an array , [10, 3, 6, 9, 2, 4, 15, 23] , 4th largest item = 5th smallest item
 * Below is the relation equation k = N-k+1
 * N: array length
 * k:  4 as above - as its need 4th largest 
 * 
 */
