 You will be given a list of stock prices for a given day and your goal is to return the maximum profit that could have been made by buying a stock at the given price and then selling the stock later on.
For example if the input is:
[45, 24, 35, 31, 40, 38, 11] 
then your program should return 16 because if you bought the stock at $24 and sold it at $40, a profit of $16 was made and this is the largest profit that could be made. If no profit could have been made, return -1.
Answer
We'll solve the challenge the following way:
Iterate through each number in the list.
At the ith index, get the i+1 index price and check if it is larger than the ith index price.
If so, set buy_price = i and sell_price = i+1. Then calculate the profit: sell_price - buy_price.
If a stock price is found that is cheaper than the current buy_price, set this to be the new buying price and continue from step 2.
Otherwise, continue changing only the sell_price and keep buy_price set.
This algorithm runs in linear time, making only one pass through the array, so the running time in the worst case is O(n).
 
