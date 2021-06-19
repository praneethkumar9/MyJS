# Show the different ways of creating an object

    Object can be created using Object constuctor
    Object can also be created using Object literal form
    Object can be created using new keyword to constructor function
    Object can be created using Class
    const object = Object.create({ key: value });
    const object = {
        key: value
    }
    function getObject(key, value){
        this[key] = value;
    }

    const object = new getObject('key', 'value');
    class Obj {
        constructor(key, value){
            this[key] = value;
        }
    }

    const object = new Obj('key', 'value');

# Display all the keys of an object

    The keys of an object can be obtained using Object.keys

    for(let key in obj){
        if (obj.hasOwnProperty(key)) {
            console.log(key);
        }
    }
    for(let key of Object.keys(obj)){
        if (obj.hasOwnProperty(key)) {
            console.log(key);
        }
    }
    Object.keys(obj).forEach((key) => {
        if (obj.hasOwnProperty(key)) {
            console.log(key);
        }
    });

    Notes
    obj.hasOwnProperty(key) is used to only display the properties present on the object and not inherited ones.

# Display all the values of an object

    The values of an object can be obtained using Object.values which returns an array of values
    console.log(Object.values(obj));
    for(let value of Object.values(obj)){
        console.log(value);
    }
    Object.values(obj).forEach((value) => console.log(value));
    for(let key in obj){
        if (obj.hasOwnProperty(key)) {
            console.log(obj[key]);
        }
    }
    Notes
    Object.values will only fetch the values of the object and not inherited ones

# Write a function which can check if a given object is empty or not

    Object is empty if it has no keys
    Few objects such as Date object does not have any keys but still are not empty. Hence additional check can be implemented to verify the stringification of the object is also empty

    function isObjectEmpty(obj){
        if(obj !== null && typeof obj !== "undefined" && typeof obj === "object")
            return Object.keys(obj).length === 0 && JSON.stringify(obj) === "{}";
        else
            return false;
    }
    Notes
    obj.constructor === Object is also used to verify along with the length of keys to check if object is empty which works for objects created with literal form

# Display all the keys and values of a nested object

    typeof operator on value gives the type of value
    Recursive solution can be used to iterate over all the nested objects

    function keyValuePrinter(obj){
        for(let key in obj){
            if(typeof obj[key] !== "object"){
                console.log("[" + key + " : " + obj[key] + "]");
            }
            else{
                keyValuePrinter(obj[key]);
            }
        }
    }

# Write a program which can empty a given object

    Object can be emptied by removing all the keys present on it
    Alternatively, a new object can be created and the prototype of the new object can be set as prototype of old object

    for(let key in obj){
        if(obj.hasOwnProperty(key)){
            delete obj[key];
        }
    }
    const newObj = {};
    Object.setPrototypeOf(newObj, obj);

    Notes
    'obj' is considered to be the object to be emptied

# Show how a copy of an object can be done

    copy is done by copying all the properties of the object to another object

    const x = Object.assign({}, obj); -- shallow
    const x = { ...obj};              -- shallow
    const x = JSON.parse(JSON.stringify(obj)); --- deep

# Create an empty object which has no prototype attached to it

    Objects created in JavaScript will have a prototype object on it connected to other object or Object
    Object constructor can be used to create such an empty object

    const obj = Object.create(null);

# Create an array of pair of values (key, value) from an object and store it in a map. Consider the object is not nested

    As the object is not nested, the key-value pairs can be obtained directly by using Object.entries
    Map can be initialized with key-value pairs
    const map = new Map(Object.entries(obj));

# Show the usage of 'Object.fromEntries' to create an object from key value pairs

    The key value pairs can be directly converted to object using entries method of Object

    const arr = [ ['0', 'a'], ['1', 'b'], ['2', 'c'] ];
    const obj = Object.fromEntries(arr);

    const map = new Map([ ['foo', 'bar'], ['baz', 42] ]);
    const obj = Object.fromEntries(map);

    References
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries

# Connect 2 objects so that one object is prototypically connected to the other

    Objects in JavaScript are connected its prototype and is accessible for objects getPrototypeOf or __proto__
    setPrototypeOf is used to set the prototype of the object

    const obj1 = { a: 1 };
    const obj2 = { b: 2 };
    obj2.setPrototypeOf(obj1);

    const obj1 = { a: "Object 1 value" };
    const obj2 = { b: "Object 2 value" };
    obj2.__proto__ = obj1;

    Notes
    The lookup happens at the object level initially and if the key is not found, prototype chain lookup happens

