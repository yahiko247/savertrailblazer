import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../components/style.css'
import img1 from '../image/logo.png'
import axios from 'axios';
import {AuthContext} from '../contextprovider/AuthContext';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
baseURL: "http://127.0.0.1:8000"
});


function LoginPage() {
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const navigate = useNavigate();
 const {setUser} = useContext(AuthContext);
 const [error, setError] = useState('');

  const handleLogin = async(e) => {
    e.preventDefault();
    try {
      const response = await client.post(
          "api/auth/jwt/create",
          {
              email:email, 
              password:password
      }); 
      if (response.status === 200) {
      const {access} = response.data;
      localStorage.setItem('authToken',access);
      

      const userResponse = await client.get('api/djoser/users/me',{
          headers: {
              Authorization : `Bearer ${access}`
          },
      });
      if (userResponse.status === 200) {
          const userData = userResponse.data;
          setUser(userData);
          navigate('/home');

      }else{
          console.error('Failed to fetch user data', userResponse.status);
      }
      }else{
      console.error('Failed to login', response.status);
          setError('Failed to login');
      }
  } catch (error) {
      console.error('Error logging in', error);
      setError('Error logging in');
  }

  }

  return (
        <div className='login-container d-flex justify-content-center align-items-center vh-100'>
           <img src={img1} alt="Logo"style={{height:'auto', width:'200px', position:'absolute', top:'-5px'}}/>
          <div className='textstyle' style={{border: '1px solid white', padding: '100px', borderRadius: '10px', background:'white' }}>
            <h6 style={{ textAlign: 'center'}}>Welcome to Savers TrailBlazer</h6>
            <form action="" onSubmit={handleLogin} >
              <div className=''>
                 <label  htmlFor="email" style={{fontSize:'10px'}}>username</label>
                <input type="email" placeholder='Enter email' name='email'
                 className='form-control rounded-50' onChange={e =>setEmail(e.target.value)}/>
              </div>
              
              <div className='mb-3'>
                 <label htmlFor="password" style={{fontSize:'10px'}}>password</label>
                <input type="password" placeholder='Enter Password' name='password'
                 className='form-control rounded-50' onChange={e =>setPassword(e.target.value)}/>
              </div>
              <div className='d-flex justify-content-between align-items-center'>
                <p style={{ fontSize: '12px' }}>Remember me?</p>
                <button type='submit' className='custom-btn' style={{fontSize:'10px', width:'150px'}} onClick={handleLogin}>LOGIN</button>
              </div>
              <hr className="divider" />
              <p style={{ fontSize: '12px', margin: '0 10px',  textAlign: 'center' }}>or create with <Link to="/register">Sign Up</Link></p>
            </form>
          </div>
        </div>
    
  );
}

export default LoginPage;