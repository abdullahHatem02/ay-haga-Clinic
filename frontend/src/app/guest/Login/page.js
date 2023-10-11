"use client";
import React from 'react';
import "./Login.css";
//import { Button } from './Register/Button.js';
import { useState } from 'react';
import Navbar from '../../../../components/Navbar';
import Footer from '../../../../components/Footer';
import { Button } from "../../../../components/Button";
import { useDispatch, useSelector } from 'react-redux';
import { login } from '@/app/redux/actions/authActions';

function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.loginReducer.loading);
  const isAuthenticated = useSelector(state => state.loginReducer.isAuthenticated);

  const handleLogin = () => {
    dispatch(login(formData.email, formData.password));
  };


  return (
    <>
      <Navbar />
      <div className="containerz">
        {
          isAuthenticated &&
          <>
            <h1>Login Success</h1>
          </>
        }
        {
          isLoading &&
          <>
            <h1>Loading...</h1>
          </>
        }
        {!isLoading &&
          <>
            <div className="headerz">
              <div className="textz">Login</div>
              <div className="underlinez"></div>
            </div>
            <div className="inputsz">
              <div className="inputz">
                <input
                  type="Email"
                  placeholder='Email'
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="inputz">
                <input
                  type="Password"
                  placeholder='Password'
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="forgot-passwordz">
              Lost password?<span> Click Here!</span>
            </div>
            <div className="submit-containerz">
              <Button
                text="Login"
                onClick={handleLogin}
              ></Button>
            </div>
          </>
        }

      </div>
      <Footer />
    </>
  );
}

export default LoginForm;


