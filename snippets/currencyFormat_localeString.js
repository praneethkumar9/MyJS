const number = 12345.678;

console.log(number.toLocaleString('en-US')); 
// 12,345.678

console.log(number.toLocaleString('fr-FR')); 
// 12 345,678

console.log(number.toLocaleString('en-US', {
  style: 'currency',
  currency: 'USD'   // With currency, the currency code is also required
}));  // $12,345.68

console.log(number.toLocaleString('hi-IN', {
  style: 'currency',
  currency: 'INR'
}));  // ₹12,345.68

console.log(number.toLocaleString('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumSignificantDigits: 2
}));  // $12,000