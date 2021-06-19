function Calculator(str) { 
    const precedence = (op) => {
            if(op == '+'||op == '-')
            return 1;
            if(op == '*'||op == '/')
            return 2;
            return 0;
        }
    
        const applyOp = (a, b, op) =>{
            switch(op){
                case '+': return a + b;
                case '-': return a - b;
                case '*': return a * b;
                case '/': return a / b;
            }
        }
    
            let i;
            
            let values = [];
            
            let ops = [];
            
            for(i = 0; i < str.length; i++){
                
                if(str[i] == ' ')
                    continue;
                else if(str[i] == '('){
                    ops.push(str[i]);
                }
                else if(!isNaN(str[i])){
                    let val = 0;
                    
                    
                    while(i < str.length && 
                                !isNaN(str[i]))
                    {
                        val = (val*10) + (str[i]-'0');
                        i++;
                    }
                    
                    values.push(val);
                    
                    
                    i--;
                }
                else if(str[i] == ')')
                {
                    while(!(ops.length==0) && ops[ops.length-1] != '(')
                    {
                        let val2 = values[values.length-1];
                        values.pop();
                        
                        let val1 = values[values.length-1];
                        values.pop();
                        
                        let op = ops[ops.length-1];
                        ops.pop();
                        
                        values.push(applyOp(val1, val2, op));
                    }
                    
                    if(!(ops.length==0))
                    ops.pop();
                }
                
                else
                {
        
                    while(!(ops.length==0) && precedence(ops[ops.length-1])
                                        >= precedence(str[i])){
                        let val2 = values[values.length-1];
                        values.pop();
                        
                        let val1 = values[values.length-1];
                        values.pop();
                        
                        let op = ops[ops.length-1];
                        ops.pop();
                        
                        values.push(applyOp(val1, val2, op));
                    }
                    
                    ops.push(str[i]);
                }
            }
            
            
            while(!(ops.length==0)){
                let val2 = values[values.length-1];
                values.pop();
                        
                let val1 = values[values.length-1];
                values.pop();
                        
                let op = ops[ops.length-1];
                ops.pop();
                        
                values.push(applyOp(val1, val2, op));
            }
            
            return values[values.length-1];
    
    }