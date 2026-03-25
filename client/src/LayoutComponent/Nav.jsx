import React from 'react'
import { Link } from 'react-router-dom'
import "./Styling/Styling.css"

const Nav = () => {
  return (
    <div id='Navbar' className='py-3 subBG'>
        <div className="navWrapper container rounded rounded-5">
            <Link className="logo" to="/">
                <img src="/SyncLogo.png" alt="" />
            </Link>
            <div className="navLinks d-flex px-3 px-md-5 gap-3 gap-md-5">
                {/* <Link className='heroColor' to="/">Home</Link> */}
                <Link className='subColor' to="/about">About</Link>
                <Link className='subColor' to="/contact">Contact</Link>
                {/* <Link to="/signin">Sign In</Link> */}
                <Link className='subColor' to="/signup">Sign Up</Link>
            </div>
        </div>
    </div>
  )
}

export default Nav