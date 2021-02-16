const projectData = [];

const fetch = require('node-fetch');
var path = require('path');
const express = require('express');
var bodyParser = require("body-parser");
var cors = require("cors");

const dotenv = require('dotenv')
dotenv.config();

console.log(__dirname);

//const App_API = process.env.API_KEY;
const weatherbit_API = process.env.weatherbit_API;
const pxbay_API = process.env.pxbay_API;
const geonames_API = process.env.geonames_API;

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('dist'));

app.get("/", function (req, res) {
    res.sendFile("src/client/views/index.html");
});

const getGeo = async (city) => {

    try {
        const geonamesUrl = `http://api.geonames.org/searchJSON?q=${city}&maxRows=1&username=${geonames_API}`;
        const response = await fetch(geonamesUrl);
        const data = await response.json();
        return {

            lat: data.geonames[0].lat,
            lng: data.geonames[0].lng

        };
    } catch (error) {
        console.log("Error", error);
    }

}

const getWeather = async (lat, lng) => {

    try {
        const weatherbitUrl = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lng}&key=${weatherbit_API}`;
        const response = await fetch(weatherbitUrl)
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Error", error);
    }
}

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

app.post('/traveling', async (req, res) => {

    try {
        const destination = req.body.destination;
        const depDate = req.body.fromDate;
        const returnDate = req.body.returnDate;

        const geonamesData = await getGeo(destination);
        const weatherbitData = await getWeather(geonamesData.lat, geonamesData.lng);
        const pixabayData = await getImg(destination);

        const tripData = {
            geonamesData,
            weatherbitData,
            pixabayData,
            depDate,
            returnDate
        }

        projectData.push(tripData);
        res.json(tripData);
    } catch (err) {

        console.log(err);
        res.status(400).send(err);
    }
});

app.listen(7777, function () {
    console.log("Example app listening on port 7777!");
});

module.exports = app;