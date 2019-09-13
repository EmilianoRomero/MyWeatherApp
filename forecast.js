//WORKING WITH THE APIs
//API key for the AccuWeather Site
const key = "nVXAnrLGxpPF2AIZArGPevsnabun6gIh";

//getting the weather info with an async function (we're using the json!)
const getWeather = async (id) => {

    const base = "http://dataservice.accuweather.com/currentconditions/v1/"
    const query = `${id}?apikey=${key}`;

    //fetching the results
    const response = await fetch(base + query);
    const data = await response.json();

    /*
    console.log(data[0]);
    console.log(data[0].Temperature);
    console.log(data[0].Temperature.Metric.Value);
    */
    return data[0];
    
};


//getting the info for the city with the Key code
const getCity = async (city) => {

    const base = "http://dataservice.accuweather.com/locations/v1/cities/search";
    const query = `?apikey=${key}&q=${city}`;

    const response = await fetch(base + query);
    const data = await response.json();

    //console.log(data[0]);
    //gets the closes match
    return data[0];

};
