function EightQueens(strArr){
    let output = true ;
    let inputArray = []
 JSON.parse(strArr).forEach(element => {
     let g = element.split(',');
     let tempInput = [];
     tempInput.push(Number(g[0].split('(')[1]))
     tempInput.push(Number(g[1].split(')')[0]))
     inputArray.push(tempInput);
 });
 let index = 0 ;
 while((index<inputArray.length) && (output==true) ){
    let tempPosition1 = inputArray[index];
    let [x1,y1] = tempPosition1;
    let tempIndex = index +1 ;
    while(tempIndex<inputArray.length){
        let tempPosition2 = inputArray[tempIndex];
        let [x2,y2] = tempPosition2;
        if(x1==x2 || y1==y2){
            output = `(${x1},${y1})`;
            break;
        }
        if(x1==y1 && x2==y2){
            output = `(${x1},${y1})`;
            break;
        }
        if((y1+(x2-x1))==y2){
            output = `(${x1},${y1})`;
            break;
        }
        if((y1+(x1-x2))==y2){
            output = `(${x1},${y1})`;
            break;
        }
        tempIndex++
    }
    index++
 }
 return output;
}

console.log(EightQueens(`["(2,1)" , "(4,2)" , "(6,3)" , "(8,4)" , "(3,5)" , "(1,6)" , "(7,7)" , "(5,8)"]`))  