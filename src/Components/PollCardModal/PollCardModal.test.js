import '@testing-library/jest-dom';
import { fireEvent, render, screen, within } from '@testing-library/react';
import PollCardModal from './PollCardModal';


let testData = {
    "Source": "Test Source",
    "DatePublished": "2021-05-01T00:00:00.000Z",
    "SurveyDate": {
        "StartDate": "2021-04-01T00:00:00.000Z",
        "EndDate": "2021-04-30T00:00:00.000Z"
    },
    "ChangesWith": "2021-04-30T00:00:00.000Z",
    "SampleSize": 1000,
}

test("The PollCardModal is rendered", () => {
    render(<PollCardModal isOpen={true} data={testData}/>)
    let modal = screen.getByRole("dialog")
    expect(modal).toBeInTheDocument()
})

test("The PollCardModal contains Poll data",()=>{
    render(<PollCardModal isOpen={true} data={testData}/>)
    let modal = screen.getByRole("dialog")
    let modalBody = within(modal).getByTestId("modal-body")
    expect(modalBody).toHaveTextContent("Source: Test Source")
    expect(modalBody).toHaveTextContent("Date Published: 01/05/2021")
    expect(modalBody).toHaveTextContent("Start Date: 01/04/2021")
    expect(modalBody).toHaveTextContent("End Date: 30/04/2021")
    expect(modalBody).toHaveTextContent("Changes With: 30/04/2021")
    expect(modalBody).toHaveTextContent("Sample Size: 1000")
})



