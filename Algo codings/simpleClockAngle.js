const findAngleByHandNumber = (minuteHand) =>{

if(isNaN(minuteHand)){
    return "not possible";
}
if(minuteHand==12){
    return 0
}
let temp = (12-minuteHand)*30
return temp>180?360-temp:temp;

};

// console.log(findAngleByHandNumber(7))


const findAngleByMinutes = (minutes) =>{

if(isNaN(minutes)){
    return "not possible";
}
if(minutes==60){
    return 0
}
angle = (minutes/5 )*30
return angle>180?360-angle:angle;

};

console.log(findAngleByMinutes(35))


function simpleClockAngle(num) {

    // we got 6 because 360/60 = 6
    // 360 represents the full number of a degrees in a circle and
    // 60 is the number of minutes on a clock, so dividing these two numbers
    // gives us the number of degrees for one minute
    return 6 * num;
  
  }
  
  simpleClockAngle(15);


