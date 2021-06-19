const findSecondLargest = (input) =>{
let L1 = L2 = input[0];
input.forEach(item=>{
    if(L1<item){
        L2 = L1;
        L1 = item
    }
    else if(L1>item && L2<item){
 L2 = item;
    }
})
return L2;
}
console.log(findSecondLargest([4,5,7,18,88,239,23,17,45]));