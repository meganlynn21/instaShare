import React from 'react'
import { BrowserRouter, BrowserRouter as Routes, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';
import './App.css';

import MenuBar from './components/MenuBar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';


function App() {
  return (
      <Routes>
    <Container>
    <MenuBar />
    <exact path='/' element={<Home />}/>
    <exact path='/login' element={<Login />}/>
    <exact path='/register' element={<Register />}/>
    </Container>
  </Routes>

  )
}
// const rootElement = document.getElementById("root");
// render(
//   <BrowserRouter>
//     <Routes>
//       <Route path="/" element={<App />} />
//       <Route path="expenses" element={<Expenses />} />
//       <Route path="invoices" element={<Invoices />} />
//     </Routes>
//   </BrowserRouter>,
//   rootElement
// );

export default App;
