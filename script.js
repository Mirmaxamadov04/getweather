document.querySelector(".search-icon").addEventListener("click", (evt) => {
  evt.preventDefault();
  //   const city = document.querySelector(".search-input").value;
  //   console.log(city);

  const apiKey = "8dd022e1a43de0e2997bc148747dea96";
  const city = document.querySelector(".search-input").value;
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
  )
    .then((response) => response.json())
    .then((json) => {
      if (json.cod === "404") {
        alert("enter valid city name");
        return;
      }

      const Location = document.querySelector(".location");
      const Degree = document.querySelector(".deegre");
      const cloudy = document.querySelector(".cloudy");
      const humidity = document.querySelector(".humidity");
      const windspeed = document.querySelector(".wind-speed");
      const Image = document.querySelector(".image");
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
          Image.src = "";
      }

      Location.textContent = ` Weather in ${city}`;
      Degree.textContent = `${json.wind.deg} C`;
      cloudy.textContent = `${json.weather[0].main}`;
      humidity.textContent = ` Humidity: ${json.main.humidity}%`;
      windspeed.textContent = `Wind Speed: ${json.wind.speed} km/hr`;
    });
});
