module.exports = { 
    //param A : array of array of integers
    //return a array of integers
       spiralOrder : function(A){
           let debug = 0;
           let debug2 = 0;
   
           let final = [];
           if(A.length == 0 || A[0].length == 0) {
               return final;
           }
   
           let num_elems = A.length * A[0].length;
           //Keep track of the current element to be printed
           let row = 0; 
           let col = 0;
   
           //How much the row will move on the next leg of the spiral
           let row_move = A.length - 1;
           //The direction the row will move
           let backward = 0;
           //The current "circle layer" of the spiral
           let pass_num = 0;
           while(final.length < num_elems) {
               if(!backward) {
                   while(col < A[0].length - pass_num) {
                       final.push(A[row][col]);
                       if(debug) {
                           console.log('pushing ' + A[row][col]);
                       }
                       col++;
                   }
                   if(debug) {
                       console.log('here');
                       console.log(final);
                   }
                   col--;
                   let move_count = 0;
                   while(move_count < row_move - 1) {
                       row++;
                       final.push(A[row][col]);
                       if(debug) {
                           console.log('pushing ' + A[row][col]);
                       }
                       move_count++;
                   }
                   row++;
                   backward = (backward == 0) ? 1 : 0;
                   row_move--;
                   if(debug) {
                       console.log(row + ', ' + col);
                       console.log(final);
                   }
               }
               else {
                   let old_col = col;
                   while(col >= pass_num) {
                       final.push(A[row][col]);
                       if(debug2) {
                           console.log('pushing ' + A[row][col]);
                       }
                       col--;
                   }
                   col++;
                   let col_moved = 0;
                   if(col < old_col) {
                       col_moved = 1;
                   }
                   if(debug2) {
                       console.log('here');
                       console.log(final);
                   }
                   if(col_moved) {
                       let move_count = 0;
                       while(move_count < row_move) {
                           row--;
                           final.push(A[row][col]);
                           if(debug2) {
                               console.log('pushing ' + A[row][col]);
                           }
                           move_count++;
                       }
                   }
                   col++;
                   row_move--;
                   pass_num++;
                   backward = (backward == 0) ? 1 : 0;
                   if(debug2) {
                       console.log(row + ', ' + col);
                       console.log(final);
                   }
   
               }
           }
   
           //console.log(final);
           return final;
       }
   };
   
   