import { Route, Routes } from "react-router-dom";
import "./App.css";
import Register from "./pages/Register-User";
import Nav from "./pages/Navbar/Nav";

import Login from "./pages/Login-User";

import CarF from "./pages/CarF";
import DisplayData from "./pages/Display";


function App() {
  return (
    <div className="App">
    <Nav/>
      <Routes>
       
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
       
        <Route path="/home" element={<CarF/>} />
        <Route path="/cardetails" element={<DisplayData/>} />
      </Routes>
    </div>
  );
}

export default App;
