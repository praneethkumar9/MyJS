Create a standalone function bind that is functionally equivalent to the method Function.prototype.bind.
function example() {
  console.log(this)
}
const boundExample = bind(example, { a: true })
boundExample.call({ b: true }) // logs { a: true }


# ANS

Return a function that accepts an arbitrary number of arguments by gathering them with the rest ... operator. From that function, return the result of calling the fn with Function.prototype.apply to apply the context and the array of arguments to the function.

  const bind = (fn, context) => (...args) => fn.apply(context, args)