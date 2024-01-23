
const apiKey = 'bc7b5847c01b1c1a77d278a2cbf29ee6';

const form = document.getElementById("form");
const citySearch = document.getElementById("searchBar");

const weatherCondition = {
    "01d": "./assets/img/day.svg",
    "01n": "./assets/img/night.svg",
    "02d": "./assets/img/cloudy-day-3.svg",
    "02n": "./assets/img/cloudy-night-3.svg",
    "03d": "./assets/img/cloudy.svg",
    "03n": "./assets/img/cloudy-night-3.svg",
    "04d": "./assets/img/cloudy.svg",
    "04n": "./assets/img/cloudy-night-3.svg",
    "09d": "./assets/img/rainy-6.svg",
    "09n": "./assets/img/rainy-6.svg",
    "10d": "./assets/img/rainy-3.svg",
    "10n": "./assets/img/rainy-6.svg",
    "11d": "./assets/img/thunder.svg",
    "11n": "./assets/img/thunder.svg",
    "13d": "./assets/img/snowy-3.svg",
    "13n": "./assets/img/snowy-6.svg",
    "50d": "./assets/img/smoke.png",
    "50n": "./assets/img/smoke.png",
  };


  function getCity(city) {

    try{
        let getGeo = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
        let currentUrl;
        let fiveDayUrl;
        fetch(getGeo)
            .then(res => res.json())
            .then(result => {
                currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${result.coord.lat}&lon=${result.coord.lon}&appID=${apiKey}&units=imperial`;
                  // if the information is correct 
            if(currentUrl){
                fetch(currentUrl)
                .then(res => res.json())
                .then(result => {
                    // pass the results and search param into our functions
                    getSearchResults(result);
                })
                .catch(err => console.log(err));
            }
            })
            // same as above, but this result will be used for our 5 day forecast
            
        fetch(getGeo)
            .then(response => response.json())
            .then(result => {
                fiveDayUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${result.coord.lat}&lon=${result.coord.lon}&appid=${apiKey}&units=imperial`;
                if(fiveDayUrl){
                    fetch(fiveDayUrl)
                    .then(res => res.json())
                    .then(result => {
                        fiveDay(result);
                    })
                }
            })
            .catch(err => {
                alert('Could not find a city with that name! Please try again')
            })
        }
    catch(err){
        console.log(err);
    }
    addToSearchHistory(city);
}

function getSearchResults(data) {
        console.log('data :>> ', data);
        let windSpeed = data.wind.speed;
        let temp = Math.floor(data.main.temp);
        let feelsLike = Math.floor(data.main.feels_like);
        let city = data.name;
        let humid = data.main.humidity;
        let high = Math.floor(data.main.temp_max);
        let low = Math.floor(data.main.temp_min);
        const date = new Date(data.dt * 1000);
        const currentDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
        let getIcon = data.weather[0].icon;
        let icon = weatherCondition[getIcon];

       

        let card = 
                `<h3>${city} (${currentDate}) <img src='${icon}'></h3>
                <p>Current Temp: ${temp}°F</p>
                <p>Feels like: ${feelsLike}</p>
                <p>Humidity: ${humid}</p>
                <p>Wind Speed: ${windSpeed}mph</p>
                <p>High: ${high}°F</p>
                <p>Low: ${low}°F</p>`

        $("#weatherCard").html('');
        $("#weatherCard").append(card);

        storageLocal(city);
        
    };
   

    function fiveDay(data) {
        console.log('fiveDayData :>>', data);
        let fiveDayFinal = data.list.filter(days => days.dt_txt.includes('15:00:00'))
        $("#dailyCard").html('');
        fiveDayFinal.forEach(daily => {
            let windSpeed = daily.wind.speed;
            let temp = Math.floor(daily.main.temp);
            let feelsLike = Math.floor(daily.main.feels_like);
            let city = daily.name;
            let humid = daily.main.humidity;
            let high = Math.floor(daily.main.temp_max);
            let low = Math.floor(daily.main.temp_min);
            const date = new Date(daily.dt * 1000);
            const currentDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
            let getIcon = daily.weather[0].icon;
            let icon = weatherCondition[getIcon];

            let dailyCard =
                `<div class="cardDaily">
                <h3>(${currentDate}) <img src='${icon}'></h3>
                <p>Current Temp: ${temp}°F</p>
                <p>Feels like: ${feelsLike}</p>
                <p>Humidity: ${humid}</p>
                <p>Wind Speed: ${windSpeed}mph</p>
                <p>High: ${high}°F</p>
                <p>Low: ${low}°F</p>
                </div>
                `
        $("#dailyCard").append(dailyCard);
        });
        console.log(fiveDayFinal);
            
        }

// function storageLocal(city) {
//     let historyArray = []
//     historyArray.push(city);
//     historyArray = localStorage.setItem(city, JSON.stringify(historyArray));
//     let item = JSON.parse(localStorage.getItem(city)) || [];
//     console.log(item);
//     item.forEach(searchHistory => {
//       let historySearch = 
//       `<div class="buttonHistory">
//       <button class="btnHistory">${searchHistory}</button>    
//       </div>`
//       $("#history2").append(historySearch);
//       $(".btnHistory").on("click", function(e) {
//        getCity($(this).html());
//      })
      
// });
// }

const addToSearchHistory = city => {
    let history = getSearchHistory();
    let newHist = [];

    if(history){
        newHist = history.filter(item =>{
            return item !== city
        })
    }
    // adding new city to the front of the array
    newHist.unshift(city);
    // if the new history gets bigger than 10 remove the last search stored
    if(newHist.length > 7) newHist.pop();

    localStorage.setItem('history', JSON.stringify(newHist));

    historyButton();
}
// getting the history or array from local storage and returning it
const getSearchHistory = () => {
    const history = JSON.parse(localStorage.getItem('history')) || [];
    return history;
}

/*const searchSubmitHandler = () => {
    const search = $('#search-input').val();
    
    // forecastSearch(search);
    if(search){
        forecastSearch(search);
        $('#search-input').val('')
    }
} */

// button to display searched cities and show them as a button to be searched again
const historyButton = () => {
    const history = JSON.parse(localStorage.getItem('history'));

    $('#history2').html('');

    if(history){
        history.forEach((item) => {
            const html = `<button class='hist-btn'>${item}</button>`;

            $('#history2').append(html);
        })
    }

    $('.hist-btn').on('click', function(e){
        getCity($(this).html());
    });
}

historyButton();



function searchCity(event) {
  event.preventDefault();  
  let searchedCity = citySearch.value;
  console.log('searchedCity =>', searchedCity);
  getCity(searchedCity);

  };
  
 





form.addEventListener("submit", searchCity);



