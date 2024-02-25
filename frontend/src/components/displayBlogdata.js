import React , {useEffect,useState} from 'react'
import axios from 'axios'
import Card from './card'
export default function DisplayBlogdata(props) {
    function Text(text, limit) {
      if (text.length <= limit) {
        return text;
      } 
      else {
        return text.slice(0, limit) + "...";
      }
    }
    let [blogdata,setBlogdata] = useState([])
    useEffect(()=>{
      axios.get('http://localhost:5002/getBlogData').then((res)=>{ 
          setBlogdata(res.data.blogdata) 
          
      })
    },[])
  return (
    <div className='row'>
    <div ><h2 className='mx-4 mt-4'>Latest Blogs</h2></div>
  
    {
         Object.values(blogdata).reverse().slice(0,4).map((e,i)=>{
            return(
                <Card title={e.title} des={Text(e.des, 50)} description={e.des} path={props.path} state={e.state} category={e.category} by={e.by} image={e.image} id={props.id}/>
            )
         })
    }
  </div>
   
  )
}
