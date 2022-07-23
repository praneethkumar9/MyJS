module.exports = { 
    //param A : array of integers
    //return a array of integers
       plusOne : function(A){
        let carry = -1;
   let tempA = [...A];
   let lastDigit = tempA[A.length-1];
   if(lastDigit+1>9){
     tempA[A.length-1] = (lastDigit+1)%10;
     carry = 1
     for(let i= A.length-2;i>=0;i--){
         if(carry == -1){
            break; // if carry forward stops
         }
         if(tempA[i]+1>9){
             tempA[i] = (tempA[i]+1)%10;
             carry = 1; // ( (tempA[i]+1)/10)
         }else{
             tempA[i] = tempA[i] +1
             carry = -1;
         }
         
     }
      if(carry ===1){
       tempA.unshift(1)
     }
   
   }else{
     // if there is no carry forward is needed
       tempA[A.length-1] = lastDigit+1
   }

   // Handling most significant position with zeros
   if(tempA.length>1){
   let count =0
      for(let i=0;i<tempA.length;i++){
          if(tempA[i]!=0){
              break;
          }
          count++
      }
      tempA.splice(0,count)
        return tempA;
   }else{
     return tempA;
   }
   
       }
   }