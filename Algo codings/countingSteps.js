// Suppose you want climb a staircase of N steps, and on each step you can take either 1 or 2 steps. How many distinct ways are there to climb the staircase? For example, if you wanted to climb 4 steps, you can take the following distinct number of steps:
// 1) 1, 1, 1, 1
// 2) 1, 1, 2
// 3) 1, 2, 1
// 4) 2, 1, 1
// 5) 2, 2
// So there are 5 distinct ways to climb 4 steps. We want to write a function, using recursion, that will produce the answer for any number of steps.
// Answer
// The solution to this problem requires recursion, which means to solve for a particular N, we need the solutions for previous N's. The solution for N steps is equal to the solutions for N - 1 steps plus N - 2 steps.
function countSteps(N) {
  
  // just as in our solution explanation above, we know that to climb 1 step
  // there is only 1 solution, and for 2 steps there are 2 solutions
  if (N === 1) { return 1; }
  if (N === 2) { return 2; }
  
  // for all N > 2, we add the previous (N - 1) + (N - 2) steps to get
  // an answer recursively
  return countSteps(N - 1) + countSteps(N - 2);
  
}

// the solution for N = 6 will recursively be solved by calculating
// the solution for N = 5, N = 4, N = 3, and N = 2 which we know is 2
countSteps(6); 