import React from 'react'
import {Link ,useNavigate } from "react-router-dom"


function NavBar() {
  const navigate = useNavigate()
  const auth = localStorage.getItem('user'); // here checking if it is signin then no need to show sign in  and show logout only.  
  
  const logout = () =>{ // login out  the page from inside
    localStorage.clear() // clear the local storage
    navigate('/signUp')  // and re-direct to sign up
  }
  
  return (
    <div>
      <img alt='logo' className='logo' src='https://www.renaultgroup.com/wp-content/uploads/2021/03/nouveau_logo_renault.jpg' />
      {
        auth ? 
      
        <ul className='nav-ul'>
            <li><Link to='/'>Product</Link></li>
            <li><Link to='/add'>Add Product</Link></li>
            <li><Link to='/update'>Update Product</Link></li>
            {/* <li><Link to='/profil'>Profil</Link></li> */}
            {/* if auth then logout otherwise only signup and login */}
            <li> <Link onClick={logout} to='/signUp'>Logout ({JSON.parse(auth).name})</Link></li>  
        </ul> 
        :
        <ul className='nav-ul nav-right'>
             <li> <Link to='/signup'>Signup</Link></li>
             <li><Link to='/login'>Login</Link></li>
        </ul>
      }
            
           
    </div>
  )
}

export default NavBar