export const capitalise = (str) => str[0].toUpperCase() + str.slice(1);

export const getLocation = async () => {
  try {
    const IpResponse = await fetch("https://api.ipify.org?format=json");
    const IpResult = await IpResponse.json();
    const locationResponse = await fetch(
      "http://ip-api.com/json/" + IpResult.ip
    );
    const locationResult = await locationResponse.json();
    return locationResult;
  } catch (error) {
    console.log("error during location identification : " + error);
  }
};

export const getWeatherByCity = async (city, apiKey) => {
  const cityName = city;
  const url =
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&lang=fr` +
    `&appid=${apiKey}`;
  const config = {
    method: "GET",
  };
  try {
    const response = await fetch(url, config);
    const status = response.status;
    const result = await response.json();
    const weather = {
      city: result.name,
      temp: result.main.temp,
      feels_like: result.main.feels_like,
      temp_min: result.main.temp_min,
      temp_max: result.main.temp_max,
      windSpeed: result.wind.speed,
      humidity: result.main.humidity,
      sunset: result.sys.sunset,
      description: result.weather[0].description,
      icon: `https://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png`,
    };
    return weather;
  } catch (error) {
    console.log("error during weather retrieval : " + error);
  }
};

export const getSunsetTime = (date) => {
  const sunsetDate = new Date(date);
  const sunsetTime = `${sunsetDate.getHours()}:${sunsetDate
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;
  return sunsetTime;
};

export const getCurrentDate = () => {
  const now = new Date();
  const months = [
    "Jan",
    "Fev",
    "Mars",
    "Avr",
    "Mai",
    "Jun",
    "Jul",
    "Aou",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  const currentDate = `${now.getDate()}-${
    months[now.getMonth()]
  } / ${now.getHours()}:${now.getMinutes().toString().padStart(2, "0")}`;
  return currentDate;
};
