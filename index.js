// // // console.log("hello nitish mandal")

// const API_KEY = "d1845658f92b31c64bd94f06f7188c9c";
// async function weathershow() {
//     try {
//         let city = "bangalore";
//         const response = await fetch(
//             `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
//         );
//         const data = await response.json();
//         console.log("weather data -> ", data);

//         let newPara = document.createElement("p");
//         newPara.textContent = `${data?.main?.temp.toFixed(2)} c`;

//         document.body.appendChild(newPara);
//     } catch (err) { }
// }

// // async function customweatherDetails()
// // {

// //     try{
// //         let lon=17.633;
//         let lat=11.2222;

//         const result= await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
//         const data=await result.json();

//         console.log(data);
//     }
//     catch(err){
//         console.log("Error found");
//     }

// }

// //location of current position

// function getLocation(){
//     if(navigator.geolocation){
//         navigator.geolocation.getCurrentPosition(showPosition);
//     }
//     else{
//         console.log ("current location not found");
//     }
// }

// function showPosition(position){
//     let lat=position.coords.latitude;
//     let longi=position.coords.longitude;

//     console.log(lat);
//     console.log(longi);
// }

const userTab = document.querySelector("[data-userweather]");
const searchTab = document.querySelector("[data-searchWeather]");
const userContainer = document.querySelector(".weather-container");
const grantAccessContainer = document.querySelector(".grant-location-container");
const searchForm = document.querySelector("[data-formcontainer]");
const loadingScreen = document.querySelector(".loading-container");
const userInfoContainer = document.querySelector(".user-info-container");

//initial variable need

let currentTab = userTab;
const API_KEY = "d1845658f92b31c64bd94f06f7188c9c";
currentTab.classList.add("current-tab");
getfromSessionStorage();

// function for switchTab

function switchTab(clickedTab){
    if(clickedTab != currentTab)
    {
        currentTab.classList.remove("current-tab");
        currentTab=clickedTab;
        currentTab.classList.add("current-tab");

        if(!searchForm.classList.contains("active")){          // is searchform is invisible then make it visible
            userInfoContainer.classList.remove("active");
            grantAccessContainer.classList.remove("active");
            searchForm.classList.add("active");     //if it contains search form data then active css property applied and hide others.
        }
        else{
            searchForm.classList.remove("active");      //searchform data ko v hide kr do
            userInfoContainer.classList.remove("active");        //userInfo data ko hide kr do
            getfromSessionStorage();           //function creating for getting data from api
        }
    }
}

// Event listner for switching tab
userTab.addEventListener("click" , ()=>{
    switchTab(userTab);      //if u clicked user tab pass it as argument
});

searchTab.addEventListener("click",()=>{
    switchTab(searchTab);     //searchtab pass as an argument becoz u clicked on search tab it has to be changed
})

//check if cordinates are already present in session storage
function getfromSessionStorage(){
    const localcoordinates=sessionStorage.getItem("user-coordinates");
    if(!localcoordinates){
        grantAccessContainer.classList.add("active");
    }
    else{
        const coordinates=JSON.parse(localcoordinates);
        fetchUserWeatherInfo(coordinates);
    }
}

async function fetchUserWeatherInfo(coordinates){
    const {lat,lon} =coordinates;
    grantAccessContainer.classList.remove("active")//pehle grant access ko hide kr do or loader ko visible kr do
    loadingScreen.classList.add("active");
    //api call
    try{
        const response= await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
        const data= await response.json();
        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);
    }
    catch(err){
        loadingScreen.classList.remove("active");
        // h/w

    }
}

function renderWeatherInfo(weatherInfo)
{
    //firstly we have to fetch the elements
    const cityName=document.querySelector("[data-cityname]");
    const countryIcon=document.querySelector("[data-countryicon]");
    const desc= document.querySelector("[ data-weatherDesc]");
    const weatherIcon=document.querySelector("[data-weatherIcon]");
    const temp=document.querySelector("[data-temp]");
    const windSpeed=document.querySelector("[data-windspeed]");
    const humidity=document.querySelector("[data-humidity]");
    const cloudiness=document.querySelector("[data-cloudiness]");

    //fetch values from weatherInfo object and put it in UI elements
    cityName.innerText = weatherInfo?.name;
    countryIcon.src=`https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
    desc.innerText=weatherInfo?.weather?.[0]?.description;
    weatherIcon.src=`http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
    temp.innerText=`${weatherInfo?.main?.temp} °C` ;
    windSpeed.innerText=`${weatherInfo?.wind?.speed} m/s`;
    humidity.innerText=`${weatherInfo?.main?.humidity} %`;
    cloudiness.innerText=`${weatherInfo?.clouds?.all}`;

}
function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else{
        //hw- show an alert for no geo location support available
        alert("no geolocation is found");
    }
}
function showPosition(position){
    const userCoordinates= {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
    }
    sessionStorage.setItem(user-coordinates,JSON.stringify(userCoordinates));
    fetchuserweatherInfo(userCoordinates);

}

const grantAccessButton=document.querySelector("[data-grantAccess]");
grantAccessButton.addEventListener("click",getLocation);

const searchInput=document.querySelector("[data-searchInput]");
searchForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    let cityName=searchInput.value;
    if(cityName === " ")
        return ;
    else
        fetchsearchWeatherInfo(cityName);
})

async function fetchsearchWeatherInfo(city){
    loadingScreen.classList.add("active");
    userInfoContainer.classList.remove("active");
    grantAccessButton.classList.remove("active");

    try{
        const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
        const data=await response.json();
        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);

    }
    catch(err){
        //h/w
        console.log("error found");
    }
}


async function rohit(){
    const lat = 32.99;
    const lon = 74.93;
    const response = await fetch (`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
    const data =await response.json();
    console.log(data);

}

searchForm.addEventListener("click",() => {
    searchForm.style.display='none';
})