import React from 'react'
import './App.css'
import Register from './components/register';
import Login from './components/login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/home';
import Createblog from './components/createblog';
import ViewBlog from './components/viewBlog';
import Profile from './components/profile';
export default function App() {

  return (
    <div className='main'>
      
      <BrowserRouter>
     
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/:id' element={<Home/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/viewBlog/:id' element={<ViewBlog/>}/>
          <Route path='/createblog/:id' element={<Createblog/>}/>
          <Route path='/profile/:id' element={<Profile/>}/>
        </Routes>
      </BrowserRouter>
      
    </div>
  )
}
