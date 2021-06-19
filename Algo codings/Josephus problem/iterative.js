const josephus = (n,k)=>{    // without recursion - start with 0  -- bottom up approach
    let index = 0;
    for(let i=2;i<=n;i++){
        index = ((index + k )%i);
    }
    return index + 1;
}



// We are using iterative method where we going from bottom up approach

// after all turns up done , we got one person left at index 0  
// now we are going all top , 
// by getting its index when there are 2,3,4.... so on depends on total persons & gets required index in original series

// Example for how we are going bottom up to reach required position when n=4,k=3

// P(1,3) =  0 // this is intial postion we know - Now from this we calcualate top values with formula index = ((index + k )%i);
// P(2,3) =  1
// P(3,3) =  1  
// P(4,3) =  0 

// Since we started with positon zero , we add 1 to ans  which gives position from starting 1 ==> 1


// for clarity watch this
// for reference :-  https://www.youtube.com/watch?v=cf_hoGeVk8Q&t=916s


const josephus = (n,k)=>{    // without recursion - start with 1   -- bottom up approach
    let index = 1;
    for(let i=2;i<=n;i++){
        index = ((index + k -1 )%i) + 1;
    }
    return index ;
}