# Create an object with getter and setter for property

    getter and setter on the properties of object can be used to control the read and write behavior

    const obj = {};

    Object.defineProperty(obj, 'data', {
        _data: 0,                           // closure variable to hold the data
        get() {
            return this._data;
        },
        set(value) {
            this._data = value;
        }
    });

    Notes
    If the this.data is accessed directly, the function will call itself infinitely. Hence, we would require one more variable to store the data

# Show the different types of accessor properties available for object property and write a code defining them
  
   * value accessor is used to set the value of the property
   *  writable accessor is used to set if the property can be modified or not
   * configurable accessor is used to set the property to be configurable or not
   *  enumerable accessor is to set the property to be considered in enumeration

    var obj = { };

    Object.defineProperty(obj, 'prop', {
        value: 1,
        writable: true,
        configurable: true,
        enumerable: true
    });

    Notes
    Except value, other accessort mentioned accept true or false

# Create an object with a property 'marks' which cannot be set to a value less than 0

    getter and setter on the properties of object can be used to control the read and write behavior
    const obj = { marks: 0 };

    Object.defineProperty(obj, 'marks', {
        set(value) {
            if(value < 0)
                throw new Error("Marks cant be less than zero");
            marks = value;
        },
        get() {
            return marks;
        }
    });

    const obj = {
        _marks: 0,

        set marks(value){
            if(value < 0)
                throw new Error("Marks cant be less than zero");
            this._marks = value;
        },

        get marks(){
            return this._marks;
        }
    }

    Notes
    2nd solution shown directly defines getter and setter for property marks, hence uses another variable to store the data

# Create an object which has a property 'userid' which can only be set once and will be a read only property
   
    Property accessor writable to true sets the property to be read only

    function userObjectCreator(id){
        const obj = { };

        Object.defineProperty(obj, 'userid', {
            value: id,
            writable: false
        });

        return obj;
    }

    const obj = userObjectCreator(1);

    Notes
    obj.id is a ready only property and does not allow overwriting

# Show the different options available to prevent the modifications to the object

   * preventExtensions is an Object method which prevents addition of any new property to an object
   * seal is an Object method which prevents addition and deletion of any property in an object
   * freeze is an Object method which prevents addition, deletion and update of any property of an object
   * There are also methods isExtensible, isSealed and isFrozen on Object to check

    Object.preventExtensions(obj);
    Object.isExtensible(obj);       // true

    Object.seal(obj);
    Object.isSealed(obj)            // true

    Object.freeze(obj);
    Object.isFrozen(obj);           // true

# Design a function which takes an array as input and returns a function 'next', calling which fetches a value one by one

    The function returned next will return an object which contains value and done properties

    function makeIterator(array) {
        let nextIndex = 0;
        return {
            next: function () {
                return nextIndex < array.length
                    ? {
                        value: array[nextIndex++],
                        done: false,
                    }
                    : {
                        done: true,
                    };
            },
        };
    }

    // driver code
    let it = makeIterator(['yo', 'ya']);
    it.next().value;                        // 'yo'
    it.next().value;                        // 'ya'
    it.next().done;                         // true

    References
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/iterator

# Stringify an object by excluding the 'password' property

    // Example
    const obj = {
        id: 1,
        username: 'John',
        password: 'secret',
        email: 'john@email.com',
    };

    JSON.stringify is the method which can be used for stringification of an object or any other value
    It accepts 2nd argument which can be a function or array

    JSON.stringify(obj, (key, value) => key === 'password' ? undefined : value);        
    // {"id":1,"username":"John","email":"john@email.com"}

    JSON.stringify(obj, ['id', 'username', 'email']); 
    // {"id":1,"username":"John","email":"john@email.com"}

# Create an object 'obj' with functions assigned to keys. Show how can we achieve 'obj.func1().func2().func3()' considering func1, func2, func3 are object keys

    For achieving chaining functionality, each function can return the calling context itself so that context is retained

    var obj = {
        id: 1,
        username: "Jane",
        dept: "Computers",

        displayId(){
            console.log("Id: " + this.id);
            return this;
        },
        
        displayName(){
            console.log("Name: " + this.username);
            return this;
        },
        
        displayDept(dept){
            if(typeof dept !== "undefined"){
                this.dept = dept;
            }
            console.log("Dept: " + this.dept);
            return this;
        }
    }

    // driver code
    obj.displayId().displayName().displayDept("Info Tech");

    Notes
    Order of calling the functions does not matter as all the functions are returning object itself

    References
    https://medium.com/technofunnel/javascript-function-chaining-8b2fbef76f7f

