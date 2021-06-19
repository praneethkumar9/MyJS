    
// one every 3 is eliminated until one remains
// [1,2,3,4,5,6,7] - initial sequence
// [1,2,4,5,6,7] => 3 is counted out
// [1,2,4,5,7] => 6 is counted out
// [1,4,5,7] => 2 is counted out
// [1,4,5] => 7 is counted out
// [1,4] => 5 is counted out
// [4] => 1 counted out, 4 is the last element - the survivor!

const survivor = (arr) => {
    let index = 0;
   while(arr.length>1){   
     arr.splice(index+2,1);
     
     if(arr.length==2){   
    arr.splice(index,1);
    //console.log("kkffgg",arr)
         break;
     }
     index = (index+2)%(arr.length);
//      console.log("kk",(index+2)%4)
//     //  index = index+2;
//      if((index + 2) == arr.length-1 ){
//         index = -1
//      }else if((index + 2) == arr.length-2){
//         index = -2
//      }
//      else if((index+2)>arr.length-1 ){
//  index =0
//      }else{
//          index = index+2
//      }
   }
   return arr[0];
}

function josephus(n, k=3) // without zero
    {
        if (n == 1)
            return 1;
        else
            /* The position returned
            by josephus(n - 1, k) is
            adjusted because the
            recursive call josephus(n
            - 1, k) considers the
            original position k%n + 1
            as position 1 */
            return (josephus(n - 1, k)
                       + k-1) % n + 1;
    }
function josephus2(n, k=3)  // with zero
    {
        if (n == 1)
            return 0;
        else
            return (josephus2(n - 1, k)
                       + k) % n ;   
    }

console.log(survivor([1,2,3,4,5,6,7]))
console.log(josephus2(7))
console.log(josephus(7))


const f = (n,k=3)=>{    // without recursion - start with 1   -- bottom up approach
    let ans = 0;
   
    for(let i=2;i<=n;i++){
        // console.log(ans + k,i,"k")
        ans = ((ans + k )%i);
    }
    // console.log(ans,"k")
    return ans +1;
}

console.log(f(7))
// 1 2 4 5 7


// 1 2 3 4 5 
// 1 2 4 5 
// 2 4 5
// 1 4 5
// 1 4
// 1


/*
// This problem takes its name by arguably the most important event in the life of the ancient historian Josephus: according to his tale, he and his 40 soldiers were trapped in a cave by the Romans during a siege.

// Refusing to surrender to the enemy, they instead opted for mass suicide, with a twist: they formed a circle and proceeded to kill one man every three, until one last man was left 
//(and that it was supposed to kill himself to end the act)

**/