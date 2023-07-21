import logo from './logo.svg';
import React from 'react';
import './App.css';
import Header from './componens/header/Header';
import Footer from './componens/footer/Footer';
import AboutUs from './componens/aboutus/AboutUs';
import ProductList from './componens/productlist/ProductList';
import ProductControl from './componens/productcontrol/ProductControl';
import NavBar from './componens/navbar/NavBar';
import Main from './componens/main/Main';


function App() {
  return (
    <React.Fragment>
        <div className="container-fluid">
          <Header />
          <ProductControl />
          {/* <ProductList /> */}
          <AboutUs />
          <Footer />
        </div>
    </React.Fragment>
  )
}

export default App;
