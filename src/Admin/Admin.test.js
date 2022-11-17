import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import Admin from './Admin';


test("the Admin form is rendered", () => {
    render(<Admin />)
    const adminElement = screen.getByTestId("admin-form");
    expect(adminElement).toBeInTheDocument();
})

test("Check required/unrequired fields", () => {
    render(<Admin />)

    const sourceInput = screen.getByTestId("source");
    const datePublishedInput = screen.getByTestId("date-published");
    const startDateInput = screen.getByTestId("start-date");
    const endDateInput = screen.getByTestId("end-date");
    const changesWithInput = screen.getByTestId("changes-with");

    expect(sourceInput).toBeRequired();
    expect(datePublishedInput).toBeRequired();
    expect(startDateInput).not.toBeRequired();
    expect(endDateInput).not.toBeRequired();
    expect(changesWithInput).not.toBeRequired();
})

test("The form cannot be submitted without required fields filled", () => {
    render(<Admin />)

    //these boxes will be empty (invalid) by default
    const sourceInput = screen.getByTestId("source");
    const datePublishedInput = screen.getByTestId("date-published");

    expect(sourceInput).toBeInvalid();
    expect(datePublishedInput).toBeInvalid();
})

test("Valid Source and Date Published values are accepted", () => {
    render(<Admin />)

    const sourceInput = screen.getByTestId("source");
    const datePublishedInput = screen.getByTestId("date-published");

    //set values
    sourceInput.value= "Test Source";
    datePublishedInput.value = "2021-01-01";

    //check validity
    expect(sourceInput).toBeValid();
    expect(datePublishedInput).toBeValid();
})

test("Clicking the '+' adds controls to enter a party", () => {
    render(<Admin />)

    //the button to add a new party to the form
    const addPartyButton = screen.getByTestId("add-party-button");

    //check non existance of party controls
    let existingParties = screen.queryAllByTestId("party-component");
    expect(existingParties).toHaveLength(0);

    //add up to 10 parties
    for (var i = 1; i <= 10; i++) {
        //add a party
        fireEvent.click(addPartyButton);

        existingParties = screen.getAllByTestId("party-component");
        expect(existingParties).toHaveLength(i);
    }
})

test("Party and Point fields are required",()=>{
    render(<Admin />)

    //the button to add a new party to the form
    const addPartyButton = screen.getByTestId("add-party-button");
    //add a party
    fireEvent.click(addPartyButton);

    const partyInputs = screen.queryAllByTestId("party-select");
    const pointsInput = screen.queryAllByTestId("points");

    //for each party input, check that it is required
    partyInputs.forEach((element) => {
        expect(element).toBeRequired();
    })

    //for each points input, check that it is required
    pointsInput.forEach((element) => {
        expect(element).toBeRequired();
    })
})

test("Points values between 1-100 are accepted",()=>{
    render(<Admin />)

    //the button to add a new party to the form
    const addPartyButton = screen.getByTestId("add-party-button");
    //add a party
    fireEvent.click(addPartyButton);

    //get the points input that has just been added
    const pointsInput = screen.getByTestId("points");

    //test each value
    for (var i = 1; i <= 100; i++) {
        pointsInput.value = i;
        expect(pointsInput).toBeValid();
    }
})