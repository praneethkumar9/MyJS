const oddball_sum = (input )=>{
    let output = 0
for(let i=0 ; i<input.length ; i++){
    if(input[i]%2!=0){
        output= output+input[i];
    }
}
return output;
}

const reduceFun = (acc,element)=>{
    if(element%2!=0){
        return acc+element;
    }else{
        return acc
    }
}
console.log([1,2,3,4].reduce(reduceFun))
console.log(oddball_sum([1,2,3,4]))
console.log([1,2,3,4].reduce((acc,element)=>acc+element+1,0))// sum of all number + adding one to each