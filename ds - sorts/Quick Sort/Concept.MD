Quick sort is sorting algorithm uses divide & conquer startegy

# Space complexity

- It is IN-Place algorithm so takes O(1) space complexity by not creating auxilary arrays instead it uses original array itself

# Time complexity

   * O(nlogn) -  Average case
   * O(n^2)   -  Worst case

- By using randomized verison of quick sort , there is high probability of getting O(nlogn) time complexity .

- So therefore quick sort is the efficient among all sort algorithm

- Also most languages uses quick sort as their default sort strategy


# Steps

1. Select a pivot element & apply partition process
2. Partition process is the alogrithm in which making all items lesser than pivot to kept at left of the array and items greater than pivot to the right.
3. Now first two steps for left of the pivot (array segement) and right of the pivot as well .
4. Do above step recursively until you met the base condition start index > end index for all sub segements
5. After above all recursion steps gets over , array will be sorted


# The Efficiency of Quick Sort

    Now that we know how to implement the Quicksort algorithm let us discuss the time and space complexity. The worst-case time complexity of Quick Sort is O(n2). The average case time complexity is O(nlogn). The worst-case is usually avoided by using a randomized version of Quicksort.

    The weak spot of the Quicksort algorithm is the choice of the pivot. Choosing a bad pivot (one that is greater than/less than most elements) every time, would give us the worst-case time complexity. While repeatedly choosing a pivot that has a roughly equal number of elements that are less than/greater than the pivot would give us a time complexity of O(nlogn).

    Quicksort is one of those algorithms where the average-case runtime is actually important. Empirically, it was noticed that Quicksort tends to have a O(nlogn) runtime regardless of the pivot-choosing strategy.

    Also, when it comes to space complexity, Quicksort doesn't take any extra space (excluding the space reserved for recursive calls). These kinds of algorithms are technically called as in-place algorithms. We don't need extra space because we are performing the operation on the same array

 # MyNote: 
    Pindex is something which always point to index where value is greater than pivot value
    Once its found any smaller value in the array iteration its swaps with Pindex and increments Pindex . 
    So that all small values will be pushed to left & big values to right
    
# References :- 
  * https://www.youtube.com/watch?v=COk73cpQbFQ
  * Check screenshots for quick reference of above youtube video
  * https://stackabuse.com/quicksort-in-javascript/


