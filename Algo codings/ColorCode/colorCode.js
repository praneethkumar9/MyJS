const  crackColorCode  = (arr) =>{
    let [R,G,B] = arr;
    //hexa decimal convertion
    R = R.toString(16);
    G = G.toString(16);
    B = B.toString(16);
   

    //Function to convert into backward letter notation
    let convertBackwardNotation = (value) =>{
        return value.replaceAll(/a/ig,'U')
                .replaceAll(/b/ig,'V')
                .replaceAll(/c/ig,'W')
                .replaceAll(/d/ig,'X')
                .replaceAll(/e/ig,'Y')
                .replaceAll(/f/ig,'Z')
    }

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

    console.log(R,G,B)
}

crackColorCode([255,98,174])