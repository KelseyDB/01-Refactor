import startWeather from "./functions.js"

const button = document.querySelector('#submit-search');
const inputField = document.querySelector('#cityName');

//add eventlistener without the entire function inside of it smh
inputField.addEventListener('keyup', (event)=>{
  if (event.code === "Enter") {
    event.preventDefault();
    startWeather();
  }
});

button.addEventListener('click', startWeather);