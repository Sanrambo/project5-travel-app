import { handleSubmit, postData, isInputValid, dateAssigning } from '../client/js/app'


describe("Testing the handleSubmit() functionality", () => {
    test("Testing the handleSubmit() functionality", async () => {
        expect(handleSubmit).toBeInstanceOf(Function);
    });

});


describe("Testing the handleSubmit() is defined ", () => {
    test("Checking if the function is defined/exist", async () => {
        expect(handleSubmit).toBeDefined();
    });
});

describe("Checking input validation ", () => {
    test("Is the input valid?", async () => {


        const Input = {};

        Input.destination = "london";
        Input.depart = "";
        Input.return = "";


        expect(isInputValid(Input))
            .toBe(false);
    });
});


