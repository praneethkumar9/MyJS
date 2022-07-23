function solve(A){
    let h, n, sum=0, oldjv, oldkv;

    n=A.length;

    h=A.reduce(function(map, obj, i) {
        map[i]={i:i, v:obj};
        return map;
    }, []).sort((a,b)=>b.v-a.v);

    oldjv=oldkv=h[n-1].v;

    for (let k = 0; k < n; k++) {
        if(h[k].v<=(sum/3)) break;

        if(h[k].i>=2){
            for (let j = k+1; j < n; j++) {
                if((h[j].v*2-1)<=(oldjv+1)) break;
                if((h[j].v*2-1)<=(sum-h[k].v)) break;

                if(h[j].i>=1 && h[j].i<h[k].i){
                    for (let i = j+1; i < n; i++) {
                        if(h[i].i>=0 && h[i].i<h[j].i){
                            // console.log(h[k].v, h[j].v, h[i].v, h[k].v+ h[j].v+ h[i].v);
                            sum=Math.max(sum, h[k].v+ h[j].v+ h[i].v);
                            break;
                        }
                    }
                }

                oldjv=h[j].v;
            }
        }
    }

    return sum;
}

function binarySearchFloor(A, x, low = 0, high = undefined) {
        if (high === undefined) high = A.length;
        while(low < high) {
            let mid = Math.floor((low+high) / 2);
            if (A[mid]  < x) low = mid + 1;
            else high = mid;
        }
        return low;
    }

module.exports = { 
 //param A : array of integers
 //return an integer
    solve1 : function(A){
                let max_sum = -Infinity;
    for (let j = 1; j < A.length - 1; j++) {
        let max1 = -Infinity, max2 = -Infinity;
        for (let i = 0; i < j; i++) {
            if (A[i] < A[j] && max1 < A[i]) max1 = A[i]
        }
        for (let k = j + 1; k < A.length; k++) {
            if (A[k] > A[j] && max2 < A[k]) max2 = A[k]
        }
        const sum = max1 === -Infinity || max2 === -Infinity ? -Infinity : max1 + A[j] + max2;
        if (sum > max_sum) max_sum = sum
    }
    return max_sum
    },
    solve222: function(A) {
        function findMaxFromSortedArray(A, B){
            let min = 0, max = A.length -1, mid=0, element = null;
            while(min<=max){
                mid = min + Math.floor((max - mid)/2);
                element = A[mid]
                if(element >= B){
                    max = mid -1
                } else {
                    min = mid + 1
                }
            }
            // console.log(min, max, mid, element)
            return A[min -1] || null
        }

        function insertToASortedList(A, B){
            //find the index
            let min=0, max=A.length-1, mid=null, element=null;

            if(max === -1){
                A[0] = B
                return A
            }

            while(min<=max){
                mid = min + Math.floor((max - min)/2);
                element = A[mid]
                // console.log(min, max, mid)
                if(element <= B){
                    min = mid + 1;
                } else if(element > B) {
                    max = mid -1 
                } 
            }
            //shift the array

            const index = min;
            for(let i = A.length; i>index; i--){
                A[i] = A[i-1]
            }
            //insert the element
            A[index] = B
            return A
        }
        const B = [];
        B[A.length -1] = A[A.length -1]
        for(let i = A.length -2; i > -1; i--){
            B[i] = Math.max(A[i], B[i+1])
        }
        let S = [], max1 = 0, max2 = 0, max_sum = 0;
        for(let i = 1; i<A.length -1; i++){
            S = insertToASortedList(S, A[i-1]);
            max1 = findMaxFromSortedArray(S, A[i]);
            max2 = B[i+1] > A[i] ? B[i+1] : null
            const sum = max1 === null || max2 === null ? 0 : max1 + A[i] + max2;
            if(sum > max_sum){
                max_sum = sum
            }
        }
        return max_sum
    },
    solve: function (A){
            let maxSum = Number.NEGATIVE_INFINITY;
                
            let maxRight = new Array(A.length).fill(0);
            maxRight[A.length-1] = A[A.length-1];
            for(let i = A.length-2; i >= 0; i--) {
                maxRight[i] = Math.max(maxRight[i+1], A[i]);
            }
            let sortedArray = [].concat(A[0]);
            for(let i = 1; i < A.length; i++) {
                let leftIndex = binarySearchFloor(sortedArray, A[i]);
                const tempLeftIndex = leftIndex ? leftIndex - 1 : leftIndex;
                if (sortedArray[tempLeftIndex] < A[i] && A[i] < maxRight[i+1]) {
                    if (sortedArray[tempLeftIndex] + A[i] + maxRight[i+1] > maxSum) {
                        maxSum = sortedArray[tempLeftIndex] + A[i] + maxRight[i+1];
                    }
                }
                sortedArray.splice(leftIndex, 0, A[i]);
            }
            return maxSum;
    }
};

