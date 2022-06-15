// Personal API Key for OpenWeatherMap API, base URL and country code
const apiKey ='e358b0cb5ba17c3e3eba24d078448c62&units=metric'; //Metric units used
const apiBaseURL = 'https://api.openweathermap.org/data/2.5/forecast?zip=';
const countryCode = 'US';

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click',function(e){
  document.getElementById('errorMessage').style.display='none'; //Hide the section that displays errors
    retrieveAndUpdate();
})

/* Function called by event listener */
async function retrieveAndUpdate(e){ 
  let zipCode = document.getElementById('zip').value;
  retrieveWeather(apiBaseURL,zipCode,apiKey)
    .then(function(data){
      let userInput = document.getElementById('feelings').value;
      postData('/add',{temperature:data[0].temperature, date:data[0].date, userResponse:userInput});
    })
    .then(function(){
      getAllProjectData('/all');
    }
    );
  }
  

/* Function to GET Web API Data*/
const retrieveWeather = async (apiBaseURL,zipCode,apiKey) => { 
  const apiQueryURL = apiBaseURL+zipCode+','+countryCode+'&appid='+apiKey; 
    const response = await fetch(apiQueryURL);
      
  try {
    const allWeatherInfo = await response.json(); 
    let mainWeatherInfo = new Array;
    mainWeatherInfo.push({date: allWeatherInfo.list[0].dt_txt ,temperature : allWeatherInfo.list[0].main.temp_max});
    return mainWeatherInfo;
  }catch(error) {
  console.log("error", error);
  showError(error,'weatherData');
  } 
}

/* Function to POST data */
const postData = async ( url='', data = {}) => { 
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json', 
            },
    body: JSON.stringify(data),
  })

    try {
      const newData = await response.json() 
      return newData;
    } catch(error) {
    console.log("error", error);
    showError(error,'post');
    } 
  }


/* Function to GET Project Data */
const getAllProjectData = async (url='') => { 
    const response = await fetch('/all')
      
  try {
    const projectData = await response.json(); 
    //Adding the values to the information display section under the form
    document.getElementById('date').innerHTML = projectData[0].date;
    document.getElementById('temp').innerHTML = projectData[0].temperature+' °C';
    document.getElementById('content').innerHTML = projectData[0].userResponse;
    return projectData;
  }catch(error) {
  console.log("error", error);
  showError(error,'getAll');
  
  } 
}


function showError(error,route){
  document.getElementById('errorMessage').style.display='block'
  let message='';
switch (route){
  case('weatherData'):
  message="Error when retrieving weather data"
  break;
  case('post'):
  message="Error when saving information to the server"
  break;
case ('getAll'):
  message="Error when retrieving data from the server: ";
  break;
}
  document.getElementById('errorMessage').innerHTML = message+': '+error; //The contents of the information display section will be replaced with an error message
}