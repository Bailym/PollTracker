import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Home from './Home';

const { ResizeObserver } = window;

beforeEach(() => {
  //@ts-ignore
  delete window.ResizeObserver;
  window.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  }));
});

afterEach(() => {
  window.ResizeObserver = ResizeObserver;
  jest.restoreAllMocks();
});


test("the Home component is rendered", ()=>{
  render(<Home />)

  const homeElement = screen.getByTestId("home-component"); 
  expect(homeElement).toBeInTheDocument();
})
