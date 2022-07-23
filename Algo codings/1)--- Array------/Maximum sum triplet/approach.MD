Simple Approach is to traverse for every triplet with three nested ‘for loops’ and find update the sum of all triplets one by one. Time complexity of this approach is O(N3) which is not sufficient for larger value of ‘N’.


Better approach is to make further optimization in above approach.
Instead of traversing through every triplets with three nested loops, we can traverse through two nested loops.
While traversing through each number(assume as middle element(Aj)), find maximum number(Ai) smaller than Aj preceding it and maximum number(Ak) greater than Aj beyond it.
Now after that, update the maximum answer with calculated sum of Ai + Aj + Ak.
Time complexity: O(N2)
Auxiliary space: O(1)
This approach is also that much efficient we are looking for.


Best Approach:
Best and efficient approach is use the concept of maximum suffix-array and binary search.

For finding maximum number greater than given number beyond it, we can maintain a maximum suffix-array array such that for any number(suffix[i]) it would contain maximum number from index i, i+1, … N-1. Suffix array can be calculated in O(N) time.

For finding maximum number smaller than the given number preceding it, we can maintain a sorted list of numbers before a given number such we can simply perform a binary search to find a number which is just smaller than the given number. In C++ language, we can perform this by using set associative container of STL library.

Time complexity: O(NlogN)
Auxiliary space: O(N)