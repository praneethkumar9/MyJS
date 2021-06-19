function josephus(n, k) // without zero
    {
        if (n == 1)
            return 1;
        else
            /* The position returned
            by josephus(n - 1, k) is
            adjusted because the
            recursive call josephus(n
            - 1, k) considers the
            original position k%n + 1
            as position 1 */
            return (josephus(n - 1, k)
                       + k-1) % n + 1;
    }


// So here we are using recursive solution by dividing problem into small problem

//  winning position of (n,k) =  winning position of (n-1,k) + (k - 1)
//      here we are using K-1 because we started from 1 and also kth person died .So we need to add k-1

// Since this is circular , we need to use modulous
 //       W(n,k) = (W(n-1,k)+k-1)%n + 1 
 //            here we adding extra one because we are started from one so when modulous gives some value we need to add one

 // So in brief 

/**
 *  General case                W(n,k) = (W(n-1,k)+k-1)%n +1
 * Terminating/base case        W(1,k) = 1   
 *         when total person is one we will return 1 to terminate recursive loop because person cant kill himself
 * 
 * 
 */