// Javascript program to sort a binary array in one pass
 
/*Function to put all 0s on left and all 1s on right*/
function segregate0and1(arr)
{
    let count = 0; // Counts the no of zeros in arr
 
    for (let i = 0; i < n; i++) {
        if (arr[i] == 0)
            count++;
    }
 
    // Loop fills the arr with 0 until count
    for (let i = 0; i < count; i++)
        arr[i] = 0;
 
    // Loop fills remaining arr space with 1
    for (let i = count; i < n; i++)
        arr[i] = 1;
 
    
}
// Time Complexity: O(n)
//Reference :- https://www.geeksforgeeks.org/segregate-0s-and-1s-in-an-array-by-traversing-array-once/
