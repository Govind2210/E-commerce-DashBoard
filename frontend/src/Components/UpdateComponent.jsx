import React, { useEffect } from 'react'
import { useState } from 'react'
import {  useParams , useNavigate } from 'react-router-dom';

function UpdateComponent() {

    const [name , setName] = useState('')
    const [price , setPrice] = useState('')
    const [Category , setCategory] = useState('')
    const [company , setCompany] = useState('')
    const params = useParams();
    const naviagte = useNavigate()
 
    useEffect(()=>{
        getProductDetails()
    },[])

    const getProductDetails = async () =>{
        console.log(params)
        let result = await fetch(`https://e-comm-backendbygovind.herokuapp.com/${params.id}` , {
            headers :{
                // authorization : `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        result = await result.json()
        console.log(result)
        setName(result.name)
        setPrice(result.price)
        setCategory(result.Category)
        setCompany(result.company)

    }

    const UpdateComponent = async () =>{
        let result = await fetch(`https://e-comm-backendbygovind.herokuapp.com/${params.id}` , {
            method: 'Put',
            body : JSON.stringify({name , price , Category , company}),
            headers : {
                "Content-type": "application/json",
                // authorization : `bearer ${JSON.parse(localStorage.getItem('token'))}`

            }
        
        });
         result = await result.json()
         if(result){
            naviagte('/')
         }
         

        
    
    }

  return (
    <div className='products '>
        <h1>Update products</h1>
        <input type='text' value={name} onChange={(e)=>{setName(e.target.value)}} placeholder='Enter product Name' className='inputBox' />

        <input type='text' value={price} onChange={(e)=>{setPrice(e.target.value)}} placeholder='Enter product Price' className='inputBox' />

        <input type='text' value={Category} onChange={(e)=>{setCategory(e.target.value)}} placeholder='Enter product Category' className='inputBox'  />

        <input type='text' value={company} onChange={(e)=>{setCompany(e.target.value)}} placeholder='Enter product Company' className='inputBox' />

        <button onClick={UpdateComponent} className='appButton'>Update products</button>
    </div>
  )
}

export default UpdateComponent