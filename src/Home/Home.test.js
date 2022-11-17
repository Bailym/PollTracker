import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Home from './Home';
import PollCard from '../Components/PollCard/PollCard.js';


test("the Home component is rendered", ()=>{
  render(<Home />)

  const homeElement = screen.getByTestId("home-component"); 
  expect(homeElement).toBeInTheDocument();
})
