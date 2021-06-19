
// Sample code to perform I/O:

process.stdin.resume();
process.stdin.setEncoding("utf-8");
var stdin_input = "";

process.stdin.on("data", function (input) {
    stdin_input += input;                               // Reading input from STDIN
});

process.stdin.on("end", function () {
   main(stdin_input);
});

//Function to convert into backward letter notation
    let convertBackwardNotation = (value) =>{
        return value.replace(/a/ig,'U')
                .replace(/b/ig,'V')
                .replace(/c/ig,'W')
                .replace(/d/ig,'X')
                .replace(/e/ig,'Y')
                .replace(/f/ig,'Z')
    }

function main(input) {
    let [T,...inputs] = input.split('\n');
    T = Number(T);
for(let i=1 ;i<=T;i++){
        let [R,G,B] = inputs[i-1].split(' ');
    //hexa decimal convertion
    R = Number(R).toString(16);
    G = Number(G).toString(16);
    B = Number(B).toString(16);
   
    
    // converting result to mars language by backward notation
    R = convertBackwardNotation(R)
    G = convertBackwardNotation(G)
    B = convertBackwardNotation(B)

    // for single length characters appending 0 perfix
    if(R.length===1){
      R = '0'+R
    }
    if(G.length===1){
      G = '0'+G
    }
    if(B.length===1){
      B = '0'+B
    }
    let str = `Case ${i}: ${R} ${G} ${B} \n`;
      process.stdout.write(str); 
    }
        // Writing output to STDOUT
}

// Warning: Printing unwanted or ill-formatted data to output will cause the test cases to fail


// Write your code here
