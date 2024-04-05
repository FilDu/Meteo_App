import {
  capitalise,
  getCurrentDate,
  getLocation,
  getSunsetTime,
  getWeatherByCity,
} from "./utils/functions.js";
import dataJson from "./config.json" with { type: "json" };

/**for testing without connection */
const defaultWeather = dataJson.fakeWeather;

const apiKey = dataJson.apiKey;
const delay = dataJson.delay;
const selectedCity = dataJson.city;

const displayMeteo = async () => {
  const location = await getLocation();
  const city = selectedCity ? selectedCity : location.city;

  let weather = { ...defaultWeather };
  weather = await getWeatherByCity(city, apiKey);
  const currentDate = getCurrentDate();
  const sunsetTime = getSunsetTime(weather.sunset);

  document.getElementById("city").innerHTML = weather.city;
  document.getElementById("weatherIcon").src = weather.icon;
  document.getElementById("weatherText").innerHTML = capitalise(
    weather.description
  );
  document.getElementById("date").innerHTML = currentDate;
  document.getElementById("temperature").innerHTML = weather.temp.toFixed(0);
  document.getElementById("feels_like").innerHTML =
    weather.feels_like.toFixed(1);
  document.getElementById("min_temp").innerHTML = weather.temp_min.toFixed(1);
  document.getElementById("max_temp").innerHTML = weather.temp_max.toFixed(1);
  document.getElementById("wind").innerHTML = (weather.windSpeed * 3.6).toFixed(
    1
  );
  document.getElementById("humidity").innerHTML = weather.humidity;
  document.getElementById("sunset").innerHTML = sunsetTime;
};

displayMeteo();
const intervalId = setInterval(displayMeteo, delay);
