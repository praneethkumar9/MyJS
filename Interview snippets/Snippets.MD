# 1

```javascript
let animal = {
  jumps: null,
};
let rabbit = {
  __proto__: animal,
  jumps: true,
};
console.log(rabbit.jumps); // ? (1) -- true
delete rabbit.jumps;
console.log(rabbit.jumps); // ? (2)  -- null
delete animal.jumps;
console.log(rabbit.jumps); // ? (3)  --  undefined
```

# 2

```javascript
var funkA = () => { console.log(‘Hi’); }
var funkB = new funkA();
funkB();

  // This gives an error bz arrow functions can't be used as constructor function

```

# 3

```javascript
function createIncrement() {
  let count = 0;
  function increment() {
    count++;
  }
  let message = `Count is ${count}`;
  function log() {
    console.log(message);
  }
  return [increment, log];
}
const [increment, log] = createIncrement();
increment(); //  no output
increment(); //  no output
increment(); //  no output
log(); // prints "Count is 0" because string is already assigned to message before increment
```

# 4

```javascript
// Print an array which contains all the elemnts which are not present in input array within bound range
let f = [7, 3, 8, 6, 1, 9, 5];

const missingNumberInbound = (input, range) => {
  let hash = {};
  let result = [];
  input.forEach((item) => {
    hash[item] = item;
  });

  for (let i = 1; i <= range; i++) {
    if (!hash[i]) {
      result.push(i);
    }
  }
  return result;
};

console.log(missingNumberInbound(f, 10)); //[2, 4, 10]
```

# 5

```javascript
var t = 12;
setTimeout(() => console.log("s", t++), 0);
Promise.resolve(t++).then((value) => console.log("P", value));

//  It prints  first --  "P"  13  ( since in both cases its a post increment)
//             then --   "S"  12

// Promises job queues take more priority than callbacks callback queue
```

# 6

```javascript
// Problem statement - return an array with elements in the input array which occurs only twice
let f = [1, 2, 2, 3, 4, 1, 2, 3]; // [1,3]

// using hash
let f = [1, 2, 2, 3, 4, 1, 2, 3];

const twiceNumber = (input) => {
  let hash = {};
  let result = [];
  input.forEach((item) => {
    if (hash[item]) {
      hash[item] += hash[item];
    } else {
      hash[item] = 1;
    }
  });

  for (const property in hash) {
    if (hash[property] === 2) {
      result.push(Number(property));
    }
  }
  return result;
};

console.log(twiceNumber(f));

// using simple arrays

let f = [1, 2, 2, 3, 4, 1, 2, 3];

const twiceNumber = (input) => {
  let a = []; //
  let b = []; //
  let c = [];
  input.forEach((x) => {
    if (!c.includes(x)) {
      if (b.includes(x)) {
        b.splice(b.indexOf(x), 1);
        c.push(x);
      } else {
        if (a.includes(x)) {
          a.splice(a.indexOf(x), 1);
          b.push(x);
        } else {
          a.push(x);
        }
      }
    }
  });

  return b;
};

console.log(twiceNumber(f));
```

# 7

WHat is the output of following snippet

```javascript
var number = 10;
var display = function () {
  console.log(number);
  var number = 20;
};
display();  
```

It is undefined due to hoisting
