// using Inbuilt function 
const findMaxAndMin = arr =>{
    console.log(` min : ${Math.min(...arr)}  max : ${Math.max(...arr)}`)
}

// Using simple linear search - 1
const findMaxAndMin = arr =>{
    let min = arr[0] ,max = arr[0];
    for(let value of arr){
        if(value>max){
            max = value;
        }
        if(value<min){
            min = value;
        }
    }
    console.log(` min : ${min}  max : ${max}`)
}

// Using simple linear search -2
// Here it will iterate n-2 items in array
const findMaxAndMin = arr =>{

    let min ,max ;
    if(arr[0]<arr[1]){
        min = arr[0];
        max = arr[1];
    }else{
        min = arr[1];
        max = arr[0];
    }

    for(let i=2 ;i<arr.length;i++){
        let value = arr[i];
        if(value>max){
            max = value;
        }
        if(value<min){
            min = value;
        }
    }
    console.log(` min : ${min}  max : ${max}`)
}

// using tournment method - recurisve approach (Geeks for Geeks)
const findMaxAndMin = arr =>{

    const getMinAndMaxInSegment = (arr,start,end)=>{
        //termination cases
        if(start==end){
            return [arr[start],arr[start]] // [min,max]
        }else if(end == start+1){
           if(arr[end]>arr[start]){
               return [arr[start],arr[end]];
           }else{
            return [arr[end],arr[start]];
           }
        }

        // Calling Recursively to get again of left & right segments in given range
        let half = Math.floor((start+end)/2);
        let [lmin,lmax] = getMinAndMaxInSegment(arr,start,half);
        let [Rmin,Rmax] = getMinAndMaxInSegment(arr,half+1,end);
        let min,max; // scoped variables of this function
        if(lmin < Rmin){
           min = lmin;
        }else{
         min = Rmin;
        }
        if(lmax > Rmax){
           max = lmax;
        }else{
         max = Rmax;
        }
        return [min,max];
    }
    let [min,max] = getMinAndMaxInSegment(arr,0,arr.length-1);
    console.log(` min : ${min}  max : ${max}`)
}


// Using compair pair Strategy
const findMaxAndMin = arr =>{
const  getMinMax = (arr, length) =>
{   
  let i,max,min; 
 
  /* If array has even number of elements then
    initialize the first two elements as minimum and
    maximum */
  if (length%2 == 0)
  {        
    if (arr[0] > arr[1])    
    {
      max = arr[0];
      min = arr[1];
    } 
    else
    {
       min = arr[0];
       max = arr[1];
    }
    i = 2;  /* set the starting index for loop */
  } 
 
   /* If array has odd number of elements then
    initialize the first element as minimum and
    maximum */
  else
  {
    min = arr[0];
    max = arr[0];
    i = 1;  /* set the starting index for loop */
  }
   
  /* In the while loop, pick elements in pair and
     compare the pair with max and min so far */   
  while (i < length-1) 
  {         
    if (arr[i] > arr[i+1])         
    {
      if(arr[i] > max)       
        max = arr[i];
      if(arr[i+1] < min)         
        min = arr[i+1];       
    }
    else        
    {
      if (arr[i+1] > max)       
        max = arr[i+1];
      if (arr[i] < min)         
        min = arr[i];       
    }       
    i += 2; /* Increment the index by 2 as two
               elements are processed in loop */
  }           
 
  return [min,max];
} 
let [min,max] = getMinMax(arr,arr.length);
console.log(` min : ${min}  max : ${max}`)
}