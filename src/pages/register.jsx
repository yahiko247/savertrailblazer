import '../components//style.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import useNavigate if using React Router v6 or later
import img1 from '../image/logo.png'

function RegisterPage() {
    const [values, setValues] = useState({
        name:'',
        email: '',
        password: ''
    });
 
    return (
        <div className='login-container d-flex justify-content-center align-items-center vh-100'>
            <img src={img1} alt="Logo"style={{height:'auto', width:'180px', position:'absolute', top:'-25px'}}/>
          <div className='textstyle' style={{border: '1px solid white', padding: '100px', borderRadius: '10px', background:'white' }}>
            <h6 style={{ textAlign: 'center'}}>Welcome to Savers TrailBlazer</h6>
      
            <form action="" >
              <div className=''>
                 <label  htmlFor="email" style={{fontSize:'10px'}}>username</label>
                <input type="email" placeholder='username' name='email'
                 className='form-control rounded-50'/>
              </div>
              
              <div className=''>
                 <label htmlFor="password" style={{fontSize:'10px'}}>email</label>
                <input type="password" placeholder='Enter email' name='password'
                 className='form-control rounded-50'/>
              </div>
              <div className=''>
                 <label htmlFor="password" style={{fontSize:'10px'}}>Password</label>
                <input type="password" placeholder='Password' name='password'
                 className='form-control rounded-50'/>
              </div>
              <div className='mb-3'>
                 <label htmlFor="password" style={{fontSize:'10px'}}>Confirm password</label>
                <input type="password" placeholder='confirm' name='password'
                 className='form-control rounded-50'/>
              </div>
              <div className='d-flex justify-content-between align-items-center'>
                <p style={{ fontSize: '12px' }}>Remember me?</p>
                <button type='submit' className='custom-btn' style={{fontSize:'10px', width:'150px'}}>REGISTER</button>
              </div>
              <hr className="divider" />
              <p style={{ fontSize: '12px', margin: '0 10px',  textAlign: 'center' }}>have already an account? <Link to="/">Sign in</Link></p>
            </form>
          </div>
        </div>
    );
}

export default RegisterPage;