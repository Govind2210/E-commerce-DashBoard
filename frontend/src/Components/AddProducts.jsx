import React from 'react'
import { useState } from 'react'
import {   useNavigate } from 'react-router-dom';


function AddProducts() {

    const [name , setName] = useState('')
    const [price , setPrice] = useState('')
    const [Category , setCategory] = useState('')
    const [company , setCompany] = useState('')
    const [error , setError] = useState(false)
    const naviagte = useNavigate()


    const addProduct = async () =>{

        if(!name || !price || !company || !Category){
            setError(true);
            return false
        }

        console.log({name,price,Category,company})
        const userId = JSON.parse(localStorage.getItem('user'))._id
        console.log(userId)
        let result = await fetch("https://e-comm-backendbygovind.herokuapp.com/addProduct" , {
            method : "POST",
            body : JSON.stringify({name , price , Category , company , userId}) ,
            headers : {
                "Content-type": "application/json",
                // authorization : `bearer ${JSON.parse(localStorage.getItem('token'))}`

            }
        }) 
        result = await result.json()
        console.log(result)
        naviagte('/')
    }

  return (
    <div className='products '>
        <h1>Add products</h1>
        <input type='text' value={name} onChange={(e)=>{setName(e.target.value)}} placeholder='Enter product Name' className='inputBox' />
        {error && !name && <span className='invalid-input'>Enter valid name</span>}

        <input type='text' value={price} onChange={(e)=>{setPrice(e.target.value)}} placeholder='Enter product Price' className='inputBox' />
        {error && !price && <span className='invalid-input'>Enter valid Price</span>}

        <input type='text' value={Category} onChange={(e)=>{setCategory(e.target.value)}} placeholder='Enter product Category' className='inputBox'  />
        {error && !Category && <span className='invalid-input'>Enter valid Category</span>}

        <input type='text' value={company} onChange={(e)=>{setCompany(e.target.value)}} placeholder='Enter product Company' className='inputBox' />
        {error && !company && <span className='invalid-input'>Enter valid Company</span>}

        <button onClick={addProduct} className='appButton'>Add products</button>
    </div>
  )
}

export default AddProducts