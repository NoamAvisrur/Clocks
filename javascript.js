// ---------- local time -----------
var date = new Date;
var hands = [
    {
      hand: 'hours',
      angle: (date.getHours() * 30) + (date.getMinutes() / 2)
    },
    {
      hand: 'minutes',
      angle: (date.getMinutes() * 6)
    },
    {
      hand: 'seconds',
      angle: (date.getSeconds() * 6)
    }
];

setHandsDegByTime('section:first-child .clock > div div', hands);
setUpMinuteHands('section:first-child .minutes-container', '.minutes', hands);

setInterval(function() {
    if (hands[2].angle === undefined) {
        hands[2].angle = 6;
    } else {
        hands[2].angle += 6;
    }
    document.querySelector('section:first-child .seconds').style.transform = 'rotateZ' + '(' + hands[2].angle + 'deg)';
 }, 1000);

// ---------- new-york time -----------
var ny_hands = [
    {
      hand: 'hours',
      angle: (calcTime('+14').getHours() * 30) + (calcTime('+14').getMinutes() / 2)
    },
    {
      hand: 'minutes',
      angle: (calcTime('+14').getMinutes() * 6)
    },
    {
      hand: 'seconds',
      angle: (calcTime('+14').getSeconds() * 6)
    }
];

setHandsDegByTime('section:nth-of-type(2) .clock > div div', ny_hands);
setUpMinuteHands('section:nth-of-type(2) .minutes-container', 'section:nth-of-type(2) .minutes', ny_hands);

// ---------- london time -----------
var l_hands = [
    {
      hand: 'hours',
      angle: (calcTime('-5').getHours() * 30) + (calcTime('-5').getMinutes() / 2)
    },
    {
      hand: 'minutes',
      angle: (calcTime('-5').getMinutes() * 6)
    },
    {
      hand: 'seconds',
      angle: (calcTime('-5').getSeconds() * 6)
    }
];

setHandsDegByTime('section:nth-of-type(3) .clock > div div', l_hands);
setUpMinuteHands('section:nth-of-type(3) .minutes-container', 'section:nth-of-type(3) .minutes', l_hands);

// ---------- tokio time -----------
var t_hands = [
    {
      hand: 'hours',
      angle: (calcTime('+3').getHours() * 30) + (calcTime('+3').getMinutes() / 2)
    },
    {
      hand: 'minutes',
      angle: (calcTime('+3').getMinutes() * 6)
    },
    {
      hand: 'seconds',
      angle: (calcTime('+3').getSeconds() * 6)
    }
];

setHandsDegByTime('section:nth-of-type(4) .clock > div div', t_hands);
setUpMinuteHands('section:nth-of-type(4) .minutes-container', 'section:nth-of-type(4) .minutes', t_hands);

// ------- functions -------

function getDegByTime (time){
    return ('rotateZ' + '(' + (time.angle +'deg') + ')');        
}

function setHandsDegByTime (selector, handType){
    var setHands = document.querySelectorAll(selector);
    for(var i = 0; i < setHands.length; i++){ 
         setHands[i].style.transform = getDegByTime (handType[i]);
         if (i == 1){
              setHands[i].parentNode.setAttribute('data-second-angle', (handType[2].angle));        
         }
    }
}

function setUpMinuteHands(conSelector, selector, hand) {
   var secondAngle = document.querySelector(conSelector).getAttribute("data-second-angle");
   if (secondAngle > 0) {
       var delay = (((360 - secondAngle) / 6) + 0.1) * 1000;
       setTimeout(function() {
           document.querySelector(selector).style.transform = 'rotateZ' + '(' + (hand[1].angle + 6) + 'deg)';
           hand[1].angle += 6;
           if (selector === ".minutes"){
               setInterval(function() {
                   if (hands[1].angle === undefined) {
                       hands[1].angle = 6;
                   } else {
                       hands[1].angle += 6;
                   }
               document.querySelector(selector).style.transform = 'rotateZ' + '(' + hands[1].angle + 'deg)';
               }, 60000);
           }else {
               document.querySelector(conSelector).style.animation = "rotate 3600s infinite steps(60)";   
           }
       }, delay);
   }
}

function calcTime(offset) {
    var d = new Date();
    var utc = d.getTime() - (d.getTimezoneOffset() * 60000);
    var nd = new Date(utc + (3600000*offset));
    return  nd;
}