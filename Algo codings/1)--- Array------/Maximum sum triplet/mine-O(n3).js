function maxSumTriplet(A){
    let maxSum =0
   for(let i=0 ;i<A.length;i++){
       for(let j=i+1 ;j<A.length;j++){
                    for(let k=j+1 ;k<A.length;k++){
                        if(A[i]<A[j] && A[j]<A[k]){
                            let tempSum = A[i] + A[j] + A[k];
                            console.log(A[i] , A[j] , A[k])
                            if(tempSum>maxSum){
                                maxSum =tempSum;
                            }
                        }
                }
    }
   }
   return maxSum;
}
A = [2, 5, 3, 1, 4, 9]


console.log(maxSumTriplet(A))

