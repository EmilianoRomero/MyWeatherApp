//DOM MANIPULATION AND EVENT HANDELING
//
const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");

const updateUI = (data) => {

    const cityDets = data.cityDets;
    const weather = data.weather;

    //updating the details templates with this info
    details.innerHTML = `
        <h5 class="my-3">${cityDets.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `;

};

const updateCity = async (city) => {
 
    const cityDets = await getCity(city);
    const weather = getWeather(cityDets.Key);

    //Applying OSN (Object Shorthand Notation)
    return { cityDets, weather };

};

cityForm.addEventListener("submit", e => {
    //always prevent the default!
    e.preventDefault();

    const city = cityForm.city.value.trim();
    //cleaning the form
    cityForm.reset();

    //update the ui with the new city
    updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));
});