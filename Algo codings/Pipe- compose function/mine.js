const square = v => v * v;
        const double = v => v * 2;
        const addOne = v => v + 1;

        const pipe = (...rest) =>{
          return (input) => {
           let result = input;
          for(let i=0 ; i<rest.length ; i++){
            result = rest[i](result);
          }
          return result;
          }
        }
        const res = pipe(square, double, addOne)
        console.log(res(3))