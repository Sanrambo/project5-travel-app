import "jest-fix-undefined"
const app = require("../server/index");
const req = require("supertest");
const dotenv = require("dotenv");
dotenv.config();
const fetch = require("node-fetch");

const weatherbit_API = process.env.weatherbit_API;
const pixaBay_API = process.env.pxbay_API;
const geonames_API = process.env.geonames_API;

describe("Main page on main route should load", () => {
    test("Is the response working? ", async () => {
        const res = await req(app).get("/");
        expect(res.statusCode).toBe(200);
    });
});

describe("Testing Geonames API", () => {
    test("It should be defined", async () => {
        const geoNames_API_fetch = `http://api.geonames.org/searchJSON?q=${city}&maxRows=1&username=${geonames_API}`;

        const city = 'jeddah';
        const response = await fetch(geoNames_API_fetch);
        expect(response).toBeDefined();
        console.log(response);
    });
});


describe("Testing WeatherBit API", () => {
    test("It should be defined", async () => {
        const weatherBit_API_fetch = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lng}&key=${weatherbit_API}`;

        const lng = 39.18624;
        const lat = 21.49012;
        const response = await fetch(weatherBit_API_fetch);
        expect(response).toBeDefined();
        console.log(response);
    });
});


describe("Testing Geonames API", () => {
    test("It should be defined", async () => {
        const pixaBay_API_fetch = `https://pixabay.com/api/?key=${pixaBay_API}&q=${encodeURI(city)}&image_type=photo`;

        const city = 'jeddah';
        const response = await fetch(pixaBay_API_fetch);
        expect(response).toBeDefined();
        console.log(response);
    });
});