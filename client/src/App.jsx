import React, { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Homepage/Home';
import About from './About/About';
import Contact from './Contact/Contact';
import Signin from './Auth/Signin';
import Signup from './Auth/Signup';
import NotFound from './NotFound';
import FarmerProtectedRoute from './ProtectedRoutes/FarmerProtectedRoute';
import BuyerProtectedRoute from './ProtectedRoutes/BuyerProtectedRoute';
import Nav from './LayoutComponent/Nav';
import Footer from './LayoutComponent/Footer';
import "./App.css"
import AOS from 'aos';
import 'aos/dist/aos.css';
import Marketplace from './Pages/Marketplace/Marketplace';


const App = () => {
useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-out-quad',
      once: true
    });
  }, [])

  return (
    <>
    <BrowserRouter>
      <Nav/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path='marketplace' element={<Marketplace/>} />

        <Route element ={<FarmerProtectedRoute/>}>
          <Route path="/dashboard/" element={<div>Farmer Dashboard</div>} />
        </Route>
        <Route element ={<BuyerProtectedRoute/>}>
          <Route path="/cart" element={<div>Buyer Cart</div>} />
        </Route>

        <Route path="*" element={<NotFound />} />

       </Routes>
        <Footer/>
    </BrowserRouter>
    </>
  )
}

export default App