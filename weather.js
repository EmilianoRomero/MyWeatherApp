//DOM MANIPULATION AND EVENT HANDELING
const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector("img.time"); //IsDayTime
const icon = document.querySelector(".icon img"); //WeatherIcon

const updateUI = (data) => {
    /* I'M NOT USING THIS ANYMORE BECAUSE I'M DESTRUCTURING...
    const cityDets = data.cityDets;
    const weather = data.weather;
    */
    //Destructuring properties: I want to get the properties from this object and store them
    //in constants with the same name
    const {
        cityDets,
        weather
    } = data;

    //update time conditions icon
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute("src", iconSrc);

    //updating the details templates with this info
    details.innerHTML = `
        <h5 class="my-3">${cityDets.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `;
    //Day/Night bckg images
    /*
    let timeSrc = null;
    if(weather.IsDayTime){
        timeSrc = "img/day.svg";
    } else {
        timeSrc = "img/night.svg";
    }
    time.setAttribute("src", timeSrc);
    */
    //THE SAME EXPRESSED WITH THE TERNARY OPERATOR
    let timeSrc = weather.IsDayTime ? "img/day.svg" : "img/night.svg";
    time.setAttribute("src", timeSrc);

    //making it visible by removing original class d-none
    if (card.classList.contains("d-none")) {
        card.classList.remove("d-none");
    }
};

const updateCity = async (city) => {
    const cityDets = await getCity(city);
    const weather = await getWeather(cityDets.Key);
    //console.log(cityDets);
    //Applying OSN (Object Shorthand Notation)
    return {
        cityDets,
        weather
    };
};

cityForm.addEventListener("submit", e => {
    //always prevent refresh by default!
    e.preventDefault();
    //getting the value of the input, avoiding empty spaces
    const city = cityForm.city.value.trim();
    //cleaning the form
    cityForm.reset();

    //update the ui with the new city
    updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err));

    //Applying the recently learnt localStorage method
    //Storing the last search as the first appearing "face" of the app
    localStorage.setItem("city", city);
});

// if check: if the city exists in local storage ("truthy" yes, "falsy" no)
// it makes an automatic call to get the city updating the local storage
if (localStorage.getItem("city")) {
    updateCity(localStorage.getItem("city")) //this returns a promise
        .then(data => updateUI(data))       //take the data and update the UI
        .catch(err => console.log(err));    //catching possible errors as usual
}