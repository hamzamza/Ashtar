import './App.css';


import { BrowserRouter, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import Home from './pages/Home';
import About from './pages/About';
import Application from './pages/Application';
import ViewMap from './pages/ViewMap';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Rgister';
import { AuthContext, AuthContextProvider } from './context/authcontext';
import {MapsContextProvider} from './context/mapsContext';
import {DrawingContextProvider} from './context/singlemapContext';
 
function App() {  
  return (
<AuthContextProvider>
  
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} exact></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/application" element={< ProtectedRoute><MapsContextProvider> <Application />   </MapsContextProvider> </ProtectedRoute>}></Route>
         <Route path="/viewmap/:id" element={<DrawingContextProvider><ViewMap /></DrawingContextProvider>}></Route>
          <Route path="/Contact" element={<Contact />}></Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/" />}></Route>
        </Routes>
      </BrowserRouter>   
    
      </AuthContextProvider>
  );
}

export const ProtectedRoute = ({ children }) => {  
  const { user } = useContext(AuthContext);
    if (!user) {
    return   <Navigate to="/login" replace={true} />;
    } 
    else
  return children;}
export default App;