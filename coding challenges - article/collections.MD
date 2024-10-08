# Show the different ways of creating an array

    Arrays are the collection of values in javascript. Array is a special type of object in JavaScript

    Arrays values are indexed from 0 and have special property length which stores the count of elements present in array

    // literal form
    const arr = [];

    // consturctor form
    const arr = new Array();

    // pre defined number of slots
    const arr = new Array(10);

    // with values
    const arr = [1, true, "string"];

    // constructor form with values
    const arr = new Array(1, true, "string");

# Write a program to append and prepend, single or multiple values in to an array

    Values to the array can be appended using push method of array
    Values to the array can be prepended using unshift method of array

    const arr = [2, 3];
    arr.push(4);                    // [2, 3, 4]
    arr.unshift(1);                 // [1, 2, 3, 4]

    const arr = [3, 4];
    arr.push(5, 6);                 // [3, 4, 5, 6]
    arr.unshift(1, 2);              // [1, 2, 3, 4, 5, 6]

    const arr = [1, 2, 3];
    const otherArr = [4, 5, 6];
    arr.push(...otherArr);          // [1, 2, 3, 4, 5, 6]
    arr.unshift(...arr);            // [4, 5, 6, 1, 2, 3, 4, 5, 6]

    Notes
    To remove the elements from the end of the array pop operation can be used but one element at a time. To remove the elements from the start of the array shift operation can be used but one element at a time

# Show insertion and removal of elements can happen in the array for given index

    Values of the array can be removed from any position using splice method of array
    Values of the array can also be inserted to any position using splice method of array
    2nd argument is passed as 0 which inserts the elements without replacing
    The values passed after 2nd argument are considered for insertion

    const arr = [1, 2, 2, 3];
    const position = 2;
    const count = 1;
    arr.splice(position, count);        // [2]
    console.log(arr);               // [1, 2, 3]

    const arr = [1, 2, 4, 5];
    const position = 2;
    arr.splice(position, 0, 3);
    console.log(arr);               // [1, 2, 3, 4, 5]

    Notes
    'count' indicates the number of elements to be removed from the index 'position'. Multiple values can be inserted or removed using splice

# Show the different ways of emptying an array which has values

    Array can be emptied by giving a new reference of an empty array
    Setting the length of the array to 0 will automatically makes the array empty
    pop operation on array can also be used to empty the array where each elements get removed

    arr = [];
    arr.length = 0;
    while(arr.length > 0){
        arr.pop();
    }
    arr.splice(0, arr.length)

    Notes
    splice operation used here to empty the array is a trick by passing the length of the array as argument, where all the elements of the array get removed

# Check if given input is an array or not

    Array.isArray is a method which checks if the given argument is an array or not

    Alternatively the toString method present on Object prototype can be used to check if it is an array

    Array.isArray(arr);
    Object.prototype.toString.call(arr) === '[object Array]'

    Notes
    typeof operator cannot be used to check if a value is an array or not because array is an object and typeof arr returns us "object"

# Write a function which can concatenate 2 arrays. If only one array is passed it will duplicate it

    Function can take 2 arguments which concatenates arrays
    2nd array parameter can be defaulted to 1st array if the value is not passed

    function mergeArray(arr1, arr2 = arr1){
        return [...arr1, ...arr2];
    }
    function mergeArray(arr1, arr2 = arr1){
        return arr1.concat(...arr2);
    }
    function mergeArray(arr1, arr2 = arr1){
        arr1.push(...arr2);
        return arr1;
    }

    Notes
    When 2nd argument is not passed, the case is same as duplicating the array

