const elBody = document.querySelector("body");
const elForm = document.querySelector(".form");
const elErrorShows = document.querySelector(".error-shows");
const elList = document.querySelector(".weather-list");
const Location = document.querySelector(".location");
const Degree = document.querySelector(".deegre");
const cloudy = document.querySelector(".cloudy");
const humidity = document.querySelector(".humidity");
const windspeed = document.querySelector(".wind-speed");
const Image = document.querySelector(".image");

elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const apiKey = "8dd022e1a43de0e2997bc148747dea96";
  const cityinput = document.querySelector(".search-input").value;
  const city = cityinput.toUpperCase();

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
  )
    .then((response) => response.json())
    .then((json) => {
      if (json.cod === "404") {
        elErrorShows.textContent = "Please, enter valid city name!!!";
        Location.textContent = "";
        Degree.textContent = "";
        cloudy.textContent = "";
        humidity.textContent = "";
        windspeed.textContent = "";
        Image.style.display = "none";

        return;
      }

      Image.style.display = "block";
      switch (json.weather[0].main) {
        case "Clear":
          Image.src = "./images/clear.png";
          break;

        case "Rain":
          Image.src = "./images/rain.png";
          break;

        case "Snow":
          Image.src = "./images/snow.png";
          break;

        case "Clouds":
          Image.src = "./images/cloud.png";
          break;

        case "Haze":
          Image.src = "./images/mist.png";
          break;

        default:
          Image.src = "./images/mist.png";
      }
      elErrorShows.textContent = "";
      Location.textContent = ` Weather in ${city}, ${json.sys.country}`;
      Degree.textContent = `${Math.round(json.main.temp)} ºC`;
      cloudy.textContent = `${json.weather[0].main}`;
      humidity.textContent = ` Humidity: ${json.main.humidity}%`;
      windspeed.textContent = `Wind Speed: ${json.wind.speed} km/hr`;
    });
});
