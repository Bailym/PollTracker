import '@testing-library/jest-dom';
import { fireEvent, render, screen, within } from '@testing-library/react';
import HistoryChart from './HistoryChart';


test("The history chart is rendered on the home page", () => {
    render(<HistoryChart />);
    expect(screen.getByTestId("history-chart")).toBeInTheDocument();
})