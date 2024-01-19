
const apiKey = 'bc7b5847c01b1c1a77d278a2cbf29ee6';

const form = document.getElementById("form");
const citySearch = document.getElementById("searchBar");

function getSearchResults(lat, lon) {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    return fetch(url).then(function (res) {
        if(!res.ok) throw new Error(res.statusText)

        return res.json();

    });
}

function getCity(city) {

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    return fetch(url).then(function (res) {
        if(!res.ok) throw new Error(res.statusText)

        return res.json();

    }).then((place) => {
        console.log('place :>>', place);
        let lat = place.coord.lat;
        let lon = place.coord.lon;
        getSearchResults(lat, lon).then(function (data) {
            console.log('data :>> ', data);
            
        });
    });
}


function searchCity(event) {
  event.preventDefault();  
  let searchedCity = citySearch.value
  console.log('searchedCity =>', searchedCity)
  getCity(searchedCity);
}

form.addEventListener("submit", searchCity);

