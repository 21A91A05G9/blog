import React from 'react';
import { useLocation } from 'react-router-dom';
import UserNavbar from './userNavbar';
import SingleBlog from './singleBlog';
import { Link } from 'react-router-dom';
export default function ViewBlog({route,navigate}) {
  const location = useLocation()
  return (
    <div style={{backgroundColor:'#c1ad89' ,height:'100vh'}}>
      <UserNavbar name={location.state.by} id={location.state.id}/>
      <div  className='container-fluid  view-bg'>
      <SingleBlog image={location.state.image} des={location.state.des} title={location.state.title} by={location.state.by} path={location.state.path}/>       
      </div>
      
      <p className='single-para single-btn mx-5' style={{position:'relative', left:'-60px', top:'-10px'}} ><Link to={`${location.state.path}`}><button>back</button></Link></p>
    </div>
  );
}
