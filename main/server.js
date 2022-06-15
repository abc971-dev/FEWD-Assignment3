// Setup empty JS object to act as endpoint for all routes

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
app.use(express.static('webapp'));

// Spin up the server
const port = 8000;
const server = app.listen(port,listening);
// Callback to debug
function listening(){
    console.log("Application running on port "+port);
}

// Initialize all route with a callback function

const projectData = new Array;

// Callback function to complete GET '/all'
app.get('/all', function (request, res) {
    res.send(projectData); 
  });

// Post Route

app.post('/add', function(req,res) {
    let newData = req.body;
    let newEntry = {
      temperature: newData.temperature,
      date: newData.date,
      userResponse: newData.userResponse
    };
    projectData.unshift(newEntry); //Adds the new element at the beginning of the array
    res.send(projectData);
});


