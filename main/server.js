// Setup empty JS object to act as endpoint for all routes
const projectData = {};

// Express to run server and routes

// Start up an instance of app
const express = require('express');
const app = express();

/* Dependencies */
/* Middleware*/
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Here we are configuring express to use body-parser as middle-ware.
// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Spin up the server
const port = 8000;
const server = app.listen(port,listening);
// Callback to debug
function listening(){
    console.log("Application running on port "+port);
}

// Initialize all route with a callback function



// Callback function to complete GET '/all'
app.get('/all', function (request, res) {
    res.send(projectData); 
  });

// Post Route

app.post('/add', addData);

function addData(req,res){
  
    projectData['temperature']=req.body.temperature;
    projectData['date']=req.body.date;
    projectData['userResponse']=req.body.userResponse;

  res.send(projectData);
}
