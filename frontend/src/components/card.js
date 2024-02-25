import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Card(props) {
  const nav = useNavigate();

  function Text(text, limit) {
    if (text.length <= limit) {
      return text;
    } else {
      return text.slice(0, limit) + "...";
    }
  }

  function titleText(text, limit) {
    if (text.length <= limit) {
      return text;
    } else {
      return text.slice(0, limit) + "...";
    }
  }

  const handleCard = () => {
    nav(`/viewBlog/${props.id}`, {
      state: {
        title: props.title,
        des: props.description,
        category: props.category,
        by: props.by,
        image: props.image,
        id: props.id,
        path: props.path
      }
    });
  };

  return (
    <div class="col-md-3 my-3">
      <article class="card cards" onClick={handleCard}>
        <img class="card__background" src={`https://blog-fjap.vercel.app/${props.image}`} alt="" width="1920" height="2193" />
        <div class="card__content | flow">
          <h4 class="card__title mb-3">{titleText(props.title, 20)}</h4>
          <p class="card__description ">{Text(props.des, 50)}</p>
          <div className='offset-md-6 byname col-md-6'>
            <p className='col '>by {props.by}</p>
          </div>
        </div>
      </article>
    </div>
  );
}
