import '@testing-library/jest-dom';
import { fireEvent, render, screen, within } from '@testing-library/react';
import PollCardModal from '../PollCardModal/PollCardModal';
import PollCard from './PollCard';

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

//PollCardModal open/close tests need to be here since the modal inherits its props (onclose, isopen etc.) from the PollCard
test("The modal is not visible when isOpen is false", () => {
    let visibile = true

    render(<PollCardModal isOpen={visibile} data={testData} />)
    let modal = screen.getByRole("dialog")
    expect(modal).toBeInTheDocument()

    visibile = false

    expect(modal).not.toBeVisible()
})

