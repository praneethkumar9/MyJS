const date = new Date();

// US English uses month-day-year order
console.log(new Intl.DateTimeFormat('en-US',{
 year: 'numeric', month: 'long', day: 'numeric'
}).format(date));

//"February 8, 2023"