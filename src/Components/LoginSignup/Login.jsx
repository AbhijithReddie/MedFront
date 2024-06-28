import React, { useState } from 'react';
import { useAuth } from '../AuthContext'; 
import './LoginSignup.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import password_icon from '../Assets/password.png';
import email_icon from '../Assets/email.png';

export const Login = ({ status, setStatus }) => {
  const navigate = useNavigate();
  const auth = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '', role: 'user' });
  const [errorMessage, setErrorMessage] = useState('');

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      await auth.loginAction({ email: formData.email, password: formData.password });
      const role = localStorage.getItem('role');
      const redirectLink = role === 'admin' ? '/admindashBoard' : '/home';
      setStatus(true);
      navigate(redirectLink);
    } catch (error) {
      console.error("There was an error logging in!", error);
      setErrorMessage('Internal Server Error');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className='container'>
      <div className='header'>
        <div className='text'>Login</div>
        <div className='underline'></div>
      </div>

      <form onSubmit={loginHandler}>
        <div className='inputs'>
          <div className='input'>
            <img src={email_icon} alt="Email Icon" />
            <input 
              type='email' 
              name="email" 
              placeholder='Email Id' 
              value={formData.email} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className='input'>
            <img src={password_icon} alt="Password Icon" />
            <input 
              type='password' 
              name="password" 
              placeholder='Password' 
              value={formData.password} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="btn-group">
            <label htmlFor='btn1'>
              <input 
                type="radio" 
                id='btn1' 
                name="role" 
                value="user"
                checked={formData.role === 'user'}
                onChange={handleChange} 
              />
              User
            </label>
            <label htmlFor='btn2'>
              <input 
                type="radio" 
                id='btn2' 
                name="role" 
                value="admin"
                checked={formData.role === 'admin'}
                onChange={handleChange} 
              />
              Admin
            </label>
          </div>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
        </div>
        <div className="forgot-password">
          Forgot Password? <span className='clickhere'>Click Here</span>
        </div>
        <div className="submit-container">
          <button type="submit" className='submit'>Login</button>
        </div>
      </form>

      <div className="register">
        Not a user? <Link to='/signup' className='clickhere'>Click Here to register</Link>
      </div>
    </div>
  );
};
