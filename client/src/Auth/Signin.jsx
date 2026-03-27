import React, { useState } from 'react'
import "./Styling/Styling.css"
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useAuth } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

const signinSchema = yup.object({
    Email: yup.string().email("enter a valid email").required("email is required"),
    // name: yup.string().required("name is required").min(3, "name must be at least 3 characters"),
    Password: yup.string().required("password is required").min(6, "password must be atleast 6 characters")
})
const Signin = () => {
  const { login, loading: authLoading, error: authError } = useAuth();
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate();
  
    // const [passwordConfirmed, setpasswordConfirmed] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
  
    const handlePassword = () => {
      setShowPassword(!showPassword)
    }
  
  
    const {register, handleSubmit, formState:{errors}} = useForm(
      {
          resolver : yupResolver(signinSchema)
      }
    )
  
    const handleSignUp = async (data) => {
      setIsLoading(true);
      try {
        const res = await login({
          email: data.Email,
          password: data.Password,
        });
        alert(res.message || 'Login successful!');
        // Check user role and redirect accordingly
        const token = localStorage.getItem('token');
        if (token) {
          const userRes = await fetch(`${import.meta.env.VITE_BASEURL}/users/me`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          if (userRes.ok) {
            const userData = await userRes.json();
            
            if (userData.role === 'BUYER') {
              navigate('/profile');
            } else if (userData.role === 'FARMER') {
              navigate('/dashboard');
            } else {
              navigate('/');
            }
          } else {
            navigate('/');
          }
        } else {
          navigate('/');
        }
      } catch (err) {
        alert(err.message || 'Login failed!');
      } finally {
        setIsLoading(false);
      }
    }

  return (


    <div>
          <div className="Wrapper flex-column flex-md-row">
            <div className="mediaSection col- col-md-6 rounded-3 overflow-hidden">
              <video src="/field video.mp4" className='' autoPlay loop muted> 
              </video>
            </div> 
            <div className="formSection col- col-md-6 d-flex align-items-center">
              <div className="formWrapper col-12 col-md-11 mx-auto">
                <h4 className='text-center'>
                  Welcome
                </h4>
                <p className='text-center'>
                  <span>Don't have an account?</span><Link className='text-decoration-none ' to="/signup">Sign Up</Link>
                </p>
    
                <form className="container col-11 col-md-8 py-4 mx-auto d-flex flex-column gap-3" onSubmit={handleSubmit(handleSignUp)} action="">
                {/* <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" {...register("name")} className="form-control form-control-md" id="name" placeholder="Enter your name"/>
                    {errors.name && 
                    <p className='text-danger'>{errors.name.message}</p>
                    }
                </div> */}
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" {...register("Email")} className="form-control form-control-md" id="email" placeholder="Enter your email"/>
                    {errors.Email && 
                    <p className='text-danger'>{errors.Email.message}</p>
                    }
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <div className="passwordContainer d-flex input-group">
                    <input type={showPassword ? "text" : "password"} {...register("Password")} className="form-control form-control-md" id="password" placeholder="Enter your password"/>
                    <span className='input-group-text' onClick={handlePassword}>
                        {showPassword ? (
                        <i class="fa-regular fa-eye-slash"></i> )
                        : (<i class="fa-regular fa-eye"></i>) 
                        }  
                    </span>
                    </div>
                    {errors.Password && 
                    <p className='text-danger'>{errors.Password.message}</p>
                    }
                </div>
                <button type="submit" className="btn subBG2 subColor btn-lg w-100"disabled = {isLoading}>Sign In</button>
            </form>
              </div>
            </div>     
          </div>
        </div>
  )
}

export default Signin