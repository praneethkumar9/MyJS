# Closures
  Closures is a function bundled with its lexical environment  . 
  In other words , closures will be part of any function  which is function bundled with its parent lexical enviroment

  MDN definition :-  A closure gives access to the outer function's scope from an inner function . They are   created every time a function created 

  **Example**
  ```javascript
     function x(){
         var a = 7;
         /**
         * this is a function y  which has closure function with its parent (x) lexical  enviroment means  it 
         * has  scope to all x function variables
         **/
         function y(){ 
            console.log(a);                                                
         }
         y()
     }
     x();
```
   This closure will be very helpful like accessing parent lexical scope variables even when its parent doesnt exist in call stack because its scope is bundled with child inner function so even parent went out of call stack , inner function can access.
  **Example**
  ```javascript
     function x(){
         var a = 7;
         function y(){ 
            console.log(a);                                                
         }
         return y;
     }
     let z = x(); // z has returned y function definition
     //..............
     //...........
     z() 
     // So here even z is called some time after x went out of call stack . still z which has y function definition will have access to x scope so it prints 7
``` 
### Corner cases :- 

 1) Like above example if 'a' got assigned with other value before returning . closure will have latest value assigned . This is because closure will work by references through its lexical scope not by values 

 2) It works perfectly fine even there is hierarcy of functions like function inside the function , function   inside the function - means it will have access to parents parent scope also

#### Example - corner 1
```javascript
     function x(){
         var a = 7;
         function y(){ 
            console.log(a);                                                
         }
         a = 100
         return y;
     }
     let z = x(); // z has returned y function definition
     //..............
     //...........
     z() 
     // it prints 100 because it prints through reference 
``` 
### Use cases :-   _imp in interview qstn_**

 * module design pattern
 * In data encapsulation - data privacy
 * currying
 * functions like once
 * memoize
 * maintaining state in async world
 * setTimeouts
 * Iterators
 * and many more ....

### Tricky interview question - closures with setTimeout
Print 1 to 5 in such a way like for printing a number it has to wait for its repective number secs
ex :- 1 prints after 1 secs and then after waiting for 2 secs 2 prints  so on ...

#### General wrong Approach  
```javascript
     function x(){
       for(var i=1 ; i<=5;i++){
           setTimeout(()=>{
               console.log(i);
           },i * 1000)
       }
       console.log('Namaste JS');
     }
     x(); // it prints first Namaste JS and then after every respective number seconds it prints always 6
``` 

 Why it print Namaste Js first because js is async programming language so it wont until setTimeout finishing its timer & execute its logic .
 Secondly , by the end of the loop 'i' is assigned with value 6 . So since as we discussed closures will access by its reference not by value . It always  prints 6

 So to solve this problem we need to make scope different and every time it should have different scope to refer the value to print

***
#### Exclusive correct  Approach  without using let
```javascript
     function x(){
       for(var i=1 ; i<=5;i++){
              function close(x){
                  setTimeout(()=>{
                      console.log(x);
                  },x * 1000)
              }
         close(i)
       }
       console.log('Namaste JS');
     }
     x(); // it prints first Namaste JS and then after every respective number seconds it prints its respective number
``` 

Now since we made a inner function inside the "for loop" . function has its own scope so every time when "close function" is called value will make a copy to x variable of function "close" in its block scope for every iteration. So each setTimeout will refer to different block scope having differnt values.
So it prints 1 to 5 in respective number waiting

***
####  correct  Approach using let
```javascript
     function x(){
       for(let i=1 ; i<=5;i++){
           setTimeout(()=>{
               console.log(i);
           },i * 1000)
       }
       console.log('Namaste JS');
     }
    x(); // it prints first Namaste JS and then after every respective number seconds it prints its respective number
``` 

Here also same thing when we use let  it will have block scope instead of local scope so each iteration block will its own block scope having different value so its print  1 to 5 in repective number waiting

