const inputEle = document.querySelector('.input-field');
const searchEle = document.querySelector('#search');
const cityNameEle = document.querySelector('.city-name');
const windEle = document.querySelector('.wind-text');
const weatherEle = document.querySelector('.weather-text');
const tempEle = document.querySelector('.temp-text');
const humidityELe = document.querySelector('.humidity-text');
const crossBtn = document.querySelector('.cross-btn');
window.addEventListener("load", (evt) => {
  updateWeather();
});
searchEle.addEventListener("click", async (evt) => {
  await updateWeather();
  await updateImage();
});
const updateWeather = async () => {
  try {
    if (!inputEle.value.trim()) {
      return alert("Don't left the input empty");
    }
    const apiKey = `533cf01efd19c96b8f97ba08371b6be9`;
    const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?q=${inputEle.value}&appid=${apiKey}&units=metric`;
    let response = await fetch(BASE_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch weather data: ${response.status}`);
    }
    let data = await response.json();
    humidityELe.innerHTML = data.main.humidity + " % ";
    windEle.innerHTML = data.wind.speed + " km/h";
    tempEle.innerHTML = data.main.temp + " ° C ";
    weatherEle.innerHTML = data.weather[0].main;
    cityNameEle.innerHTML = data.name;
  }
  catch (error) {
    cityNameEle.innerHTML = "No result "
  }
}
const updateImage = () => {
  let imageCondition = weatherEle.innerHTML;
  let newImage = `/Weather_app/images/${imageCondition}.png`;
  let img = document.querySelector("img");
  img.src = newImage;
}
