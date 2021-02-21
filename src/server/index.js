//The array that its gonna be used to store the data
const projectData = [];

const regeneratorRuntime = require("regenerator-runtime");
const fetch = require('node-fetch');
var path = require('path');
const express = require('express');
var bodyParser = require("body-parser");
var cors = require("cors");


const dotenv = require('dotenv')
dotenv.config();

//Getting the keys from .env
const weatherbit_API = process.env.weatherbit_API;
const pxbay_API = process.env.pxbay_API;
const geonames_API = process.env.geonames_API;

//Initialize the server
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('dist'));

app.get("/", function (req, res) {
    res.sendFile(path.resolve("dist/index.html"));
    res.sendFile(path.resolve("./client/views/index.html"));
});

//Defining the port
app.listen(7777, function () {
    console.log("Example app listening on port 7777!");
});

//GeoNames API fetch function
const getGeo = async (city) => {

    try {
        const geonamesUrl = `http://api.geonames.org/searchJSON?q=${city}&maxRows=1&username=${geonames_API}`;
        const response = await fetch(geonamesUrl);
        const data = await response.json();
        return {

            lat: data.geonames[0].lat,
            lng: data.geonames[0].lng,

        };
    } catch (error) {
        console.log("Error", error);
    }

}

//WeatherBit API fetch function
const getWeather = async (lat, lng) => {

    try {
        const weatherbitUrl = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lng}&key=${weatherbit_API}`;
        const response = await fetch(weatherbitUrl)
        return await response.json();
    } catch (error) {
        console.log("Error", error);
    }
}

//PixaBay API fetch function
const getImg = async (city) => {

    try {
        const pxbayUrl = `https://pixabay.com/api/?key=${pxbay_API}&q=${encodeURI(city)}&image_type=photo`;
        const response = await fetch(pxbayUrl)
        const data = await response.json();
        return data.hits[0];
    } catch (error) {
        console.log("Error", error);
    }

}

//the route
app.post('/traveling', async (req, res) => {


    try {
        const destination = req.body.destination;
        const geonamesData = await getGeo(destination);

        const lat = geonamesData.lat;
        const lng = geonamesData.lng;
        const weatherbitData = await getWeather(lat, lng);
        const pixabayData = await getImg(destination);

        //storing the results in tripData object
        const tripData = {

            geonamesData,
            weatherbitData,
            pixabayData

        };

        //pushing the data into projectData array
        projectData.push(tripData);
        res.json(projectData);
    } catch (err) {

        console.log(err);
        res.status(400).send(err);
    }
});

module.exports = app;
