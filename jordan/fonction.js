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

//memory
//on recupere les cartes sous forme d'un tableau.
var card = document.getElementsByClassName('card');
var cards = [...card];
console.log(cards);

//melange
function randomImg(){
   var tabImg = new Array();
   tabImg[0]  = "../img/ajax.png";
   tabImg[1]  = "../img/ajax.png";
   tabImg[2]  = "../img/bootstrap.png";
   tabImg[3]  = "../img/bootstrap.png";
   tabImg[4]  = "../img/css.jpeg";
   tabImg[5]  = "../img/css.jpeg";
   tabImg[6]  = "../img/html.jpeg";
   tabImg[7]  = "../img/html.jpeg";
   tabImg[8]  = "../img/jquery.png";
   tabImg[9]  = "../img/jquery.png";
   tabImg[10]  = "../img/js.png";
   tabImg[11]  = "../img/js.png";
   tabImg[12]  = "../img/node js.jpeg";
   tabImg[13]  = "../img/node js.jpeg";
   tabImg[14]  = "../img/php.png";
   tabImg[15]  = "../img/php.png";
   tabImg[16]  = "../img/python.png";
   tabImg[17]  = "../img/python.png";
   tabImg[18]  = "../img/ruby.png";
   tabImg[19]  = "../img/ruby.png";

   card.src += tabImg[Math.round(Math.random()*21)];
}
