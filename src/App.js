
// import React from 'react';
import React, { useState } from 'react'
import './App.css';
import Header from './components/Header'
import Footer from './components/Footer';
import AboutUs from './components/AboutUs';
import ProductControl from './components/ProductControl';

function App() {
  return (
    <React.Fragment>
        <div className="container-fluid">
          {/* <Header /> */}
          <ProductControl />     
          <AboutUs />
          <Footer />
        </div>
    </React.Fragment>
  )
}

export default App;
