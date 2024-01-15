
const apiKey = 'bc7b5847c01b1c1a77d278a2cbf29ee6';


function getSearchResults(lat, lon) {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    return fetch(url).then(function (res) {
        if(!res.ok) throw new Error(res.statusText)

        return res.json();

    });
}

getSearchResults(40.233845, -111.658531).then(function (data) {
    console.log('data :>> ', data);
});

function getCity(city) {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    return fetch(url).then(function (res) {
        if(!res.ok) throw new Error(res.statusText)

        return res.json();

    }).then((place) => {
        console.log('place :>>', place);
    });
}

getCity('Provo');
