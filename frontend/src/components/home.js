import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'//
import SingleBlog from './singleBlog'
import Navbar from './navbar'
import UserNavbar from './userNavbar'
import Card from './card'
import DisplayBlogdata from './displayBlogdata'
import Contact from './contact'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
export default function Home() {
  const [searchResult,setSearchResult] = useState([]);
  const [key,setKey] = useState("");
  const [txt,settxt] = useState("")
  const [usr,setUsr] = useState(undefined)
  const {id} = useParams();
  const [category,setCategory] = useState("")
  let [blogdata,setBlogdata] = useState([])
    useEffect(()=>{
      axios.get('http://localhost:5002/getBlogData').then((res)=>{ 
          setBlogdata(res.data.blogdata) 
          
      })
    },[])
  useEffect(()=>{
    if(id!=undefined){
      axios.get('http://localhost:5002/getuser/'+id).then((res) => {
        setUsr(res.data.userName)
      })}
    console.log("user",usr)  
  },[id])
  
 
  useEffect(()=>{
    axios.get('http://localhost:5002/getSearchData', { params:{key:key} }).then((res)=>{ 
        setSearchResult(res.data.searchdata) 
        console.log(searchResult)
        settxt(`Looking result for "${key}"`)
    })
  },[key])

  useEffect(()=>{
    console.log(category)
    axios.get('http://localhost:5002/getCategory', { params:{key:category} }).then((res)=>{ 
        setSearchResult(res.data.categoryData)
        settxt(`${category}  Blogs`)
    })
  },[category])

  return (
    <div>          
       
        {
          usr? <UserNavbar name={usr} id={id}/> : <Navbar/>
        }
        
        <div className='' >
          <div className='bg container-fluid'>
            <div className='row'>
              <h1 className='offset-1 col-md-6'>Sip from the cup of inspiration, let fresh ideas percolate, and weave your own blog narrative! </h1><p > Start writing your unique story... ✏️</p>
            </div>
          </div>
        </div>
             {/* <div class="offcanvas offcanvas-start sidebar show" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel"  aria-modal="true" role="dialog">      
            <div class="offcanvas-body">
                <button className='categoryBtn btn'><p onClick={()=>setCategory("Art")}  className='category'>Art</p></button>
                <button className='categoryBtn btn'><p onClick={()=>setCategory("Business")}  className='category'>Business</p></button>
                <button className='categoryBtn btn'><p onClick={()=>setCategory("Education")}  className='category'>Education</p></button>
                <button className='categoryBtn btn'><p onClick={()=>setCategory("Music")}  className='category'>Music</p></button>
                <button className='categoryBtn btn'><p onClick={()=>setCategory("Sports")}  className='category'>Sports</p></button>
              
            </div>
            </div> */}
            {/* <button class="btn categoryHead col-md-1" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling"> Categories</button>} */}
          <div style={{backgroundColor:'#d6cfbf',height:'fit-content'}}>
           {
             
             Object.values(blogdata).reverse().slice(0,1).map((e,i)=>{
            return(
                <div className='container-fluid py-5'>
                  
                     <div className=''>
                      {/* <h2 className='container my-4 '>Top Rated Blog</h2> */}
                     <SingleBlog image={e.image} des={e.des} title={e.title} by={e.by} />
                    
                     </div>
                    
                </div>
            )
         })
          } 
        </div>
        
        <div className='container-fluid' style={{backgroundColor:'#d6c7ab',height:'100vh'}}>
            <div className='row pt-5  pb-3'>
              <div className='col-md-1'></div>
              <div className='col-md-6  categoryHead scrollport text-center'>
                <button className='categoryBtn  btn'><p onClick={()=>{setSearchResult(blogdata);  settxt('All Blogs')}}  className='category'>All</p></button>
                <button className='categoryBtn  btn'><p onClick={()=>setCategory("Art")}  className='category'>Art</p></button>
                <button className='categoryBtn  btn'><p onClick={()=>setCategory("Business")}  className='category'>Business</p></button>
                <button className='categoryBtn  btn'><p onClick={()=>setCategory("Education")}  className='category'>Education</p></button>
                <button className='categoryBtn  btn'><p onClick={()=>setCategory("Music")}  className='category'>Music</p></button>
                <button className='categoryBtn  btn'><p onClick={()=>setCategory("Sports")}  className='category'>Sports</p></button>
                <button className='categoryBtn  btn'><p onClick={()=>setCategory("")}  className='category'>x</p></button>
              </div>
              <div className=' text-center col-md-5 text-center'>
                
                <input class=" search col-8 my-2" type="search bg-secondary" placeholder="Search by name or title" value={key} onChange={(e)=>{setKey(e.target.value)}} aria-label="Search"/>
                <FontAwesomeIcon icon={faSearch} className='searchicon'></FontAwesomeIcon>
              </div>

            </div>
            
            <div className='container'>
            {
              searchResult ?
              (<div className='row'>
              <div ><h2 className='mx-4'>{txt}</h2></div>
              <hr></hr>
              { 
                searchResult.length === 0 ? <div className='NoBlog'>No Available Blogs</div> :
                searchResult.map((e,i)=>{
                      return(
                          <>
                           { usr?<Card title={e.title} des={e.des} state={e.state} category={e.category} by={e.by} id={id} image={e.image} description={e.des}  path={`/${id}`}/>
                            :<Card title={e.title} des={e.des} state={e.state} category={e.category} by={e.by} id={id} image={e.image} description={e.des}  path={'/'}/> }
                          </>
                          
                      )
                  })
              }
              </div>)
              : <></>
            }
            { usr?<DisplayBlogdata id={id} path={`/${id}`}/>
            :<DisplayBlogdata id={id} path={`/`}/> }
            </div>
            </div>
         
        <Contact/>
    </div>
  )
}