***
####  correct  Approach using let & var in different way
```javascript
     function x(){
       for(var i=1 ; i<=5;i++){
           let b = i
           setTimeout(()=>{
               console.log(b);
           },i * 1000)
       }
       console.log('Namaste JS');
     }
    x(); // it prints first Namaste JS and then after every respective number seconds it prints its respective number
``` 

same as above but here since we created b variable with block scope so b will have differnt block scope with different value for each iteration .

***

# Interview Questions - closures
 
  * What is closures ?

      Definition as above explained

  * Give an example of closures ?
     
     ```javascript
     function outer(){
       var a = 10 ;
       function inner(){
           console.log(a);
       }
       return inner
     }
    outer()(); // inner function returned will be called and consoles "a" thorugh the feature of closures
    ``` 

  * What if the variable used in inner function is not defined at all  & also when defined globally or inside outer function ? 

    ```javascript
     function outer(){
       var a = 10 ;
       function inner(){
           console.log(a , b);
       }
       return inner
     }
     let b =  10
    outer()(); 
    // inner function returned will be called and consoles "a" thorugh the feature of closures and b thorugh lexical scoping means first inner will search b in local scope then in outer then in global level
    //so since at last it found b in global scope it prints that

    // When it is not defined at all then through lexicall scoping it searches in all scopes lexically if not found then it gives reference error like not defined
     ``` 

  * What are closure advantages ? 

     Check the usecases of closures above which are advanatges. Data encapsulation is good thing to demonstrate in interview for perfect explanation

  * Data encapluslation or Data privacy example using closure ?
     
      ```javascript
     function counter(){
       var count = 0 ;
       function incrementCounter(){
           count++;
           console.log(count);
       }
       return incrementCounter
     }
     var counter1 = counter();
     counter1();  // it prints 1 since intial value of count is 0 so it printed after incrementing by 1
     counter1();  // since same inner function refering same scope variable again it will increment by 1 so it prints 2

     var counter2 = counter();
     counter2();  // Here again new counter function created it will have a different scope
     counter2();  // So it prints 1 and 2 exactly same as above
     ``` 
    **Note:-**   Here data encapsulation is count value can't be accessed directly without calling counter function . So it is private to counter function

    Now this is scalable because we can only increment the count value in order to scale it dynamically we can use constructor function

      ```javascript
      //Constructor function example
     function Counter(){
       var count = 0 ;
       this.incrementCounter=()=>{
           count++;
           console.log(count);
       }
       this.decrementCounter=()=>{
           count--;
           console.log(count);
       }
     }
     var counter1 = new Counter();
     counter1.incrementCounter();  // it increments value & prints 1 
     counter1.decrementCounter();  // it decrements value & print 0
     counter1.incrementCounter();  // it increments value & prints 1 

     var counter2 = new Counter();
     counter1.incrementCounter();  // it increments value & prints 1 
     counter1.incrementCounter();  // it increments value & prints 2
     counter1.decrementCounter();  // it decrements value & print 1 

     // here counter1 & counter2 will have different scopes 
     ```  

  * Disadvantages of closures ?
   
     Closures will make high memory consumption due to having references for the function and it wont be collected by garbage collector . So it can may lead to memory leaks & freeze the browser

  * what is Garbage collector ?  

     This is a mechanism where it deallocates the unused memory space means deallocationg memory for unsed variables . 

  * How closures are related to garbage collector ?
     
     Closures are related to garbage collector in the way that inner function formed closure with outer function refering some variables of outer function wont be garbage collector . It will still in memory space so that we can use that by closure feature.
     
     Garbage collector will work smartly also by dellocating the memory for variables which are not used in inner function even it forms closures with that variable means outer function has 2 variables but inner function uses only one then only unused will be garbage collected even closure formed with those 2 variables.

***

