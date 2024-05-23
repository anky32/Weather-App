const apiKey = `fd7485def60c303e5aec0cf8880bcbcc`;
const city = "Preston";


async function fetchWeatherdata(city){
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);

        if(!response.ok){
            throw new Error("Unable to fetch weather data")
        }


    const data = await response.json();
    console.log(data); 
    // console.log(data.main.temp);
    // console.log(data.name);
    // console.log(data.wind.speed);
    // console.log(data.main.humidity);
    // console.log(data.main.pressure);
    updateWeatherUI(data);
} catch (error) {
    console.error(error);
}
}

const cityElement = document.querySelector(".City");
const temperature = document.querySelector(".temp");
const windSpeed = document.querySelector(".wind-speed");
const humidity = document.querySelector(".humidity");
const pressure = document.querySelector(".Pressure");

const descriptionText = document.querySelector('.description-text');
const date = document.querySelector(".date");
const descriptionIcon = document.querySelector(".description i")

// fetchWeatherdata();

fetchWeatherdata("Preston");

function updateWeatherUI(data) {
    
    cityElement.textContent = data.name;
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    windSpeed.textContent = `${data.wind.speed}km/hr`;
    humidity.textContent = `${data.main.humidity}%`;
    pressure.textContent = `${data.main.pressure}atm`;
    descriptionText.textContent = data.weather[0].description;
    const currentDate = new Date();
    date.textContent = currentDate.toDateString();

}

const formElement = document.querySelector(".search-form");
const inputElement = document.querySelector('.city-input')

formElement.addEventListener("submit",function(e){
    e.preventDefault();

    const city = inputElement.value;
    if(city !==""){
        fetchWeatherdata(city);
        inputElement.value = "";
    }

});