# Write a polyfill for Object.create

    The creating of object can happen by making constructor call to the function

    if (typeof Object.create !== 'function') {
        Object.create = function (proto, propertiesObject) {
            if ((typeof proto === 'object' || typeof proto === 'function') &&typeof propertiesObject !== 'undefined') {
                // F is a dummy empty function
                function F() {}
                F.prototype = proto;
                return new F();
            } else {
                throw new TypeError('Invalid proto or properties object');
            }
        };
    }

    References
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create

# Write a code show Optional chaining for objects and functions

    The optional chaining operator (?.) permits reading the value of a property located deep within a chain of connected objects
    The expression short-circuits with a return value of undefined in the absence of property

    // object property access
    obj.val?.prop;

    // object property access through bracket notation
    obj.val?.[expr]

    // array index access
    obj.arr?.[index]

    // object property access for function call
    obj.func?.(args)

    References
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining

# Create an object with property counter which keeps incrementing on every access
            const obj = counterObject();
            obj.counter;                    // 1
            obj.counter;                    // 2
            obj.counter;                    // 3

    The access to the property of the object can be configured through property getter
    A separate private variable can be maintained track the value and getter on each access to increment and return the value

    function counterObject() {
        const symCounter = Symbol('counter');

        const obj = {
            [symCounter]: 0,

            get counter() {
                return ++this[symCounter];
            },

            set counter(value) {
                throw new Error('Cannot set the counter');
            },
        };
        return obj;
    }

    Notes
    Symbol is used to maintain the private variable in the object. Using the private variable to store the data such as _counter is also a well known pattern before symbols

# Create an object and make it behave like an array which allows push and pop operations on items

    Object does not have by default a property named 'length' and hence we can define it on object which helps to track the length
    'push' and 'pop' functions can be added to the object which internally calls the Array methods push and pop by passing the object context

    const arrayLikeObject = {
        length: 0,
        push: function (item) {
            Array.prototype.push.call(this, item);
        },
        pop: function () {
            Array.prototype.pop.call(this);
        }
    };

    // driver code
    arrayLikeObject.push('first');
    arrayLikeObject.push('second');
    arrayLikeObject.pop();
    arrayLikeObject;                                // { length: 1, 0: first } 

    Notes
    As the context for array methods is set object, length of the object changes whenever push and pop operations take place

    BZ --- The push() method adds one or more elements to the end of an array and returns the new length of   the array. same with pop

    mine:-  

            // Example
        const obj = {
            index : 0,
            push(value){
            this[this.index++] = value
            },
            pop(){
            --this.index
            delete this[this.index]
            },
            get length(){
            return Object.keys(this).length-4
            }
        };
        obj.push(2);
        obj.push(2);
        obj.pop(2);
        obj.pop(2);
        console.log(obj)

# Write a function which can be used to deeply compare 2 nested objects

    // Example
    const obj1 = {
        name: 'John',
        details: {
            x: 1,
            y: 2,
        },
    };

    const obj2 = {
        name: 'John',
        details: {
            y: 2,
            x: 1,
        },
    };

    deepEqual(obj1, obj2);              // true
    The objects can be deeply compared by checking the key value pairs recursively
    function deepEqual(object1, object2) {
        const keys1 = Object.keys(object1);
        const keys2 = Object.keys(object2);

        if (keys1.length !== keys2.length) {
            return false;
        }

        for (const key of keys1) {
            const val1 = object1[key];
            const val2 = object2[key];
            const areObjects = val1 != null && typeof val1 === 'object' && val1 != null && typeof val2 === 'object';
            if ((areObjects && !deepEqual(val1, val2)) || (!areObjects && val1 !== val2)) {
                return false;
            }
        }

        return true;
    }
    Notes
    Stringification of both objects and comparision will also work, but fails on keys order mismatch

