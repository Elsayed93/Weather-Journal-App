/* Global Variables */
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const appId = "b6e3287c771945b3e7251f142c038309";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();

// get data from openweathermap API
let getWeatherData = async (baseUrl, zipCode, appId) => {
  const url = baseUrl + zipCode + "&appid=" + appId + "&units=metric";
  //
  const getReq = await fetch(url);

  try {
    const data = await getReq.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

// save data from openweathermap into my App endpoint projectData
let postWeatherData = async (url = "", data = {}) => {
  const postReq = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });

  try {
    const postRes = await postReq.json();
    return postRes;
  } catch (error) {
    console.log("error: ", error);
  }
};

// when click on generate button
document
  .getElementById("generate")
  .addEventListener("click", async function () {
    const zipCode = document.getElementById("zip");
    const userResponse = document.getElementById("feelings");

    if (zipCode.value == "") {
      alert("Please Enter Zip Code");
    } else {
      await getWeatherData(baseURL, zipCode.value, appId).then(async (data) => {
        await postWeatherData("/sava-data", {
          temperature: data.main.temp,
          date: newDate,
          userResponse: userResponse.value,
        }).then((data) => {
          updateUI();
        });
      });
    }
  });

// retrieve data from our app and update UI
updateUI = async () => {
  //
  const getAllData = await fetch("/allData");

  try {
    const allDataResponse = await getAllData.json();

    // get DOM elements to show weather information
    const dateDisplay = document.getElementById("date");
    const tempDisplay = document.getElementById("temp");
    const contentDisplay = document.getElementById("content");

    // display app information
    dateDisplay.innerHTML =
      "<span style='color:white;'>Date:</span> " + allDataResponse.date;
    tempDisplay.innerHTML =
      "<span style='color:white;'>Temperature:</span> " +
      allDataResponse.temperature +
      "<span style='margin-left:8px;'>   ْC</span>";
    contentDisplay.innerHTML =
      "<span style='color:white;'>Feelings:</span> " +
      allDataResponse.userResponse;
  } catch (error) {
    console.log("error: ", error);
  }
};
