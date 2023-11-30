import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import Spinner from 'react-bootstrap/Spinner';
import toast from 'react-hot-toast';
import authService from '../../service/AuthService';

function Register() {
  const authenticated = localStorage.getItem('authenticated')
  const dispach = useDispatch()
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCPassword] = useState('');
  const [clickable, setClickable] = useState(true);


  useEffect(() => {
    if(  authenticated === 'true'){
      return navigate('/')
    }
  }, [])


  const handleRegister = () => {
    if (email === '') {
      return toast.error('Please enter a valid email', { duration: 4000, position: 'top-right', })
    }

    if (password === '') {
      return toast.error('Please enter a password', { duration: 4000, position: 'top-right', })
    }

    if (password !== cpassword) {
      return toast.error('Password and Confirm Password not mached', { duration: 4000, position: 'top-right', })
    }

    if (clickable) {
      setClickable(false)
      authService.register(email, password)
        .then(() => {
          toast.success('Registration success, An email verification link is sent to your registered email, please verify  to login to your account', { duration: 10000, position: 'top-right', })
          navigate('/login')
        })
        .catch((err) => {
          if (err.code === 'auth/email-already-in-use') {
            toast.error('Email already used, please try to recover the password', { duration: 4000, position: 'top-right', })
          }

          if (err.code === 'auth/invalid-email') {
            toast.error('Invalid email , please try again', { duration: 4000, position: 'top-right', })
          }

        })
        .finally(() => {
          setClickable(true)
        })
    }
  }




  return (
    <div className="form" style={{ padding: 40 }}>
      <div className="mg-b-20">

        <h5 className="info-title" style={{ textAlign: 'center', marginBottom: 40 }}>
          Create New account
        </h5>

        <div className="form-group" style={{ marginBottom: 20 }}>
          <label >Email Address</label>
          <input type="text" className="form-control" placeholder="Email" required="" value={email} onChange={(e) => { setEmail(e.target.value) }} />
          <span className="help-block">
          </span>
        </div>

        <div className="form-group" style={{ marginBottom: 20 }}>
          <label >Password</label>
          <input type="password" className="form-control" placeholder="Enter your password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
          <span className="help-block">
          </span>
        </div>

        <div className="form-group" style={{ marginBottom: 50 }}>
          <label >Confirm Password</label>
          <input type="password" className="form-control" placeholder="Confirm your password" value={cpassword} onChange={(e) => { setCPassword(e.target.value) }} />
          <span className="help-block">
          </span>
        </div>


        <button onClick={handleRegister} className='btn' style={{ backgroundColor: '#007BFF', color: '#fff', fontWeight: '600', width: '100%', borderColor: '#007BFF', borderWidth: 1, marginBottom: 20 }}>
          {clickable ? <span> Register </span> : <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />}
        </button>

      </div>

      <div className="clearfix"></div>
      <div className="separator">
        <p className="change_link">Already have account !
          <Link to='/login' style={{ marginLeft: 10, textDecoration: 'none' }}>Login</Link>
        </p>

      </div>


      <p className="info">Your data will not be used outside of Devlomatix. By signing up you agree that your statistics may be used anonymously inside www.devlomatix.com.</p>

    </div>
  )
}

export default Register