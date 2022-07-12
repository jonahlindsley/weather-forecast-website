

var searchHistory = JSON.parse(localStorage.getItem('search')) || [];
var key = "70fc742f790b2f13b5074f8768a1b657";
var currentCity = document.getElementById('currentCity')
var inputBtn = document.querySelector('#inputBtn')
var clearBtn = document.getElementById('clear')
var pastSearches = document.getElementById('pastSearches')
var setTime = document.getElementById("currentDay")
var somthing =  moment().format('MMMM Do YYYY, h:mm:a');
inputBtn.addEventListener('click', function(event){
    event.preventDefault()
    var pastSearch = document.getElementById('inputResult').value
    searchHistory.push(pastSearch);
    localStorage.setItem('search', JSON.stringify(searchHistory))
      renderSearches()
    getWeather(pastSearch)
}) 
clearBtn.addEventListener('click', function(){
    searchHistory = []
    localStorage.clear();
    //render search history function goes here
})

function renderSearches() {
    pastSearches.innerHTML = ""
    for (let i = 0; i < searchHistory.length; i++) {
        const cityNames = document.createElement('button');
        cityNames.setAttribute('id', 'cityinput')
        // cityNames.setAttribute('type', 'text')
        cityNames.innerText = searchHistory[i]
        cityNames.setAttribute('value', searchHistory[i])
        cityNames.addEventListener('click', function(event){
            event.preventDefault()
            var returnedCity = cityNames.value
            getWeather(returnedCity)
        })
        pastSearches.append(cityNames)
             // cityNames.setAttribute('id', 'cityli')
    }
    
}

    let cloudy = document.createElement('div')
        cloudy.innerHTML = `<i class="fa-solid fa-cloud"></i>`
        let PSunny = document.createElement('div')
        PSunny.innerHTML = `<i class="fa-solid fa-cloud-sun"></i>`
        let PCloudy = document.createElement('div')
        PCloudy.innerHTML = `<i class="fa-thin fa-cloud-sun"></i>`
        let sunny = document.createElement('div')
        sunny.innerHTML = `<i class="fa-thin fa-sun"></i>`
//main function
function getWeather(city){

    //var city = document.getElementById('inputResult').value
    var queryRequest =` https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${key}`
//the API request function
fetch(queryRequest).then(function(res){
    return res .json();
}) .then(function(data){
    //console.log(data.current.weather[0].icon)
    var lat = data.coord.lat
    var lon = data.coord.lon
    var cityName = data.name
    var uvapi = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&units=imperial&appid=${key}`
    fetch(uvapi).then(function(res){
        return res .json();
    }) .then(function(data){
        console.log(data.current.weather[0].icon)
    //document.getElementById('#current-icon').setAttribute("src", `http://openweathermap.org/img/wn/${icon}@2x.png`);
        console.log(data)
        var cityInfo = [somthing, cityName, data.current.feels_like, data.current.wind_speed, data.current.humidity, data.current.uvi]
        var titles = ['', '', 'temp ', 'wind speed ', 'humidity ', 'uvi ', '']
        currentCity.innerHTML = '';
        for (let i = 0; i < cityInfo.length; i++) {
            let infoDiv = document.createElement('div')
            infoDiv.setAttribute('id', 'infoDiv')
            infoDiv.style.width = '100%';
            infoDiv.innerText = `${titles[i]} ${cityInfo[i]}`
            currentCity.appendChild(infoDiv)
        }
        if (Math.floor(data.current.uvi) < 2){
            var lastchild =  document.querySelectorAll('#infoDiv')
            var uviDiv = lastchild[5]
            uviDiv.style.background = " rgb(143, 239, 91)";
            console.log('first one tripping')
        }else if (Math.floor(data.current.uvi) < 7){
            var lastchild =  document.querySelectorAll('#infoDiv')
            var uviDiv = lastchild[5]
            uviDiv.style.background = " rgb(239, 239, 91)";
            console.log('second one tripping')
        }else{
            var lastchild =  document.querySelectorAll('#infoDiv')
            var uviDiv = lastchild[5]
            uviDiv.style.background = "rgb(241, 102, 102)";
            console.log('third one tripping')
        }

        //checks the forcast to determin the correct icon

        if (data.current.clouds < 5){
            console.log('clear sky is running')
            currentCity.appendChild(sunny)
        }else if (data.current.clouds < 50){
            console.log('partly cloudy is running')
            currentCity.appendChild(PCloudy)
        }else if (data.current.clouds <90){
            console.log('party sunny is running')
            currentCity.appendChild(PSunny)
        }else{
            console.log('last else is running')
            currentCity.appendChild(cloudy)
        }
    })

    
    var forcastDate2 = somthing.slice(5, 7);
    console.log(somthing)

     var fiveDayForcast = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}&units=imperial`
     fetch(fiveDayForcast).then(function(res){
        return res.json();
     }).then(function(data){
        console.log(data)
        let forcastvalues = data.list.slice(0, 5)
        for (let i = 0; i < forcastvalues.length; i++) {
        var date = parseInt(forcastDate2) + i
          let targetDiv = document.getElementById(`forcast${i+1}`)
          let timeDiv = document.createElement('div')
          timeDiv.setAttribute('id', 'timeDiv')
            timeDiv.innerHTML = `july ${date}th`
          let tempDiv = document.createElement('div')
          tempDiv.setAttribute('id', 'tempDiv')
            tempDiv.innerHTML = `temp ${forcastvalues[i].main.temp}`
            let humidityDiv = document.createElement('div');
            humidityDiv.setAttribute('id', 'humidityDiv')
            humidityDiv.innerHTML = `humidity ${forcastvalues[i].main.humidity}`
            let windDiv = document.createElement('div');
            windDiv.setAttribute('id', 'windDiv')
            windDiv.innerHTML = `wind speed ${forcastvalues[i].wind.speed}`
            targetDiv.append(timeDiv, tempDiv, humidityDiv, windDiv)
            timeDiv.style.padding = '4px 30px';
            tempDiv.style.padding = '4px 30px'
            windDiv.style.padding = '4px 30px'
            humidityDiv.style.padding = '4px 30px';
            if (forcastvalues[i].clouds.all < 5){
                console.log('clear sky is running')
                targetDiv.appendChild(sunny)
            }else if (forcastvalues[i].clouds.all < 50){
                console.log('partly cloudy is running')
                targetDiv.appendChild(PCloudy)
            }else if (forcastvalues[i].clouds.all <90){
                console.log('party sunny is running')
                targetDiv.appendChild(PSunny)
            }else{
                console.log('last else is running')
                targetDiv.appendChild(cloudy)
            }
            
        }
     })
    
})}
