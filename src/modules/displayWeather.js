import { handleWeather } from "./processWeather";

export function updateWeather(obj) {
  document.querySelector(".location").textContent = obj.address;

  const weatherIcon = document.querySelector(".weatherIcon");
  import(`../images/${obj.icon}.svg`).then((img) => {
    weatherIcon.src = img.default;
    weatherIcon.alt = `${obj.icon} icon`;
  });

  document.querySelector(".weatherCondition").textContent = obj.conditions;
  document.querySelector(".temperature").textContent = `${obj.temp}°C`;
  document.querySelector(".weatherDesc").textContent = obj.description;
  document.querySelector(".humidity").textContent = obj.humidity;
  document.querySelector(".feelsLike").textContent = obj.feelslike;
  document.querySelector(".precip").textContent = obj.precipprob;
  document.querySelector(".windSpeed").textContent = obj.windspeed;
  document.querySelector(".uvIndex").textContent = obj.uvindex;
}

function init() {
  handleWeather("London");
}

init();

const searchBar = document.querySelector(".searchInput");
document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  handleWeather(searchBar.value);
  searchBar.value = "";
});
