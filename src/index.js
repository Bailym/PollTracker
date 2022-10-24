import React, { Component } from 'react';
import "./index.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createRoot }  from 'react-dom/client';
import Home from './Home/Home';
import Admin from './Admin/Admin';
import { ChakraProvider } from '@chakra-ui/react'


const root = createRoot(document.getElementById('root'));
root.render(
  <ChakraProvider>
    <BrowserRouter id="router">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/admin' element={<Admin />} />
      </Routes>
    </BrowserRouter>
  </ChakraProvider >
);