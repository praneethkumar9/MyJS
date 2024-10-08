Problem Description

Given a character matrix of size N x M in the form of a string array A of size N where A[i] denotes ith row.

Each character in the matrix consists any one of the following three characters {'r', 'g', 'b'} where 'r' denotes red color similarly 'g' denotes green color and 'b' denotes blue color.

You have to find the area of the largest triangle that has one side parallel to y-axis i.e vertical and the color of all three vertices are different.

NOTE:

If the area comes out to be a real number than return the ceil of that number.


Problem Constraints
2 <= N, M <= 103

A[i][j] = 'r' or A[i][j] = 'g' or A[i][j] = 'b'



Input Format
First and only argument is an string array A of size N denoting the 2D character matrix.



Output Format
Return a single integer denoting the area of the largest triangle that has one side parallel to y-axis i.e vertical and the color of all three vertices are different.

If the area comes out to be a real number than return the ceil of that number.



Example Input
Input 1:

 A = ["rrrrr", "rrrrg", "rrrrr", "bbbbb"]
Input 2:

 A = ["rrr", "rrr", "rrr", "rrr"]


Example Output
Output 1:

 10
Output 2:

 0


Example Explanation
Explanation 1:

 The maximum area of triangle is 10.
 Triangle coordinates are (0,0) containing r, (1,4) containing g, (3,0) containing b.
 
Explanation 2:

 All cells have same color so no triangle possible so we will return 0

