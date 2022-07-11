//when i click search that should create a new button that runs the get weather function with the paramaters that have been saved to LS

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
    // saveSearch()
    var pastSearch = document.getElementById('inputResult').value
    searchHistory.push(pastSearch);
    localStorage.setItem('search', JSON.stringify(searchHistory))
    // console.log(searchHistory)
      //render search history function goes here
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

//how do i get rid of the extra divs from past searches

//main function
function getWeather(city){

    //var city = document.getElementById('inputResult').value
    var queryRequest =` http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${key}`
//the API request function
fetch(queryRequest).then(function(res){
    return res .json();
}) .then(function(data){
    console.log(data)
    var lat = data.coord.lat
    var lon = data.coord.lon
    var cityName = data.name
    var uvapi = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&units=imperial&appid=${key}`
    fetch(uvapi).then(function(res){
        return res .json();
    }) .then(function(data){
        console.log(data)
  
        var cityInfo = [somthing, cityName, data.current.feels_like, data.current.wind_speed, data.current.humidity, data.current.uvi]
        var titles = ['', '', 'temp ', 'wind speed ', 'humidity ', 'uvi ']
        currentCity.innerHTML = '';
        for (let i = 0; i < cityInfo.length; i++) {
            let infoDiv = document.createElement('div')
            infoDiv.setAttribute('id', 'infoDiv')
            infoDiv.style.width = '100%';
            infoDiv.innerText = `${titles[i]} ${cityInfo[i]}`
            currentCity.appendChild(infoDiv)
        }
        if (data.current.uvi = 2 || data.current.uvi < 2){
            var lastchild =  document.querySelectorAll('#infoDiv')
            var uviDiv = lastchild[5]
            uviDiv.style.background = " rgb(143, 239, 91)";
        }else if (data.current.uvi = 7 || data.current.uvi < 7){
            var lastchild =  document.querySelectorAll('#infoDiv')
            var uviDiv = lastchild[5]
            uviDiv.style.background = "rgb(239, 239, 91);"
        }else{
            var lastchild =  document.querySelectorAll('#infoDiv')
            var uviDiv = lastchild[5]
            uviDiv.style.background = "rgb(241, 102, 102)"
        }
    })


    var forcastDate2 = somthing.slice(5, 7);
    console.log(somthing)

     var fiveDayForcast = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}&units=imperial`
     fetch(fiveDayForcast).then(function(res){
        return res.json();
     }).then(function(data){
        let forcastvalues = data.list.slice(0, 5)
        for (let i = 0; i < forcastvalues.length; i++) {
        var date = parseInt(forcastDate2) + i
          let targetDiv = document.getElementById(`forcast${i+1}`)
          let timeDiv = document.createElement('div')
          timeDiv.setAttribute('id', 'timeDiv')
            timeDiv.innerHTML = `${date}th`
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
            
        }
     })
    
})}








// if ()
















// as a user using our website,
// i want to, open the app and see a clear dashboard interface 
// when i look at the top, i am presented with the date and time
// when i click on a button i am linked to a website
// when i scroll to the bottom of the screen, i see a random qoute
// when i view the website on a different sized screens, i find dynamic styling that scales to the viewport
// as a user i want to be able to reprogram the buttons to the links i need
// as a user i want to be able to create folder buttons to open several commonly used site at once
// as a user i want to be able to change the color theme of the webpage 
// as a user i want to be able to set my location and have a 5 day forcast come up when i open the page