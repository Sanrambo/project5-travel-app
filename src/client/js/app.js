import "@babel/polyfill";
import { isCityValid } from './checkCity.js'

// using async await function 
const handleSubmit = async () => {


    // define objects to save the data on them
    const inputData = {};
    let outputData = {};
    const result = {};

    //getting the inserted data from html
    inputData.destination = document.getElementById("destination").value;
    inputData.depart = document.getElementById("depart").value;
    inputData.return = document.getElementById("return").value;

    // Check if the     data has been entered
    isInputValid(inputData);

    // Call the date handler and assign the returned data to outputData object
    const time = dateAssigning(inputData.depart, inputData.return);


    //saving the result from "time" object to "outputData" 
    outputData.duration = time.duration;
    outputData.daysleft = time.daysleft;


    // Make cure if user inserted a valid input & if one of the feilds is empty
    if (isCityValid(inputData.destination)) {
        if (time.dept >= time.current && time.return >= time.current && time.return >= time.dept) {

            //store all the result in one object
            result.trip = await postData('http://localhost:7777/traveling', {

                destination: inputData.destination
            })

            console.log(result.trip);

            //store the needed data for the output in "outputData" object 
            const countryIcon = result.trip[0].weatherbitData.country_code;

            //store how many days left for the trip in a varible
            const weatherDday = outputData.daysleft;

            //putting the needed outputs in "outputData"
            outputData.city = result.trip[0].weatherbitData.city_name;
            outputData.high = result.trip[0].weatherbitData.data[weatherDday].high_temp;
            outputData.low = result.trip[0].weatherbitData.data[weatherDday].low_temp;
            outputData.info = result.trip[0].weatherbitData.data[weatherDday].weather.description;
            outputData.img = result.trip[0].pixabayData.largeImageURL;

            //Country Flag api
            outputData.icon = `https://www.countryflags.io/${countryIcon}/shiny/32.png`;

            //Updating the UI with the retrieved data
            updateUI(outputData);

        } else {

            alert('Please enter a valid date :)! (hint: a day next to the current day)')
        }
    } else {

        alert('Please enter a valid city name :)! (hint: like London,Jeddah, Istanbul.. etc)')
    }

};

//posting data
const postData = async (url = '', data = {}) => {


    const res = await fetch(url, {
        method: 'post',
        credentials: 'same-origin',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        const newData = await res.json();
        return newData;
    } catch (error) {
        console.log("error", error);
    }
};

//The function for checking the validaty of the input
const isInputValid = (input) => {

    if (input.depart == "" || input.return == "" || input.destination == "") {

        alert("Some inputs are missing, please try again!");
        return false;
    }

    return true;

};


//Calculating how many days left for the trip and trip duration
const dateAssigning = (deptDate, returnDate) => {

    const current_time = new Date().getTime();
    const dept_time = new Date(deptDate).getTime();
    const return_time = new Date(returnDate).getTime();

    const daysleft = Math.ceil((dept_time - current_time) / (1000 * 60 * 60 * 24));
    const duration = Math.ceil((return_time - dept_time) / (1000 * 60 * 60 * 24));

    return {
        daysleft: daysleft,
        duration: duration,
        current: current_time,
        dept: dept_time,
        return: return_time
    };
};

//updating html with DOOM 
const updateUI = (outputResult) => {

    const container = document.getElementById('container-result');
    container.style.display = "block";


    let weatherResult = "";
    //To decide weither it is current weather or predicted forecast weather
    if (outputResult.daysleft <= 7) {
        weatherResult = "The current weather is"
    } else {

        weatherResult = "The predicted weather is";
    }

    //html updating
    container.innerHTML = `
    <div class="content-result" id="content-result">

        <img src="${outputResult.img}"  alt="${outputResult.city}" class="img-result" id="img-result">
        <div class="text-result" id="text-result">
            <h3>Your trip to <b>${outputResult.city} <img src="${outputResult.icon}"  alt="icon" class="icon"> </b>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; will be in <b>${outputResult.daysleft}</b> days.</h3>
            <h3>Trip duration is <b>${outputResult.duration}</b> days.</h3>
            <h3>${weatherResult} <b>${outputResult.info}</b>,
            with high temperature of <b>${outputResult.high}&deg;C</b><br> and low temperature of <b>${outputResult.low}&deg;C</b>.</h3>
            <h3>Hope you enjoy your trip :)</h3>
        </div>
    </div>

    `
}

export { handleSubmit, isInputValid };