# Function - Details

  ## Function statement or Function declarations
      Function statement or declarations are nothing but declaring the functions with name 
      
      Ex:-  function a(){

             }

  ## Function expressions
      Function expressions are nothing but the expression in which functions are assigned as value to the variables . Here function can be anonymous or named functions .

      Ex:-  let b = function (){

             } 
             or
             let b = function xyz (){

             } 

  ## Anonymous function
      Function statement with no name is called anonymous function . But here we cant use it directly in code which gives syntax error like it needs name so instead we can use this anonymous function as a value to the variable in function expression

      Ex:-  function (){

             }

  ## Named function expressions
      Function expression in which we used named function as value in the assignment .

      Ex:-   let b = function xyz (){

             } 

             Here we call this function only with b like "b()"  but not with "xyz()" because xyz will not get outer scope instead it will local scope of function so we can access xyz inside function

              let b = function xyz (){
                console.log(xyz ---- here we can access
             } 
             xyz() --- we cant access here 

  ## Difference between function statement & function expression
      Major difference between function statement & function expression is "Hoisting" .

      So function statement will be hoisted therefore we can call the function declared with function statement even before it is declared 
      But in the case of function expression , hoisting will happen to the variable not to the function used as value so we cant call it 

      Ex: - 
                a();  ---  it will call & prints "a called"
                b();  ---  it gives error like "b is not a function"
                function a(){
                   console.log("a called");
                }
                var b = function xyz (){
                    console.log("b called");
                } 

  ## Difference between parameters & arguments
     During function declaration , identifiers used are called parameters 
     During function calling , the values we passed are called arguments

      Ex: - 
                function a(x,y){  ------------------------- these x,y are parameters
                   console.log(x); // prints 1 
                   console.log(y); // prints 2
                }
                 a(1,2); -- these 1,2 are arguments

  ## First class functions and what are first class citizens
     
     In JS , we call functions as first class citizens because they are first class functions .
     This is because functions have ability to be used like values.

***

# Callbacks

  ## What is callback function in js 
      Callbacks are the function which are passed as an arugment to another function to do async processing in single threaded lang like js.

 ```javascript
        setTimeout(function (){
          console.log("this is callback function which is called after some time mentioned in second argument");
        },5000) // prints the console after 5 secs

         function x(y){   // callback function is passed as parameter
           console.log("in x");
           y();  // calling the callback function
           }
     
      x(function y(){  // calling x with callback function y
        console.log("in callback y") 
      })
  ```  
     Since js is synchronous & single threaded language , this callbacks are very powerful in performing asynchronous operations .

     Because without these , since it has only single main thread ( call stack ) it will get blocked when there is a operation which requires high processing time .

     In above scenrio , callbacks comes to rescue & register a callback with that operation so it wont stop execution instead it will continue execution & calls the callback when operation gets successed.


  ## Deep about event Listeners
       Event listeners are nothing but listening to the event and call the handler . 
       Here handlers are nothing but the callbacks .

  ```javascript
     function blockScope (){
    let count = 0 ;
   
    document.getElementById('clickme').addEventListener('click',function x(){ // here x is callback attached to event listener handler
        ++count
        console.log(" button clicked",count)
    })
    }

    blockScope()
 ``` 
```html
    <h1>JS DEMO</h1>
    <button id='clickme'>clickk</button>  
    <!------ this is the button where above we attached the event listener ----->
 ``` 

  ## Closures demo with event listeners
        
        So we can use above example for the closure demo with event listener  like 
        
        "x" callback function formed closure with function "blockScope" lexical environment so it gets access to count even "blockScope" function is not in the callstack or in scope.
    

  ## Scope demo with event listeners
       
       Here also we can take above example like 
       if we inspect the button for which event listener attached in dev tools . 

       We can observe , eventlistener tab where our "click" event listerner will be shown.

       If we go deep into that , it got attached to handler which our callback "x" with 2 scopes
       1) closure scope - nothing but its parent "blockScope" function scope
       2) Global scope - nothing but "blockScope" function parent scope

       Like this lexical scoping will be added in hierachy order until it reaches the main parent scope called global scope 

  ## Garbage collection & removeEventListeners

     removeEventlisteners are very important for garbage collection to collect unused variables & functions

     So here main motive is when we have more event listeners we will have more closures so it will take memory like anything which can impact performance .

     Therefore in order to collect closures variable & function memory by garbage collector . we need to remove eventListener as soon as they are not needed
     
  ***

  # Event Loop
   ## Definition
      Event loop is a mechanism which is used to execute the non-blocking operations with the help of callstack & callback queue as well as with job queue (microtask queue).

   ## Explanation
      Event loop continously monitors the call stack , callback queue , job queue

        1) call stack
            This is stack in the js engine where code is executed in the execution context created in it.

        2) callback queue
             This is queue where all callbacks are queued up . 
             Callback are pushed to this queue by webAPI of browser or nodejs enviroment.
             Callback are poped out of the queue & put it into the callstack by eventloop

             WebAPI are the environment created by browser where certain things will be controlled by it and not by js engine
              Like  1) timer functions (setTimeout ) 
                    2) DOM API (document related)
                    3) fetch (network calls)
                    4) location
                    5) local storage
                    6) console

            So whenever there is function related to above things need to be executed , call stack will give this task to webAPI's through global object called "window" . webAPI's executed those in background & when it completes it pushes the callback attached to it to the callback queue

        3) Job queue 
            This is a queue similar to the callback queue but here only promise & mutation observer callbacks are queued up.
            Important things is Job queue will be given more priority than callback queue.

   ## How it works ***********************************
        Now in short like eventloop continously monitors the call stack , callback queue , job queue
        So whenever the call stack is empty , 
        It tries to pull the callback from job queue first bz it has highest priority . executes all the callbacks in job queue first then it goes to callback queue & executes all functions in the callback queue
  **Example**
  ```javascript
    console.log("first callback");
    setTimeout(()=>{
      console.log("timer callback");
    },2000);
    fetch('urlpath')
    .then(()=>{
      console.log("fetch promise callback")
    })
    console.log("end callback");

    /**
    CONSOLE OUTPUT:-

    first callback
    end callback
    fetch promise callback
    timer callback

    **/
       
```
    steps :- 
     1) first it creates the global execution stack 

     2) Then executes first statement & gives the task to webAPI & immediately consoles "first callback"

     3) Now executes the setTimeout function & gives task to webAPI to run timer & push callback to callback queue after 2000 milliseconds time

     4) Now executes the fetch method & gives task to webAPI to execute promise function & push its callback to  job queue

     5) Now it executes the last console statement & gives the task to webAPI & immediately consoles "end callback"

     6) Now Global execution finishes all its execution . so it will be removed from the call stack

     7) Since call stack is empty . event loop checks first in the job queue then in callback queue whether any call back present since due to fetch promise method , a callback is pushed to job queue . 
        Therefore it will be pulled to the callstack

     8) Now promise callback is loaded & executes the console statement & gives the task to webAPI & immediately consoles "fetch  promise callback".

     9) promise callback after execution it will be removed and again callstack is empty

     10) Now since job queue is empty , callback from callback queue is pulled up to callstack by eventloop .

     11) Now timer callback is loaded & executes the console statement & gives the task to webAPI & immediately consoles "timer callback".

     12) timer callback after execution . it will be removed and program ends .

    
  ***

 # JS Engine & JS run time environment
   ## Definition :-
     JS engine is used to parse & run the js code . ( in short ) 
   ## In Depth explanation
      Before we go into JS engine , we need to know about JS run time environment.      
   ### JS run time environment
     JS run time enviroment is the container which is used to run the JS code with all the features like non-blocking operations
 
     So , it is like a container which contains few things which makes js code to compile & execute.
      They are  

     * JS engine
     * API
     * event loop mechanism
     * Call back queue
     * Job queue or microtask 

   API are used to run the code which are not executed using JS engine with the use of window object or any global object like
     
     * timer functions
     * console functions
     * local storage
     * callbacks etc.,
  Different run time environment will have different API's associated with it & also can have different implementation .

  For example , local storage which will be there in browser run time environment but not in the nodejs run time environment.

  So with the help of this run time environment we can run JS anywhere.

  We can create our own JS run time environment but we need to follow all the ECMA standards provided .
  
  First JS engine created is spider monkey.
  Most popular & used JS engine is V8 chrome engine

 ## JS engine architecture & its working
   JS engine is said as heart of JS run runtime environment .
   It has basically three main steps .

   * Parser

      parser is resposible for parsing the JS code & make a AST ( abstart syntax tree ) with tokens
       
      First parser takes code & convert them to tokens for each line of code .
      With these tokens ,  
      Syntax parser in it forms  a AST which is input to next step.

      To see the AST visually , go to website :- astexplorer.net

   * Compilation

       Complilation is responsible to compile the code & generate byte code which is input to next step.

      Before going to compilation process . we will talk little concepts of compilation
      
      We can compile using two methods 

        1) Interpretter

            Interpretter is something which will compile each line of code just after its encounter & generate byte code .
            This never worries about upcoming lines.
            This is considered as the fast compilation method

        2) Compiler 

            Compiler is something like which will compile all the lines of code & make a optimised code from it.
            Then generate teh byte code.
            This worries about errors before running the code.
            This is considered as the  most efficient compilation method.

            Optimizations like inline caching , inlining , copy elision etc.,

      Now JS engine comes with concept of **JIT Compilation**

        Which is something like make use of both methods like 
        first interpretter take one line of code , also simultaneously compiler will make that code to optimised as much as possible . Then it converts to byte code. 
        
        So that we can have fast & efficient compilation.

   * Execution
      
       Execution is responsible for executing the byte code provided from compilation phase.

       Execution does two things :- 

       1) Creation of memory in the heap memory for all variable & functions in the code
       2) Pushing & poping out the code into call stack for execution.
  
       one more important thing in execution which runs simultaneously is garbage collector .
       This is mechansim which collects all the unwanted variables & functions & removes its memory in the heap.
       This is due to many algorithms but mostly used algorithm is "mark & sweep" 

