

(function() {

    var url = "https://api.openweathermap.org/data/2.5/weather?q=Amsterdam&units=metric";
    var apiKey = "f8960fc9f76119d56550b0f30418968a";
    var httpRequest;
    makeRequest();
    
    function makeRequest() {
    
        httpRequest = new XMLHttpRequest();
        httpRequest.onreadystatechange = responseMethod;
        httpRequest.open('GET', url + '&appId=' + apiKey);
        httpRequest.send();
        
    }

    //Handle the response

    function responseMethod() {
        if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200) {
                updateUISuccess(httpRequest.responseText);
            } else {
                updateUIError();
                
            }
            console.log(httpRequest.responseText);
        }
    }

//Handle XHR success

function updateUISuccess(responseText) {
    var response = JSON.parse(responseText);
    var condition = response.weather[0].main;
    var degC = response.main.temp;
    var degCInt = Math.floor(degC);
    var degF = degC * 1.8 + 32;
    var degFInt = Math.floor(degF);
    var weatherBox = document.getElementById('weather');
    weatherBox.innerHTML = "<p>" + degCInt + "&#176; C /" + degFInt + "&#176; F</p><p>" + condition + "</p>";
    
    
}

//handle XHR error
function updateUIError() {
    var weatherBox = document.getElementById("weather");
    weatherBox.className = "hidden";
}

})();


//button
var button = document.getElementById("click");
	var body = document.getElementsByTagName("body");	
 
	button.addEventListener("click", function () {
		body[0].style.backgroundImage = "url('https://stormandsky.com/gif/14.gif')"
    
      
	});

//map

L.mapbox.accessToken = 'pk.eyJ1IjoicG9saW5hc2NoIiwiYSI6ImNqdHp3Z3Z0cjAwcWE0NG8zdTAwbWRmaWEifQ.wutMXvCFW3cwTPKXR9pymA';
var map = L.mapbox.map('map')
    .setView([52.3680, 4.9036], 9)
    .addLayer(L.mapbox.styleLayer('mapbox://styles/mapbox/streets-v11'));



//Get the time
function startTime() {
    
    var date = new Date();
    var h = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();


    m = checkTime(m);
    s = checkTime(s);

    document.getElementById('time').innerHTML =  h + ":" + m + ":" + s;

    //Sets the speed of the time
    setTimeout(startTime, 500);
}

//Function to make sure the time is shown correctly
function checkTime(i) {
  if (i < 10) {i = "0" + i}
     return i;
}

//Execute the time
startTime();
checkTime();


var up = true;
var value = -80;
//Speed in km/s
var increment = 80;
//Distance to Mars
var max = 54600000;

//Function to calculate the distance  
function travelDistance()  {

    if (up == true && value <= max) {
        value += increment;


    } 
    else {
        value = 54600001;


    }

    document.getElementById('counter').innerHTML = 'km: ' + value + '<br /v>';
    document.getElementById('speed').innerHTML = increment + ' km / s <br /v>';

    status();

}

//Set the speed of the function 
var setInterval;
setInterval(travelDistance, 1000);

//Run the travelDistance function 
travelDistance();
