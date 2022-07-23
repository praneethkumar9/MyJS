Find the contiguous subarray within an array, A of length N which has the largest sum.

Input Format:

The first and the only argument contains an integer array, A.
Output Format:

Return an integer representing the maximum possible sum of the contiguous subarray.
Constraints:

1 <= N <= 1e6
-1000 <= A[i] <= 1000
For example:

Input 1:
    A = [1, 2, 3, 4, -10]

Output 1:
    10

Explanation 1:
    The subarray [1, 2, 3, 4] has the maximum possible sum of 10.

Input 2:
    A = [-2, 1, -3, 4, -1, 2, 1, -5, 4]

Output 2:
    6

Explanation 2:
    The subarray [4,-1,2,1] has the maximum possible sum of 6.


    Solution with Kadane's algorithm 
            Expected Time Complexity: O(N)
            Expected Auxiliary Space: O(1)
    Ref :- https://www.geeksforgeeks.org/largest-sum-contiguous-subarray/
    Note: The above algorithm only works if and only if at least one positive number should be present otherwise it does not work i.e if an Array contains all negative numbers it doesn’t work.


My code school
# Ref :- youtube.com/watch?v=ohHWQf1HDfU

it has  below algorithms to solve
  1) Brute force algorithm  - Time complexity - O(n^3) , O(n^2)
  2) Kadens algorithm Time complexity - O(n)
  3) Divider & conquer - Time complexity - O(nlogn)