# Write a program to replace 3 center elements of the 1st array by center 3 elements of the 2nd array

    slice method on array can be used to fetch the values of range in the array
    splice method on array can be used to replace the value of range in the array

    const a = [1, 2, 3, 4, 5];
    const b = [4, 0, 0, 0, 8];

    const startPositionFor1stArray = a.length / 2 - 1;
    const startPositionFor2ndArray = b.length / 2 - 1;
    a.splice(startPositionFor1stArray, 3, ...b.slice(startPositionFor2ndArray, startPositionFor2ndArray + 3));

    mine : 

    const con = (ar1,ar2)=>{
    let  aindex = (ar1.length/2)-1;
    let  bindex = (ar2.length/2)-1;
    let f = [...ar1];
    let replaceElements = ar2.splice(bindex,3);
    console.log(replaceElements)
    f.splice(aindex,3,...replaceElements);
    return f;
    }
    console.log(con([1,2,3,4,5,6],[3,4,6,5,8,0]))

    Notes
    The center most 3 values of array 'a' is replaced by 'b'

# Show how an array in JavaScript can act like a stack and queue

    Stack is a 'Last In First Out' data structure can be achieved using push and pop operations
    Queue is a 'First In First Out' data structure can be achieved using push and shift operations

    // To add the value to the stack
    arr.push(value);

    // To remove the value from the stack
    arr.pop();
    // To add the value to the queue
    arr.push(value);

    // To remove the value from the queue
    arr.shift();

# Sort the given array of integers in ascending or descending order

    sort method sorts the elements of an array in place and returns the sorted array
    It receives a function as an argument, which is used for comparision

    arr.sort((a, b)=> a - b);       // ascending
    arr.sort((a, b)=> b - a);       // descending

    Notes
    If function is not passed an argument, default sorting will happen

# Sort the given array of objects in ascending order according the authors lastname

            // Example
            const books = [
                { name: "Harry Potter", author: "Joanne Rowling" },
                { name: "Warcross", author: "Marie Lu" },
                { name: "The Hunger Games", author: "Suzanne Collins" },
            ]

    sort takes a function and expects the return value to be an integer for sorting
    The last names of the author can be compared and the result can be returned for sorting

    books.sort((book1, book2) => {
        const authorLastName1 = book1.author.split(" ")[1];
        const authorLastName2 = book2.author.split(" ")[1];
        return authorLastName2 > authorLastName1 ? -1 : 1;
    });

    mine :- 

    const compare = (a,b)=>{
    let aLast = a.author.split(' ')[1].toLowerCase();
    let bLast = b.author.split(' ')[1].toLowerCase();
    if(aLast<bLast){
        return -1
    }else if(aLast>bLast){
        return 1;
    }else{
        return 0;
    }
    }

    console.log(books.sort(compare))

    Notes
    Returning a true or false will not work as the algorithm expects an integer value

# Square all the positive numbers of the array and return the output array

    filter is the method on Array which can be used to filter. It receives a function which can return boolean to filter the elements
    map is the method on Array which can be used to map the values to new values. It receives a function which can return the modified value

    const positiveArr = arr.filter((value) => value >= 0);
    const squaredPositiveArr = arr.map((value) => value * value);
    const squaredPositiveArr = arr.filter((value) => value >= 0).map((value) => value * value);

    Notes
    2nd solution uses method chaining where the return value from filter fuction is an array on which map method is being called

# Write a code to generate an array with range of numbers and shuffle them

    An array of numbers in the range can be generated from a function which can take start and end value of the range
    The shuffling can be achieved simply by sorting the array using a function which randomly returns positive or negative numbers
    The shuffling of the values can be also done by picking a value from a random index from the current array and moving it in to a new array

    function rangeGenFunc(start = 1, end = 0) {
        const arr = [];
        for (let i = start; i <= end; i++) {
            arr.push(i);
        }
        return arr;
    }

    const arr = rangeGenFunc(1, 10);                    // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    arr.sort(() => 0.5 - Math.random());                // [6, 8, 5, 10, 4, 3, 9, 2, 7, 1]
    function* rangeGen(start = 1, end = 0) {
    for (let i = start; i <= end; i++){
        yield i;
    }
    }

    let arr = [...rangeGen(1, 10)];                     // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    let shuffledArr = [];
    const length = arr.length;
    for (let i = 0; i < length; i++) {
        shuffledArr.push(...arr.splice(Math.floor(Math.random() * arr.length), 1));
    }

    console.log(shuffledArr)                             // [5, 4, 7, 10, 3, 6, 8, 2, 1, 9]

    Notes
    2nd solution uses generator function to generate the range of values which can be converted to an array by spreading.

