var cache = {};
const fibSeries = (n,memo) =>{
    if(memo(n)){
        return memo(n);
    }else if(n<=1){
        return 1;
    }
    else{
        memo(n) = fibSeries(n-1,memo) + fibSeries(n-2,memo) 
        return memo(n);
    }
}


