// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import './login.scss'
import './App.css'
import React from 'react';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import ManageStudent from './pages/ManageStudent';
import AddStudent from './pages/AddStudent';
import View from './pages/View';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';


function App() {
  // const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <div className="App">
        <Header/>
        <ToastContainer position='top-center'/>
      <Routes>
        <Route exact path="/" element={<ManageStudent />}/>
        <Route path="/add" element={<AddStudent />}/>
        <Route path="/update/:id" element={<AddStudent />}/>
        <Route path="/view/:id" element={<View />}/>
        {/* <Route path="/login" element={<Login />}/> */}
      </Routes>
    </div>
    </BrowserRouter>

  );
}

export default App;
