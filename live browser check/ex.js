var s = 10
function x(){
  for(let i=10;i>=1;i--){
    console.log(i)
      setTimeout(function () {
          console.log(i)
      },i*1000)
  }
}
x();