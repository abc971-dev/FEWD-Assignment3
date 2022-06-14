// Personal API Key for OpenWeatherMap API
const apiKey ='e358b0cb5ba17c3e3eba24d078448c62';
const apiBaseURL = 'https://api.openweathermap.org/data/2.5/forecast?zip=';
const countryCode = 'US';

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click',function(e){
    e.preventDefault();
    retrieveAndUpdate();
})

/* Function called by event listener */
async function retrieveAndUpdate(e){ 
  let zipCode = document.getElementById('zip').value;
  console.log("Requête : "+apiBaseURL+zipCode+','+countryCode+'&appid='+apiKey);
  retrieveWeather(apiBaseURL,zipCode,apiKey)
    .then(function(data){
      let userInput = document.getElementById('feelings').value;
      console.log(data);
      postData('/add',{temperature:data[0].temperature, date:data[0].date, userResponse:userInput});
    })
    .then(function(){
      const allData = getAllProjectData('/all');
      console.log(allData);
       document.getElementById('date').innerHTML=allData[0].date;
       document.getElementById('temp').innerHTML=allData[0].temperature;
       
    }
    );
  }
  

/* Function to GET Web API Data*/
const retrieveWeather = async (apiBaseURL,zipCode,apiKey) => { 
  const apiQueryURL = apiBaseURL+zipCode+','+countryCode+'&appid='+apiKey+'&units=metric';
  //console.log("Requête : "+apiURL+'zip'+zipCode+','+countryCode+'&appid='+apiKey);
    const response = await fetch(apiQueryURL);
      
  try {
    const allWeatherInfo = await response.json(); 
    let mainWeatherInfo = new Array;
    mainWeatherInfo.push({date: allWeatherInfo.list[0].dt_txt ,temperature : allWeatherInfo.list[0].main.temp_max});
    console.log(mainWeatherInfo);
    return mainWeatherInfo;
  }catch(error) {
  console.log("error", error);
  } 
}

/* Function to POST data */
const postData = async ( url='', data = {}) => { //postData est une fonction asynchrone qui ne sera exécutée que lorsque l'URL et les données seront déterminées. Elle communique avec le routing POST et doit donc fournir une requête avec une URL et un corps
  console.log("Début post data avec les données "+data.temperature+" et "+data.date+" et la saisie "+data.userResponse);  
  const response = await fetch(url, {//postData communique avec le routing du serveur défini pour la requête POST et doit donc attendre la réponse du serveur pour une requête POST
    method: 'POST', //Pourrait être GET, PUT, DELETE
    credentials: 'same-origin', //Contenu de base
    headers: {
        'Content-Type': 'application/json', //Contenu de base
            },
   // Body data type must match "Content-Type" header
   //Permettra aux éléments d'être envoyés comme request.body au serveur. Ils doivent donc être convertis en string JSON        
    body: JSON.stringify(data),
  })

    try {
      const newData = await response.json() //La réponse du serveur doit avoir été reçue pour pouvoir traiter les nouvelles données
      console.log("Données ajoutées : "+newData);
      return newData;
    } catch(error) {
    console.log("error", error);
    } 
  }


/* Function to GET Project Data */
const getAllProjectData = async (url='') => { 
    const response = await fetch('/all')
      
  try {
    const projectData = await response.json(); //La réponse du serveur doit avoir été reçue pour pouvoir traiter les nouvelles données
    console.log(projectData);
    document.getElementById('date').innerHTML = projectData[0].date;
    document.getElementById('temp').innerHTML = projectData[0].temperature;
    document.getElementById('content').innerHTML = projectData[0].userResponse;
    return projectData;
  }catch(error) {
  console.log("error", error);
  document.getElementById('resGet').innerHTML = "Erreur : "+error;
  } 
}