# setTimeout - concurrency model

   setTimeout function is a timer function where passed function will be executed after its timing counter is over . 
   
   But here trick part is setTimeout will not executed exactly after its timing got over instead once its timer gets over it will be pushed to callback queue.
   Now after callstack completely gets empty , function of setTimeout pushed into callback queue will be excecuted.

   **NOTE :-** So by this it is confirmed like timer function wont execute immediately after its time gets over 

   This will have no impact if the callstack gets empty before timing function gets over its time
   but if callstack will not get empty means its has something to execute which take more time than timer function then timer function will be delayed then the expected.

  **Examples**

   Code below doesn't impact on timer function Bz callstack get empty before timer function gets its time over
  ```javascript
    console.log("start");
    setTimeout(()=>{
   console.log("inside timer executes exactly after 5 secs");
    },5000)
    console.log("end");

/**
    output:-
     start
     end
     inside timer executes exactly after 5 secs  **/
```
   Code below has impact timer function Bz callstack wont get empty before timer function gets its time over
  ```javascript
    console.log("start");
    setTimeout(()=>{
   console.log("inside timer executes exactly 10 secs due to concurrency model");
    },5000)
    let startDate = new Date().getTime();
    let endDate = startDate;
    while(endDate < startDate + 10000){
      endDate =  new Date().getTime();
    }
    console.log("end");

/**
    output:-
     start
     end
    inside timer executes exactly 10 secs due to concurrency model . 


    This is because before even before callstack empty . timer function time wil get over & pushed to callback queue .
    Since callstack will get empty after 10 secs due to while loop . So it prints timer console immediately after callstack empty so it takes 10 secs to print. 
     **/
```

