// Javascript program to sort a binary array in one pass
 
/*Function to put all 0s on left and all 1s on right*/
function segregate0and1(arr)
{
    /* Initialize left and right indexes */
    let left = 0, right = arr.length-1;
 
    while (left < right)
    {
        /* Increment left index while we see 0 at left */
        while (arr[left] == 0 && left < right)
            left++;
 
        /* Decrement right index while we see 1 at right */
        while (arr[right] == 1 && left < right)
            right--;
 
        /* If left is smaller than right then there is a 1 at left
        and a 0 at right. Exchange arr[left] and arr[right]*/
        if (left < right)
        {
            arr[left] = 0;
            arr[right] = 1;
            left++;
            right--;
        }
    }
}
// Time Complexity: O(n)
//Reference :- https://www.geeksforgeeks.org/segregate-0s-and-1s-in-an-array-by-traversing-array-once/
