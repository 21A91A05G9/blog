import React from 'react'
import Logo from '../images/bg.jpg'
import Like from './like'
import { Link,useNavigate} from 'react-router-dom';
export default function Card(props) {
  const nav=useNavigate()
  
  function Text(text, limit) {
    if (text.length <= limit) {
      return text;
    } 
    else {
      return text.slice(0, limit) + "...";
    }
  }
  function titleText(text, limit) {
    if (text.length <= limit) {
      return text;
    } 
    else {
      return text.slice(0, limit) + "...";
    }
  }
  const handleCard =()=>{
    nav(`/viewBlog/${props.id}`,{state:{title:props.title,des:props.description,category:props.category,by:props.by,image:props.image,id:props.id,path:props.path}})
  }
  
  return (
    
  <div class="col-md-3 my-3">
   
    <article class="card cards" onClick={handleCard}>
      {/* <img src="http://localhost:5002/images/animal.jpg" height={100} width={100} alt="Youriii Image" /> */}
      <img class="card__background"src={`http://localhost:5002/${props.image}`} alt="Photo" width="1920" height="2193"/>
      <div class="card__content | flow">
      {/* <div class="card__content--container | flow"> */}
        <h4 class="card__title mb-3">{titleText(props.title,20)}</h4>
        <p class="card__description ">{Text(props.des, 50)}</p>
        <div className='offset-md-6 byname col-md-6'><p className='col '>by {props.by}</p></div>
      {/* </div> */}
      </div>
    </article>
  
    {/* <div class="card bg-light cards" >
      <img src={Logo} class="card-img-top" alt="..."/>
      <div class="card-body">
        <h5 class="card-title">{props.title}</h5>
        <p class="card-text">{Text(props.des, 50)}</p>
      </div>
      <div className='row'><p className='col-md-2'><Like title={props.title} des={props.des} by={props.by} category={props.category} state={props.state} /></p><p className='col-md-9'>{props.category}</p></div>
      <div className='row'><p className='col-md-11'>by &nbsp;{props.by}</p></div>
    </div> */}

  </div>
    
  )
}
