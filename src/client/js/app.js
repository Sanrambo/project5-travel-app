import "@babel/polyfill";
// using async await function 

const handleSubmit = async (e) => {
    //e.preventDefault();


    const inputData = {};
    let outputData = {};
    const result = {};

    inputData.destination = document.getElementById("destination").value;
    inputData.depart = document.getElementById("depart").value;
    inputData.return = document.getElementById("return").value;


    console.log(inputData);
    // Check if the     data has been entered
    isInputValid(inputData);

    // Call the date handler and assign the returned data to outputData object
    const time = dateAssigning(inputData.depart, inputData.return);

    console.log(time);

    outputData.duration = time.duration;
    outputData.daysleft = time.daysleft;
    console.log(outputData);



    if (Client.isCityValid(inputData.destination)) {
        if (time.dept >= time.current && time.return >= time.current && time.return >= time.dept) {
            //store all the result in one object
            result.trip = await postData('/traveling', {

                destination: inputData.destination
            })
            console.log(result);
            //store the needed data for the output in "outputData" object 
            //get the weather of the first day of the trip
            const countryIcon = result.trip[0].weatherbitData.country_code;
            const weatherDday = outputData.daysleft;

            outputData.city = result.trip[0].weatherbitData.city_name;
            outputData.high = result.trip[0].weatherbitData.data[weatherDday].high_temp;
            outputData.low = result.trip[0].weatherbitData.data[weatherDday].low_temp;
            outputData.info = result.trip[0].weatherbitData.data[weatherDday].weather.description;
            outputData.img = result.trip[0].pixabayData.largeImageURL;


            outputData.icon = `https://www.countryflags.io/${countryIcon}/shiny/32.png`;

            console.log(outputData);

            updateUI(outputData);

        } else {

            alert('Please enter a valid date :)! (hint: a day next to the current day)')
        }
    } else {

        alert('Please enter a valid city name :)! (hint: like London,Jeddah, Istanbul.. etc)')
    }

};

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

const isInputValid = (input) => {

    if (input.depart == "" || input.return == "" || input.destination == "") {

        alert("Some inputs are missing, please try again!");
        return false;
    }

    return true;

};


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

const updateUI = (outputResult) => {

    const container = document.getElementById('container-result');
    container.style.display = "block";


    let weatherResult = "";

    if (outputResult.daysleft <= 7) {
        weatherResult = "The current weather is"
    } else {

        weatherResult = "The predicted weather is";
    }


    container.innerHTML = `
    <dev class="content-result" id="content-result">

        <div class="img-result" id="img-result">
            <img src="${outputResult.img}"  alt="${outputResult.city}" >
        </div>
        <div class="text-result" id="text-result">
            <h3>Your trip to <b>${outputResult.city} <img src="${outputResult.icon}"  alt="icon" class="icon"> </b>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; will be in <b>${outputResult.daysleft}</b> days.</h3>
            <h3>Trip duration is <b>${outputResult.duration}</b> days.</h3>
            <h3>${weatherResult} <b>${outputResult.info}</b>,
            with high temperature of <b>${outputResult.high}&deg;C</b> and low temperature of <b>${outputResult.low}&deg;C</b>.</h3>
            <h3>Hope you enjoy your trip :)</h3>
        </div>
    </div>

    `
}

export { handleSubmit };