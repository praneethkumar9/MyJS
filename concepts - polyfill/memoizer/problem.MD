- Memoization is an optimization technique used primarily to speed up the programs by storing the results of expensive function calls and returning the cached result when the same inputs occur again
- Function can be designed to use a cache storage (using `map` or `object`) which stores the values of function output against the input


Memoization is the process of caching the output of function calls so that subsequent calls are faster. Calling the function again with the same input will return the cached output without needing to do the calculation again.

The first function call will be slower than usual because of the overhead created by checking if a cached result exists and setting a result before returning the value.

Memoization increases performance on subsequent function calls but still needs to do work on the first call

 References
    https://codeburst.io/understanding-memoization-in-3-minutes-2e58daf33a19