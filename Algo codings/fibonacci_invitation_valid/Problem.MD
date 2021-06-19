Code Validity

Rufus wants to go to the Lily's birthday party to surprise Lily. But Lily's party invitation has a unique code on it which is in the form X-Y(e.g. 123-456). So Rufus need a invitation but he fails to get the invitation.

So he decided to make a invitation on his own with a fake code on it. But each code has a unique characteristic that the total Fibonacci numbers lies in the range X and Y are even in counting. But Rufus did not know about this characteristic of the code.

NOTE: Both numbers X and Y are inclusive in the range i.e. [X, Y].

Help Rufus to tell whether the code is valid code or not.

INPUT

First line of input contains number of test cases T and followed by next T lines, each contains two space space separated integers X and Y.

OUTPUT

If total Fibonacci numbers are even in the counting, print "VALID" otherwise, print "INVALID" .

Constraints

1 <= T <= 10

1 <= X, Y <= 100000

Test cases 2
Input   3 10 Output    INVALID
Input   2 8  Output    VALID
Explanation

[1] In first test case, Fibonacci numbers between 3 and 10 are 3, 5, 8 which are odd in counting i.e. 3. Hence the code is invalid code.

[2] In second test case, Fibonacci numbers between 2 and 8 are 2, 3, 5, 8 which are even in counting i.e. 4. Hence the