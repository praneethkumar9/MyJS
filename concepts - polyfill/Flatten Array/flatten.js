const flat = (input) =>{
    let result =[];
    input.forEach(item=>{
        if(Array.isArray(item)){
                result=[...result,...flat(item)]
          }else{
             result= [...result,item]
          }
    })
     
      return result;
    
    }
    
    console.log(flat([[2],3,4,5,[[2],[2,3]]]))