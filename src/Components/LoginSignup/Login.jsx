import React, { useState } from 'react';
import './LoginSignup.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import password_icon from '../Assets/password.png';
import email_icon from '../Assets/email.png';

export const Login = ({ status, setStatus }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5632/login', { email, password });
      if (response.data.message === "Login Successful") {
        setStatus(true);
        navigate('/home');
      } else {
        setErrorMessage(response.data.message || 'Login Unsuccessful');
      }
    } catch (error) {
      console.error("There was an error logging in!", error);
      setErrorMessage('Internal Server Error');
    }
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
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className='input'>
            <img src={password_icon} alt="Password Icon" />
            <input 
              type='password' 
              name="password" 
              placeholder='Password' 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
        </div>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
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
