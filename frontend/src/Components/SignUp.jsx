import React from 'react'
import { useEffect } from 'react'
import { useState   } from 'react'
import {useNavigate} from "react-router-dom"

function SignUp() {

    const [name ,setName] = useState("")
    const [email ,setEmail] = useState("")
    const [password ,setPassword] = useState("")
    const navigate = useNavigate()

    useEffect(()=>{ // if user in the signup page should not seen 
      
        const auth = localStorage.getItem('user');
        if(auth){
          navigate('/')
        }
      
    } , [])

    const collectdata = async ()=>{
        console.log(name , email , password)
        let result = await fetch("https://e-comm-backendbygovind.herokuapp.com/register" , {
          method : "post" , 
          body : JSON.stringify({name , email , password}),
          headers:{
            "Content-Type" : "application/json",
            "Accept" : "application/json"
          }
        })

        result = await result.json()
        console.log(result)
        localStorage.setItem("user" , JSON.stringify(result.result ))
        localStorage.setItem("token" , JSON.stringify(result.auth ))
        navigate('/')

    }
  return (
    <div className='register'>
        <h1>Register</h1>
        <input text='text' className='inputBox' placeholder='Enter Name' 
        value={name} onChange={(e)=>setName(e.target.value)}
        />
        <input text='text' className='inputBox' placeholder='Enter Email'
        value={email} onChange={(e)=>setEmail(e.target.value)}
        />
        <input text='password' className='inputBox' placeholder='Enter Password' 
        value={password} onChange={(e)=>setPassword(e.target.value)}
        />
        <button onClick={collectdata} className='appButton'>Sign Up</button>
    </div>
  )
}

export default SignUp