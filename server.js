// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
// Define the listing port
const port = 3000;
// Create the server
const server = app.listen(port, listening);
// Define the listening function for the server
function listening() {
    console.log('The Weather-journal App Server is up.');
    console.log(`Node.js env Server running at http://127.0.0.1:${port}/`);
};
// prepare the GET route data
app.get('/tempData', (req, res) => {
    console.log('GET Request coming');
    res.send(projectData);
});
// prepare the POST route data
app.post('/', (req, res) => {
    projectData.date = req.body.date;
    projectData.temperature = req.body.main.temp;
    projectData.feelings = req.body.feelings;
    console.log('POST request received');
    res.end();
});
