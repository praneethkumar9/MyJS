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
            
            let values = [];  // operands
            
            let ops = []; // operators
            
            // This block of code is for pushing operands & operators to above arrays by scanning through string
            for(i = 0; i < str.length; i++){
                
                if(str[i] == ' ')
                    continue;
                else if(str[i] == '('){
                    ops.push(str[i]);  
                    // this is used to stop iteration in the logic where we encounter ")"  so that inside paranthesis all are calculated first as priority
                }
                else if(!isNaN(str[i])){ // for digits
                    let val = 0;
                    // Converting the string to number 
                    while(i < str.length && str[i] != ' ' &&
                                !isNaN(str[i]))
                    {
                        val = (val*10) + (str[i]-'0'); // convert string number to perfect number type
                        i++;
                    }
                    
                    values.push(val);                  
                    i--;
                }
                else if(str[i] == ')')
                {
                    // run this iteration until all we encounter "(" so that inside paranthesis , arthmetical operation performed
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
                
                else  // For operators
                {
        
                    // run this when we have high perecendene operator than the current operator precendence
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


// This uses Shunting-yard algorithm


