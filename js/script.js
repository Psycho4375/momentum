const time = document.querySelector(".time");
const dateTag = document.querySelector(".date");
const greetings = document.querySelector(".greeting");
let hoursGreeting = "not work";
let randomNum = (Math.round(Math.random() * (20 - 1)) + 1).toString();;

function showTime(){
    const date = new Date();
    const currentTime = date.toLocaleTimeString();
    time.textContent = currentTime;

    function showDate(){
        const date = new Date();
        const options = {month: 'long', weekday: 'long', day: 'numeric'};
        const currentDate = date.toLocaleDateString('en-US', options);
        dateTag.textContent = currentDate;       
    }
    function showGreetings(){

        function getTimeOfDay(){
            const date = new Date();
            const hours = date.getHours();
            
            switch (true){
                case (hours > 17) : {hoursGreeting = 'evening';break;}
                case (hours > 11) : {hoursGreeting = 'afternoon';break;}
                case (hours > 5)  : {hoursGreeting = 'morning';break;}
                case (hours >= 0) : {hoursGreeting = 'night';break;}
            }
            return hoursGreeting;
        }
        
        const timeOfDay = getTimeOfDay();
        const greeting = `Good ${timeOfDay}`;
        greetings.textContent = greeting;
    }
    showDate();
    showGreetings();
    setTimeout(showTime, 1000); 
}
showTime();

function setBg(){
    if (randomNum < 10){randomNum = "0" + randomNum;}
    const img = new Image();
    img.src = `https://raw.githubusercontent.com/Psycho4375/momentum/main/assets/img/${hoursGreeting}/${randomNum}.webp`;
    img.onload = () => {
    document.body.style.backgroundImage = `url(https://raw.githubusercontent.com/Psycho4375/momentum/main/assets/img/${hoursGreeting}/${randomNum}.webp)`; 
    };
}
setBg();

function getSlideNext(){
    if (randomNum == '20'){
        randomNum = 1;
        setBg();
    } else {
    randomNum++;
    setBg();
    }
    return randomNum
    }

function getSlidePrev(){
    if (randomNum == '01'){
        randomNum = 20;
        setBg();
    } else {
    randomNum--;
    setBg();
    }
    return randomNum
}

const slideNext = document.querySelector('.slide-next');
slideNext.addEventListener('click', getSlideNext);

const slidePrev = document.querySelector('.slide-prev');
slidePrev.addEventListener('click', getSlidePrev);
