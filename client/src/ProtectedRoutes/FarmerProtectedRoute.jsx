import React, { useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const FarmerProtectedRoute = (children) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
    if(!isAuthenticated){
        return <Navigate to="/signin" replace/>
    }
    return <Outlet/> 
}

export default FarmerProtectedRoute