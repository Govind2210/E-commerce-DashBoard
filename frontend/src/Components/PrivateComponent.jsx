import React from 'react'
import {Navigate  , Outlet} from "react-router-dom"


const PrivateComponent = () => {

    // this condition is false bcoz we have nothing in localstorage
    const auth = localStorage.getItem('user') 
    
    //if there is something in local storage then re-direct every page easily if not it will show signup
    return auth ? <Outlet/> : <Navigate to='signup'/> 
   
}

export default PrivateComponent