# Design a class for employee which takes id and name in during construction of object and has a salary property

    Classes are a template for creating objects. They encapsulate data with code to work on that data
    The constructor method is a special method for creating and initializing an object created with a class
    Objects of the class can be created using new keyword followed by classname

    class Employee {
        constructor(id, name) {
            if (typeof id !== 'undefined' && typeof name !== 'undefined') {
                this.id = id;
                this.name = name;
            } else
                throw new Error('Employee id and name are mandatory for new employee creation');
        }

        getId() {
            return this.id;
        }

        getName() {
            return this.name;
        }

        setSalary(base, variable) {
            this.salary = base + variable;
        }

        getSalary() {
            return this.salary;
        }
    }

    // driver code
    const emp = new Employee(1, "John Doe");
    emp.setSalary(10000, 1000);
    emp.getSalary();                            // 11000

    Notes
    Class in JavaScript is functionality to achieve class based model on top of prototype based programming model of JavaScript

# Show the usage of static variable & function in a class and accessing it from the code

    Static members of the class are class level variables and not created for each instances of the class
    Static members can be accessed directly using class name

    class Browser {

    static className = "Browser";

    constructor(os, browserName){
        this.os = os;
        this.browserName = browserName;
    }

    static areTheySameBrowsers(browser1, browser2) {
        return browser1.browserName === browser2.browserName;
    }
    }

    // driver code
    const browser1 = new Browser("Linux", "Chrome");
    const browser2 = new Browser("Windows", "Firefox");

    Browser.className;                                      // Browser
    Browser.areTheySameBrowsers(browser1, browser2);        // false

# Write a class which uses private variable and function

    Private members of the class are only accessible within the class and instances of the class do not have access to it
    Private members can be created with the prefix '#' before the name of the class member
    class ClassWithPrivateFields {
        #privateVar;
        publicVar;

        #privatFunc() {
            this.#privateVar = 7;
            this.publicVar = 10;
        }

        publicFunc() {
            this.#privatFunc();
            return [this.#privateVar, this.publicVar];
        }
    }

    // driver code
    const instance = new ClassWithPrivateFields();

    // can't access private variable
    instance.privateVar;                     // undefined

    // can't access private function
    instance.privatFunc();                  // Error
    instance.publicFunc();                  // 7, 10

# Classical inheritance with Object.create()

    Below is an example of how to use Object.create() to achieve classical inheritance. This is for a single inheritance, which is all that JavaScript supports.

    // Shape - superclass
    function Shape() {
    this.x = 0;
    this.y = 0;
    }

    // superclass method
    Shape.prototype.move = function(x, y) {
    this.x += x;
    this.y += y;
    console.info('Shape moved.');
    };

    // Rectangle - subclass
    function Rectangle() {
    Shape.call(this); // call super constructor.
    }

    // subclass extends superclass
    Rectangle.prototype = Object.create(Shape.prototype);

    //If you don't set Rectangle.prototype.constructor to Rectangle,
    //it will take the prototype.constructor of Shape (parent).
    //To avoid that, we set the prototype.constructor to Rectangle (child).
    Rectangle.prototype.constructor = Rectangle;

    var rect = new Rectangle();

    console.log('Is rect an instance of Rectangle?', rect instanceof Rectangle); // true
    console.log('Is rect an instance of Shape?', rect instanceof Shape); // true
    rect.move(1, 1); // Outputs, 'Shape moved'

# Show how inheritance works in Class and the use of super keyword with working example

    Class level inheritance can happen when a class inherits from another class using the keyword extends
    The child class can access parent class members using the keyword super
    The non private members of parent class become available to child class when inherited

    class BaseComponent {
        constructor(componentName) {
            this.componentName = componentName;
        }

        setState(obj) {
            this.state = obj;
            this.render();
        }

        addValues(props) {
            return props.reduce((a, b) => a + b);
        }
    }

    class Component extends BaseComponent {
        constructor(name = '', props) {
            super(name);                            // super() is used to call parent class consturctor
            this.state = { ...props };
        }

        addValues(...props) {
            const sum = super.addValues(props);     // super.property is used to access parent class property
            this.setState({ sum, props });
        }

        render() {
            console.log(`Sum of ${this.state.props} is ${this.state.sum}`);
        }
    }

    // driver code
    let component = new Component('UI Component');
    component.componentName;                        // UI Component
    component.addValues(3, 5);                      // Sum of 3,5 is 8
    component.addValues(9, -4, 6, 2);               // Sum of 9,-4,6,2 is 13
    Notes
    super call to constructor within constructor of child class must be the first statement

    References
    https://javascript.info/class-inheritance

