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