**This is called concurrency model where timer function runs concurrently**

Due to this event based mechanism makes javascript light weight fast execution language .

Makes it interpretted language since it doesnt wait for anything .

Javascript is synchronous single threaded language but even it is faster because of this event mechanism & concurrency model

**Imp Tip :- Never block main thread because if its blocked callstack wont get empty so event based function (like setTimeout ,callback etc., ) wont be executed**

# SetTimeout with 0 secs as timing

  ```javascript
    console.log("start");
    setTimeout(()=>{
   console.log("inside timer executes exactly after the line execution of callstack");
    },0)
    console.log("end");

/**
    output:-
     start
     end
    inside timer executes exactly after the line execution of callstack . 


    Even time of setTimeout  is zero it has to push into callback queue just after its registration in WebAPI . Then executes timer function callback after its final line execution code.

    This is when we want to defer code means when we want to execute function at last.  
     **/
```
# Functional Programming 

  Functional Programming is amazing part of JS . This is possible because functions are first-class citizens in JS

  **DEF :-**   
   * Functional programming is a paradigm in which programs are built in a declarative manner using pure functions & higher order fucntions  that avoid shared state and mutable data. 

     **Pure functions are the functions that always return the same value for the same input and don't produce side effects**

     **Higher order functions are the functions that can accept a function or return a function.**
   * Pure functions & higher order fucntions are the pillar of functional programming.
   * Many programmers consider this to be the best approach to software development as it reduces bugs and cognitive load.
   * Features of JavaScript that enable functional programming (.map, .reduce etc.)
   * JavaScript is multi-paradigm programming language (Object-Oriented Programming and Functional Programming live in harmony)

   **Simple way to explain functional programming is nothing but to follow the approach in programming where it uses simple function composition technique (Abstract the code into a new resuable function ) that follows DRY principle**

   Main advantages we get through functional programming are as below :- 

   * Reusability
   * Modularity
   * Optimized code
   * Helps in debugging code faster & also to reduce bugs

   Below is one simple example which shows beauty of functional programming which has above advantages

  Write a code to get circle metrics like area , circumference , diameter etc.,

  ## Without functional programming approach
