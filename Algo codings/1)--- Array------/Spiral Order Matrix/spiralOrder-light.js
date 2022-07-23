module.exports = { 
	//param A : array of array of integers
	//return a array of integers
	spiralOrder : function(A){
    var top = 0;
    var bottom = A.length;
    var left = 0;
    var right = A[0].length;
    var dir = 0;

    var newArray = [];
    var newIndex = 0;

    while (top < bottom && left < right) {
        if (dir == 0) {
            for (i = left; i < right; i++) {
                newArray[newIndex] = A[top][i];
                newIndex++;
            }
            top++;
            dir = 1;
        } else if (dir == 1) {
            for (j = top; j < bottom; j++) {
                newArray[newIndex] = A[j][right - 1];
                newIndex++;
            }
            right--;
            dir = 2;
        } else if (dir == 2) {
            for (k = (right - 1); k >= left; k--) {
                newArray[newIndex] = A[bottom - 1][k];
                newIndex++;
            }
            bottom--;
            dir = 3;
        } else if (dir == 3) {
            for (l = (bottom - 1); l >= top; l--) {
                newArray[newIndex] = A[l][left];
                newIndex++;
            }
            left++;
            dir = 0;
        }
    }
    return newArray;
	}
	
};

