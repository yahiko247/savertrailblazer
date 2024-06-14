import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../components/style.css'
import img1 from '../image/logo.png'



function LoginPage() {
 const [values, setValues] = useState({
    email: '',
    password: ''

  })
  

  return (
        <div className='login-container d-flex justify-content-center align-items-center vh-100'>
           <img src={img1} alt="Logo"style={{height:'auto', width:'200px', position:'absolute', top:'-5px'}}/>
          <div className='textstyle' style={{border: '1px solid white', padding: '100px', borderRadius: '10px', background:'white' }}>
            <h6 style={{ textAlign: 'center'}}>Welcome to Savers TrailBlazer</h6>
            <form action="" >
              <div className=''>
                 <label  htmlFor="email" style={{fontSize:'10px'}}>username</label>
                <input type="email" placeholder='Enter email' name='email'
                 className='form-control rounded-50'/>
              </div>
              
              <div className='mb-3'>
                 <label htmlFor="password" style={{fontSize:'10px'}}>password</label>
                <input type="password" placeholder='Enter Password' name='password'
                 className='form-control rounded-50'/>
              </div>
              <div className='d-flex justify-content-between align-items-center'>
                <p style={{ fontSize: '12px' }}>Remember me?</p>
                <button type='submit' className='custom-btn' style={{fontSize:'10px', width:'150px'}}>LOGIN</button>
              </div>
              <hr className="divider" />
              <p style={{ fontSize: '12px', margin: '0 10px',  textAlign: 'center' }}>or create with <Link to="/register">Sign Up</Link></p>
            </form>
          </div>
        </div>
    
  );
}

export default LoginPage;