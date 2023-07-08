
import React from 'react';
import './App.css'
import CarF from './Components/CarF';
import Nav from './Components/Navbar/Nav';
import DisplayData from './Components/Display';
import { Route,Routes } from 'react-router-dom';
function App() {

 
  return (
    <div className="App">
    <Nav/>
    
      <Routes>
       <Route path='/home' element={<CarF/>}  />  
       <Route path='/cardetails' element={<DisplayData/>} />
      </Routes>

    </div>
  );
}

export default App;
