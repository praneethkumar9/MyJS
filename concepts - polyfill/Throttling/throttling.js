//article 

function throttle(fn, delay, context){
    let timer;
    let lastArgs;

    return function(...args){
        lastArgs = args;
        context = this ?? context;
        
        if(timer) return;
        
        timer = setTimeout(()=>{
            fn.apply(context, lastArgs);
            clearTimeout(timer);
        }
        , delay);
    };
}

//Mine :- 

function throttle(fn, delay, context){
    let called = false,timer;

    return function(...args){
        if(!called){
          context = this ?? context;
          fn.apply(context,args);
          called = true
          timer = setTimeout(()=>{
              called = false;
              clearTimeout(timer);
          },delay)
        }
    };
}

// Throttling Function - geeks
const throttleFunction=(func, delay)=>{
  
    // Previously called time of the function
    let prev = 0; 
    return (...args) => {
      // Current called time of the function
      let now = new Date().getTime(); 

      // Logging the difference between previously 
      // called and current called timings
      console.log(now-prev, delay); 
        
      // If difference is greater than delay call
      // the function again.
      if(now - prev> delay){ 
        prev = now;

        // "..." is the spread operator here 
        // returning the function with the 
        // array of arguments
        return func(...args);  
      }
    }
}