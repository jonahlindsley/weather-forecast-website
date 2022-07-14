

var searchHistory = JSON.parse(localStorage.getItem('search')) || [];
var key = "70fc742f790b2f13b5074f8768a1b657";
var inputBtn = document.querySelector('#inputBtn')
var clearBtn = document.getElementById('clear')
var pastSearches = document.getElementById('pastSearches')
var setTime = document.getElementById("currentDay")
var somthing = moment().format('MMMM Do YYYY, h:mm:a');
var forcastDate = moment().format('Do')
inputBtn.addEventListener('click', function (event) {
    event.preventDefault()
    var pastSearch = document.getElementById('inputResult').value
    searchHistory.push(pastSearch);
    localStorage.setItem('search', JSON.stringify(searchHistory))
    renderSearches()
    getWeather(pastSearch)
})
clearBtn.addEventListener('click', function () {
    searchHistory = []
    localStorage.clear();
    //render search history function goes here
})

function renderSearches() {
    pastSearches.innerHTML = ""
    for (let i = 0; i < searchHistory.length; i++) {
        const cityNames = document.createElement('button');
        cityNames.setAttribute('id', 'cityinput')
        cityNames.innerText = searchHistory[i]
        cityNames.setAttribute('value', searchHistory[i])
        cityNames.addEventListener('click', function (event) {
            event.preventDefault()
            var returnedCity = cityNames.value
            getWeather(returnedCity)
        })
        pastSearches.append(cityNames)
    }
    
}
//main function
function getWeather(city) {
    
    var queryRequest = ` https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${key}`
    //the API request function
    fetch(queryRequest).then(function (res) {
        return res.json();
    }).then(function (data) {
        var lat = data.coord.lat
        var lon = data.coord.lon
        var cityName = data.name
        var uvapi = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&units=imperial&appid=${key}`
        fetch(uvapi).then(function (res) {
            return res.json();
        }).then(function (data) {
            var icon = data.current.weather[0].icon
            var setIcon = document.getElementById('current-icon')
            var currentHumidityDiv = document.getElementById('humidityDiv')
            var currentWindDiv = document.getElementById('windDiv')
            var currentTempDiv = document.getElementById('tempDiv')
            var currentTime = document.getElementById('timeDiv')
            var currentUVI = document.getElementById('UVIDiv')
            var currentCity = document.getElementById('cityName')
            currentCity.innerText = cityName
            currentUVI.innerText = `UVI ${data.current.uvi}`
            currentTime.innerText = somthing
            currentHumidityDiv.innerText = `humidity ${data.current.humidity}`
            currentTempDiv.innerText = `current temp ${data.current.feels_like}`
            currentWindDiv.innerText = `wind ${data.current.wind_speed}`

            // this if statement styles the UV index color change
            if (Math.floor(data.current.uvi) < 2) {
                currentUVI.style.background = " rgb(143, 239, 91)";
            } else if (Math.floor(data.current.uvi) < 7) {
                currentUVI.style.background = " rgb(239, 239, 91)";
            } else {
                currentUVI.style.background = "rgb(241, 102, 102)";
            }
            setIcon.setAttribute('src', `http://openweathermap.org/img/wn/${icon}@2x.png`);
            //checks the forcast to determin the correct icon

            for (let i = 0; i < 5; i++) {
                let targetDiv = document.getElementById(`forcast${i + 1}`)
                let timeDiv = document.getElementById(`timeDiv${i}`)
                let tempDiv = document.getElementById(`tempDiv${i}`)
                let humidityDiv = document.getElementById(`humidityDiv${i}`)
                let windDiv = document.getElementById(`windDiv${i}`)
                let html2 = `<div><div><img src="" alt="" id='current-icon${[i]}'></div></div>`;
                var icon2 = data.daily[i+1].weather[0].icon
                var time = parseInt(forcastDate) 
                var setIcon = document.getElementById(`current-icon${[i]}`)
                tempDiv.innerHTML = `temp ${data.daily[i+1].feels_like.day}`
                humidityDiv.innerHTML = `humidity ${data.daily[i+1].humidity}`
                windDiv.innerHTML = `wind speed ${data.daily[i+1].wind_speed}`
                timeDiv.innerText = `july ${time+i+1}`
                targetDiv.insertAdjacentHTML("beforeend", html2);
                setIcon.setAttribute('src', `http://openweathermap.org/img/wn/${icon2}@2x.png`);
                timeDiv.style.padding = '4px 30px';
                tempDiv.style.padding = '4px 30px'
                windDiv.style.padding = '4px 30px'
                humidityDiv.style.padding = '4px 30px';

            }
        })

    })
}