# Show the way of using Proxy for object

    The Proxy object enables create a proxy for another object, which can intercept and redefine fundamental operations for that object

    Proxy can be set for objects (including functions and arrays) to intercept the values which gives us the control on access and modification of the real object
    Proxy takes 1st argument as an object / function and 2nd argument as a object with different function traps

    let obj = {
        key: "value"
    };

    let proxy = new Proxy(obj, {
        get(target, handler){
            console.log("Proxy get is invoked on target with property: " + handler);
            return target[handler];
        },
        set(target, handler, value){
            console.log("Proxy set is invoked on target object with property: " + handler + " and value: " + value);
            target[handler] = value;
        }
    });

    // driver code
    proxy.key2 = "value2";      // Proxy set is invoked on target object with property: key2 and value: value2
    proxy.key1;                 // Proxy get is invoked on target with property: key1

    Notes
    There are lot of other traps used in Proxy apart from get, set, apply

# Show how can we use for..of loop to iterate on a range with given start and end values in an object

    // Example
    let range = {
        start: 1,
        end: 10
    };

    for (let i of range) console.log(i);        // 1 2 3 4 5 6 7 8 9 10
    For..of loop uses iterator of an object to fetch the values one at a time
    Defining an iterator Symbol on the object to iterate from start to end will fetch the values of the range
    Object.defineProperty(range, Symbol.iterator, {
        value: function () {
            let i = this.start;
            return {
                next: () => (i <= this.end ? { value: i++, done: false } : { value: undefined, done: true }),
            };
        },
    });

# Write a program which can return a boolean if value is present in the range with given start and end values in an object

    // Example
    let range = {
    start: 10,
    end: 50
    };

    5 in range;             // false
    25 in range;            // true
    The object in can be trapped using Proxy trap has, to check if the value is in the range or not
    range = new Proxy(range, {
        has(target, value){
            return value >= target.start && value <= target.end;
        }
    });

# Write a function which accepts a topic and a list of related tags to store the information. The same function should return all the topics when requested with a tagname

        // Example
        const tagManager = TagManager();
        tagManager.addTags('React', 'Redux, JSX, JavaScript, VDOM');
        tagManager.addTags('Angular', 'RxJS, TypeScript, JavaScript');
        tagManager.addTags('Vue', 'VDOM, JavaScript');

        tagManager.getTopics('VDOM');             // React, Vue
        tagManager.getTopics('JavaScript');       // React, Angular, Vue

    The tags can be stored as keys and array of topics as values in a map
    Function module can be desgined to expose 'addTags' and 'getTopics' by tagname
    function TagManager() {
        const map = new Map();

        function addTags(topic, tagText) {
            const tagsArr = tagText.split(',').map(tag => tag.trim());

            tagsArr.forEach(tag => {
                if (map.has(tag)) {
                    map.get(tag).push(topic);
                } else {
                    map.set(tag, [topic]);
                }
            });
        }

        function getTopics(tag) {
            return map.get(tag);
        }

        return {
            addTags,
            getTopics
        }
    }

    mine :

    const tagManager1 = () => {
    let keys = {}
    let getTopics = (tag) => keys[tag];
    let addTags = (topic,tags) => {
        tags = tags.split(',');
        tags.forEach(tag=>{
        tag = tag.trim();
        if(keys[tag]){
            let topics = [...keys[tag],topic];
            keys[tag] = topics;
        }else{
            keys[tag] = [topic];
        }
        })
        console.log()
    }
    return {
        addTags, getTopics
    }
    }
    const tagManager = tagManager1();
    tagManager.addTags('React', 'Redux, JSX, JavaScript, VDOM');
    tagManager.addTags('Angular', 'RxJS, TypeScript, JavaScript');
    tagManager.addTags('Vue', 'VDOM, JavaScript');

    console.log(tagManager.getTopics('VDOM'));             // React, Vue
    console.log(tagManager.getTopics('JavaScript')); 

