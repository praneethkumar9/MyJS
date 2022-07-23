module.exports = { 
    //param A : array of integers
    //return a array of integers
       plusOne : function(A){
           let a =[...A];
      let n = a.length;
    
   // Add 1 to last digit and find carry
   a[n - 1] += 1;
   let carry = parseInt(a[n - 1] / 10);
   a[n - 1] = a[n - 1] % 10;
    
   // Traverse from second last digit
   for (let i = n - 2; i >= 0; i--) {
       if (carry == 1) {
           a[i] += 1;
           carry = parseInt(a[i] / 10);
           a[i] = a[i] % 10;
       }
   }
    
   // If carry is 1, we need to add
   // a 1 at the beginning of vector
   if (carry == 1)
       a.unshift(1);
   let count =0
   for(let i=0;i<a.length;i++){
       if(a[i]!=0){
           break;
       }
       count++
   }
   a.splice(0,count)
   return a
       }
   }