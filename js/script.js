const apikey = "3265874a2c77ae4a04bb96236a642d2f";
const form = document.querySelector("form");
const search = document.querySelector("input");

function url(city) {
  return `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
}

async function getWeatherByLocation(city) {
  const response = await fetch(url(city), { origin: "cors" });
  const data = await response.json();
  addWeatherToPage(data);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const { value: city } = search;
  getWeatherByLocation(city);
});

function addWeatherToPage(data) {
  const main = document.querySelector("main");
  main.innerHTML = ``;
  const row = document.createElement("div");
  row.className = "weather row flex-column align-items-center text-center mt-5";
  row.innerHTML = `
    <div class="shadow w-50 m-auto p-5">
      <h2 class="d-flex align-items-center justify-content-center"><img src="https://openweathermap.org/img/wn/${
        data.weather[0].icon
      }@2x.png" /><span class="fs-1">${kelvinToCelcius(
    data.main.temp
  )}</span> <span class="text-muted">&#8451;</span></h2>
      <p class="fw-semibold text-muted">${search.value.toLocaleUpperCase()}</p>
      <small>${data.weather[0].main}</small>
    </div>
  `;
  main.append(row);
}

function kelvinToCelcius(kelvin) {
  return (kelvin - 273.15).toFixed(2);
}
