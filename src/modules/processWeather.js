import { updateWeather } from "./displayWeather";

async function getWeather(location) {
  try {
    const encLoc = encodeURIComponent(location);
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encLoc}?unitGroup=metric&key=YGX9T4ZKBZZXWLH7FECU9PF33&contentType=json`);
    if (response.status === 400) {
      throw new Error("Invalid location");
    } else if (response.status === 429) {
      throw new Error("API limit exceeded");
    }
    const weatherData = await response.json();
    return weatherData;
  } catch (err) {
    alert(err);
  }
}

function getWeatherConditions(json) {
  const weatherCond = {
    conditions: json.currentConditions.conditions,
    humidity: json.currentConditions.humidity,
    precipprob: json.currentConditions.precipprob,
    temp: json.currentConditions.temp,
    windspeed: json.currentConditions.windspeed,
    uvindex: json.currentConditions.uvindex,
    feelslike: json.currentConditions.feelslike,
    icon: json.currentConditions.icon,
    description: json.description,
    address: json.resolvedAddress,
  };
  return weatherCond;
}

export async function handleWeather(loc) {
  const weatherData = await getWeather(loc);
  if (weatherData === undefined) {
  } else {
    const obj = getWeatherConditions(weatherData);
    updateWeather(obj);
  }
}