# Generate an array of objects with properties id and full name from an array of objects where each object will have id, firstname and lastname

    To manipulate array of objects map method can be used
    const employeesListWithFullName = arr.map((obj) => { return { id, fullName: obj.firstName + " " + obj.lastName } });

# Create an array by removing all the holes of the array

    Holes are undefined value present inside array
    Holes do not get iterated in filter which will just fetch all the values except undefined
    const uniqueArr = arr.filter(value => true);


    Notes
    Holes can be formed when an array value by index is deleted. Example: delete arr[index]. normal undefined values in array without formed by delete method will be seen in iteration

# Write a program to calculate the sum of all the values of an array

    Sum of the values of an array can calculated by iterating and adding all the values of the array
    reduce method of array can be used efficiently to calculate the sum with or without initial value

    const sum = arr.reduce((acc, value) => acc + value, 0);
    const sum = arr.reduce((acc, value) => acc + value);
    const sum = 0;

    for(let value of arr){
        sum = sum + value;
    }

    Notes
    reduce method takes a function as 1st argument and initial value as 2nd argument. The return value of current iteration will be 1st argument for the next iteration along with the next element of the array

# Get the maximum value from a numbers array along with its index

    Math.max is a method which returns maximum value from a given list of values
    reduce can also be designed to return the maximum value of each comparision

    const max = Math.max(...arr);
    arr.indexOf(max);           // position of max number

    let max = a[0], position = 0;
    for(let index in arr){
        if(arr[index] > max){
            position = index
            max = value;
        }
    }

    position;                   // position of max number

    const max = arr.reduce((a, b) => a < b ? b : a);
    arr.indexOf(max);           // position of max number

    Notes
    Though 2nd solution is verbose compared but has good performance

# Find the number of occurences of minimum value in the numbers list

    filter method can be used to fetch all the minimum values and we can get the count of those valuses
    const min = Math.min(...arr);
    minArr = arr.filter((value) => value === min);
    minArr.length;                                  // count of minimum value occurences

# Create an array of length n with all the values of it set to 10

    fill is a method on Array prototype which fills all the slots of array with the value given passed as the argument

    const n = 5;
    const arr = new Array(n);
    arr.fill(10);

    let arr = Array(n).fill(10)

    Notes
    If an object is passed the object reference is copied to all the slots and not the different objects

# Optimize the given statements having lot of logical checks to use a compact and cleaner logic

            // Example1
            browser === "chrome" || browser === "firefox" || browser === "IE" || browser === "safari"

            // Example2
            browser !== "chrome" && browser !== "firefox" && browser !== "IE" && browser !== "safari"
            Examples can be modified to store the values of comparision in an array and check for the presence of value if it is present inside array

    // Example1
    // browser === "chrome" || browser === "firefox" || browser === "IE" || browser === "safari"

    const browserList = ["chrome", "firefox", "IE", "safari"];
    browserList.includes(browser);

    // Example2
    // browser !== "chrome" && browser !== "firefox" && browser !== "IE" && browser !== "safari"

    const browserList = ["chrome", "firefox", "IE", "safari"];
    !browserList.includes(browser);

    Notes
    Generally this use case can be implemented for if conditions

# Write a program to iterate over a 2 dimensional array and print all the values of it

    Arrays can be iterated by using its index to fetch the values
    Arrays also can be iterated with for each style loops, with one loop to iterate the rows and inside it for cells
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            console.log(arr[i][j]);
        }
    }
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            console.log(arr[i][j]);
        }
    }
    for (let rowArr of arr) {
        for (let value of rowArr) {
            console.log(value);
        }
    }
    arr.forEach(rowArr => rowArr.forEach(val => console.log(val)));

# Write a program to store values in to a set

    Set lets us store unique values of any type
    Set can be created empty & then added with values or can be initialized also
    const set = new Set();
    set.add(1);
    set.add(true);
    set.add("text");
    set.add(1);

    set;            // 1, true, "text"
    const set = new Set([1, 2, 3]);

    set;            // 1, 2, 3

