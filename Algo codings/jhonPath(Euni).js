function f (input){
    let tempInput1 = input.split('\n');
    let tempInput2 = [...tempInput1]
    let [n ,m ] = tempInput1[0].split(' ');
    let rotation = tempInput1[tempInput1.length-1];
    n = Number(n);
    m = Number(m);
    rotation = Number(rotation);
    tempInput2.shift();
    tempInput2.pop();
    var x = new Array(n);
  
  for (var i = 0; i < x.length; i++) {
    let tempRowInputs = tempInput2[i].split(' ').map(element=>Number(element))
    x[i] =tempRowInputs ;
  }
  let direction = 'x';
  let parsed = [];
  let path = [];
  let tempX = 0 , tempY = 0 , count=0;
  let tempM = m , tempN = n;
  while(path.length<(n*m)){
  if(direction=='x'){
    let reverse = (tempY==tempM-1)
    if(reverse){
      for(;tempY>=0;tempY--){
        let parseTemp = `${tempX}_${tempY}`;
        if(!parsed.includes(parseTemp)){
          let element = x[tempX][tempY];
          path.push(element);
          parsed.push(parseTemp);
        }
      }
      tempY=0;
    }else{
      for(;tempY<tempM;tempY++){
        let parseTemp = `${tempX}_${tempY}`;
        if(!parsed.includes(parseTemp)){
          let element = x[tempX][tempY];
          path.push(element);
          parsed.push(parseTemp);
        }
      }
      tempY=tempM-1;
    }
    direction = 'y';  
  }
  if(direction=='y'){
    let reverse = (tempX==tempN-1)
    if(reverse){
      for(;tempX>=0;tempX--){
        let parseTemp = `${tempX}_${tempY}`;
        if(!parsed.includes(parseTemp)){
          let element = x[tempX][tempY];
          path.push(element);
          parsed.push(parseTemp);
        }
      }
      tempX=0;
    }else{
      for(;tempX<tempN;tempX++){
        let parseTemp = `${tempX}_${tempY}`;
        if(!parsed.includes(parseTemp)){
          let element = x[tempX][tempY];
          path.push(element);
          parsed.push(parseTemp);
        }
      }
      tempX=tempN-1;
    }
    direction = 'x';  
  }
  count++;
  if(count%2==0){
   tempM = tempM-1;
   tempN = tempN-1;
   tempX = m-tempM;
   tempY = n-tempN;
  }
  }
  let tempRotation = Math.floor(rotation/path.length);
  let NewPath = path.splice(0,rotation-(tempRotation*path.length)); 
  let solution = [...path,...NewPath].join(' ')
  console.log(solution)
  
  }
  let g = `3 3
  1 2 3 
  4 5 6
  7 8 9
  2`
  let g1 = `4 4
  1 2 3 4
  5 6 7 8
  9 10 11 12
  13 14 15 16
  17`  //  3 4 8 12 16 15 14 13 9 5 6 7 11 10 1 2
  
  let g2 = `4 3
  1 2 3 
  5 6 7 
  9 10 11 
  13 14 15
  2`  // 3 7 11 15 14 13 9 5 6 10 1 2
  
  f(g1) 
  
  
  
  