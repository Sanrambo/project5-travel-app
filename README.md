# Traveling App **"TRAVELER"**

This repo is the final project of FEND-Udacity; Travel App
## Overview

In short, in this project user has to pick a destination "city" and deprature date and return date. Based on these infromation the used APIs gonns retrieve the needed data.
Like weather condition, tempreture and a picture of that place. Then the app will calculate how many days left fo the trip and the duration of the trip.

## Used APIs
- Geonames API: for lat and lng.
- WeatherBit API: for high and low tempreture plus the weather description (ie: rainy, cloudy, etc).<br/>
- PixaBay API: for the destination image.
- CountryFlag API: for country flag icon.

## Getting started
Use anyway you like to extract the rapistory to run and test the project. Cloning or downloading the zip file.

## Install all the needed packages
- Install them by using `npm install`


## API KEY
- Geonames API: go to [GeoNames](https://www.geonames.org/) and request your own API key. The API key is your username
- Weatherbit API: go to [Weatherbit](https://www.weatherbit.io/) and request your own API key.
- Pixabay API: go to [Pixabay](https://pixabay.com/api) and request for your own API key.
- Country Flag API: no need, it depends on Weatherbit API.


## Building Envoriments
Since Webpack is used, there are two modes to run the application which is **Production** and **Development** mode.

### How to run these enviroments:
**Production**: use `npm run build-prod` then run the server by `npm start`.<br/>
**Development**: run the server `npm start` then use `npm run build-dev`.

## Port
The application gonna run on **"http://localhost/7777"**

## Testing
Jest is used to test the functions you can test by running `npm run test`



