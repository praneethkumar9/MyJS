module.exports = { 
    //param A : array of strings
    //return an integer
       solve : function(A){
           const left = {r: Number.MAX_VALUE, b: Number.MAX_VALUE, g: Number.MAX_VALUE};
           const right = {r: -Number.MAX_VALUE, b: -Number.MAX_VALUE, g: -Number.MAX_VALUE};
           const top = {r :[], g: [], b: []};
           const bottom = {r :[], g: [], b: []};
           
           //find the top and bottom most for each vertex
           for(let c = 0; c < A[0].length; c++){
               top.r.push(Number.MAX_VALUE);
               top.b.push(Number.MAX_VALUE);
               top.g.push(Number.MAX_VALUE);
               bottom.r.push(-Number.MAX_VALUE);
               bottom.b.push(-Number.MAX_VALUE);
               bottom.g.push(-Number.MAX_VALUE);
               for(let r = 0; r < A.length; r++){
                   top[A[r].charAt(c)][c] = Math.min(top[A[r].charAt(c)][c], r);
                   bottom[A[r].charAt(c)][c] = Math.max(bottom[A[r].charAt(c)][c],r);
                   left[A[r].charAt(c)] = Math.min(left[A[r].charAt(c)], c);
                   right[A[r].charAt(c)] = Math.max(right[A[r].charAt(c)], c);
               }
           }
           
           let ans = 0;
           for(let c = 0; c < A[0].length; c++){
               for(let topVertex in top){
                   for(let bottomVertex in bottom){
                       let thirdVertex = "rbg".replace(topVertex,"").replace(bottomVertex,"");
                       
                       //check left
                       if(topVertex != bottomVertex){
                           
                           if(left[thirdVertex] < Number.MAX_VALUE && left[thirdVertex] < c){
                               ans = Math.max(ans, 
                                       Math.ceil(
                                           (bottom[topVertex][c] - top[bottomVertex][c] + 1) 
                                           * (c - left[thirdVertex] + 1)
                                           * 0.5
                                       )
                                   );
                           }
   
                       }
                       
                       //check right
                       if(topVertex != bottomVertex){
                           if(right[thirdVertex] > -Number.MAX_VALUE && right[thirdVertex] > c){
                               ans = Math.max(ans, 
                                       Math.ceil(
                                           (bottom[topVertex][c] - top[bottomVertex][c] + 1) 
                                           * (right[thirdVertex] - c + 1)
                                           * 0.5
                                       )
                                   );
                           }
                       }
                   }
               }
           }
           return ans;
       }
   };
   
   
   
   
   