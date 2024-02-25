import React, { useState ,useEffect} from 'react'
import axios from 'axios'
import { useNavigate, useParams ,Link} from 'react-router-dom'
import image from '../images/upload.jpg'
import UserNavbar from './userNavbar'
export default function Createblog() {
    

    const nav = useNavigate()
    const [name, setName] = useState("");
    const { id } = useParams();
    console.log("id", id);
    const[msgcolor,setMsgColor] = useState("")
    const [op,setOp] =useState()
    const [flag,setFlag] = useState(0)
    const [blogId,setBlogId]= useState(undefined);
    const [imageurl,setImageurl] = useState("")
    const [img,setImg] = useState(image)
    useEffect(() => {
        if (id !== undefined) {
            axios.get('http://localhost:5002/getuser/' + id)
            .then((res) => {
                setName(res.data.userName);
                console.log("setting name", name);
            });
        }
    }, [id]); 

    const [blogdata, setBlogdata] = useState({
        title: '',
        category: '',
        des: '',
        state: 'Unliked',
        by: "",
        image:null
    });
    
    useEffect(() => {
    
        setBlogdata(prevData => ({...prevData,by: name}) );
    }, [name]);
    const handleNewBlog = (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('image', blogdata.image); // assuming 'avatar' is the key expected by your backend
      
        // Append other form data
        formData.append('title', blogdata.title);
        formData.append('category', blogdata.category);
        formData.append('des', blogdata.des);
        formData.append('state', blogdata.state);
        formData.append('by', blogdata.by);
        
        axios
          .post('http://localhost:5002/newblog', formData).then((res) => {
            // alert(res.data.msg);
            if (res.data.msg === 'Blog created successfully') {
              setFlag(1)
              setImageurl(res.data.imagePath)
              setBlogId(res.data.newBlogData._id);
              
            }
          })
          .catch((err) => {
            console.log(err);
          });

    };
      
  return (
    <>
      <UserNavbar name={name} id={id}/>
      <div className='container-fluid createMain'>
      
        <div className='container-fluid'>
        {
            flag? <div class="alert alert-success" role="alert">
            successfully created <button className='btn-close' onClick={()=>{setFlag(0); }}></button>
          </div> : <></>
        }
        <h2 className='text-center  blogHead'>Create Your Own Blog</h2>
       
       
        <form onSubmit={handleNewBlog}>
         <div className='row create'>

            <div className='col-md-5 image-div' style={{ backgroundImage: `url(${typeof img === 'string' ?img:URL.createObjectURL(img)})` }}><input type='file'  accept='image/*' onChange={(e) =>{  setBlogdata({ ...blogdata, image: e.target.files[0] }); setImg(e.target.files[0])}} /></div>
            <div className='col-md-6'>

            <div class=" mb-2 mt-2">
              <input type="text"  className='col-md-7 blog-text p-2 me-4' aria-label="Sizing example input" placeholder='Title Of The Blog' aria-describedby="inputGroup-sizing-lg" value={blogdata.title}onChange={(e) => setBlogdata({ ...blogdata, title: e.target.value })}/>  
           
              <select class="col-md-4  select p-2" value={blogdata.category} onChange={(e) => setBlogdata({ ...blogdata, category: e.target.value })}>
                  <option>Select Category</option>
                  <option>Art</option>
                  <option>Music</option>
                  <option>Sports</option>
                  <option>Food</option>
                  <option>Education</option>
                  <option>Business</option>
              </select>
              
            </div>
             <div className='textarea'> <textarea className='p-3 mt-1' value={blogdata.des} onChange={(e) => setBlogdata({ ...blogdata, des: e.target.value })}   placeholder='Text Your Toughts...'></textarea></div>
             <div className='mt-4'>
             <button type='submit' className='offset-10 btn create-btn'>Publish</button>
             {/* <Link to={'/'+id}><button type='button' className='offset-1 btn create-btn'>Back</button></Link> */}
             </div>
           
            </div>
          </div>
          
          
        </form>
        </div>
       {/* Add this in the render method */}
    </div>
    </>
  )
}

      
             
    
       
          