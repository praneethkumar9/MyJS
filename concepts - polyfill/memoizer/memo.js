function memoize(fn) {
    const cache = new Map();
    return function () {
        const key = JSON.stringify(arguments); // Stringification of arguments done in order for the function to work for multiple arguments
        
        // if the caculations have already been done for inputs, return the value from cache
        if (cache.has(key)) {
            return cache.get(key);
        } else {
            // call the function with arguments and store the result in cache before returning
            cache.set(key, fn(...arguments));
            return cache.get(key);
        }
    };
}

// driver code
let factorial = memoize(function fact(value) {
    return value > 1 ? value * fact(value - 1) : 1;
});

factorial(5);                   // 120 (output is calculated by calling the function)
factorial(5);                   // 120 (output is returned from the cache which was stored from previous calculations)