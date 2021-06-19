const isRotation  = (input1 , input2) =>{
    let startIndex = input2.indexOf(input1[0]);
    let temp = [...input2.slice(startIndex),...input2.slice(0,startIndex)]
    console.log(temp.join(""))
}
isRotation('ABCD','ACBD')

//First make sure a and b are of the same length. Then check to see if b is a substring of a concatenated with a:
const isRotation2 =(a, b)=> {
    return a.length === b.length && (a + a).indexOf(b) > -1;
  };