import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div>
      <div className='container text-center py-5'>
        <h1>
            404
        </h1>
        <p>This page does not exist</p>
        <Link to="/">Go to home page</Link>
    </div>
    </div>
  )
}

export default NotFound