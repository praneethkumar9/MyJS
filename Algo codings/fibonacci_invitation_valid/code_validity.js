function main(input) {
    //Enter your code here
    // A utility function that returns true if x is perfect square
    function isPerfectSquare(x)
    {
        var s = parseInt(Math.sqrt(x));
        return (s*s == x);
    }
    
    // Returns true if n is a Fibinacci Number, else false
    function isFibonacci(n)
    {
        // n is Fibinacci if one of 5*n*n + 4 or 5*n*n - 4 or both
        // is a perferct square
        return isPerfectSquare(5*n*n + 4) ||
            isPerfectSquare(5*n*n - 4);
    }
 
var lines=stdin_input.split('\n');
for(var i=1;i<=parseInt(lines[0]);i++){
    var numbers=lines[i].split(" ");
    var count=0;
    var from = parseInt(numbers[0]);
    var to = parseInt(numbers[1]);
    if(from<=1)
            count++;
    for(var j=from;j<=to;j++){
        if(isFibonacci(j)){
            count++;
        }
    }
    if(count%2===0)
        console.log("VALID");
    else
        console.log("INVALID");
}
 
}
 
process.stdin.resume();
process.stdin.setEncoding("utf-8");
var stdin_input = "";
 
process.stdin.on("data", function (input) {
    stdin_input += input;
});
 
process.stdin.on("end", function () {
   main(stdin_input);
});