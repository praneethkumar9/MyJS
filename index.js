// // var count = 0 ;
// // function blockScope (){
// //     ++count
    
// // }



// // document.getElementById('clickme').addEventListener('click',function x(){
// //     var count = 0 ;
// //     ++count
// //     console.log(" button clicked",count)
// //     blockScope()
// // })

// // // var count = 0 ;
   
// // //     document.getElementById('clickme').addEventListener('click',function x(){
// // //         ++count
// // //         console.log(" button clicked",count)
// // //     })

// let d;
// function ecall (e){
//   clearTimeout(d);
//   d = setTimeout(()=>{
// console.log("eee",e.target.value)
//   },1000)
// }

 debugger
// console.log('Message no. 1: Sync');
// setTimeout(function() {
//    console.log('Message no. 2: setTimeout');
// }, 0);
// var promise = new Promise(function(resolve, reject) {
//    resolve();
// });
// promise.then(function(resolve) {
//    console.log('Message no. 3: 1st Promise');
// })
// .then(function(resolve) {
//    console.log('Message no. 4: 2nd Promise');
// });
// console.log('Message no. 5: Sync')

function init() {
   debugger;
   var name = 'Mozilla'; // name is a local variable created by init
   function displayName() {
      let name = "dff"
      debugger;
     // displayName() is the inner function, a closure
     console.log(name); // use variable declared in the parent function
   }
   return displayName;
 }
 const dis = init();
 
 
 // 100 line
 
 dis();