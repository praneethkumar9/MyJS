module.exports = { 
    //param A : array of integers
    //param B : array of integers
    //return an integer
       coverPoints : function(A, B){
           function shortestPath(p1, p2){
        
       // dx is total horizontal
       // distance to be covered
       let dx = Math.abs(p1[0] - p2[0])
        
       // dy is total vertical
       // distance to be covered
       let dy = Math.abs(p1[1] - p2[1])
        
       // required answer is
       // maximum of these two
       return Math.max(dx, dy)
    
   }
           
           
           let sequence = [];
           A.forEach((item,index)=>{
               sequence.push([item,B[index]])
           })
           let size = sequence.length
           let stepCount = 0
        
       // finding steps for each
       // consecutive poin the sequence
       for(let i=0;i<(size-1);i++)
           stepCount += shortestPath(sequence[i],sequence[i + 1])
            
       return stepCount
       }
   };
   // O(N)