```javascript
      const radiusArray = [3,1,2,4];

      const calculateArea = (radiusArrayInput) =>{
        const output = [];
        for(let i=0 ; i < radiusArrayInput.length; i++){
            output.push(Math.PI * radiusArrayInput[i] * radiusArrayInput[i])
        }
        return output;
      }
     console.log(calculateArea(radiusArray)) // Gives respective areas of all radius input

      const calculateCirumference = (radiusArrayInput) =>{
        const output = [];
        for(let i=0 ; i < radiusArrayInput.length; i++){
            output.push(2 * Math.PI * radiusArrayInput[i])
        }
        return output;
      }
     console.log(calculateCirumference(radiusArray)) // Gives respective cirumferences of all radius input

    const calculateDiameter = (radiusArrayInput) =>{
        const output = [];
        for(let i=0 ; i < radiusArrayInput.length; i++){
            output.push(2 * radiusArrayInput[i])
        }
        return output;
      }
     console.log(calculateDiameter(radiusArray)) // Gives respective diameters of all radius input
```
   ## With functional programming approach
```javascript
      const radiusArray = [3,1,2,4];

      const area = radius => Math.PI * radius * radius;
      const cirumference = radius => 2 * Math.PI * radius;
      const diameter = radius => 2 * radius;

      const calculate = (radiusArrayInput,logic) =>{
        const output = [];
        for(let i=0 ; i < radiusArrayInput.length; i++){
            output.push(logic(radiusArrayInput[i]))
        }
        return output;
      }
     console.log(calculate(radiusArray,area)) // Gives respective areas of all radius input
     console.log(calculate(radiusArray,cirumference)) // Gives respective cirumferences of all radius input
     console.log(calculate(radiusArray,diameter)) // Gives respective diameters of all radius input
```


   **Interview Tip:-** Follow function programming approach in coding round of interviews. 
