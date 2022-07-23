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
             
           let ss = 0;
             
           // If the sum of elements from i-th to n-th
           // equals to sum of part putting 1 in cnt
           // array otherwise 0.
           for (let i = n-1; i >= 0 ; i--)
           {
               ss += a[i];
               if (ss == s){
                cnt[i] = 1;

               }else{
                cnt[i] = 0;

               }
           }
             
           // Calculating the cumulative sum
           // of the array cnt from the last index.
           for (let i = n-2 ; i >= 0 ; i--)
               cnt[i] += cnt[i + 1]; // This array will contain no of ways for that particular index
             
           let ans = 0;
           ss = 0;
             
           // Calculating answer using original
           // and cnt array.
           for (let i = 0 ; i+2 < n ; i++)
           {
               ss += a[i];
               if (ss == s)   // If any prefix found with part value
                   ans += cnt[i + 2];
           }
           return ans;
       }
   };
   

   //geeksforgeeks.org/count-the-number-of-ways-to-divide-an-array-into-three-contiguous-parts-having-equal-sum/
   // O(N)