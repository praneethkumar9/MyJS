/* Function to check if x is power of 2 */
function isPowerOfTwo(n)
{
    if (n == 0)
        return false;

    return parseInt( (Math.ceil((Math.log(n) / Math.log(2))))) == parseInt( (Math.floor(((Math.log(n) / Math.log(2))))));
}