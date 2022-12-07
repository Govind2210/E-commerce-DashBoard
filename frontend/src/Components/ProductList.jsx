import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import {Link  } from "react-router-dom"

function ProductList() {

    const [products , setProducts] = useState([])

    useEffect(()=>{
        getProduct()
    },[])

    const getProduct = async ()=>{
        let result = await fetch("https://e-comm-backendbygovind.herokuapp.com/products" , {
            headers :{
                // authorization : `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
            result = await result.json()
            setProducts(result)     
        
    }
    console.log(products)

    const deleteProduct = async (id)=>{
        console.log(id)
        let result = await fetch(`https://e-comm-backendbygovind.herokuapp.com/products/${id}` ,{
            method : "Delete",
            headers :{
                authorization : `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        result = await result.json();
        if(result){
            getProduct()
        }
    }

    const searchHandle = async (event) =>{
       let key = (event.target.value)
        if(key){
            let result = await fetch(`https://e-comm-backendbygovind.herokuapp.com/search/${key}` ,{
                headers :{
                    authorization : `bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            })
            result = await result.json()
            if(result){
                setProducts(result)
            }
       }
       else{
        getProduct()
       }
    }
  

  return (
    <div className='productList'>
        <h1>Product List</h1>
        <input  type='' onChange={searchHandle} className='SearchProduct' placeholder='Search Product'  />
        <ul>
            <li>S.No</li>
            <li>Name</li>
            <li>Price</li>
            
            <li>Opertation</li>
        </ul>
        {
          products.length>0 ?  products.map((item , index)=>
                <ul key={item._id}>
                    <li>{index + 1}</li>
                    <li>{item.name}</li>
                    <li>{item.price}</li>
                    
                    <li><button onClick={()=>deleteProduct(item._id)}>Delete</button>
                    <Link to={'/update/'+item._id}>Update</Link></li>
                </ul>
            )
            :<h1>No Result Found</h1>
        }
    </div>
  )
}

export default ProductList