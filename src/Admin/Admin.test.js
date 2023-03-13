import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import Admin from './Admin';

function EnterCorrectPassword() {
    const passwordInput = screen.getByTestId("admin-pass-input");
    const submitButton = screen.getByTestId("admin-pass-submit");

    fireEvent.change(passwordInput, { target: { value: process.env.REACT_APP_ADMIN_PASS } });
    fireEvent.click(submitButton);
}

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

    EnterCorrectPassword()
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

test("Required and not-required form fields are marked accordingly", () => {
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

test("Required fields which are empty are marked as invalid", () => {
    render(<Admin />)
    EnterCorrectPassword()

    const selectSourceInput = screen.getByTestId("source");
    const datePublishedInput = screen.getByTestId("date-published");

    expect(selectSourceInput).toBeInvalid();
    expect(datePublishedInput).toBeInvalid();
})

test("Valid Dates are accepted on date fields", () => {
    render(<Admin />)
    EnterCorrectPassword()

    const datePublishedInput = screen.getByTestId("date-published");
    const startDateInput = screen.getByTestId("start-date");
    const endDateInput = screen.getByTestId("end-date");
    const changesWithInput = screen.getByTestId("changes-with");

    datePublishedInput.value = "2022-01-10";
    startDateInput.value = "2022-01-01";
    endDateInput.value = "2022-01-06";
    changesWithInput.value = "2021-11-24";

    expect(datePublishedInput).toBeValid();
    expect(startDateInput).toBeValid();
    expect(endDateInput).toBeValid();
    expect(changesWithInput).toBeValid();
})

test("Source field is unselected by default", () => {
    render(<Admin />)
    EnterCorrectPassword()

    expect(screen.getByRole('option', { name: 'Select source' }).selected).toBe(true)
})