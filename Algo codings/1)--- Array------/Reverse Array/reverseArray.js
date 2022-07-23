// using Inbuilt function 
const reverse = (arr) => arr.reverse();

// Using temp array
const reverse = (arr) =>{
    const tempArr = [];

    for(let i=arr.length-1 ;i>=0;i--){
        tempArr.push(arr[i]);
    }
    return tempArr;
}

// Using same array & swap method
const reverse = (arr) =>{
    let end = arr.length-1;
    let start = 0
    while(start<end){
        [arr[end],arr[start]] = [arr[start],arr[end]]; // swap start & end index values in same array
        start++;
        end--;
    }
    return arr;
}
