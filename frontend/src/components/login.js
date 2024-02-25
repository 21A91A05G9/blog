import React, { useState } from 'react'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
export default function Login() {
    const [msg,setMsg] = useState("")
    const[msgcolor,setMsgColor] = useState("")
    const [op,setOp] =useState()
    const nav=useNavigate()
    const [logindata,setLogindata] = useState(
        {
            username:'',
            password:''
        }
    )
    const  handleLogin = (e) => {
        e.preventDefault(); 
        
        axios.post('http://localhost:5002/login',logindata).then((res)=>{
            console.log(logindata,res.data.id)
            if(res.data.msg === 'success') {
                setMsg('login successfully')
                setMsgColor('green')
                const Id=res.data.id
                nav('/'+Id)
            }
            else if(res.data.msg === 'incorrect password' ){
                setMsg('invalid password')
                setMsgColor('red')
            }
            else {
                setMsg('Not registered')
                setMsgColor('yellow')
            }
        }) 
    }
  return (
    <div className='containe-fluidr'>
        
        <div class="area" >
        <ul class="circles">
       
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
        </ul>
            
        <div className='container-fluid login'>
        
        
        <div className="card loginform">
        
                <div className='header mb-3 mt-3'>Login here </div>
                <div className="container-fluid">
                

                <form  onSubmit={handleLogin} >
                    <div className="row mb-3">
                        <div className="col-sm-12">
                        <input type="text" id="Name3" placeholder="Username"  onChange={(e)=>setLogindata({...logindata,username:e.target.value})}  required />
                        </div>
                    </div>
                    
                    <div className="row mb-4">
                    
                        <div className="col-sm-12">
                        <input type="password" id="inputPassword3"  placeholder="Password"  onChange={(e)=>setLogindata({...logindata,password:e.target.value})}  required/>
                        </div>
                    </div>
                    
                    <div className='text-center mb-2'><button  className="btn btn-light btn-sm" >Login</button></div>   
                    <div className='text-center mt-1'><p className='login-footer'>Don't have an account? <Link to='/register'>Register</Link></p></div>

                </form>
               
                </div>
        </div>  

        </div>
        
        </div>
        
    </div>
      
  )
}
