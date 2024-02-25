import { param } from 'jquery'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import UserNavbar from './userNavbar';
import axios from 'axios';
import Card from './card';
export default function Profile() {
    const { id } = useParams();
    const [name,setName] = useState("")
    const [userBlogs,setUserBlogs] = useState(undefined)
    const [artBlogs,setArtBlogs] = useState([])
    const [educationBlogs,setEducationBlogs] = useState([])
    const [musicBlogs,setMusicBlogs] = useState([])
    const [sportBlogs,setSportBlogs] = useState([])
    const [businessBlogs,setBusinessBlogs] = useState([])
    const [cookingBlogs,setCookingBlogs] = useState([])
    useEffect(()=>{
      if(id!==undefined){
        axios.get('http://localhost:5002/getuserblogs/'+id).then((res)=>{
          setName(res.data.Name)
          setUserBlogs(res.data.userblogs)
          setMusicBlogs(res.data.musicblogs)
          setArtBlogs(res.data.artblogs)
          setBusinessBlogs(res.data.businessblogs)
          setSportBlogs(res.data.sportblogs)
          setEducationBlogs(res.data.educationblogs)
          setCookingBlogs(res.data.cookingblogs)
          console.log(userBlogs)
        })
      }
    },[id])

  return (
    <>
    <UserNavbar id={id} name={name} />
    <div className='profileBlog' style={{backgroundColor:'#d6cfbf'}}>
       <h2></h2>
        <div className='container '>
            
            {
              userBlogs && userBlogs.length!==0?<div className='row'><h2>All Blogs</h2>
                 {
                  userBlogs.map((e)=>{
                    return(
                      <Card title={e.title} des={e.des} state={e.state} category={e.category} by={e.by} id={id} image={e.image} description={e.des} path={`/profile/${id}`}/>
                    )
                  })
                 }
              
              </div>: <div className="text-center" style={{height:'100vh'}}><h2>Please Wait Loading ...</h2></div>
            }
           
           
            {
              artBlogs && artBlogs.length!==0?<div className='row mt-5'><h2>Art Blogs</h2>
                 {
                  artBlogs.map((e)=>{
                    return(
                      <Card title={e.title} des={e.des} state={e.state} category={e.category} by={e.by} id={id} image={e.image} description={e.des} path={`/profile/${id}`}/>
                    )
                  })
                 }
               <br></br>

              </div>: <></>
              
            }
           
           
            {
              musicBlogs && musicBlogs.length!==0?<div className='row mt-5'><h2>Music Blogs</h2>
                 {
                  musicBlogs.map((e)=>{
                    return(
                      <Card title={e.title} des={e.des} state={e.state} category={e.category} by={e.by} id={id} image={e.image} description={e.des} path={`/profile/${id}`}/>
                    )
                  })
                 }
              <br></br>
              </div>: <></>
            }
            
           
            {
              cookingBlogs && cookingBlogs.length!==0?<div className='row mt-5'><h2>Food Blogs</h2>
                 {
                  cookingBlogs.map((e)=>{
                    return(
                      <Card title={e.title} des={e.des} state={e.state} category={e.category} by={e.by} id={id} image={e.image} description={e.des} path={`/profile/${id}`}/>
                    )
                  })
                 }
              <br></br>
              </div>: <></>
            }
           
            {
              sportBlogs && sportBlogs.length!==0?<div className='row mt-5'><h2>Sport Blogs</h2>
                 {
                  sportBlogs.map((e)=>{
                    return(
                      <Card title={e.title} des={e.des} state={e.state} category={e.category} by={e.by} id={id} image={e.image} description={e.des} path={`/profile/${id}`}/>
                    )
                  })
                 }
              <br></br>
              </div>: <></>
            }
             
            
            {
              educationBlogs && educationBlogs.length!==0?<div className='row mt-5'><h2>Education Blogs</h2>
                 {
                  educationBlogs.map((e)=>{
                    return(
                      <Card title={e.title} des={e.des} state={e.state} category={e.category} by={e.by} id={id} image={e.image} description={e.des} path={`/profile/${id}`}/>
                    )
                  })
                 }
              
              <br></br>
              </div>: <></>
            }
            
            {
              businessBlogs && businessBlogs.length!==0?<div className='row mt-5'><h2>Business Blogs</h2>
                 {
                  businessBlogs.map((e)=>{
                    return(
                      <Card title={e.title} des={e.des} state={e.state} category={e.category} by={e.by} id={id} image={e.image} description={e.des} path={`/profile/${id}`}/>
                    )
                  })
                 }
              </div>: <></>
            }
        </div>
    </div>
    </>
  )
}
