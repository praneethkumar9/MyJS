const memoizer = (fun) =>{
    let cache ={};
    return (param)=>{
        if(cache[param]!=undefined){
            return cache[param]
        }else{
            cache[param] = fun(param);
            return cache[param];
        }
    }
}
