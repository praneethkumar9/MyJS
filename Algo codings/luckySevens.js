const isLuckySevens = (input) =>{

    if(input.length<3){
        return false
    }

    for(let i=0 ; i<input.length-2;i++){
        if(input[i]+input[i+1]+input[i+2] == 7){
         return true
        }
    }
    return false;
};

console.log(isLuckySevens([0,1,5,0,2,3]))