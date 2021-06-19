
//Given an array of integers, find the largest difference between two elements such that the element of lesser value must come before the greater element  
const getDifference = (input) => {
    let smallIndex = 0 ;maxIndex = 0;
    let max=input[0],min=input[1];
    input.forEach((element,index) => {
        console.log(maxIndex,smallIndex,";;;;")
        if(element>max && index>=maxIndex ){
            max = element
            maxIndex = index;
        }
        if(element<min && index<=maxIndex){
            min = element
            smallIndex = index;
        }
    });
  
    return max-min
}
console.log(getDifference([80,2,6,3,100]))