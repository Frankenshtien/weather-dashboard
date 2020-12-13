var searchedCityEl = document.querySelector("#cityInput");
var searchBtn = document.getElementById("searchBtn");
var searchedCityCardEl = document.querySelector("#searchedCityCard");
var searchedCityName = ""
var temperatureText = ""
var humidityText = ""
var windSpeedText = ""
var uvIndexText = ""
var searchedLat = ""
var searchedLon = ""
var pastSearchesArray = []


var searchCityHandler = function(cityBeingSearched) {
    fetch("http://api.openweathermap.org/data/2.5/weather?q=" + cityBeingSearched + "&units=imperial&appid=c4f65212424a91087c43da15bd9126bd")
    .then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                searchedCityName = data.name;
                temperature = data.main.temp;
                humidity = data.main.humidity;
                windSpeed = data.wind.speed;
                searchedLat = data.coord.lat;
                searchedLon = data.coord.lon;
                pastSearchesArray.push(searchedCityName);
                localStorage.setItem("pastSearches", pastSearchesArray);
            })
            .then(function() {
                fetch("http://api.openweathermap.org/data/2.5/uvi?lat=" + searchedLat + "&lon=" + searchedLon + "&appid=c4f65212424a91087c43da15bd9126bd")
                .then(function(response) {
                    response.json().then(function(data) {
                        uvIndexText = data.value;
                        console.log(uvIndexText);
                        dayWeatherDisplay();
                    })
                })
            })
        } else {
            alert("There was a problem with your request!");
        }
    })
};

var dayWeatherDisplay = function() {
    
    var currentSearchedCity = document.querySelector("#searchedCity");
    var currentDayTemp = document.querySelector("#temperature");
    var currentDayHumidity = document.querySelector("#humidity");
    var currentDayWind = document.querySelector("#windSpeed");
    var currentDayUV = document.querySelector("#uvIndex");

    var newSearchedCity = document.createElement("h2");
    newSearchedCity.setAttribute("id", "searchedCity");
    var newDayTemp = document.createElement("p");
    newDayTemp.setAttribute("id", "temperature");
    var newDayHumidity = document.createElement("p");
    newDayHumidity.setAttribute("id", "humidity");
    var newDayWind = document.createElement("p");
    newDayWind.setAttribute("id","windSpeed");
    var newDayUV = document.createElement("p");
    newDayUV.setAttribute("id", "uvIndex")
    if (uvIndexText < 2) {
        newDayUV.setAttribute("class", "bg-success");
    } 
    else if (uvIndexText > 2 && uvIndexText < 5) {
        newDayUV.setAttribute("class", "badge bg-warning");
    }
    else {
        newDayUV.setAttribute("class", "badge bg-danger");
    }

    newSearchedCity.textContent = searchedCityName;
    newDayTemp.textContent = "Temperature: " + temperature + " °F";
    newDayHumidity.textContent = "Humidity: " + humidity + " %";
    newDayWind.textContent = "Wind Speed: " + windSpeed + " MPH";
    newDayUV.textContent = "UV Index: " + uvIndexText;

    searchedCityCardEl.classList.remove("hidden");

    currentSearchedCity.replaceWith(newSearchedCity);
    currentDayTemp.replaceWith(newDayTemp);
    currentDayHumidity.replaceWith(newDayHumidity);
    currentDayWind.replaceWith(newDayWind);
    currentDayUV.replaceWith(newDayUV);
    
}

searchBtn.addEventListener("click", function(event) {
    event.preventDefault();
    searchCityHandler(searchedCityEl.value);
});