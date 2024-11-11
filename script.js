function getWeather(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.cod === 200) {
        let displayCity = document.querySelector("h1");
        let displayTemp = document.querySelector("h2");
        let displayDesc = document.querySelector(".description");
        let img = document.querySelector("img");
        let input = document.querySelector("input");

        const cityName = data.name;
        const temp = Math.round(data.main.temp);
        const desc = data.weather[0].description;
        const icon = data.weather[0].icon;

        displayCity.textContent = cityName;
        displayTemp.textContent = temp + "°C";
        displayDesc.textContent = desc;
        img.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
        input.defaultValue = cityName;
      } else {
        alert("City not found");
      }
    })
    .catch((error) => console.error("Error fetching weather data:", error));
}

document.addEventListener("DOMContentLoaded", function () {
  navigator.geolocation.getCurrentPosition((data) => {
    const lat = data.coords.latitude;
    const lon = data.coords.longitude;

    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=186391d6f335d5209ba88efac8626e4f&units=metric`;
    getWeather(url);
  });

  document.querySelector("input").focus();

  let searchBtn = document.querySelector("button");
  searchBtn.addEventListener("click", function () {
    let input = document.querySelector("input");
    const cityData = input.value.trim();
    if (!cityData) {
      alert("Please enter a valid city name");
    } else {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityData}&appid=92b6ff2bc3f8221dc0d6b2cd6cdb844e&units=metric`;
      getWeather(url);
    }
  });
});
