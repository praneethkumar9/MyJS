// With two arrays
const inter = (a1,a2) =>{
const f = a1.filter(el=>a2.includes(el))
console.log(f)
}
inter([1,2],[2,3])

// with n number of arrays
const intersection = (...arrays) =>{
    return arrays.reduce((acc,value)=>value.filter(element=>acc.includes(element)));
  }
  
  console.log(intersection([1,2,3],[2,3],[2]))