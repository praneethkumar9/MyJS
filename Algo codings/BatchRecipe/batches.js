const batches = (recipe,available) =>{
    const recipeIng = Object.keys(recipe);
    let Batch = 0;

    for(let i = 0 ; i<recipeIng.length;i++){
        if(available[recipeIng[i]] && recipe[recipeIng[i]]<=available[recipeIng[i]]){
            let tempBatchIng  =  Math.floor(available[recipeIng[i]]/recipe[recipeIng[i]])
             if(Batch==0){
                 Batch = tempBatchIng;
             }else if(tempBatchIng<Batch){
                     Batch = tempBatchIng;
                 
             }
        }else{
                console.log("no batch or non available");
                return 0;
        }
    }
    return Batch;
}
console.log(batches(
    { milk: 2, sugar: 40, butter: 20 },
    { milk: 5, sugar: 120, butter: 500 }
  ))

  const optBatches = (recipe, available) =>
  Math.floor(
    Math.min(...Object.keys(recipe).map(k => available[k] / recipe[k] || 0))
  )

  console.log(optBatches(
    { milk: 2, sugar: 40, butter: 20 },
    { milk: 5, sugar: 120, butter: 500 }
  ))