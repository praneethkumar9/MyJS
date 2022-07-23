module.exports = { 
    //param A : integer
    //param B : array of integers
    //return an integer
       solve : function(A, B){
           let a = B,n=A;
   let cnt = new Array(n);
           let s = 0;
             
           // Calculating the sum of the array
           // and storing it in variable s
           for (let i = 0 ; i < n ; i++)
           {
               s += a[i];
           }
         
           // Checking s is divisible by 3 or not
           if (s % 3 != 0)
               return 0;
             
           // Calculating the sum of each part
           s = Math.floor(s/3);
           let prefixArray = [],suffixArray=[];
           let ss = 0;
           for(let i=0;i<a.length;i++){
              ss+=a[i];
              if(s==ss){
                prefixArray.push(i)
              }
           }
           ss = 0;
           for(let i=a.length-1;i>=0;i--){
              ss+=a[i];
              if(s==ss){
                suffixArray.push(i)
              }
           }
           let ans=0;
           for(let i=0;i<prefixArray.length;i++){
               for(let j=0;j<suffixArray.length;j++){
                        if(suffixArray[j]-prefixArray[i]>=2){
                            ans+=1
                        }
                        // let x= 0,n=0;
                        // for(let k=prefixArray[i]+1;k<suffixArray[j];k++){   // we are looping for each & every possiblity & increasing the ans count for outcome
                        //     x+=a[k];
                        //     n=1;
                        // }
                        // if(x==s && n==1) ans+=1
               }
           }
            
           return ans;
       }
   };
   

   //geeksforgeeks.org/count-the-number-of-ways-to-divide-an-array-into-three-contiguous-parts-having-equal-sum/
   // O(N)