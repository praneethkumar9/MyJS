module.exports = { 
	//param A : array of integers
	//param B : array of integers
	//return an integer
	coverPoints : function(A, B){
	    if (A.length == 0 || B.length == 0) {
	        return 0;
	    }
	    
	    var x = A[0];
	    var y = B[0];
	    var distance = 0;
	    
        for (var i = 1; i < A.length; i++) {
            var newX = A[i];
            var newY = B[i];
            var max = Math.max(Math.abs(newX - x), Math.abs(newY - y));
            distance += max;
            x = newX;
            y = newY;
        }
        
        return distance;
	}
};

// O(N)

//https://www.youtube.com/watch?v=E-P5N_8WeBI