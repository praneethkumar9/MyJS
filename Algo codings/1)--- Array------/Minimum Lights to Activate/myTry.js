function light(A, B){
    let result = 0, allLightsOn = false , start=0;
      for(let i=0 ; i<A.length;i++){
      console.log("i" ,i)
           if(!A[i]){
               continue;
           }         
           console.log({a: i-B+1 , b : i+B-1})
           if((i-B+1) <= start){
                result += 1;
                start = i+B;
                i = i+B;
                
                
                if(i>=A.length-1){
                    allLightsOn = true;
                    break;
                }
           }
      }
      
      if(allLightsOn){
           return result
      }else{
          return -1
      }
   }
A = [ 1, 0, 1, 0, 0, 0 ]
B = 4
 console.log(light(A,B))