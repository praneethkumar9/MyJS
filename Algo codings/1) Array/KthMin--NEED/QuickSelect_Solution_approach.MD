This approach is similar to the quick sort algorithm where we use the partition on the input array recursively. But unlike quicksort, which processes both sides of the array recursively, this algorithm works on only one side of the partition. We recur for either the left or right side according to the position of pivot.

# Solution Steps

- Partition the array A[left .. right] into two subarrays A[left .. pos] and A[pos + 1 .. right] such that each element of A[left .. pos] is less than each element of A[pos + 1 .. right].
- Computes the number of elements in the subarray A[left .. pos] i.e. count = pos - left + 1
- if (count == K), then A[pos] is the Kth smallest element.
- Otherwise determines in which of the two subarrays A[left .. pos-1] and A[pos + 1 .. right] the Kth smallest element lies.
- If (count > K) then the desired element lies on the left side of the partition
- If (count < K), then the desired element lies on the right side of the partition. Since we already know i values that are smaller than the kth smallest element of A[left .. right], the desired element is the (K - count)th smallest element of A[pos + 1 .. right].
- Base case is the scenario of single element array i.e left ==right. return A[left] or A[right].