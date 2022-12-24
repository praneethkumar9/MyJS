const date = new Date();


 const month = date.toLocaleString('en-US', { month: 'long' });
  const day = date.toLocaleString('en-US', { day: '2-digit' });
  const year = date.getFullYear();
  
  console.log(month, day , year ) // "December", "17", 2022