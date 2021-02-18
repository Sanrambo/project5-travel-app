import "@babel/polyfill";


function isCityValid(city) {
    const RegexCity = "^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$";
    const TestCity = new RegExp(RegexCity, "i");

    if (TestCity.test(city)) {
        return true;
    }

    return false;
}

export { isCityValid }