# Write a program to store values in to a map

    Map holds key-value pairs and remembers the original insertion order of the keys
    Map can be created empty & then added with values or can be initialized also with key-value pairs
    const map = new Map();
    map.set(1, 1000);
    map.set(true, false);
    map.set("text", "String");

    map;                                                            // [1, 1000] [true, false] ["text", "String"]
    const map = new Map([[1, "One"], [2, "two"], [3, "three"]]);
    map;                                                            // [1, "One"] [2, "two"] [3, "three"]
    Notes
    Unlike objects, Map can have any primitive or object as the key

# Write a code to iterate over a set

    set is an iterable object and can be iterated using for..of loop
    set can also be iterated by simple forEach loop
    for(let val of set) console.log(val);
    set.forEach(value => console.log(value));

# Write a code to iterate over a map

    map is an iterable object and can be iterated using for..of loop
    map can also be iterated by simple forEach loop
    for(let val of map) console.log(val[0], val[1]);
    for(let key of map.keys()) console.log(key, map.get(key));
    map.forEach((value, key) => console.log(key, value));

# Show how map is different from object to store key value pairs with coding example

    Map does not contain any keys by default unlike objects which has keys from its prototype
    Map's keys can be any value (including functions, objects, or any primitive) unlike object where keys are only strings
    The keys in Map are ordered in a simple, straightforward way
    The number of items in a Map is easily retrieved from its size property
    Map is an iterable object
    map.set(1, 'Mapped to a number');           // primitive number as key
    map.set('1', 'Mapped to a string');         // string value as key
    map.set({}, 'Mapped to a object');          // object as key
    map.set([], 'Mapped to an array');          // array as key
    map.set(()=>{}, 'Mapped to a function');    // function as key
    Notes
    Maps perform better than objects in most of the scenarios involving addition and removal of keys

# Design a flat function which flattens an array to any depth

    Flat function can be used to flatten the array by recursive call
    function flat(arr){
        const flatArr = [];
        arr.forEach((value) => {
            if(Array.isArray(value)){
                 flatArr.push(...flat(value));
            }
            else{
                flatArr.push(value);
            }
        });
        return flatArr;
    }

# Check if all the students of have passed or not (40 is the pass marks)

    every is a method on Array prototype which returns true only if all the elements condition satisfies the condition
    const isAllPass = students.every((student) => student.marks >= 40);

