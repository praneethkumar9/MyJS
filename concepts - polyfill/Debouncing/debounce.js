//The debounce function forces a function to wait a certain amount of time before running again
//The function is built to limit the number of function calls to improve the performance
//Debounce function design can take function (to be debounced), delay and the optional context
function debounce(fn, delay, context){
    let timer;

    return function(...args){
        if(timer) clearTimeout(timer);
        
        context = this ?? context;
        timer = setTimeout(()=>{
            fn.apply(context, args);
        }
        , delay);
    }
}
//Notes
//Context is replaced while debounce function call in presence of a context. If not, context set during the debounce function call is used.

// Geeks

const debounce = (func, delay) => {
    let debounceTimer
    return function() {
        const context = this
        const args = arguments
        clearTimeout(debounceTimer)
        debounceTimer = setTimeout(() => func.apply(context, args), delay)
    }
} 




