module.exports = { 
    //param A : array of integers
    //return a array of integers
       plusOne : function(A){
           let result = "";
           A.forEach(item=>result =result+item+"")
           let g= Number(result)+1;
           g = String(g).split("");
           g = g.map(x=>Number(x))
           return g;
           if(g.length<A.length){
           let n = A.length-g.length;
           for(let i=0 ;i<n;i++){
               g.unshift(0)
           }
           return g
           }else{
           return g
           }
       }
   };
   