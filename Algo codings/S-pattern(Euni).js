function f (input){
    let input1 = '';
    let position , count;
   for(let row = 1 ; row<=input ; row++){
     position = input-row+1;
     count = 0;
     for(let col = 1 ; col<=input ; col++){
       if(col>=position){
         input1+='*'
         count++
      }else{
        input1+=' '
      }
     }
     input1+=' '
     let i = 1 ;
     while(i<=count){
      input1+=`${row+i-1}`
      i++;
     }
     console.log(input1)
     input1 = '';
   }
  let input2 = '' , count3;
   for(let row2=1 ; row2<=input ; row2++){
     let count2 = input;
     count3 = 0
       for(let col2=1 ; col2<=input ; col2++){
         //console.log("f",col2,row2)
         if(col2>=row2){
          input2+=`${count2--}`
          count3++
         }else{
          input2+=' '
         }
       }
       input2+=' ';
       let odd = 1 + (row2-1)*2 , i=1;
       while(i<=count3){
         input2+=`${odd}`
         odd = odd +2
        i++;
       }
       console.log(input2)
     input2 = '';
   }
  }
  f(4)