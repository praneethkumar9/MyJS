/**
 * Find the most water container
 * two pointer approach
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
    let i = 0;
        let j = height.length - 1;
        let max = 0;
        while(i < j){
            let left = height[i];
            let right = height[j];
            let prod = 0;
            
            if(right > left){
                //Value is upperbounded by the left. Keep right and see if there are higher values of left for the current right
                prod = left * (j-i);
                i++;
            } else if(right == left){
                //Equal state results in maximal value. Stop reviewing both as no other max values can be found with left and right
                prod = left * (j-i);
                i++;
                j--;
            } else{
                //Value is upper bounded by right. Keep left and see if there are higher values of right for the current left
                prod = right * (j-i);
                j--;
            }
            
            if(max < prod){
                max = prod;
            }
        }
        return max;
};

/**
 * Trapping rain water
 * two pointer approach
 * @param {number[]} height
 * @return {number}
 */
var trap = function(height) {
    let left = 0, right = height.length - 1;
      let ans = 0;
      let left_max = 0, right_max = 0;
      while (left < right) {
          if (height[left] < height[right]) {
              height[left] >= left_max ? (left_max = height[left]) : ans += (left_max - height[left]);
              ++left;
          }
          else {
              height[right] >= right_max ? (right_max = height[right]) : ans += (right_max - height[right]);
              --right;
          }
      }
      return ans;
    
  };