import React from 'react';

export default function singleBlog(props) {
  return (
    <div className='row mx-4 mt-4'>
      <h2 className='my-4'>{props.title}</h2>
      <div className='singleimg  col-md-5'>
        <img className='col-12' src={`http://localhost:5002/${props.image}`} alt="" />
      </div>
      <div className='col-md-6'>
        <div className='single-des my-1'>{props.des}</div>
        <p className='single-para container my-1'><i>written by {props.by}</i></p>
      </div>
    </div>
  );
}
