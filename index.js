// var count = 0 ;
// function blockScope (){
//     ++count
    
// }



// document.getElementById('clickme').addEventListener('click',function x(){
//     var count = 0 ;
//     ++count
//     console.log(" button clicked",count)
//     blockScope()
// })

// // var count = 0 ;
   
// //     document.getElementById('clickme').addEventListener('click',function x(){
// //         ++count
// //         console.log(" button clicked",count)
// //     })

let d;
function ecall (e){
  clearTimeout(d);
  d = setTimeout(()=>{
console.log("eee",e.target.value)
  },1000)
}