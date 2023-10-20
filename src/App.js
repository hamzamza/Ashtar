import './App.css';


import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Home from './pages/Home';
import About from './pages/About';
import Application from './pages/Application';
import User from './pages/User';
import Contact from './pages/Contact';



function App() {
  const [login, setLogin] = useState(false);
  return (

      <BrowserRouter>
     
        <Routes>
          {//root 
          }
          <Route path="/" element={<Home />} exact></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/application" element={<Application />}></Route>
          <Route path="/user" element={<User />}></Route>
          <Route path="/Contact" element={<Contact />}></Route>
          <Route path="*" element={<Navigate to="/" />}></Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;