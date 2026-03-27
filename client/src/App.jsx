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
import SingleProduct from './Pages/Marketplace/SingleProduct';
import UserProfile from './Pages/Profile/UserProfile';
import FarmerDashboard from './Pages/Dashboard/FarmerDashboard';
import { AuthProvider } from './Context/AuthContext';
import AddProduct from './Pages/Dashboard/AddProduct';
import CropAIScanner from './Pages/Dashboard/CropAIScanner';
import { CartProvider } from './Context/CartContext';
import Cart from './Pages/Cart';
import Checkout from './Pages/Checkout';

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
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Nav/>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path='/marketplace' element={<Marketplace/>} />
            <Route path="/marketplace/:id" element={<SingleProduct />} />
            <Route element ={<FarmerProtectedRoute/>}>
              <Route path="/dashboard" element={<FarmerDashboard />} />
              <Route path="/dashboard/add-product" element={<AddProduct />} />
              <Route path="/dashboard/crop-ai-scanner" element={<CropAIScanner />} />
            </Route>
            <Route element ={<BuyerProtectedRoute/>}>
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/cart" element={<Cart />} />
            </Route>
            <Route path="/checkout" element={<Checkout />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer/>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
    </>
  )
}

export default App