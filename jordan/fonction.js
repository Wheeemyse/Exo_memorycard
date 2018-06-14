//  timer du memory
var milli = 0;
var seconde = 0;
var minute = 0;
var timer = document.querySelector(".timer");
var interval;
function startTimer(){
    interval = setInterval(function(){
        timer.innerHTML = minute+": "+seconde +": " + milli+".";
        milli++;
        if(milli >99){
            seconde++;
            milli=0;
        }
        if(seconde > 59){
            minute++;
            seconde = 0;
        }
        if(minute > 59){
            minute = 0;
        }
    },10);
}
