module.exports = { 
    //param A : array of integers
    //param B : integer
    //return an integer
       solve : function(A, B){
       let n = A.length;
       let curr = 0;
       let count = 0;
       while(curr < n)
       {
           let next = curr+B-1; // end range
           let ind = next; // position to store the  position where bulb can turned on - starting from rightMost will lights more blubs
           let prev = curr-B+1; // start range
           if(prev<0)
               prev = 0; // if end range is less than 0 then make it to zero 
           while(ind>=prev)
           {
               if(A[ind])
                   break;  
               ind--;
           } // by end of this we will get position where we need to light the bulb
           if(ind >= prev) // if the position is then the prev then no blub found
           {
               count++;
               curr = ind+B;
           }
           else
               return -1;
       }
       return count;
       }
   };

   
   // Ref : https://github.com/ashu12chi/Interviewbit-Solution/blob/master/Arrays/minimum-lights-to-activate.cpp