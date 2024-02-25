import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
 // Import your CSS file for styling

export default function Like(props) {
  const [newBlogData,setNewBlogData] =  useState({
    title:props.title,
    category:props.category,
    des:props.des,
    state:props.state,
    by:props.by
  })

  const [id,setId] = useState(undefined);
  const toggle = () => {
      if(newBlogData.state==="Unliked"){
          setNewBlogData({...newBlogData,state:"Liked"})
         
      }
      else{
        setNewBlogData({...newBlogData,state:"Unliked"})
        
      }
     console.log("blogdata id is", id,newBlogData.title);
     axios.get('http://localhost:5002/getId', { params: {title: newBlogData.title} }).then((res) => {  
      setId(res.data.id);
      console.log("blogdata id is", id);
      if (id !== undefined) {
        axios.put('http://localhost:5002/updateblog/' + id, newBlogData)
          .then((res) => {
            console.log("updated", res.data.updatedBlogData);
          });
      }
      
    });


      
  };
  // useEffect(()=>{
  //   if(id!=undefined){
  //     axios.put('http://localhost:5001/updateblog/'+id,newBlogData).then((res)=>{
  //       console.log(res.data.updatedBlogData)
        
  //     })
  //   }
  // },[id])
  
  return (
    <div className='row'>
        <div className='col'><FontAwesomeIcon onClick={toggle} className={newBlogData.state === "Unliked" ? 'unlikeButton' : 'likeButton'} icon={faHeart} /></div>
        
    </div>
  );
}
