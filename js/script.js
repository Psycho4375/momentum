const time = document.querySelector(".time");
const dateTag = document.querySelector(".date");
const greetings = document.querySelector(".greeting");
let hoursGreeting = "not work";
let randomNum = (Math.round(Math.random() * (20 - 1)) + 1).toString();;
const name = document.querySelector(".name");

const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
let city = document.querySelector('.city');


async function getWeather(){
    if(city.value == ''){
        city.value = 'Minsk'
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=72e26bc9e6dd56617c431f5c414bc498&units=metric` 
        const res = await fetch(url);
        const data = await res.json();
        weatherIcon.className = 'weather-icon owf';
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        temperature.textContent = `${Math.floor(data.main.temp)}°C`;
        weatherDescription.textContent = data.weather[0].description;
        wind.textContent = `Wind speed: ${Math.round(data.wind.speed)} m/s`;
        humidity.textContent = `Humidity: ${data.main.humidity}%`;
    } else {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=72e26bc9e6dd56617c431f5c414bc498&units=metric` 
        const res = await fetch(url);
        const data = await res.json();
        if (res.ok){
        weatherIcon.className = 'weather-icon owf';
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        temperature.textContent = `${Math.floor(data.main.temp)}°C`;
        weatherDescription.textContent = data.weather[0].description;
        wind.textContent = `Wind speed: ${Math.round(data.wind.speed)} m/s`;
        humidity.textContent = `Humidity: ${data.main.humidity}%`;
    } else {
        console.log('error');
        weatherIcon.className = 'weather-icon owf';
        weatherIcon.classList.remove();
        temperature.textContent = `Error! city not found for '${city.value}'!`;
        weatherDescription.textContent = ' ';
        wind.textContent = ' ';
        humidity.textContent = ' ';
    }
    }
    
}


function setCity(event){
    if(event.code === 'Enter'){
        getWeather();
        city.blur();
    }
}

document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('keypress', setCity);

function setLocalStorage () {
    localStorage.setItem('name', name.value);
    localStorage.setItem('city', city.value);
}
window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage (){
    if(localStorage.getItem('name')){
        name.value = localStorage.getItem('name');
    }
    if (localStorage.getItem('city')){
        city.value = localStorage.getItem('city');
        getWeather();
    }
}
window.addEventListener('load', getLocalStorage);

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
    document.body.style.backgroundImage = `url(${img.src})`; 
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
    }

const slideNext = document.querySelector('.slide-next');
slideNext.addEventListener('click', getSlideNext);

function getSlidePrev(){
    if (randomNum == '01'){
        randomNum = 20;
        setBg();
    } else {
    randomNum--;
    setBg();
    }
}

const slidePrev = document.querySelector('.slide-prev');
slidePrev.addEventListener('click', getSlidePrev);

const quote = document.querySelector(".quote"); 
const author = document.querySelector(".author");
let nextData = Math.floor(Math.random() * (3 - 0)) + 0;

async function getQuotes() {  
    const quotes = 'data.json';
    const res = await fetch(quotes);
    const data = await res.json();
    switch (nextData){
        case 0:
            nextData = 1;
            quote.textContent = `"${data[nextData].text}"`;
            author.textContent = data[nextData].author;
            break;
        case 1:
            nextData = 2;
            quote.textContent = `"${data[nextData].text}"`;
            author.textContent = data[nextData].author;
            break;
        case 2:
            nextData = 0;
            quote.textContent = `"${data[nextData].text}"`;
            author.textContent = data[nextData].author;
            break;
    }
}
getQuotes();

const changeQuote = document.querySelector(".change-quote");
changeQuote.addEventListener('click', getQuotes);

const playAudioButton = document.querySelector(".play");
import playList from "./playList.js";
console.log(playList);

let isPlay = false;
const audio = new Audio();
let playNum = 0;
function playAudio(){
    if (isPlay !== false){
        isPlay = false;
        console.log(isPlay);
        playAudioButton.className = 'play player-icon';
        audio.src = playList[playNum].src;
        audio.currentTime = 0;
        audio.pause();
        liCollection[playNum].classList.add('play-listActive');
    } else {
        isPlay = true;
        console.log(isPlay);
        playAudioButton.className = 'pause player-icon'; 
        audio.src = playList[playNum].src;
        audio.currentTime = 0;
        audio.play();
        liCollection[playNum].classList.add('play-listActive');
    }
    audio.onended = function(){
        playNextFun();
    }
}
playAudioButton.addEventListener('click', playAudio);

const playPrev = document.querySelector('.play-prev');
playPrev.addEventListener('click', playPrevFun);
const playNext = document.querySelector('.play-next');
playNext.addEventListener('click', playNextFun);

function playPrevFun(){
    if (playNum == 0){
        playNum = 3;
        isPlay = true;
        console.log(isPlay);
        playAudioButton.className = 'pause player-icon'; 
        audio.src = playList[playNum].src;
        audio.currentTime = 0;
        audio.play();
        liCollection[0].classList.remove('play-listActive');
        liCollection[playNum].classList.add('play-listActive');
    } else {
        playNum--;
        isPlay = true;
        console.log(isPlay);
        playAudioButton.className = 'pause player-icon'; 
        audio.src = playList[playNum].src;
        audio.currentTime = 0;
        audio.play();
        const p = playNum + 1;
        liCollection[p].classList.remove('play-listActive');
        liCollection[playNum].classList.add('play-listActive');
    }
}

const playListContainer = document.querySelector('.playListContainer');

for(let i = 0; i < playList.length; i++) {
    const li = document.createElement('li');
    li.classList.add('play-list', 'play-listCollection');
    li.textContent = playList[i].title;
    playListContainer.append(li);    
}

const liCollection = document.querySelectorAll(".play-listCollection");
console.log(liCollection);

function playNextFun(){
    if (playNum == 3){
        playNum = 0;
        isPlay = true;
        console.log(isPlay);
        playAudioButton.className = 'pause player-icon'; 
        audio.src = playList[playNum].src;
        audio.currentTime = 0;
        audio.play();
        liCollection[3].classList.remove('play-listActive');
        liCollection[playNum].classList.add('play-listActive');
    } else {
        playNum++;
        isPlay = true;
        console.log(isPlay);
        playAudioButton.className = 'pause player-icon'; 
        audio.src = playList[playNum].src;
        audio.currentTime = 0;
        audio.play();
        const p = playNum - 1;
        liCollection[p].classList.remove('play-listActive');
        liCollection[playNum].classList.add('play-listActive');
    }
}
