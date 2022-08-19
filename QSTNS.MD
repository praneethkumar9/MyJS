prototypes??

Explain how JSONP works (and how it’s not really Ajax).


# What is the object type?
  
    The object type refers to a compound value where you can set properties (named locations) that each hold their own values of any type.
    var obj = {
        a: "hello world", // property
        b: 42,
        c: true
    };

    obj.a;		// "hello world", accessed with doted notation
    obj.b;		// 42
    obj.c;		// true

    obj["a"];	// "hello world", accessed with bracket notation
    obj["b"];	// 42
    obj["c"];	// true
    Bracket notation is also useful if you want to access a property/key but the name is stored in another variable, such as:
    var obj = {
        a: "hello world",
        b: 42
    };

    var b = "a";

    obj[b];			// "hello world"
    obj["b"];		// 42

# Explain arrays in JavaScript ?
   
    An array is an object that holds values (of any type) not particularly in named properties/keys, but rather in numerically indexed positions:
    var arr = [
        "hello world",
        42,
        true
    ];

    arr[0];			// "hello world"
    arr[1];			// 42
    arr[2];			// true
    arr.length;		// 3

    typeof arr;		// "object"

# What is typeof operator?  

    JavaScript provides a typeof operator that can examine a value and tell you what type it is:
    var a;
    typeof a;				// "undefined"

    a = "hello world";
    typeof a;				// "string"

    a = 42;
    typeof a;				// "number"

    a = true;
    typeof a;				// "boolean"

    a = null;
    typeof a;				// "object" -- weird, bug

    a = undefined;
    typeof a;				// "undefined"

    a = { b: "c" };
    typeof a;	

# Explain equality in JavaScript ?

    JavaScript has both strict and type–converting comparisons:
    Strict comparison (e.g., ===) checks for value equality without allowing coercion
    Abstract comparison (e.g. ==) checks for value equality with coercion allowed
    var a = "42";
    var b = 42;

    a == b;			// true
    a === b;		// false
    Some simple equalityrules:
    If either value (aka side) in a comparison could be the true or false value, avoid == and use ===.
    If either value in a comparison could be of these specific values (0, "", or [] -- empty array), avoid == and use ===.
    In all other cases, you're safe to use ==. Not only is it safe, but in many cases it simplifies your code in a way that improves readability.

# What is Coercion in JavaScript? 

    Type coercion is the process of converting value from one type to another (such as string to number, object to boolean, and so on). Any type, be it primitive or an object, is a valid subject for type coercion. To recall, primitives are: number, string, boolean, null, undefined + Symbol (added in ES6).

# What is Scope in JavaScript?

    In JavaScript, each function gets its own scope. Scope is basically a collection of variables as well as the rules for how those variables are accessed by name. Only code inside that function can access that function's scoped variables.
    A variable name has to be unique within the same scope. A scope can be nested inside another scope. If one scope is nested inside another, code inside the innermost scope can access variables from either scope.

# Explain Values and Types in JavaScript ?

   JavaScript has typed values, not typed variables. The following built-in types are available:
        string
        number
        boolean
        null and undefined
        object
        symbol (new to ES6)

# What is let keyword in JavaScript?

    let allows you to declare variables that are limited to the scope of a block statement, or expression on which it is used, unlike the var keyword, which declares a variable globally, or locally to an entire function regardless of block scope

# Explain the same-origin policy with regards to JavaScript. ?

  The same-origin policy prevents JavaScript from making requests across domain boundaries. An origin is defined as a combination of URI scheme, hostname, and port number. This policy prevents a malicious script on one page from obtaining access to sensitive data on another web page through that page's Document Object Model.

# What is the difference between == and ===? 

    == is the abstract equality operator while === is the strict equality operator. The == operator will compare for equality after doing any necessary type conversions. The === operator will not do type conversion, so if two values are not the same type === will simply return false. When using ==, funky things can happen, such as:
    1 == '1'; // true
    1 == [1]; // true
    1 == true; // true
    0 == ''; // true
    0 == '0'; // true
    0 == false; // true
    My advice is never to use the == operator, except for convenience when comparing against null or undefined, where a == null will return true if a is null or undefined.
    var a = null;
    console.log(a == null); // true
    console.log(a == undefined); // true

# Is there anyway to force using strict mode in Node.js? 

    you can place
    "use strict";

    at the top of your file in node >= 0.10.7, but if you want your whole app to run in strict (including external modules) you can do this

    node --use_strict

# Why would you use something like the load event? Does this event have disadvantages? Do you know any alternatives, and why would you use those?  

    The load event fires at the end of the document loading process. At this point, all of the objects in the document are in the DOM, and all the images, scripts, links and sub-frames have finished loading.

    The DOM event DOMContentLoaded will fire after the DOM for the page has been constructed, but do not wait for other resources to finish loading. This is preferred in certain cases when you do not need the full page to be loaded before initializing.

