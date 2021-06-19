# Create a function pipe that performs left-to-right function composition by returning a function that accepts one argument.
        const square = v => v * v
        const double = v => v * 2
        const addOne = v => v + 1
        const res = pipe(square, double, addOne)
        res(3) // 19; addOne(double(square(3)))