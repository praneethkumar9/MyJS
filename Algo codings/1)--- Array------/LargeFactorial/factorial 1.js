module.exports = { 
    //param A : integer
    //return a strings
       solve : function(A){
            var a = BigInt(A);
            let result = 1n
            for(let i= 1n ; i<=a;i++){
                result = result*i;
            }
            return result.toString()
       }
   };
   

   module.exports = { 
    //param A : integer
    //return a strings
       solve : function(A){
           
           function fatorial(n){
               if(n===1n) return 1n;
               return n*fatorial(n-1n);
           }
           
           const r = fatorial(BigInt(A));
           
           return r.toString();
       }
   };
   
   