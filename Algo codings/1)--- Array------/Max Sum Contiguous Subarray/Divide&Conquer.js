let MSS = (A,start,length) => {
    if(length===1){
    return A[start]
    }
    let m = length/2;
    let leftMSS = MSS(A,start,m);
    let rightMSS = MSS(A,start+m,length-m);
    let leftSum = Number.MIN_VALUE ,rightSum = Number.MIN_VALUE , sum=0;
    for(let i=m;i<length;i++){
       sum+=A[i];
       rightSum = Math.max(sum,rightSum)
    }
    sum =0;
    for(let i=m-1;i>=0;i--){
       sum+=A[i];
       leftSum = Math.max(sum,leftSum)
    }
    console.log("yu" ,A.slice(start,length))
    console.log("rrr",leftMSS,rightMSS)
    let ans = Math.max(leftMSS,rightMSS);
      console.log("rur",leftSum,rightSum)
    return Math.max(ans,leftSum+rightSum);
    
}


console.log(MSS([3,-2,5,1],0,4))

// Divide & conquer  - Time complexity - O(nlogn)
//# Ref :- youtube.com/watch?v=ohHWQf1HDfU