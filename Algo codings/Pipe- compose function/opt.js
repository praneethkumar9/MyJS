const square = v => v * v;
        const double = v => v * 2;
        const addOne = v => v + 1;

        const pipe = (...fns) => x => fns.reduce((v, fn) => fn(v), x)
        const res = pipe(square, double, addOne)
        console.log(res(3))