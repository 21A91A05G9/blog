import React from 'react'
import Logo from '../images/BL.jpg'
import Sidebar from './sidebar'
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faHomeUser,faUser,faCamera} from '@fortawesome/free-solid-svg-icons'
export default function Navbar() {
  return (
    <>
    <div>
    <nav class="navbar bg-body-tertiary fixed-top">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
         
          {/* <img src={Logo} alt="Logo" height={20} width={25} />    &nbsp; */}
          <span style={{color:'#f6efe0'}}><span style={{color:"var(--brand-color)"}}>B</span>logLite</span>
        </a>
        <p className=" d-flex">

        
        <Link to='/login'><button  type="submit" className='btn-sm  d-flex mx-3'>Create New Blog</button></Link>
        {/* <Link to='/login'><button className=" btn-sm d-flex" type="submit mx-3">SIGN IN</button></Link> */}
        </p>
        
      </div>
    </nav>
    </div>
    </>
  )
}