# Prove that private looking variable in a function is not really private specific to that object

    Private looking variables can be created in a function and can given access by providing function interfaces
    The functions maintain a closure over function variables and hence the function variables persist inside the function interfaces
    Though the variable is private within the function and cannot be accessed, these variables are not private to the created object

    function ObjectCreator() {
        var privateVar = 0;
        
        // function interfaces get, set
        this.getPrivateVar = function () {
            return privateVar;
        };
        this.setPrivateVar = function (value) {
            privateVar = value;
        };
    }

    // driver code
    var obj = new ObjectCreator();
    obj.setPrivateVar(10);
    obj.getPrivateVar();                            // 10

    var privateVarAccessor = { 
        get: obj.getPrivateVar, 
        set: obj.setPrivateVar 
    };

    // obj private variable is accessible by other external entities
    privateVarAccessor.set(5);
    privateVarAccessor.get();                       // 5
    obj.getPrivateVar();                            // 5

# Write a function which accepts a collection of values & an iteratee as arguments and returns a grouped object

            // Example
            groupBy([6.1, 4.2, 6.3], Math.floor);               // { 6: [6.1, 6.3], 4: [4.2] }
            groupBy(['one', 'two', 'three'], 'length');         // { 3: ['one', 'two'], 5: ['three'] }

    As the 2nd argument is either a functin or property, the iteratee can be perfrom accordingly on the value of arrays
    An empty object can be created and used to push the values of array to respective property of the iteratee output
    function groupBy(values, iteratee) {
        const obj = {};
        for (let value of values) {
            const prop = typeof iteratee === 'function' ? iteratee(value) : value[iteratee];
            prop in obj ? obj[prop].push(value) : (obj[prop] = [value]);
        }

        return obj;
    }

# Design a utility on an array of objects where the access can be made to the object using index (as usual) and also from primary key of the object

            // Example
            const employees = [
                { name: 'John', id: '1' },
                { name: 'Jane', id: '2' },
                { name: 'Pai', id: '0' },
            ];

            flexEmployees[0]              // { name: 'John', id: '1' }
            flexEmployees['Pai']          // { name: 'Pai', id: '0' }
            flexEmployees['doe']          // undefined

    The access to the index happens for arrays by default and the Proxy can be setup to enable the fetching of object using primary key (any other key can also be coded)
    const flexEmployees = new Proxy(employees, {
        get(target, handler) {
            if (handler in target) {
                return target[handler];
            } else if (typeof handler === 'string') {
                return target.find(obj => obj.name === handler);
            } else {
                return undefined;
            }
        },
    });

# Write a function which receives an object and returns a true if the object has circular reference

            // Example
            var circularReferenceObj = { data: 123 };
            circularReferenceObj.myself = circularReferenceObj;

    Stringification of an object having circular references will throw error
    function doesObjectHaveCircularRef(obj){
        try{
            JSON.stringify(circularReference);
            return false;
        }
        catch{
            return true;
        }
    }

# Write a code which can eliminate circular references in an object (Cyclic reference in an object)

    Circular / cyclic reference exists when the object property value forms a cycle
    The circular references can be eliminated by passing a function to take care of circular references during stringification
    The circular references can be also be eliminated by setting the such property value to null on the object itself
    const getCircularReplacer = () => {
        const seen = new WeakSet();
        return (key, value) => {
            if (typeof value === 'object' && value !== null) {
                if (seen.has(value)) {
                    return;
                }
                seen.add(value);
            }
            return value;
        };
    };

    JSON.stringify(circularReferenceObj, getCircularReplacer());
    function removeCircularRef(obj) {
        const set = new WeakSet([obj]);

        (function iterateObj(obj = circularReference) {
            for (let key in obj) {
                if (obj.hasOwnProperty(key)) {
                    if (typeof obj[key] === 'object')
                        if (set.has(obj[key])) delete obj[key];
                        else {
                            set.add(obj[key]);
                            iterateObj(obj[key]);
                        }
                }
            }
        })();
    }
    Notes
    circularReferenceObj is assumed to be an object with cyclic reference

# Provide an object on which a value can be set to nested property even if it does not exist.

        The nested object can be accessed only if all the nested properties are defined on the object
        A proxy can designed to create such nested object properties on demand whenever such non existent property is requested and attempted to set with value
        get trap of proxy can be used to create the objects dynamically and set the value
        function ProxyObject(obj) {
            return new Proxy(obj, {
                get: (target, property) => {
                    if (!(property in target)) {
                        target[property] = new ProxyObject({});
                    }
                    return target[property];
                },
            });
        }

        // driver code
        const obj = new ProxyObject({});
        obj.x.y.z = 'nested value';

        obj.x.y.z;                      // nested value

