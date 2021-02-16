// using async await function 

const handleSubmit = async (e) => {
    e.preventDefault();


    const inputData = {};
    const outputData = {};

    inputData.destination = document.getElementById("cities").value;
    inputData.depart = document.getElementById("depart").value;
    inputData.return = document.getElementById("return").value;


    console.log(inputData);
    // Check if the     data has been entered
    isInputValid(inputData);

    // Call the date handler and assign the returned data to outputData object
    outputData.daysleft = dateAssigning(inputData.depart, inputData.return);
    console.log(outputData);

    // Get the location info from geonames api and assign it to varible so it can be used later
    const to = await postData('/traveling', { destination: inputdata.destination });
    console.log(to);

    // Get the weather from weatherbit APi using "to" i have assigned above to get lat and long
    const weather = await postData('/traveling', { lat: to.lat, long: to.long });

    // Pixbay image. Assign it to a variable and store it on outputData only the first hit
    const img = await postData('/traveling', { city: inputData.destination });
    outputData.setImg = img.hits[0].webformatURL;

    const weatherDday = outputData.daysLeft;
    outputData.city = weather.city_name;
    outputData.high = weather.data[weatherDday].high_temp;
    outputData.low = weather.data[weatherDday].low_temp;
    outputData.info = weather.data[weatherDday].weather.description;

    console.log(outputData);
    //updateUI();


};

const postData = async (url = '', data) => {

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

    const daysLeft = Math.ceil((dept_time - current_time) / (1000 * 60 * 60 * 24));


    return daysLeft;
};

export { handleSubmit };