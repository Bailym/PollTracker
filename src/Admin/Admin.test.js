import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import Admin from './Admin';

test("The admin form is not shown on load. The password form is shown instead", () => {
    render(<Admin />)

    const passwordForm = screen.getByTestId("admin-pass-form");
    expect(passwordForm).toBeInTheDocument();

    const adminForm = screen.queryByTestId("admin-form");
    expect(adminForm).not.toBeInTheDocument();
})

test("The admin form is shown when the correct password is entered", () => {
    render(<Admin />)
    const passwordForm = screen.getByTestId("admin-pass-form");
    const passwordInput = screen.getByTestId("admin-pass-input");
    const submitButton = screen.getByTestId("admin-pass-submit");

    fireEvent.change(passwordInput, { target: { value: process.env.REACT_APP_ADMIN_PASS } });
    fireEvent.click(submitButton);

    expect(passwordForm).not.toBeInTheDocument();

    const adminForm = screen.getByTestId("admin-form");
    expect(adminForm).toBeInTheDocument();
})


test("The admin form is not shown when the incorrect password is entered", () => {
    render(<Admin />)
    const passwordForm = screen.getByTestId("admin-pass-form");
    const passwordInput = screen.getByTestId("admin-pass-input");
    const submitButton = screen.getByTestId("admin-pass-submit");

    fireEvent.change(passwordInput, { target: { value: "wrong password" } });
    fireEvent.click(submitButton);

    expect(passwordForm).toBeInTheDocument();

    const adminForm = screen.queryByTestId("admin-form");
    expect(adminForm).not.toBeInTheDocument();
})

//The following test require the admin password to be correctly entered

function EnterCorrectPassword() {
    const passwordInput = screen.getByTestId("admin-pass-input");
    const submitButton = screen.getByTestId("admin-pass-submit");

    fireEvent.change(passwordInput, { target: { value: process.env.REACT_APP_ADMIN_PASS } });
    fireEvent.click(submitButton);
}

test("the Admin form is rendered", () => {
    render(<Admin />)
    EnterCorrectPassword()
    const adminElement = screen.getByTestId("admin-form");
    expect(adminElement).toBeInTheDocument();
})

test("Check required/unrequired fields", () => {
    render(<Admin />)
    EnterCorrectPassword()

    const datePublishedInput = screen.getByTestId("date-published");
    const startDateInput = screen.getByTestId("start-date");
    const endDateInput = screen.getByTestId("end-date");
    const changesWithInput = screen.getByTestId("changes-with");
    const sampleSizeInput = screen.getByTestId("sample-size");
    const selectSourceInput = screen.getByTestId("source");

    expect(selectSourceInput).toBeRequired();
    expect(datePublishedInput).toBeRequired();
    expect(startDateInput).not.toBeRequired();
    expect(endDateInput).not.toBeRequired();
    expect(changesWithInput).not.toBeRequired();
    expect(sampleSizeInput).not.toBeRequired();
})

test("The form cannot be submitted without required fields filled", () => {
    render(<Admin />)
    EnterCorrectPassword()

    //these boxes will be empty (invalid) by default
    const selectSourceInput = screen.getByTestId("source");
    const datePublishedInput = screen.getByTestId("date-published");

    expect(selectSourceInput).toBeInvalid();
    expect(datePublishedInput).toBeInvalid();
})

test("Valid Date Published values are accepted", () => {
    render(<Admin />)
    EnterCorrectPassword()

    const datePublishedInput = screen.getByTestId("date-published");

    datePublishedInput.value = "2021-01-01";

    expect(datePublishedInput).toBeValid();
})

test("Source is not selected by default", () => {
    render(<Admin />)
    EnterCorrectPassword()

    expect(screen.getByRole('option', { name: 'Select source' }).selected).toBe(true)

})

test("Clicking the '+' adds controls to enter a party", () => {
    render(<Admin />)
    EnterCorrectPassword()

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

test("Party and Point fields are required", () => {
    render(<Admin />)
    EnterCorrectPassword()

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

test("Points values between 1-100 are accepted", () => {
    render(<Admin />)
    EnterCorrectPassword()

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




