import './App.css';
import { getPosts } from './api';
import { useEffect, useState } from "react";
import { Routes, Route } from 'react-router-dom'; 
import axios from "axios" ; 
import Login from './components/login/Login';
import Main from './components/main/Main';
import HomePage from './components/homepage/HomePage';
import Signup from './components/login/Signup';
import Add from './components/homepage/Add';

function App() {
  
  const [userName , setUserName] = useState(""); 
  const [email , setEmail] = useState(""); 
  

  return (
    <>
      <Routes>
          <Route path='/' element={<Main/>} /> 
          <Route path='/Login' element={<Login/>} />
          <Route path='/Signup' element={<Signup/>} /> 
          <Route path='/HomePage' element={<HomePage/>} /> 
          <Route path='/Add' element={<Add/>} /> 
      </Routes>
    </>
  );
}

export default App;
