import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {

  const handleClick = () => {

  }

  return (
    <div className="Navbar">
      <div>Movie Rental</div>
      <Link to="/auth">Login</Link>
    </div>
  )
}

export default Navbar
