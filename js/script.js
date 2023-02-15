const time = document.querySelector(".time");
const dateTag = document.querySelector(".date");
const greetings = document.querySelector(".greeting");

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
            let hoursGreeting = "not work";
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