# Get the average of all the salaries which is greater than 10000 from the department of "IT" from the array of objects)

    const itEmployeesWithSalaryGT10K = employees.filter((employee) => employee.salary > 10000 && employee.dept === 'IT );
    const itTotalSalaryGT10K = itEmployeesWithSalaryGT10K.reduce((acc, value) => acc + value, 0);
    const itAvgSalaryGT10K = itTotalSalaryGT10K / itEmployeesWithSalaryGT10K.length;

# Get the list of all distinct elements which are present in both list of numbers

    The intersection array will be the result if the common elements from the 2 arrays are picked

    const intersectionArr = arr1.filter(value => arr2.includes(value));
    const distinctIntersectionArr = [...new Set(intersectionArr)];

    const set1 = new Set(arr1);
    const set2 = new Set(arr2);
    const distinctIntersectionArr = [...set1].filter(value => set2.has(value));

# Extract list of elements present only in the first list given.

    The only present elements of 1st list will be the result when all the elements of 1st list not present in the 2nd are chosen
    const set1 = new Set(arr1);
    const set2 = new Set(arr2);
    const intersectionArr = [...set1].filter(value => !set2.has(value));

    Notes
    Elements of 2nd list only can be obtained by checking for all the elements of lis 2 which are not present in list1

# Create a function named "average" which can calculate the average of an array and should be available to be called from any Array object.

    The function added to Array prototype are accessible to all the objects of Array
    Array.prototype.average = function (){
        let total = 0;

        for(let index in this) {
        total += this[index];
        }
        return total / this.length;
    }

    mine 

    Array.prototype.average = function(){
    let sum = this.reduce((acc,value)=>acc+value);
    return sum/this.length;
    }
    let d = [1,2,3,4]
    console.log(10/4)

# Write a program to polyfill filter functionality of the Array

    filter iterates over the all values of array and passes value, index and array (itself) as the arguments
    Function returns a new array which filtering the values of the original array

    if (!Array.prototype.filter) {
    Array.prototype.filter = function(callback) {
        
        if(typeof callback !== "function")
            throw new Error("Argument passed has to be a function");
    
        let newArray = [];

        for(let index in this) {
        if(callback(this[index], index, this)){
            newArray.push(this[index]);
        }
        }
        return newArray;
    }
    }

    Notes
    The solution is a simple polyfill of filter and not intended to handle all scenerios

# Write a program to polyfill map functionality of the Array

    map iterates over the all values of array and passes value, index and array (itself) as the arguments
    Function returns a new array which is same as the length of the original array
    if (!Array.prototype.map) {
    Array.prototype.map = function(callback) {
        if(typeof callbak !== "function")
            throw new Error("Argument passed has to be a function");
            
        let newArray = [];

        for(let index in this) {
        newArray.push(callback(this[index], index, this));
        }
        return newArray;
    }
    }
    Notes
    The solution is a simple polyfill of map and not intended to handle all the corner scenarios

# Write a program to polyfill reduce functionality of the Array

    reduce iterates over the all values of array and passes value, index and array (itself) as the arguments
    reduce accepts an optional initial value which when not provided can be skipped
    Function returns a single value after all the iteration

    if (!Array.prototype.reduce) {
    Array.prototype.reduce = function(callback, init) {
        let startPosition = 0;
        let accumulator = init ?? this[startPosition++];

        for(let index = startPosition; index < this.length; index++) {
        accumulator = callback(accumulator, this[index], index, this);
        }
        return accumulator;
    }
    }

    Notes
    The solution is a simple polyfill of reduce and not intended to handle all the corner scenarios

# Write a code to eliminate duplicate objects in an array where each object has an 'id' property which can be used to identify the object and the duplicate object with lower rank to be removed

    // Example
    const arr = [
        {
            id: 1,
            name: 'emp1',
            rank: 4,
        },
        {
            id: 2,
            name: 'emp2',
            rank: 1,
        },
        {
            id: 2,
            name: 'emp2',
            rank: 2,                // this is a duplicate object (id = 2) and has lower rank 
        },
        {
            id: 3,
            name: 'emp3',
            rank: 3,
        },
    ];
    The duplicate objects cannot be removed using Set as the 2 objects with same structure and data have different references
    Map can be used to have 'id' as the key and object as value
    If 'id' is already present in the array, object with the higher rank can be retained
    const map = new Map();

    arr.forEach(obj => {
        if (map.has(obj.id)) {
            if (obj.rank > map.get(obj.id)) {
                map.set(obj.id, obj);
            }
        } else {
            map.set(obj.id, obj);
        }
    });

    distinctArr = [...map.values()];

# Create an array which will only accept string values. (Homogeneous array of strings)

    Array in JavaScript a collection of values of any type by default
    Proxy can be used to validate and insert to the array only if the value satisfies the condition using set trap
    var stringsArr = [];

    var stringsArr = new Proxy(stringsArr, {
    set(target, prop, receiver){
        if(typeof receiver === "string"){
        target[target.length] = receiver;
        }
        return true;
    }
    });

    // driver code
    stringsArr.push("Hello", 5, {}, "world", true, [1, 2, 3]);
    stringsArr;                                                     // ["Hello", "world"]
    Notes
    The functionality of the code can be modified to make the array accept any one or more kind of values only

# Create a Proxy object through which the array can be accessed as usual but also allow to access the values through negative indices

    // Example
    let arr = [10, 20, 30];

    arr[-1];            // 30
    arr[-2];            // 20
    get trap of proxy can be used to map the negative index to the valid array position
    arr = new Proxy(arr, {
        get(target, handler) {
            if (handler < 0) return target[target.length + Number(handler)];
            else return target[handler];
        },
    });