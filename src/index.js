import React, { Component } from 'react';
import "./index.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Home from './Home/Home';
import Admin from './Admin/Admin';

class App extends Component {

  render() {
    return (
      <BrowserRouter id="router">
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/admin' element={<Admin/>} />
        </Routes>
      </BrowserRouter>
    );
  }
}
ReactDOM.render(<App />, document.getElementById('root'));

export default App;
