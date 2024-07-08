const cors = require("cors");
const axios = require("axios");
const { Router } = require("express");
const express = require("express");
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Define a function to make the API call to ipapi
async function fetchIpDetails(ipAddress) {
  const url = `https://ipapi.co/${ipAddress}/json/`;
  const response = await axios(url);
  return response.data;
}

// Define the route handler
app.get("/", async (req, res) => {
  const ipAddressUrl = "https://api.ipify.org/";

  try {
    // Make the first API call to get the IP address
    const ipAddressResponse = await axios(ipAddressUrl);
    const ipAddress = ipAddressResponse.data;

    // Call the fetchIpDetails function to get the details for the IP address
    const ipDetails = await fetchIpDetails(ipAddress);

    // Send the response to the client
    res.json(ipDetails);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

//Server listener
require("dotenv").config()
const PORT = process.env.PORT || 3000;
app.listen(PORT, function(){
  console.log("Server running on localhost port ", PORT); 
});
