import React from 'react'
import { NavLink } from 'react-router-dom'

function Navbar({ loggedin }) {

  return loggedin ? (
    <div className='navbar'>
      <NavLink className='nav-btn' to='/'>Logout</NavLink>
    </div>
  ) : (
    <div className='navbar'>
      <NavLink className='nav-btn' to='/book-list'>Book List</NavLink>
      <NavLink className='nav-btn' to='/register'>Register</NavLink>
      <NavLink className='nav-btn' to='/'>Login</NavLink>
    </div>
  )
}

export default Navbar
