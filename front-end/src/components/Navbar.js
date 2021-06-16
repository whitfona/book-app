import axios from 'axios'
import React from 'react'
import { NavLink } from 'react-router-dom'

function Navbar({ loggedin, setLoggedin }) {

  const logout = () => {
    axios.get('/logout')
      .then((res) => {
        setLoggedin(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return loggedin ? (
    <div className='navbar'>
      <NavLink className='nav-btn' to='/book-list'>Book List</NavLink>
      <NavLink className='nav-btn' to='/' onClick={logout}>Logout</NavLink>
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
