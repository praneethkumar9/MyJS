
		// JavaScript Program to implement
		// the above approach

		function maxSubarraySum(arr, size)
		{
			let max_ending_here = 0, max_so_far = Number.MIN_VALUE;
			for (let i = 0; i < size; i++) {

				// include current element to previous subarray only
				// when it can add to a bigger number than itself.
				if (arr[i] <= max_ending_here + arr[i]) {
					max_ending_here += arr[i];
				}

				// Else start the max subarray from current element
				else {
					max_ending_here = arr[i];
				}
				if (max_ending_here > max_so_far) {
					max_so_far = max_ending_here;
				}
			}
			return max_so_far;
		}
		
// This code is contributed by Potta Lokesh
	
