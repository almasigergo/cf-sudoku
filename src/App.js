//react
import React from 'react';
import { Route, Routes } from 'react-router-dom';

//pages
import Home from './pages/Home';
import Sudoku from './pages/Sudoku';
import Subscribe from './pages/Subscribe';

//components
import Header from './components/Header';
import Footer from './components/Footer';

//styles
import './assets/css/style.min.css';


function App()
{
  return (
    <>
      <Header />
      <div id="main">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/sudoku" element={<Sudoku />} />
          <Route exact path="/subscribe" element={<Subscribe />} />
        </Routes>
      </div>
      <Footer />
    </>
    
  );
}

export default App;
