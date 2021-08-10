// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require("body-parser");
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const port = 8080;
app.listen(port, function () {
  console.log(`server run at: http://localhost:${port}/`);
});

// get route
app.get("/get-all-data", function (req, res) {
  res.send(projectData);
});

// post route
app.post("/sava-data", function (req, res) {
  projectData.temperature = req.body.temperature;
  projectData.date = req.body.date;
  projectData.userResponse = req.body.userResponse;

  res.send(projectData);
});

//all data route
app.get("/allData", (req, res) => {
  res.send(projectData);
});
