import API from "./config.js";
const container = document.querySelector(".container");

//create elements function
const createWeatherCards = (data)=> {
  for(let i= 0; i < 5; i++) {
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date();
    const dayOfWeek = weekdays[(date.getDay() + i) % 7]

    const card = document.createElement('div');
    card.classList.add("card");
    // if it's the first element (index === 0), add a second class: "main-card" for unique styling
    if (i === 0) card.classList.add("main-card");
    container.appendChild(card);

    const initialContentBeforeSlideAnimation = document.createElement('div');
    initialContentBeforeSlideAnimation.classList.add("imgBx");
    card.appendChild(initialContentBeforeSlideAnimation);
    
    const cardImg = document.createElement('img');
    cardImg.src = data.forecast.forecastday[i].day.condition.icon;
    cardImg.alt = "Icon describing the following weather: " + data.forecast.forecastday[i].day.condition.text;
    initialContentBeforeSlideAnimation.appendChild(cardImg);
    
    const contentBox = document.createElement("div");
    contentBox.classList.add("contentBx");
    card.appendChild(contentBox);

    const dowContentBeforeSliderAnimation = document.createElement("h2");
    dowContentBeforeSliderAnimation.innerHTML = dayOfWeek;
    contentBox.appendChild(dowContentBeforeSliderAnimation);

    const tempDescription = document.createElement("h4");
    tempDescription.innerHTML = data.forecast.forecastday[i].day.condition.text;
    contentBox.appendChild(tempDescription);

    const currentTempBox = document.createElement("div");
    currentTempBox.classList.add("color");
    contentBox.appendChild(currentTempBox)

    const currentTempHeader = document.createElement("h3");
    currentTempHeader.innerHTML = "Temp:"
    currentTempBox.appendChild(currentTempHeader);

    const currentTemp = document.createElement("span");
    currentTemp.classList.add("current-temp");

    currentTemp.innerHTML = data.forecast.forecastday[i].day.avgtemp_c + "°C";
    currentTempBox.appendChild(currentTemp);

    const minMax = document.createElement("div");
    minMax.classList.add("details");
    contentBox.appendChild(minMax);

    const minMaxTempHeader = document.createElement("h3");
    minMaxTempHeader.innerHTML = "More:"
    minMax.appendChild(minMaxTempHeader);

    const minTemp = document.createElement("span");
    minTemp.classList.add("min-temp")
    minTemp.innerHTML = data.forecast.forecastday[i].day.mintemp_c  + "°C";
    minMax.appendChild(minTemp);

    const maxTemp = document.createElement("span");
    maxTemp.classList.add("max-temp")
    maxTemp.innerHTML = data.forecast.forecastday[i].day.maxtemp_c + "°C";
    minMax.appendChild(maxTemp);
  }
}
//display city name as "city, country"
const addCityTitle = (data)=> {
  const cityNameContainer = document.querySelector('.city-info')
  cityNameContainer.textContent = data.location.name + ", " + data.location.country;
}
//function to clear html on new city
const removeContent = ()=> {
  while (container.lastChild) {
  container.removeChild(container.lastChild);
  }
}
//function to start weather app, get API data
const startWeather = ()=> {
  if (document.getElementById('cityName').value.trim()) {
    const theNameOfTheCity = document.querySelector("#cityName").value;
    fetch("http://api.weatherapi.com/v1/forecast.json?key=" + API.key + "&q=" + theNameOfTheCity + "&days=7&aqi=no&alerts=no")
    .then(response => response.json())
    .then(data => {
      if(data.error) {
        // stop the event from continuing the code if there is an error
        return alert("Hey are you sure you are not holding your map upside down?")
      } else {
        removeContent();
        addCityTitle(data);
        createWeatherCards(data);
      }
    });
  }
}

export default startWeather;