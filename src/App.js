import './App.css';


import { BrowserRouter, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import Home from './pages/Home';
import About from './pages/About';
import Application from './pages/Application';
import User from './pages/User';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Rgister';
import { AuthContext, AuthContextProvider } from './context/authcontext';

 
function App() {  
  return (
<AuthContextProvider>
      <BrowserRouter>
     
        <Routes>
          {//root 
          }
          <Route path="/" element={<Home />} exact></Route>
          <Route path="/about" element={<About />}></Route>
          
          <Route path="/application" element={< ProtectedRoute> <Application /></ProtectedRoute>}></Route>
          <Route path="/user" element={<User />}></Route>
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