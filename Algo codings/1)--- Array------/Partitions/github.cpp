#include <bits/stdc++.h>
using namespace std;

int Solution::solve(int A, vector<int> &B) {
    int ans = 0;
    long long total_sum = 0;
    vector<int> suffix_part_count(A, 0);
    
    for(int i = 0; i < A; i++)
    {
        total_sum += B[i];
    }
    
    if(total_sum % 3 != 0)
    {
        return ans;
    }
    
    long long part_sum = total_sum / 3;
    
    long long local_sum = 0;
    
    for(int i = A - 1; i >=0; i--)
    {
        local_sum += B[i];
        
        if(local_sum == part_sum)
        {
            suffix_part_count[i] = 1;
        }
    }
    
    // Cumulative sum of the part counts
    for(int i = A - 2; i>=0; i--)
    {
        suffix_part_count[i] += suffix_part_count[i+1];
    }
    
    local_sum = 0;
    for(int i = 0; i + 2 < A; i++)
    {
        local_sum += B[i];
        
        // If any prefix found with part value
        if(local_sum == part_sum)
        {
            ans += suffix_part_count[i + 2];
        }
    }
    
    return ans;
    
}