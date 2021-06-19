function josephus(n, k)  // with zero
    {
        if (n == 1)
            return 0;
        else
            return (josephus(n - 1, k)
                       + k) % n ;   
    }


// So here we are using recursive solution by dividing problem into small problem

//  winning position of (n,k) =  winning position of (n-1,k) + k

// Since this is circular , we need to use modulous
 //       W(n,k) = (W(n-1,k)+k)%n

 // So in brief 

/**
 *  General case                W(n,k) = (W(n-1,k)+k)%n
 * Terminating/base case        W(1,k) = 1   
 *         when total person is one we will return 1 to terminate recursive loop because person cant kill himself
 * 
 * 
 */


// For reference :- https://www.youtube.com/watch?v=fZ3p2Iw-O2I&t=322s
//                  https://www.youtube.com/watch?v=dzYq5VEMZIg