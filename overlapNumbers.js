const f = (input) =>{
let start,end;
if(input[0]>input[2]){
start = input[0]
}else{
start=input[2];
}
if(input[1]<input[3]){
end = input[1]
}else{
end=input[3];
}
console.log(start,end)
return end-start+1;
}
console.log(f([10,20,4,14]))