# What is strict mode ?

    Strict Mode is a new feature in ECMAScript 5 that allows you to place a program, or a function, in a "strict" operating context. This strict context prevents certain actions from being taken and throws more exceptions. 
    
    Simply it will throw even for potential errors also and when we use this mode it will be applied near to its scope just like below 

    ```javascript
        // Non-strict code...
    
        (function(){
        "use strict";

        // Define your library strictly...
        })();

        // Non-strict code...  `
    ```

# What's the difference between Host objects and Native objects?  

     Native objects are objects that are part of the JavaScript language defined by the ECMAScript specification, such as String, Math, RegExp, Object, Function, etc.

     Host objects are provided by the runtime environment (browser or Node), such as window, XMLHTTPRequest, etc.

# What are some of the advantages/disadvantages of writing JavaScript code in a language that compiles to JavaScript?  

    Some examples of languages that compile to JavaScript include CoffeeScript, Elm, ClojureScript, PureScript, and TypeScript.

    Advantages:

    * Fixes some of the longstanding problems in JavaScript and discourages JavaScript anti-patterns.
    * Enables you to write shorter code, by providing some syntactic sugar on top of JavaScript, which I think ES5 lacks, but ES2015 is awesome.
    * Static types are awesome (in the case of TypeScript) for large projects that need to be maintained over time.

    Disadvantages:

    * Require a build/compile process as browsers only run JavaScript and your code will need to be compiled into JavaScript before being served to browsers.
    * Debugging can be a pain if your source maps do not map nicely to your pre-compiled source.
    * Most developers are not familiar with these languages and will need to learn it. There's a ramp up cost involved for your team if you use it for your projects.
    * Smaller community (depends on the language), which means resources, tutorials, libraries, and tooling would be harder to find.
    * IDE/editor support might be lacking.
    * These languages will always be behind the latest JavaScript standard.
    * Developers should be cognizant of what their code is being compiled to — because that is what would actually be running, and that is what matters in the end.
    
    Practically, ES2015 has vastly improved JavaScript and made it much nicer to write. I don't really see the need for CoffeeScript these days.

# Explain event bubbling and how one may prevent it ?

    Event bubbling is the concept in which an event triggers at the deepest possible element, and triggers on parent elements in nesting order. As a result, when clicking on a child element one may exhibit the handler of the parent activating.

    One way to prevent event bubbling is using event.stopPropagation() or event.cancelBubble on IE < 9.

    or 

    Event bubbling is a type of event propagation where the event first triggers on the innermost target element, and then successively triggers on the ancestors (parents) of the target element in the same nesting hierarchy till it reaches the outermost DOM element or document object

# Why is it, in general, a good idea to leave the global scope of a website as-is and never touch it?  

    Every script has access to the global scope, and if everyone uses the global namespace to define their variables, collisions will likely occur. Use the module pattern (IIFEs) to encapsulate your variables within a local namespace.

# What is polyfill?

    A polyfill is essentially the specific code (or plugin) that would allow you to have some specific functionality that you expect in current or “modern” browsers to also work in other browsers that do not have the support for that functionality built in.

    Polyfills are not part of the HTML5 standard
    Polyfilling is not limited to Javascript

# Explain Null and Undefined  and undeclared in JavaScript ?

    JavaScript (and by extension TypeScript) has two bottom types: null and undefined. They are intended to mean different things:

    Something hasn't been initialised : undefined.
    Something is currently unavailable: null.

    Undeclared: It occurs when we try to access any variable that is not initialized or declared earlier using var or const keyword.

# What's the difference between throw Error('msg') vs throw new Error('msg')? 
  
    Both are fine; the function call Error(…) is equivalent to the object creation expression new Error(…) with the same arguments.

# What is IIFEs (Immediately Invoked Function Expressions)? 

    An IIFE (Immediately Invoked Function Expression) is a JavaScript function that runs as soon as it is defined.

            (function () {
            statements
        })();

    It is a design pattern which is also known as a Self-Executing Anonymous Function 

# What is the difference between a shim and a polyfill?

    A shim is any piece of code that performs interception of an API call and provides a layer of abstraction. It isn't necessarily restricted to a web application or HTML5/CSS3.

    A polyfill is a type of shim that retrofits legacy browsers with modern HTML5/CSS3 features usually using Javascript or Flash.

# What is the definition of a Higher-Order Function?

    A higher order function is a function that takes a function as an argument, or returns a function. Higher order function is in contrast to first order functions, which don’t take a function as an argument or return a function as output.

# What do you think of AMD vs CommonJS?  

    AMD and CommonJS are both Javascript module loader. They accomplish the same task but works different.

    AMD is better for browser, hence, the name ‘Asynchronous’, as it loads each distinct module in async manner instead of loading in one large file. No extra steps are required to use AMD, it works out-of-the-box. In my opinion, as it is its in Asynchronous nature, it makes alot of async http requests and may not be as performant as described by other devs.

    While, CommonJS, is a standard, mostly used in servers and it loads modules synchronously, though extra step is required if you want your JS file size to be minified and compressed.

# Explain the differences on the usage of foo between function foo() {} and var foo = function() {} ?

    Both gives same result at end but hositing will differs because one is function declaration & other is function expression.

# What is the drawback of creating true private methods in JavaScript?

    Creating truely private methods in Javascript causes each object to have its own copy of the function. These copies are not garbage collected until the object itself is destroyed.

        Example

    ```javascript

        var Student = function (name, marks) {
        this.name = name || ""; //Public attribute default value is null
        this.marks = marks || 300; //Public attribute default value is null
        // Private method
        var increaseMarks = function () {
            this.marks = this.marks + 10;
        };
        // Public method(added to this)
        this.dispalyIncreasedMarks = function() {
            increaseMarks();
            console.log(this.marks);
        };
        };
        // Create Student class object. creates a copy of privateMethod
        var student1 = new Student("Ayush", 294);
        // Create Student class object. creates a copy of privateMethod
        var student2 = new Student("Anak", 411);
    ```

# Call vs apply vs bind ?

    All are the function methods .

    call method will be used 
    to call the function with  object or the function for which "this" keyword should refer
    along with the arguments one by one

    apply method is similar to apply but arugments will be passed as an array

    bind method is the same as call method but here it return a new function by binding "this" & aruguments to that returned function .
    So we can call that function to bind those values

# What's the difference between .call and .apply?

    call and apply are very similar—they invoke a function with a specified this context, and optional arguments. The only difference between call and apply is that call requires the arguments to be passed in one-by-one, and apply takes the arguments as an array.

# What is the preferred syntax for defining enums in JavaScript?

    Since 1.8.5 it's possible to seal and freeze the object, so define the above as:

    const DaysEnum = Object.freeze({"monday":1, "tuesday":2, "wednesday":3, ...})
    or

    const DaysEnum = {"monday":1, "tuesday":2, "wednesday":3, ...}
    Object.freeze(DaysEnum)
    and voila! JS enums.

# What is object.freeze() method ?

    The Object.freeze() method freezes an object. A frozen object can no longer be changed; freezing an object prevents new properties from being added to it, existing properties from being removed, prevents changing the enumerability, configurability, or writability of existing properties, and prevents the values of existing properties from being changed. In addition, freezing an object also prevents its prototype from being changed. freeze() returns the same object that was passed in.

# Explain closures in JS ?
 
    Closures is a function bundled with its lexical environment  . 
    In other words , closures will be part of any function  which is function bundled with its parent lexical enviroment

    MDN definition :-  A closure gives access to the outer function's scope from an inner function . They are   created every time a function created 

# Difference between ES5 and ES6

    Both are the ECMA specifications to standardize the javacript . but ES6 has many enchancements 
    * arrow function , spread operator , for of ... loops 
    * new type symbol
    * performance enchanced
    * introduced let & const

# What is JS primitive type Symbol ?

    Symbol is a primitive data type of JavaScript, along with string, number, boolean, null and undefined.
    It’s a very peculiar data type. Once you create a symbol, its value is kept private and for internal use.
    You create a symbol by calling the Symbol() global factory function:
    const mySymbol = Symbol()
    Every time you invoke Symbol() we get a new and unique symbol, guaranteed to be different from all other symbols:

    Symbol() === Symbol() //false
    You can pass a parameter to Symbol(), and that is used as the symbol description, useful just for debugging purposes:

    Symbols are often used to identify object properties.

    Often to avoid name clashing between properties, since no symbol is equal to another.

    Or to add properties that the user cannot overwrite, intentionally or without realizing.

    Examples:

    const NAME = Symbol()
    const person = {
    [NAME]: 'Flavio'
    }

    person[NAME] //'Flavio'

    const RUN = Symbol()
    person[RUN] = () => 'Person is running'
    console.log(person[RUN]()) //'Person is running'
    Symbols are not enumerated, which means that they do not get included in a for..of or for..in loop ran upon an object.

    Symbols are not part of the Object.keys() or Object.getOwnPropertyNames() result.

    You can access all the symbols assigned to an object using the Object.getOwnPropertySymbols() method.

# When should we use generators in ES6?  

    With ES6, we were given a new tool: generators. In a normal function, there is only one entry point: the invocation of the function itself. A generator allows you to pause the execution of a function and resume it later. Generators are useful when dealing with iterators and can simplify the asynchronous nature of Javascript.

    Syntax
    So, how would we define a generator, compared to a normal function? You declare a generator function by using the * ( asterisk ) operator after the function keyword:

    function* awesomeGenerator(){
    //code
    }
    To pause the execution inside the generator, we use the statement yield:

    function* awesomeGenerator(){
    yield 'Hey friend' // We pause the execution here
    console.log('Back again') // When we resume, we are here
    }
    next() method
    A generator gives you a next() method, which is used to start/resume the execution. This method returns an object with two keys:

    {
    value: [ yielded value ],
    done: [ true if we reach the end]
    }
    Let's see a very simple generator in action:

        function* groceriesGenerator(){
        yield 'Eggs'
        yield 'Tomatoes'
        yield 'Milk'
        return 'Paper Bag'
        }

        const groceries = groceriesGenerator()


        console.log(groceries.next()) // [1]
        console.log(groceries.next()) // [2]
        console.log(groceries.next()) // [3]
        console.log(groceries.next()) // [4]

# Explain Function.prototype.bind ?

    The bind() method creates a new function that, when called, has its this keyword set to the provided value, with a given sequence of arguments preceding any provided when the new function is called.

# Explain the benefits of using spread syntax in ES6. How is it different from the rest of the syntax?

    using the spread syntax in ES6 can prove to be heavily beneficial. The spread syntax can be easily used to create copies of arrays or objects. Using spread syntax in a program does not need to resort to Object.create, slice or any library function. The spread syntax is widely used in Redux and rx.js projects.

    While on the other hand, the rest syntax feature of ES6 is used to pass an arbitrary number of arguments to a function. It can also be considered as a shorthand in JavaScript programming. Rest syntax can be considered as the opposite of spread syntax.

# Differences between arrow functions vs normal functions ?

    arrow function doesnt have its own bindings to this & super 
    Cant used as constructors
    Not suitable for call , apply & bind
    we can have leaner code than with normal functions
    They are always used as value in the function expression
    One reason arrow functions were introduced was to alleviate scope ( this ) complexities and make executing functions much more intuitive.

    Traditional functions default this to the window scope:
    Arrow functions do not default this to the window scope, rather they execute in the scope they are created:

# When should I use Arrow Functions in ES6 ?

   Mainly to solve this keyword issues
    see this link
    https://www.freecodecamp.org/news/when-and-why-you-should-use-es6-arrow-functions-and-when-you-shouldnt-3d851d7f0b26/
    https://dmitripavlutin.com/gentle-explanation-of-this-in-javascript/
    https://www.javascripttutorial.net/es6/when-you-should-not-use-arrow-functions/

# Explain the difference between undefined and not defined in JavaScript

    If a variable is accessed before defining then JS will show it as not defined, and if a variables is defined but not initialized I.e. no values is assigned it to it before accessing, then its undefined. Null means an empty or non-existent value. Null is assigned, and explicitly means nothing.

# What is "use strict";? what are the advantages and disadvantages to using it?

    If you put "use strict"; at the top of your code (or function), then the JS is evaluated in strict mode. Strict mode throws more errors and disables some features in an effort to make your code more robust, readable, and accurate.

    Advantages :

    Strict mode helps out in a couple ways:

    It catches some common coding bloopers, throwing exceptions.
    It prevents, or throws errors, when relatively “unsafe” actions are taken (such as gaining access to the global object).
    It disables features that are confusing or poorly thought out.

    Disadvantages:

    Strict mode stops you from doing certain things. People generally think that you shouldn’t use those things in the first place, but some developers don’t like the constraint and want to use all the features of the language.

    mistakes : -

        1) creating a variable without let,cont,variable
        2) deleting a variable using ("delete x" ) 
        3) assigning the value to non writable property or read only property mean only getter method
        4) redeclaring varible with same name with var
        5) same function parameter names

# What is Currying?

    Currying transforms a function of multiple arguments into a sequence of functions each taking a single argument.

    It will be hepful when we want static arugument evrytime for a given function just like below

    Ex:-  normal function : log(date,type,message);
          curried function : log(date)(type)(message);

        Now if we want log the message only for current date . 
        with normal function we need to pass current date evrytime .
        with curried function we can do it easily like below
         
         let currentLog = log(currentDate);
         currentLog("info","first log");
         currentLog("info","second log");

# Differentiate between ES6 class and ES5 function constructors. ?
  
    ES5 Function constructors work and look the same but the main difference is observed when the developer uses the Inheritance property.

    we have to use prototype every time we want to add a new property to our object. Now in ES5, there is no extends that can extend all your the properties, no constructor for initialization or super to call the constructor of the base class.

# Why should we use ES6 classes?

    ES6 classes are syntactic sugar for the prototypical class system we use today. They make your code more concise and self-documenting, which is reason enough to use them.

    A class is a blueprint for creating objects. We define what properties and methods an object should have, which taken together are considered a type, and then instantiate many objects using that blueprint. Perhaps a more visual analogy is that a class acts as an object creation factory.

# explain the difference between object.freeze() vs const ?

    Object. freeze() prevents modification or extension to the existing value of an object. ... const makes the variable binding immutable but it's value can still be modified.

#  How to compare two objects in JavaScript?

    Objects are reference types so you can’t just use === or == to compare 2 objects. One quick way to compare if 2 objects have the same key value, is using JSON.stringify

# What’s a typical use case for anonymous functions?
 
    Since Anonymous Functions are function expressions rather than the regular function declaration which are statements. Function expressions are more flexible. We can assign functions to variables, object properties, pass them as arguments to other functions, and even write a simple one line code enclosed in an anonymous functions.

    Another typical example would be an anonymous function used by popular frameworks used as IIFE (Immediate Invoked Function Expression).

    short answer is "Assigning the functions as a value & in IIFE"

# How to Remove Array Duplicates in ES6 ?

    const array = ['🐑', 1, 2, '🐑', '🐑', 3];

    // 1: "Set"
    [...new Set(array)];

    // 2: "Filter"
    array.filter((item, index) => array.indexOf(item) === index);

    // 3: "Reduce"
    array.reduce(
    (unique, item) => (unique.includes(item) ? unique : [...unique, item]),
    [],
    );

# What is the difference between document load event and document DOMContentLoaded event?

    The DOMContentLoaded event fires when all the nodes in the page have been constructed in the DOM tree. The load event fires when all resources such as images and sub-frames are loaded completely

# What's the difference between using let and var to declare a variable in ES6?

    The main difference between let and var is that scope of a variable defined with let is limited to the block in which it is declared while variable declared with var has the global scope. So we can say that var is rather a keyword which defines a variable globally regardless of block scope.

# What is the motivation for bringing Symbol to ES6?

    It was important to maintain unique object keys to prevent the overwriting of values having similar object key as this could result in loss of data. The introduction of Symbol helped overcome this problem as unique keys could be generated without writing a complicated piece of code

# Why is extending built-in JavaScript objects not a good idea?
    
    Modifying the behaviour of current built-in JS objects is not a good practice as it breaks its default functionality and it will break your code using that specific built-in JS object method or property.

# What is the difference between Anonymous and Named functions?

    Named functions are useful for a good debugging experience, while anonymous functions provides context scoping for easier development. 

    Hoisting is also one difference . 

# What is the new keyword in JavaScript? 

    The new keyword is used in javascript to create a object from a constructor function. The new keyword has to be placed before the constructor function call and will do the following things:

    Creates a new object
    Sets the prototype of this object to the constructor function's prototype property
    Binds the this keyword to the newly created object and executes the constructor function
    Returns the newly created object

# Explain Prototype Inheritance in JavaScript? 

    Prototypical inheritance allows us to reuse the properties or methods from one JavaScript object to another through a reference pointer function. All JavaScript objects inherit properties and methods from a prototype like Date objects inherit from Date.

# What does the term Transpiling stand for?

    Transpiling is a specific term for taking source code written in one language and transforming into another language that has a similar level of abstraction

# Explain the Prototype Design Pattern ?

       This pattern’s main focus is to help create objects that can be used as blueprints for any objects that are created by constructors. It does this through what’s called prototypal inheritance.

        Since JavaScript has native support for prototypal inheritance, it’s naturally easy to work with to the point where you don’t really need to learn any new concepts outside the syntax itself.

        When objects are created through the constructor function and contain the nameproperty, further objects created with the same constructor function will also have the same property,

        It sounds like typical class objects, but in reality, it avoids using classes altogether. The prototype design pattern simply creates copies of existing functional objects as opposed to defining brand-new objects.
        The biggest benefit of using the pattern in JavaScript is the performance boost gained compared to object-oriented classes. This means that when you define functions inside an object, they will be created by reference. In other words, all child objects will point to the same method instead of creating their own individual copies!

        Here’s an example of the pattern in action:

        const Warrior = function(name) {
        this.name = name
        this.hp = 100
        }

        Warrior.prototype.bash = function(target) {
        target.hp -= 15
        }

        Warrior.prototype.omniSlash = function(target) {
        // The target's hp may not be under 50 or this attack will fail on the opponent
        if (target.hp < 50) {
            return
        }
        target.hp -= 50
        }

        const sam = new Warrior('Sam')
        const lenardo = new Warrior('Lenardo')

        sam.bash(lenardo)

# Describe the JS module design pattern ?
        
        The Module Pattern is one of the important patterns in JavaScript. It is a commonly used Design Pattern which is used to wrap a set of variables and functions together in a single scope.

        It is used to define objects and specify the variables and the functions that can be accessed from outside the scope of the function. We expose certain properties and function as public and can also restrict the scope of properties and functions within the object itself, making them private. This means that those variables cannot be accessed outside the scope of the function. We can achieve data hiding an abstraction using this pattern in the JavaScript.

        Use Module pattern for the following benefits:
        Maintainability: Module Patterns enable better maintainability since all the related code can be encapsulated inside a single logical block. These logically independent blocks are relatively easier to update.
        Reusability: We single unit of code can be reused across the entire application. Functionality enclosed as a module can be reused and we do not need to define the same functions at multiple points.

 # Can you describe the main difference between a .forEach loop and a .map() loop and why you would pick one versus the other?

      Foreach loop just iterates through all its item in the callback function to execute whereas map function is used to iterate through the item along we should return something back where at end we get new array of same length with returned values

      We can perform chaining other prototype methods like reduce , sort , filter along with the map but not with forEach.

# explain what is hoisting in javascript ?

    Hoisting is a JavaScript mechanism where variables and function declarations are moved to the top of their scope before code execution. Inevitably, this means that no matter where functions and variables are declared, they are moved to the top of their scope regardless of whether their scope is global or local

# How can you share code between files?

    Using ES5 syntax in Node means that the sharing of code between files is done with the 'require' and 'module. exports' statements. A 'module' in Javascript can be thought of as a container that holds related code which can then be exported to another file.

# What are the actual uses of ES6 WeakMap? 

    Some use cases that would otherwise cause a memory leak and are enabled by WeakMaps include:

    Keeping private data about a specific object and only giving access to it to people with a reference to the Map. A more ad-hoc approach is coming with the private-symbols proposal but that's a long time from now.
    Keeping data about library objects without changing them or incurring overhead.
    Keeping data about a small set of objects where many objects of the type exist to not incur problems with hidden classes JS engines use for objects of the same type.
    Keeping data about host objects like DOM nodes in the browser.
    Adding a capability to an object from the outside (like the event emitter example in the other answer).

# Explain difference between: function Person(){}, var person = Person(), and var person = new Person()? 
  
   When function is called without new , it will give the returned value . if you are not returning anything it will be undefined


   Below things happen when you call a function with new keyword.

    JavaScript creates a new empty object. If ‘this’ keyword is used within that function, it refers to the newly created empty object.
    If you’re not explicitly returning any object, JavaScript would return that newly created object.

#  Check if a given string is a isomorphic

    Two strings str1 and str2 are called isomorphic if there is a one to one mapping possible for every character of str1 to every character of str2. And all occurrences of every character in ‘str1’ map to same character in ‘str2’
    Examples: 

    Input:  str1 = "aab", str2 = "xxy"
    Output: True
    'a' is mapped to 'x' and 'b' is mapped to 'y'.

    Input:  str1 = "aab", str2 = "xyz"
    Output: False
    One occurrence of 'a' in str1 has 'x' in str2 and 
    other occurrence of 'a' has 'y'.

# When You Should Not Use Arrow Functions ?

    we should not use when we need to access "this" refering to the function like below scenrios
    1) Event handlers
    2) Object methods
    3) class methods
    4) prototype methods

    along with this --> function that uses argument objects ( args)

# What is temporal dead zone ?

    Temporal dead zone is nothing but span in which variable declared with let & const having block scope got hoisted but cannot access to the time where it it intialized and access.

# What’s the difference between an “attribute” and a “property”? 

    Attributes are defined by HTML. Properties are defined by DOM. Some HTML attributes have 1:1 mapping onto properties. id is one example of such. Some do not (e.g. the value attribute specifies the initial value of an input, but the valueproperty specifies the current value).

# Could you compare usage of Module Pattern vs Constructor/Prototype pattern?

    Constructor-functions and prototypes are one of the reasonable ways to implement classes and instances.

    The module pattern is typically used for namespacing, where you'll have a single instance acting as a store to group related functions and objects

    This is a different use case from what prototyping is good for. They're not really competing with each other; you can quite happily use both together 

#  What's the difference between ES6 Map and WeakMap?

    The major difference between Map and WeakMap is, WeakMap holds the references of the key objects weakly. Thus if that object is deleted somewhere in the program, WeakMap will also release the value mapped to that object. This prevents memory leak. This is the reason WeakMap is used to declare private variables

#  What is the difference between the await keyword and the yield keyword?

    The await keyword is only to be used in async function s, while the yield keyword is only to be used in generator function* s.

    await will wait until promise resolves whereas yield will wait until next function of generator instance is called

# How to empty an array in JavaScript? 
 
    1) array = [];
    2) array.length =[]
    3) while (length)
          array.pop()

#  How to check if an object is an array or not? Provide some code

    In modern browsers you can do:

    Array.isArray(obj)
    (Supported by Chrome 5, Firefox 4.0, IE 9, Opera 10.5 and Safari 5)

    For backward compatibility you can add the following:

    // only implement if no native implementation is available
    if (typeof Array.isArray === 'undefined') {
    Array.isArray = function(obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    }
    };

# JS is loosly typed language ?

    yes, so that y we can change datatype inbetween also first storing array then boolean value .

# Is redeclaration of variable is possible with var & let & const ?
 
    Its possible only with var not with let & const

    var a= 10
    var a =122  --- this will work

# Can we declare const variable without value ?

    No we cant declare it , it throw syntax error

# What we will get when we assign values again to const variable ?
 
    It gives type error with reason "Assignment to constant variable" .

# What is Block in JS ?
   
   Block is group of statement in between the curly braces.

# What is shadowing in JS ?

    Shadowing in js is nothing but we want to access any varible it will refer to its neareast scope variable even same varible exist somewhere outside .

    Ex : -
              var a = 10 
              {
                  var a =20
                  console.log(a) // prints 20
              }
            here block scope overrided the global scope by shadowing it.

# Disadvantages of closures ?
   
     Closures will make high memory consumption due to having references for the function and it wont be collected by garbage collector . So it can may lead to memory leaks & freeze the browser

# What is the difference between an expression and a statement in JavaScript?

    There are two main syntactic categories in JavaScript: expressions and statements. A third one is both together, referred to as an expression statement. They are roughly summarized as:

        Expression: produces a value
        Statement: performs an action
        Expression statement: produces a value and performs an action
        A general rule of thumb:

        If you can print it or assign it to a variable, it’s an expression. If you can’t, it’s a statement.

        Statements
        let x = 0

        function declaration() {}

        if (true) {
        }
        Statements appear as instructions that do something but don't produce values.

        // Assign `x` to the absolute value of `y`.
        var x
        if (y >= 0) {
        x = y
        } else {
        x = -y
        }
        The only expression in the above code is y >= 0 which produces a value, either true or false. A value is not produced by other parts of the code.

        Expressions
        Expressions produce a value. They can be passed around to functions because the interpreter replaces them with the value they resolve to.

        5 + 5 // => 10

        lastCharacter("input") // => "t"

        true === true // => true
        Expression statements
        There is an equivalent version of the set of statements used before as an expression using the conditional operator:

        // Assign `x` as the absolute value of `y`.
        var x = y >= 0 ? y : -y
        This is both an expression and a statement, because we are declaring a variable x (statement) as an evaluation (expression).

# What is the output of the following code?

                const a = [1, 2, 3]
                const b = [1, 2, 3]
                const c = "1,2,3"

                console.log(a == c)
                console.log(a == b)

    The first console.log outputs true because JavaScript's compiler performs type conversion and therefore it compares to strings by their value. On the other hand, the second console.log outputs false because Arrays are Objects and Objects are compared by reference.

    Good to hear
    JavaScript performs automatic type conversion

    Objects are compared by reference

    Primitives are compared by value

# What is REST?

    REST (REpresentational State Transfer) is a software design pattern for network architecture. A RESTful web application exposes data in the form of information about its resources.

    Generally, this concept is used in web applications to manage state. With most applications, there is a common theme of reading, creating, updating, and destroying data. Data is modularized into separate tables like posts, users, comments, and a RESTful API exposes access to this data with:

    An identifier for the resource. This is known as the endpoint or URL for the resource.
    The operation the server should perform on that resource in the form of an HTTP method or verb. The common HTTP methods are GET, POST, PUT, and DELETE.
    Here is an example of the URL and HTTP method with a posts resource:

    Reading: /posts/ => GET
    Creating: /posts/new => POST
    Updating: /posts/:id => PUT
    Destroying: /posts/:id => DELETE
    Good to hear
    Alternatives to this pattern like GraphQL

# What does the following function return?
        function greet() {
        return
        {
            message: "hello"
        }
        }

        Because of JavaScript's automatic semicolon insertion (ASI), the compiler places a semicolon after return keyword and therefore it returns undefined without an error being thrown.

        Good to hear
        Automatic semicolon placement can lead to time-consuming bugs

# What is short-circuit evaluation in JavaScript?

            Short-circuit evaluation involves logical operations evaluating from left-to-right and stopping early.

            true || false
            In the above sample using logical OR, JavaScript won't look at the second operand false, because the expression evaluates to true regardless. This is known as short-circuit evaluation.

            This also works for logical AND.

            false && true
            This means you can have an expression that throws an error if evaluated, and it won't cause issues.

            true || nonexistentFunction()
            false && nonexistentFunction()
            This remains true for multiple operations because of left-to-right evaluation.

            true || nonexistentFunction() || window.nothing.wouldThrowError
            true || window.nothing.wouldThrowError
            true
            A common use case for this behavior is setting default values. If the first operand is falsy the second operand will be evaluated.

            const options = {}
            const setting = options.setting || "default"
            setting // "default"
            Another common use case is only evaluating an expression if the first operand is truthy.

            // Instead of:
            addEventListener("click", e => {
            if (e.target.closest("button")) {
                handleButtonClick(e)
            }
            })

            // You can take advantage of short-circuit evaluation:
            addEventListener(
            "click",
            e => e.target.closest("button") && handleButtonClick(e)
            )
            In the above case, if e.target is not or does not contain an element matching the "button" selector, the function will not be called. This is because the first operand will be falsy, causing the second operand to not be evaluated.

            Good to hear
            Logical operations do not produce a boolean unless the operand(s) evaluate to a boolean.

#  What does the following code evaluate to?
            typeof typeof 0

    It evaluates to "string".

    typeof 0 evaluates to the string "number" and therefore typeof "number" evaluates to "string".

# What are the differences between var, let, const and no keyword statements?

 * No keyword

    When no keyword exists before a variable assignment, it is either assigning a global variable if one does not exist, or reassigns an already declared variable. In non-strict mode, if the variable has not yet been declared, it will assign the variable as a property of the global object (window in browsers). In strict mode, it will throw an error to prevent unwanted global variables from being created.

 * var

    var was the default statement to declare a variable until ES2015. It creates a function-scoped variable that can be reassigned and redeclared. However, due to its lack of block scoping, it can cause issues if the variable is being reused in a loop that contains an asynchronous callback because the variable will continue to exist outside of the block scope.

    Below, by the time the the setTimeout callback executes, the loop has already finished and the i variable is 10, so all ten callbacks reference the same variable available in the function scope.

    for (var i = 0; i < 10; i++) {
    setTimeout(() => {
        // logs `10` ten times
        console.log(i)
    })
    }

    /* Solutions with `var` */
    for (var i = 0; i < 10; i++) {
    // Passed as an argument will use the value as-is in
    // that point in time
    setTimeout(console.log, 0, i)
    }

    for (var i = 0; i < 10; i++) {
    // Create a new function scope that will use the value
    // as-is in that point in time
    ;(i => {
        setTimeout(() => {
        console.log(i)
        })
    })(i)
    }
 * let

    let was introduced in ES2015 and is the new preferred way to declare variables that will be reassigned later. Trying to redeclare a variable again will throw an error. It is block-scoped so that using it in a loop will keep it scoped to the iteration.

    for (let i = 0; i < 10; i++) {
    setTimeout(() => {
        // logs 0, 1, 2, 3, ...
        console.log(i)
    })
    }
    const
    const was introduced in ES2015 and is the new preferred default way to declare all variables if they won't be reassigned later, even for objects that will be mutated (as long as the reference to the object does not change). It is block-scoped and cannot be reassigned.

    const myObject = {}
    myObject.prop = "hello!" // No error
    myObject = "hello" // Error
    Good to hear
    All declarations are hoisted to the top of their scope.

    However, with let and const there is a concept called the temporal dead zone (TDZ). While the declarations are still hoisted, there is a period between entering scope and being declared where they cannot be accessed.

    Show a common issue with using var and how let can solve it, as well as a solution that keeps var.

    var should be avoided whenever possible and prefer const as the default declaration statement for all variables unless they will be reassigned later, then use let if so.

# What is Big O Notation?

        Big O notation is used in Computer Science to describe the time complexity of an algorithm. The best algorithms will execute the fastest and have the simplest complexity.

        Algorithms don't always perform the same and may vary based on the data they are supplied. While in some cases they will execute quickly, in other cases they will execute slowly, even with the same number of elements to deal with.

        In these examples, the base time is 1 element = 1ms.

   * O(1)

        arr[arr.length - 1]
        1000 elements = 1ms
        Constant time complexity. No matter how many elements the array has, it will theoretically take (excluding real-world variation) the same amount of time to execute.

   * O(N)

        arr.filter(fn)
        1000 elements = 1000ms
        Linear time complexity. The execution time will increase linearly with the number of elements the array has. If the array has 1000 elements and the function takes 1ms to execute, 7000 elements will take 7ms to execute. This is because the function must iterate through all elements of the array before returning a result.

   * O([1, N])

        arr.some(fn)
        1000 elements = 1ms <= x <= 1000ms
        The execution time varies depending on the data supplied to the function, it may return very early or very late. The best case here is O(1) and the worst case is O(N).

   * O(NlogN)

        arr.sort(fn)
        1000 elements ~= 10000ms
        Browsers usually implement the quicksort algorithm for the sort() method and the average time complexity of quicksort is O(NlgN). This is very efficient for large collections.

   * O(N^2)

        for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length; j++) {
        // ...
        }
        }
        1000 elements = 1000000ms
        The execution time rises quadratically with the number of elements. Usually the result of nesting loops.

   * O(N!)
   
        const permutations = arr => {
        if (arr.length <= 2) return arr.length === 2 ? [arr, [arr[1], arr[0]]] : arr
        return arr.reduce(
        (acc, item, i) =>
        acc.concat(
                permutations([...arr.slice(0, i), ...arr.slice(i + 1)]).map(val => [
                item,
                ...val
                ])
        ),
        []
        )
        }
        1000 elements = Infinity (practically) ms
        The execution time rises extremely fast with even just 1 addition to the array.

        Good to hear
        Be wary of nesting loops as execution time increases exponentially.

# Arow function 

    An arrow function doesn’t have its own this value. Instead, it uses the this value of the enclosing lexical scope. An arrow function also doesn’t have the arguments object.

    Avoid using the arrow function for event handlers, object methods, class methods, prototype methods, and functions that use the arguments object.

# What is the difference between synchronous and asynchronous code in JavaScript?

    Synchronous means each operation must wait for the previous one to complete.

    Asynchronous means an operation can occur while another operation is still being processed.

    In JavaScript, all code is synchronous due to the single-threaded nature of it. However, asynchronous operations not part of the program (such as XMLHttpRequest or setTimeout) are processed outside of the main thread because they are controlled by native code (browser APIs), but callbacks part of the program will still be executed synchronously.

    Good to hear
    JavaScript has a concurrency model based on an "event loop".

    Functions like alert block the main thread so that no user input is registered until the user closes it.

# What are JavaScript data types?

    The latest ECMAScript standard defines seven data types, six of them being primitive: Boolean, Null, Undefined, Number, String, Symbol and one non-primitive data type: Object.

    Good to hear
    Mention of newly added Symbol data type

    Array, Date and function are all of type object

    Functions in JavaScript are objects with the capability of being callable

# What is event-driven programming?

    Event-driven programming is a paradigm that involves building applications that send and receive events. When the program emits events, the program responds by running any callback functions that are registered to that event and context, passing in associated data to the function. With this pattern, events can be emitted into the wild without throwing errors even if no functions are subscribed to it.

    A common example of this is the pattern of elements listening to DOM events such as click and mouseenter, where a callback function is run when the event occurs.

    document.addEventListener("click", function(event) {
    // This callback function is run when the user
    // clicks on the document.
    })
    Without the context of the DOM, the pattern may look like this:

    const hub = createEventHub()
    hub.on("message", function(data) {
    console.log(`${data.username} said ${data.text}`)
    })
    hub.emit("message", {
    username: "John",
    text: "Hello?"
    })
    With this implementation, on is the way to subscribe to an event, while emit is the way to publish the event.

    Good to hear
    Follows a publish-subscribe pattern.

    Responds to events that occur by running any callback functions subscribed to the event.

    Show how to create a simple pub-sub implementation with JavaScript.

# What is functional programming?

    Functional programming is a paradigm in which programs are built in a declarative manner using pure functions that avoid shared state and mutable data. Functions that always return the same value for the same input and don't produce side effects are the pillar of functional programming. Many programmers consider this to be the best approach to software development as it reduces bugs and cognitive load.

    Good to hear
    Cleaner, more concise development experience

    Simple function composition

    Features of JavaScript that enable functional programming (.map, .reduce etc.)

    JavaScript is multi-paradigm programming language (Object-Oriented Programming and Functional Programming live in harmony)

# Explain the differences between imperative and declarative programming.

        These two types of programming can roughly be summarized as:

        Imperative: how to achieve something
        Declarative: what should be achieved
        A common example of declarative programming is CSS. The developer specifies CSS properties that describe what something should look like rather than how to achieve it. The "how" is abstracted away by the browser.

        On the other hand, imperative programming involves the steps required to achieve something. In JavaScript, the differences can be contrasted like so:

        Imperative
        const numbers = [1, 2, 3, 4, 5]
        const numbersDoubled = []
        for (let i = 0; i < numbers.length; i++) {
        numbersDoubled[i] = numbers[i] * 2
        }
        We manually loop over the numbers of the array and assign the new index as the number doubled.

        Declarative
        const numbers = [1, 2, 3, 4, 5]
        const numbersDoubled = numbers.map(n => n * 2)
        We declare that the new array is mapped to a new one where each value is doubled.

        Good to hear
        Declarative programming often works with functions and expressions. Imperative programming frequently uses statements and relies on low-level features that cause mutations, while declarative programming has a strong focus on abstraction and purity.

        Declarative programming is more terse and easier to process at a glance.

# What is memoization?

        Memoization is the process of caching the output of function calls so that subsequent calls are faster. Calling the function again with the same input will return the cached output without needing to do the calculation again.

        A basic implementation in JavaScript looks like this:

        const memoize = fn => {
        const cache = new Map()
        return value => {
            const cachedResult = cache.get(value)
            if (cachedResult !== undefined) return cachedResult
            const result = fn(value)
            cache.set(value, result)
            return result
        }
        }
        Good to hear
        The above technique returns a unary function even if the function can take multiple arguments.

        The first function call will be slower than usual because of the overhead created by checking if a cached result exists and setting a result before returning the value.

        Memoization increases performance on subsequent function calls but still needs to do work on the first call.

# Contrast mutable and immutable values, and mutating vs non-mutating methods.

    The two terms can be contrasted as:

    Mutable: subject to change
    Immutable: cannot change

    In JavaScript, objects are mutable while primitive values are immutable. This means operations performed on objects can change the original reference in some way, while operations performed on a primitive value cannot change the original value.

    All String.prototype methods do not have an effect on the original string and return a new string. On the other hand, while some methods of Array.prototype do not mutate the original array reference and produce a fresh array, some cause mutations.

    const myString = "hello!"
    myString.replace("!", "") // returns a new string, cannot mutate the original value

    const originalArray = [1, 2, 3]
    originalArray.push(4) // mutates originalArray, now [1, 2, 3, 4]
    originalArray.concat(4) // returns a new array, does not mutate the original

    Good to hear
    List of mutating and non-mutating array methods

# What is the only value not equal to itself in JavaScript?

    NaN (Not-a-Number) is the only value not equal to itself when comparing with any of the comparison operators. NaN is often the result of meaningless math computations, so two NaN values make no sense to be considered equal.

    Good to hear
    The difference between isNaN() and Number.isNaN()

    const isNaN = x => x !== x

# Create a function pipe that performs left-to-right function composition by returning a function that accepts one argument.
        const square = v => v * v
        const double = v => v * 2
        const addOne = v => v + 1
        const res = pipe(square, double, addOne)
        res(3) // 19; addOne(double(square(3)))

    Ans-  Gather all supplied arguments using the rest operator ... and return a unary function that uses Array.prototype.reduce() to run the value through the series of functions before returning the final value.

    const pipe = (...fns) => x => fns.reduce((v, fn) => fn(v), x)
    Good to hear
    Function composition is the process of combining two or more functions to produce a new function.

# What is a pure function?

        A pure function is a function that satisfies these two conditions:

        Given the same input, the function returns the same output.
        The function doesn't cause side effects outside of the function's scope (i.e. mutate data outside the function or data supplied to the function).
        Pure functions can mutate local data within the function as long as it satisfies the two conditions above.

        Pure
        const a = (x, y) => x + y
        const b = (arr, value) => arr.concat(value)
        const c = arr => [...arr].sort((a, b) => a - b)
        Impure
        const a = (x, y) => x + y + Math.random()
        const b = (arr, value) => (arr.push(value), arr)
        const c = arr => arr.sort((a, b) => a - b)
        Good to hear
        Pure functions are easier to reason about due to their reliability.

        All functions should be pure unless explicitly causing a side effect (i.e. setInnerHTML).

        If a function does not return a value, it is an indication that it is causing side effects.

# Explain the difference between a static method and an instance method.

    Static methods belong to a class and don't act on instances, while instance methods belong to the class prototype which is inherited by all instances of the class and acts on them.

    Array.isArray // static method of Array
    Array.prototype.push // instance method of Array
    In this case, the Array.isArray method does not make sense as an instance method of arrays because we already know the value is an array when working with it.

    Instance methods could technically work as static methods, but provide terser syntax:

    const arr = [1, 2, 3]
    arr.push(4)
    Array.push(arr, 4)
    Good to hear
    How to create static and instance methods with ES2015 class syntax

# What is the this keyword and how does it work?

    The this keyword is an object that represents the context of an executing function. Regular functions can have their this value changed with the methods call(), apply() and bind(). Arrow functions implicitly bind this so that it refers to the context of its lexical environment, regardless of whether or not its context is set explicitly with call().

    Here are some common examples of how this works:

    Object literals
    this refers to the object itself inside regular functions if the object precedes the invocation of the function.

    Properties set as this do not refer to the object.

    var myObject = {
    property: this,
    regularFunction: function() {
        return this
    },
    arrowFunction: () => {
        return this
    },
    iife: (function() {
        return this
    })()
    }
    myObject.regularFunction() // myObject
    myObject["regularFunction"]() // my Object

    myObject.property // NOT myObject; lexical `this`
    myObject.arrowFunction() // NOT myObject; lexical `this`
    myObject.iife // NOT myObject; lexical `this`
    const regularFunction = myObject.regularFunction
    regularFunction() // NOT myObject; lexical `this`
    Event listeners
    this refers to the element listening to the event.

    document.body.addEventListener("click", function() {
    console.log(this) // document.body
    })
    Constructors
    this refers to the newly created object.

    class Example {
    constructor() {
        console.log(this) // myExample
    }
    }
    const myExample = new Example()
    Manual
    With call() and apply(), this refers to the object passed as the first argument.

    var myFunction = function() {
    return this
    }
    myFunction.call({ customThis: true }) // { customThis: true }
    Unwanted this
    Because this can change depending on the scope, it can have unexpected values when using regular functions.

    var obj = {
    arr: [1, 2, 3],
    doubleArr() {
        return this.arr.map(function(value) {
        // this is now this.arr
        return this.double(value)
        })
    },
    double() {
        return value * 2
    }
    }
    obj.doubleArr() // Uncaught TypeError: this.double is not a function
    Good to hear
    In non-strict mode, global this is the global object (window in browsers), while in strict mode global this is undefined.

    Function.prototype.call and Function.prototype.apply set the this context of an executing function as the first argument, with call accepting a variadic number of arguments thereafter, and apply accepting an array as the second argument which are fed to the function in a variadic manner.

    Function.prototype.bind returns a new function that enforces the this context as the first argument which cannot be changed by other functions.

    If a function requires its this context to be changed based on how it is called, you must use the function keyword. Use arrow functions when you want this to be the surrounding (lexical) context.

    https://dmitripavlutin.com/gentle-explanation-of-this-in-javascript/

# What does 'use strict' do and what are some of the key benefits to using it?

    Including 'use strict' at the beginning of your JavaScript source file enables strict mode, which enforces more strict parsing and error handling of JavaScript code. It is considered a good practice and offers a lot of benefits, such as:

    Easier debugging due to eliminating silent errors.
    Disallows variable redefinition.
    Prevents accidental global variables.
    Oftentimes provides increased performance over identical code that is not running in strict mode.
    Simplifies eval() and arguments.
    Helps make JavaScript more secure.
    Good to hear
    Eliminates this coercion, throwing an error when this references a value of null or undefined.

    Throws an error on invalid usage of delete.

    Prohibits some syntax likely to be defined in future versions of ECMAScript

# What is a potential pitfall with using typeof bar === "object" to determine if bar is an object? How can this pitfall be avoided?


    Although typeof bar === "object" is a reliable way of checking if bar is an object, the surprising gotcha in JavaScript is that null is also considered an object!

    Therefore, the following code will, to the surprise of most developers, log true (not false) to the console:

    var bar = null;
    console.log(typeof bar === "object");  // logs true!

    As long as one is aware of this, the problem can easily be avoided by also checking if bar is null:

    console.log((bar !== null) && (typeof bar === "object"));  // logs false
    To be entirely thorough in our answer, there are two other things worth noting:

    First, the above solution will return false if bar is a function. In most cases, this is the desired behavior, but in situations where you want to also return true for functions, you could amend the above solution to be:

    console.log((bar !== null) && ((typeof bar === "object") || (typeof bar === "function")));
    Second, the above solution will return true if bar is an array (e.g., if var bar = [];). In most cases, this is the desired behavior, since arrays are indeed objects, but in situations where you want to also false for arrays, you could amend the above solution to be:

    console.log((bar !== null) && (typeof bar === "object") && (toString.call(bar) !== "[object Array]"));
    However, there’s one other alternative that returns false for nulls, arrays, and functions, but true for objects:

    console.log((bar !== null) && (bar.constructor === Object));
    Or, if you’re using jQuery:
    console.log((bar !== null) && (typeof bar === "object") && (! $.isArray(bar)));
    ES5 makes the array case quite simple, including its own null check:

    console.log(Array.isArray(bar));

# What is the significance, and what are the benefits, of including 'use strict' at the beginning of a JavaScript source file?

    The short and most important answer here is that use strict is a way to voluntarily enforce stricter parsing and error handling on your JavaScript code at runtime. Code errors that would otherwise have been ignored or would have failed silently will now generate errors or throw exceptions. In general, it is a good practice.

    Some of the key benefits of strict mode include:

  * Makes debugging easier. 
         Code errors that would otherwise have been ignored or would have failed silently will now generate errors or throw exceptions, alerting you sooner to problems in your code and directing you more quickly to their source.
  * Prevents accidental globals. 
         Without strict mode, assigning a value to an undeclared variable automatically creates a global variable with that name. This is one of the most common errors in JavaScript. In strict mode, attempting to do so throws an error.
  * Eliminates this coercion.
         Without strict mode, a reference to a this value of null or undefined is automatically coerced to the global. This can cause many headfakes and pull-out-your-hair kind of bugs. In strict mode, referencing a a this value of null or undefined throws an error.
  * Disallows duplicate parameter values. 
        Strict mode throws an error when it detects a duplicate named argument for a function (e.g., function foo(val1, val2, val1){}), thereby catching what is almost certainly a bug in your code that you might otherwise have wasted lots of time tracking down.
        Note: It used to be (in ECMAScript 5) that strict mode would disallow duplicate property names (e.g. var object = {foo: "bar", foo: "baz"};) but as of ECMAScript 2015 this is no longer the case.
  * Makes eval() safer. 
        There are some differences in the way eval() behaves in strict mode and in non-strict mode. Most significantly, in strict mode, variables and functions declared inside of an eval() statement are not created in the containing scope (they are created in the containing scope in non-strict mode, which can also be a common source of problems).
  * Throws error on invalid usage of delete.
        The delete operator (used to remove properties from objects) cannot be used on non-configurable properties of the object. Non-strict code will fail silently when an attempt is made to delete a non-configurable property, whereas strict mode will throw an error in such a case.

# What will the code below output? Explain your answer.

        console.log(0.1 + 0.2);
        console.log(0.1 + 0.2 == 0.3);

    An educated answer to this question would simply be: “You can’t be sure. it might print out 0.3 and true, or it might not. Numbers in JavaScript are all treated with floating point precision, and as such, may not always yield the expected results.”

    The example provided above is classic case that demonstrates this issue. Surprisingly, it will print out:

    0.30000000000000004
    false
    A typical solution is to compare the absolute difference between two numbers with the special constant Number.EPSILON

            function areTheNumbersAlmostEqual(num1, num2) {
	        return Math.abs( num1 - num2 ) < Number.EPSILON;
        }
        console.log(areTheNumbersAlmostEqual(0.1 + 0.2, 0.3));

# Write a simple function (less than 160 characters) that returns a boolean indicating whether or not a string is a palindrome.

    The following one line function will return true if str is a palindrome; otherwise, it returns false.

    function isPalindrome(str) {
    str = str.replace(/\W/g, '').toLowerCase();
    return (str == str.split('').reverse().join(''));
    }
    For example:

    console.log(isPalindrome("level"));                   // logs 'true'
    console.log(isPalindrome("levels"));                  // logs 'false'
    console.log(isPalindrome("A car, a man, a maraca"));  // logs 'true'

# Assuming d is an “empty” object in scope, say:

            var d = {};
            …what is accomplished using the following code?

            [ 'zebra', 'horse' ].forEach(function(k) {
                d[k] = undefined;
            });

    The snippet of code shown above sets two properties on the object d. Ideally, any lookup performed on a JavaScript object with an unset key evaluates to undefined. But running this code marks those properties as “own properties” of the object.

    This is a useful strategy for ensuring that an object has a given set of properties. Passing this object to Object.keys will return an array with those set keys as well (even if their values are undefined).

# What will the code below output to the console and why?

            var arr1 = "john".split('');
            var arr2 = arr1.reverse();
            var arr3 = "jones".split('');
            arr2.push(arr3);
            console.log("array 1: length=" + arr1.length + " last=" + arr1.slice(-1));
            console.log("array 2: length=" + arr2.length + " last=" + arr2.slice(-1));

    The logged output will be:

    "array 1: length=5 last=j,o,n,e,s"
    "array 2: length=5 last=j,o,n,e,s"
    arr1 and arr2 are the same (i.e. ['n','h','o','j', ['j','o','n','e','s'] ]) after the above code is executed for the following reasons:

    Calling an array object’s reverse() method doesn’t only return the array in reverse order, it also reverses the order of the array itself (i.e., in this case, arr1).

    The reverse() method returns a reference to the array itself (i.e., in this case, arr1). As a result, arr2 is simply a reference to (rather than a copy of) arr1. Therefore, when anything is done to arr2 (i.e., when we invoke arr2.push(arr3);), arr1 will be affected as well since arr1 and arr2 are simply references to the same object.

    And a couple of side points here that can sometimes trip someone up in answering this question:

    Passing an array to the push() method of another array pushes that entire array as a single element onto the end of the array. As a result, the statement arr2.push(arr3); adds arr3 in its entirety as a single element to the end of arr2 (i.e., it does not concatenate the two arrays, that’s what the concat() method is for).

    Like Python, JavaScript honors negative subscripts in calls to array methods like slice() as a way of referencing elements at the end of the array; e.g., a subscript of -1 indicates the last element in the array, and so on.

# What will the code below output to the console and why ?

        console.log(1 +  "2" + "2");
        console.log(1 +  +"2" + "2");
        console.log(1 +  -"1" + "2");
        console.log(+"1" +  "1" + "2");
        console.log( "A" - "B" + "2");
        console.log( "A" - "B" + 2);

    The above code will output the following to the console:

    "122"
    "32"
    "02"
    "112"
    "NaN2"
     NaN

# The following recursive code will cause a stack overflow if the array list is too large. How can you fix this and still retain the recursive pattern?

            var list = readHugeList();

            var nextListItem = function() {
                var item = list.pop();

                if (item) {
                    // process the list item...
                    nextListItem();
                }
            };

    The potential stack overflow can be avoided by modifying the nextListItem function as follows:

    var list = readHugeList();

    var nextListItem = function() {
        var item = list.pop();

        if (item) {
            // process the list item...
            setTimeout( nextListItem, 0);
        }
    };
    The stack overflow is eliminated because the event loop handles the recursion, not the call stack. When nextListItem runs, if item is not null, the timeout function (nextListItem) is pushed to the event queue and the function exits, thereby leaving the call stack clear. When the event queue runs its timed-out event, the next item is processed and a timer is set to again invoke nextListItem.

# What would the following lines of code output to the console?

        console.log("0 || 1 = "+(0 || 1));
        console.log("1 || 2 = "+(1 || 2));
        console.log("0 && 1 = "+(0 && 1));
        console.log("1 && 2 = "+(1 && 2));
        Explain your answer.


    The code will output the following four lines:

    0 || 1 = 1
    1 || 2 = 1
    0 && 1 = 0
    1 && 2 = 2

# What is the output out of the following code? Explain your answer.

            var a={},
                b={key:'b'},
                c={key:'c'};

            a[b]=123;
            a[c]=456;

            console.log(a[b]);

    The output of this code will be 456 (not 123).

    The reason for this is as follows: When setting an object property, JavaScript will implicitly stringify the parameter value. In this case, since b and c are both objects, they will both be converted to "[object Object]". As a result, a[b] anda[c] are both equivalent to a["[object Object]"] and can be used interchangeably. Therefore, setting or referencing a[c] is precisely the same as setting or referencing a[b].

# Create a function that, given a DOM Element on the page, will visit the element itself and all of its descendents (not just its immediate children). For each element visited, the function should pass that element to a provided callback function.

                The arguments to the function should be:

                a DOM element
                a callback function (that takes a DOM element as its argument)

    Visiting all elements in a tree (DOM) is a classic Depth-First-Search algorithm application. Here’s an example solution:

    function Traverse(p_element,p_callback) {
        p_callback(p_element);
    var list = p_element.children;
    for (var i = 0; i < list.length; i++) {
        Traverse(list[i],p_callback);  // recursive call
    }
    }

# Consider the following code. What will the output be, and why?

            (function () {
                try {
                    throw new Error();
                } catch (x) {
                    var x = 1, y = 2;
                    console.log(x);
                }   
                console.log(x);
                console.log(y);
            })();

    1
    undefined
    2

    var statements are hoisted (without their value initialization) to the top of the global or function scope it belongs to, even when it’s inside a with or catch block. However, the error’s identifier is only visible inside the catch block. It is equivalent to:

    (function () {
        var x, y; // outer and hoisted
        try {
            throw new Error();
        } catch (x /* inner */) {
            x = 1; // inner x, not the outer one
            y = 2; // there is only one y, which is in the outer scope
            console.log(x /* inner */);
        }
        console.log(x);
        console.log(y);
    })();

# What is the value of typeof undefined == typeof NULL?


    The expression will be evaluated to true, since NULL will be treated as any other undefined variable.

    Note: JavaScript is case-sensitive and here we are using NULL instead of null.

# What is NaN? What is its type? How can you reliably test if a value is equal to NaN?


    The NaN property represents a value that is “not a number”. This special value results from an operation that could not be performed either because one of the operands was non-numeric (e.g., "abc" / 4), or because the result of the operation is non-numeric.

    While this seems straightforward enough, there are a couple of somewhat surprising characteristics of NaN that can result in hair-pulling bugs if one is not aware of them.

    For one thing, although NaN means “not a number”, its type is, believe it or not, Number:

    console.log(typeof NaN === "number");  // logs "true"
    Additionally, NaN compared to anything – even itself! – is false:

    console.log(NaN === NaN);  // logs "false"

    A semi-reliable way to test whether a number is equal to NaN is with the built-in function isNaN(), but even using isNaN() is an imperfect solution.

    Why because isNaN(x) attempts to convert the passed parameter to a number1 (equivalent to Number(x) ) and then tests if the value is NaN . So you now know why isNaN() and isNaN({a: 1}) are both true even though isNaN([]) is false. Even though arrays are objects, their toNumber coercion is not NaN (as shown in the table above). Similarly since the boolean primitives coerce to numbers; calling isNaN(true) or isNaN(false) will give a false outcome. ( special case null which result false in both cases)
    
    A better solution would either be to use value !== value, which would only produce true if the value is equal to NaN. Also, ES6 offers a new Number.isNaN() function, which is a different and more reliable than the old global isNaN() function.

  **isNaN() will give true for objects also but Number.isNaN() strictly gives true only when is NaN**

# What will the following code output and why?

                var b = 1;
                function outer(){
                    var b = 2
                    function inner(){
                        b++;
                        var b = 3;
                        console.log(b)
                    }
                    inner();
                }
                outer();

    Output to the console will be “3”.

    There are three closures in the example, each with it’s own var b declaration. When a variable is invoked closures will be checked in order from local to global until an instance is found. Since the inner closure has a b variable of its own, that is what will be output.

    Furthermore, due to hoisting the code in inner will be interpreted as follows:

    function inner () {
        var b; // b is undefined
        b++; // b is NaN
        b = 3; // b is 3
        console.log(b); // output "3"
    }

# Discuss possible ways to write a function Number.isInteger(x) that determines if x is an integer.

    This may sound trivial and, in fact, it is trivial with ECMAscript 6 which introduces a new Number.isInteger() function for precisely this purpose. However, prior to ECMAScript 6, this is a bit more complicated, since no equivalent of the Number.isInteger() method is provided.

    The issue is that, in the ECMAScript specification, integers only exist conceptually; i.e., numeric values are always stored as floating point values.

    With that in mind, the simplest and cleanest pre-ECMAScript-6 solution (which is also sufficiently robust to return false even if a non-numeric value such as a string or null is passed to the function) would be the following use of the bitwise XOR operator:

    function isInteger(x) { return (x ^ 0) === x; } 
    The following solution would also work, although not as elegant as the one above:

    function isInteger(x) { return (typeof x === 'number') && (x % 1 === 0); }
    The following function (or with Math.ceil() or Math.floor() in place of Math.round()) might also seem useful, but the results are not exactly the same as with the above two functions:

    function isInteger(x) { return Math.round(x) === x; }
    The difference is, these Math-based solutions return true for Infinity and -Infinity, whereas the others (and notably ES6’s Number.isInteger()) return false.

    Another fairly common incorrect solution is the following:

    function isInteger(x) { return parseInt(x, 10) === x; }
    While this parseInt-based approach will work well for many values of x, once x becomes quite large, it will fail to work properly. The problem is that parseInt() coerces its first parameter to a string before parsing digits. Therefore, once the number becomes sufficiently large, its string representation will be presented in exponential form (e.g., 1e+21). Accordingly, parseInt() will then try to parse 1e+21, but will stop parsing when it reaches the e character and will therefore return a value of 1. Observe:

    > String(1000000000000000000000)
    '1e+21'
    > parseInt(1000000000000000000000, 10)
    1
    > parseInt(1000000000000000000000, 10) === 1000000000000000000000
    false

# Show the conversion from number to string and vice versa

        Conversion between numbers and strings is a common practical use case
        // number to string conversion
        const num = 12;

        String(num);              // "12"
        num.toString()            // "12"
        num + "";                 // "12"
        // string to number conversion
        const str = "12";

        Number(str);               // 12
        +str                       // 12
        parseInt(str)              // 12Show the conversion from number to string and vice versa
        Conversion between numbers and strings is a common practical use case
        // number to string conversion
        const num = 12;

        String(num);              // "12"
        num.toString()            // "12"
        num + "";                 // "12"
        // string to number conversion
        const str = "12";

        Number(str);               // 12
        +str                       // 12
        parseInt(str)              // 12Show the conversion from number to string and vice versa
        Conversion between numbers and strings is a common practical use case
        // number to string conversion
        const num = 12;

        String(num);              // "12"
        num.toString()            // "12"
        num + "";                 // "12"
        // string to number conversion
        const str = "12";

        Number(str);               // 12
        +str                       // 12
        parseInt(str)              // 12

# Show the usage of ||, &&, ?? and !! with code examples

    The logical OR (||) operator for a set of operands is true if and only if one or more of its operands is true
    The logical AND (&&) operator for a set of operands is true if and only if all of its operands are true
    The nullish coalescing operator (??) is a logical operator that returns its right-hand side operand when its left-hand side operand is null or undefined, and otherwise returns its left-hand side operand
    The double NOT (!!) operator used to explicitly force the conversion of any value to the corresponding boolean primitive
    const num1 = 10, num2 = 20;

    true || false;                // true
    false || false;               // false
    false || num1;                // 10
    0 || num2;                    // 20
    "text" || true                // "text"
    num1 > 0 || num2 < 0          // true
    const num1 = 10, num2 = 20;

    true && true;                 // true
    true && false;                // false
    true && num1;                 // 10
    num1 && num2;                 // 20
    "text" && (num1 + num2)       // 30
    num1 > 0 && num2 < 0          // false
    undefined ?? 10;              // 10
    null ?? 20;                   // 20
    false ?? num1;                // false
    0 ?? num2;                    // 0
    !!10;                         // true
    !!{};                         // true
    !!"";                         // false
    !!0;                          // false
    Notes
    It is not possible to combine both the AND (&&) and OR operators (||) directly with ??

# Show the frequently and commonly used methods available on Number object with coding examples

        isInteger is used to check if the given number is integer or not
        parseInt is used to convert a given value in to integer
        parseFloat is used to convert a given value in to floating number
        isNan is used to check if the given value is NaN or no
        toFixed is used to limit the number of digits after the decimal place
        toPrecision is used to limit the total number of digits to represent the number
        Number.isInteger(1.5);            // false
        Number.isInteger(-15);            // true

        Number.parseInt('5.8');           // 5
        Number.parseInt('123x')           // 123

        Number.parseFloat('5.86');        // 5.86
        Number.parseFloat('-12.69x');     // -12.69

        Number.isNaN(NaN);                // true
        Number.isNaN("text" - 10);        // true
        Number.isNaN("text");             // false
        56.369.toFixed(2);                // 56.37
        59..toFixed(3);                   // 59.000

        32.458.toPrecision('3');          // 32.5
        98.1.toPrecision(1);              // 9e+1
        Notes
        NaN is special type of number and this value is results by the invalid mathematical operations such as substraction of number and text

# Show the creation of Regular Expression in JavaScript

    Regular expressions are patterns used to match character combinations in strings
    Regular expressions can be created using literal form or constructor form
    Constructor form accepts regular expression as the first argument and flags as the 2nd argument
    Literal form is simple which takes regular expression and flags in a single expression
    // literal form
    let re = /ab+c/g;
    // constructor form
    let re = new RegExp('ab+c', 'g');
    Notes
    In JavaScript, regular expressions are objects

# Show the creation and usage of symbol with code

    A "symbol" represents a unique identifier
    Symbol.for method searches for existing symbols in a runtime-wide symbol registry returns the same. If not found, creates a new Symbol
    Symbol.keyFor method retrieves the name of the symbol
    // new symbol
    let symId = Symbol("id");

    // global symbol
    let symUsername = Symbol.for("username");

    // get name by symbol
    Symbol.keyFor(symUsername);                 // username
    Notes
    Symbols are skipped by for…in

# Write a code to show the differences between the techniques, currying and partial application

    A function returning another function that might return another function, but every returned function must take only one parameter at a time is currying

    A function returning another function that might return another function, but each returned function can take several parameters is partial application

    // currying
    function multiply(num1){
        return function (num2){
            return function (num3){
                return num1 * num2 * num3;
            }
        }
    }
    // partial application
    function multiply(num1){
        return function (num2, num3){
            return function (num4){
                return num1 * num2 * num3 * num4;
            }
        }
    }

# Create a function which takes another function as an argument and makes it eligible for currying or partial application

    Function can take another function as argument and accept the arguments on the returned functions till the expected arguments are reached
    The arguments can be 1 or multiple, and the actual function will be called once the count of expected arguments are reached
    function curryFunc(fn) {
        return function curry(...args) {
            if (fn.length <= args.length) {
                return fn.apply(this, args);
            } else {
                return function (...args2) {
                    return curry.apply(this, args.concat(args2));
                };
            }
        };
    }

    // driver code
    let sum = curryFunc(function (a, b, c, d) {
        return a + b + c + d;
    });

    sum(1)(2)(3)(4);                    // called like curried function
    sum(1,2)(3,4);                      // called like partial application

# What is a Decorator?

    Decorators are just a wrapper around a function. They are used to enhance the functionality of the function without modifying the underlying function. Decorators are not a new concept — they have already been used by developers of Python and C#, and even JavaScript developers have been implementing them since forever. What? Yes, you heard it right.


# what are primitive types ?

    primitive types are string , boolean , number whenevr u reassign them they will copy by values not by references

# what are reference types ?
    array & object are reference type so when we reassign them it will have copy the reference

# spread & rest operator ?

    spread operator is used to split the item in the array or properties in object to new array or new object .

# Destructing?

    Destructing is used to extract the items in the array or properties from object .

# With ES7 , how we can assign property & methods in classes

    we can add property to class directly and also method as function value to property 

    Ex :-  class person {
                name = 'prani'
                getName = () =>{
                    return this.name 
                }
            }
	    
# Can we declare variable twice with same name ?
   Yes , using var declartion , we can declare 

   ```javascript
        var carName = "Volvo";
        var carName;
   ```
   You cannot re-declare a variable declared with let or const.

    This will not work:
    
    ```javascript
        let carName = "Volvo";
        let carName;
    ```
# Output of null == undefined ?
   It will be true because as type coercion happens , both will be converted to boolean type
   
# Output of below snippet ?
   ```javascript
	for(var i=0;i<3;i++){
	setTimeout(function(){
	console.log(i)
	},1000)
```
  This prints 3 3 3 -- As setTimeout run after sometime due to webAPI asynchronous call . By that time i becomes 3 at the end so it prints 3 for each loop since var is a functional scope
  
  Important to remember like i will be increatment until condition fails so it increments to 3
  
  # Change below snippet using ES5 to print 0 1 2 ?
   ```javascript
	for(var i=0;i<3;i++){
		setTimeout(function(){
		console.log(i)
		},1000)  
	}
```
Ans
```javascript
  for(var i=0;i<3;i++){
    (function (a){
    	setTimeout(function(){
		console.log(a)
	},1000)
    }
    )(i)
   }
  ```

# What is method chaining ?
    Method chaining is the mechanism of calling a method on another method of the same object. This ensures a cleaner and readable code. Method chaining uses this keyword in the object's class to access its methods. In javascript, the this keyword refers to the current object in which it is called. When a method returns this, it simply returns an instance of the object in which it is returned. in another word, to chain methods together, we need to make sure that each method we define has a return value so that we can call another method on it.

    ```javascript
 class Arithmetic {
  constructor() {
    this.value = 0;
  }
  sum(...args) {
    this.value = args.reduce((sum, current) => sum + current, 0);
    return this;
  }
  addition(value) {
    this.value = this.value + value;
    return this;
  }
  subtraction(value) {
    this.value = this.value - value;
    return this;
  }
  average(...args) {
    this.value = args.length? (this.sum(...args).value) / 
  args.length: undefined;
    return this;
  }
}


const Arithmetic 1= new Arithmetic()
Arithmetic1
  .sum(1, 3, 6)   // => { value: 10 } 
  .subtract(3)   // => { value: 7 }
  .add(4)        // => { value: 11 }
  .value         // => 11 
  ```