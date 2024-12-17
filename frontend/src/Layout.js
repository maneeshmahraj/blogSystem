import React from 'react'

import { Link, Outlet, useNavigate } from 'react-router-dom';

const Layout = () => {
     
    const navigate=useNavigate();

    
  const handleClick=()=>{
    navigate("cart")
  }
  const handleLogout=()=>{
    localStorage.clear()
    navigate("home")
  }
  return (
    <>
    <nav className='layout'>
       <div className='blgs'>
       <span ><Link to="home" className='blgs-title'>BLOGGER</Link></span>
      
       </div>
       <div className='navbar'>
        <ul>
        <li><Link to="ragister"  className='navlink' style={{fontWeight:"bold",color:"rgb(34, 44, 63)",fontSize:"18px"}}>Sign-Up</Link></li>
          <li><a className='navlink' href='' style={{fontWeight:"bold",color:"rgb(34, 44, 63)",fontSize:"18px"}} onClick={handleLogout}>logout</a></li>

          
          <li><button onClick={handleClick} className='new-post-btn'>+ New Post</button></li>
         

        </ul>
       </div>
    </nav>
    <Outlet/>
    </>
  )
}

export default Layout