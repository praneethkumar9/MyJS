
//Mine
module.exports = { 
	//param A : array of integers
	//param B : integer
	//return a array of integers
	rotateArray : function(A, B){
		if(A.length<B){
          B = B%(A.length)
        }
        let sliced = A.splice(0,B);
		A.splice(A.length,0,...sliced)
		return A
	}
};

// Solution
module.exports = { 
    //param A : array of integers
    //param B : integer
    //return a array of integers
    rotateArray : function(A, B){
        let n = B % A.length;
        return A.slice(n).concat(A.slice(0, n));
    }
};

// Editorial
function swap(A, i, j){
    var temp;
    while(i<=j){
        temp = A[i];
        A[i] = A[j];
        A[j] = temp;
        i++;
        j--;
    }   
}

module.exports = {
    //param A : array of integers
    //param B : integer
    //return a array of integers
    rotateArray : function(A, B){
        if(B < 1){
            return A;
        } else{
            B = B%A.length;
        }
        swap(A, B, A.length-1);
        swap(A, 0, B-1);
        swap(A, 0, A.length -1);
        return A;
    }
};

