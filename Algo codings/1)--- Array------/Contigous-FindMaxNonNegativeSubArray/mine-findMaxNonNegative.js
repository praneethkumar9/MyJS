module.exports = { 
    //param A : array of integers
    //return a array of integers
       maxset : function(A){
           let subArrayList = [];
            let subArrayIndex=0;
            A.forEach((item)=>{
                if( !subArrayList[subArrayIndex]){
                    subArrayList[subArrayIndex] = []
                }
                
                if(item>=0){
                    subArrayList[subArrayIndex].push(item);
                }else{
                    if(subArrayList[subArrayIndex].length!=0){
                                    subArrayIndex++
                            }                  
                }                
            })
            
            let maxSum = {
              sum : -1,
              length : 0,
              index:  -1
            }
            if(subArrayList[0].length ===0){
                return []
            }
            subArrayList.forEach((item,index)=>{
                if(item.length){
                     let sum = item.reduce((acc,value)=>acc+value);
                if(maxSum.sum<sum || (maxSum.sum==sum && maxSum.length<item.length)){
                    maxSum.sum = sum;
                    maxSum.length = item.length;
                    maxSum.index = index
                }
                
                }
               
            })
            
           return subArrayList[maxSum.index];
   }
   }