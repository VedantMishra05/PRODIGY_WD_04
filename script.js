const apiKey = "92a543aa2358f0898e3d029a67069bd4";

function getWeatherByCity() {
  const city = document.getElementById("cityInput").value;
  if (!city) return alert("Please enter a city name.");
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  fetchWeather(url);
}

function getWeatherByLocation() {
  if (!navigator.geolocation) {
    return alert("Geolocation is not supported by your browser.");
  }
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
      fetchWeather(url);
    },
    () => alert("Unable to retrieve your location.")
  );
}

function fetchWeather(url) {
  console.log("Fetching weather from:", url); // Log API call

  fetch(url)
    .then((response) => {
      console.log("Response status:", response.status);
      if (!response.ok) throw new Error("Weather data not found");
      return response.json();
    })
    .then((data) => {
      console.log("Weather data:", data); // See what comes back

      document.getElementById("location").textContent = `${data.name}, ${data.sys.country}`;
      document.getElementById("description").textContent = data.weather[0].description;
      document.getElementById("temp").textContent = data.main.temp;
      document.getElementById("humidity").textContent = data.main.humidity;
      document.getElementById("wind").textContent = (data.wind.speed * 3.6).toFixed(2);
      document.getElementById("weatherCard").classList.remove("hidden");
    })
    .catch((err) => {
      console.error(err);
      alert("Error fetching weather data: " + err.message);
    });
}