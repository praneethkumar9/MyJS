Generally in real world applications, we see like some APIs will frequently on each event Like for example 
button  .

Think like on each click on button an expensive API is called. Which is not good 

To get solve above kind of multiple unneccessary calls & execution .Throttling concept is used to improve performance by calling the function after some delay after previous function execution so that it will executes next function  

Or 

Throttling is a technique in which, no matter how many times the user fires the event, the attached function will be executed only once in a given time interval.

Def :-  Throttle methods do not execute when invoked. Instead, they wait for a predetermined time after  executing previous function. Here the previous is not cancelled but wait for certain time after function execution to call next function. This helps in improving performance
