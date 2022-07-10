let first = 0 , second = 1 , count = 2;

const getFibnonciSeries = (counter) =>{   
    if(count<counter){
        let nextElement = first + second;
        first = second;
        second = nextElement;
        count++;
       return getFibnonciSeries(counter);
    }else{
        return second;
    }
}
console.log(getFibnonciSeries(4))


function fibonacci(n) {
    if(n==0){
    return 0
    }
       if (n < 2){
           return 1;
       }else{
           return fibonacci(n-2) + fibonacci(n-1);
       }
   }
   
   let printSeries = (n) =>{
   let result = [];
     for(let i=0 ;i<=n;i++){
     result.push(fibonacci(i));
     }
     return result
   }
   
   console.log(printSeries(7));