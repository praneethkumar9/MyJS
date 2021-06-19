
    function numDecodings(s){
        if(s == null || s.length==0)
            return 0;
        
        let dp = new Array(s.length+1).fill(0);
        
        dp[0] = 1;
        dp[1] = s.charAt(0)=='0'?0:1;
        
        
        for(let i = 2; i<= s.length; i++){
            let first = Number(s.substring(i-1,i));
           
            let second = Number(s.substring(i-2,i));
            if(first>=1 && first<=9)
                dp[i] += dp[i-1];
                
            if(second>=10 && second<=26)
                dp[i] += dp[i-2];
        }
        
        return dp[s.length];
    }
    
    console.log(numDecodings('662'))



