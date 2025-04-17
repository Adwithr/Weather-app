import "./styles.css";

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
    console.log(weatherData);
    return weatherData;
  } catch (err) {
    alert(err);
  }
}

function getWeatherConditions(json) {
  const weatherCond = {
    conditions: json.currentConditions.conditions,
    humidity: json.currentConditions.humidity,
    precip: json.currentConditions.precip,
    temp: json.currentConditions.temp,
    windspeed: json.currentConditions.windspeed,
    icon: json.currentConditions.icon,
    description: json.description,
    address: json.resolvedAddress,
  };
  return weatherCond;
}

async function handleWeather(loc) {
  const weatherData = await getWeather(loc);
  console.log(getWeatherConditions(weatherData));
  return getWeatherConditions(weatherData);
}

handleWeather("Tokyo");
