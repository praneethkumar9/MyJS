Generally in real world applications, we see like some APIs will frequently on each event Like for example 
Search tab .

So on each keystroke we will call an API to get the search results  which makes many calls.

Example :  when we search "clean" . It calls API for 5 times for each word but what we require is search result of single word clean.

To get solve above kind of multiple unneccessary calls & execution .debounce concept is used to improve performance by calling the function after some delay then it will debounce back & executes the functionality

Or 

Debouncing is nothing but reducing unnecessary time consuming computations so as to increase browser performance. There are some scenarios in which some functionalities take more time to execute a certain operation. For instance, take an example of a search bar in an e-commerce website.

Def :-  Debounce methods do not execute when invoked. Instead, they wait for a predetermined time before executing. If the same method is called again, the previous is cancelled and the timer restarts. This helps in improving performance
