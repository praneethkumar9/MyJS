module.exports = { 
	//param A : array of integers
	//return a array of integers
	plusOne : function(A){
        var carry = 1;
        for (var i = A.length - 1; i >= 0; i--) {
            carry += A[i];
            A[i] = carry % 10;
            carry = parseInt(carry / 10, 10);
        }
        
        if (carry) {
            A.unshift(1);
        } else {
            if (A[++i] === 0) {
                while (A[i] === 0) {
                    i++;
                }
                A = A.slice(i);
            }
        } 
        
    
        return A;
	}
};

