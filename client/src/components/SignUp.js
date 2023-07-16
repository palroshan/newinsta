import React, {useEffect, useState} from 'react'
import instagram from '../img/instagram.png'
import '../css/SignUp.css'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SignUp() {
  const[name, setName] = useState('')
  const[email, setEmail] = useState('')
  const[username, setUserName] = useState('')
  const[password, setPassword] = useState('')

  const notifyA = (data)=> toast.error(data)
  const notifyB = (data)=> toast.success(data)
  const navigate = useNavigate();
  const emailregex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const passwordregex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  const postData = () => {
    if(!emailregex.test(email)){
      return notifyA('Please enter a valid email')
    }
    if(!passwordregex.test(password)){
      return notifyA("Minimum eight characters, at least one letter and one number")
    }
    fetch('/signup', {
      method:'post',
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        name: name,
        email: email,
        username: username,
        password: password
      })
    }).then(res=>res.json())
    .then(data=>{
      if(data.error){
      notifyA(data.error)
      } else {
        notifyB(data.message)
        navigate('/signin')
        console.log(data)
      }
      
    })
  }
  return (
    <div className='signUp'>
      <div className="form-container">
        <div className="form">
        <img src={instagram} alt="" className='signUpLogo' />
        <p className='loginPara'>
          Sign up to see photos and videos <br/>
          from your friends
        </p>
        <div>
          <input type="email" name='email' value={email} id='email' placeholder='Email' onChange={(e)=>{setEmail(e.target.value)}}/>
        </div>
        <div>
          <input type="text" name='name' id='name' placeholder='Full Name' value={name} onChange={(e)=>{setName(e.target.value)}}/>
        </div>
        <div>
          <input type="text" name='username' id='username' placeholder='Username' value={username} onChange={(e)=>{setUserName(e.target.value)}}/>
        </div>
        <div>
          <input type="password" name='password' id='password' placeholder='password' value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
        </div>
        <p className='loginPara' style={{fontSize:'12px', margin: "3px 0px"}}>
          By signing up, you agree to our terms, <br/> privacy policy and cookies policy
        </p>
        <input type="submit" id='submit-btn' value='Sign Up' onClick={()=>postData()}/>
        </div>
        <div className="form2">
          Already have an account?
          <Link to='/signin'>
          <span style={{color:'blue',
        cursor:'pointer'}}>SignIn</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
