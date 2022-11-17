import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Home from './Home';

/* test('renders learn react link', () => {
  render(<Home />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
}); */


test("the Home component is rendered", ()=>{
  render(<Home />)

  const homeElement = screen.getByTestId("home-component"); 
  expect(homeElement).toBeInTheDocument();
})

