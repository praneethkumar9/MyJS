# four cases
1) A[i] > A[j] , i > j => f(i, j) = (A[i] - A[j]) + (i-j) = (A[i]+i) - (A[j]+j)
2) A[i] < A[j] , i < j => f(i, j) = -(A[i] - A[j]) + -(i-j) = -(A[i]+i) + (A[j]+j) = - ( (A[i]+i) - (A[j]+j) )
3) A[i] > A[j] , i < j => f(i, j) = (A[i] - A[j]) + -(i-j) = (A[i]-i) - (A[j]-j)
4) A[i] < A[j] , i > j => f(i, j) = -(A[i] - A[j]) + (i-j) = -(A[i]-i) + (A[j]-j) = - ( (A[i]-i) - (A[j]-j) )


1)  (A[i]+i) - (A[j]+j)
2) - ( (A[i]+i) - (A[j]+j) )  

        ----These two are same as we need abs value so need to get  max & min value of ( A[i or j] + (i or j)) 

3)  (A[i]-i) - (A[j]-j)
4) - ( (A[i]-i) + (A[j]-j) )  

        ----These two are same as we need abs value so need to get  max & min value of ( A[i or j] - (i or j)) 


now need to find difference of two cases , which gives max sum is the ans