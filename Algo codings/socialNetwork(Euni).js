let memberCount = input[0];
let tempInput = input.substring(1,input.length-2) 

let tempInput2 = tempInput.split('\n');
 tempInput2.shift();
 tempInput2.pop();
let groupIndex = 1;
 let groups = {};
 tempInput2.forEach(element => {
   if(element=='Q 0 0'){
      if(Object.keys(groups).length){
        let count = 0
        Object.values(groups).forEach(groupMember=>{
          if(groupMember.length%2==0){
            count++
          }
        })
        console.log(count)
      }else{
        console.log(0)
      }
   }else{
      let tempinput3 = element.split(' ');
      tempinput3.shift();
      let i = Number(tempinput3[0]);
      let j =  Number(tempinput3[1]);
      if(Object.keys(groups).length){
        let iGroup = false ,jGroup=false;
       for(let groupIndexKey of Object.keys(groups)){
        let tempGroup = groups[groupIndexKey];
       
          if(tempGroup.includes(i)){
            iGroup = groupIndexKey;
          }
          if(tempGroup.includes(j)){
            jGroup = groupIndexKey;
          }
       }
       if((iGroup==false)&&(jGroup==false)){
        groups[groupIndex] = [i,j];
        groupIndex++
        return;
      }
      let temp;
       if((iGroup==jGroup) && (iGroup!=false)){
         temp = [...groups[iGroup],i ,j]
        groups[iGroup] = [...new Set(temp)];
      }
       if((iGroup==false)&&(jGroup!=false)){
         temp = [...groups[jGroup],i ,j]
        groups[jGroup] = [...new Set(temp)];
      }
       if((iGroup!=false)&&(jGroup==false)){
         temp = [...groups[iGroup],i ,j]
        groups[iGroup] = [...new Set(temp)];
      }
       if((iGroup!=false)&&(jGroup!=false)&&(iGroup!=jGroup)){
         temp = [...groups[iGroup], ...groups[jGroup],i ,j]
        groups[groupIndex] = [...new Set(temp)];
        groupIndex++;
        delete groups[iGroup];
        delete groups[jGroup];
      }

      
      }else{
        groups[groupIndex] = [i,j];
        groupIndex++
      }
   }
 });