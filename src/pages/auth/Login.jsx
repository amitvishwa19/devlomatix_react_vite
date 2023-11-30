import React, { useState, useEffect } from 'react'
import googleImage from '../../assets/images/google.png'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import Spinner from 'react-bootstrap/Spinner';
import toast from 'react-hot-toast';
import authService from '../../service/AuthService';


function Login() {
  const authenticated = localStorage.getItem('authenticated')
  const dispach = useDispatch()
  const navigate = useNavigate();

  const [clickable, setClickable] = useState(true);
  const [gClickable, setGClickable] = useState(true);
  const [data, setData] = useState({ email: '', password: '' })

  useEffect(() => {
    if(  authenticated === 'true'){
      return navigate('/')
    }
  }, [])

  const handleLogin = async () => {
   
    if (data.email === '') { return toast.error('Please enter a valid email', { duration: 4000, position: 'top-right', }) }
    if (data.password === '') { return toast.error('Please enter a password', { duration: 4000, position: 'top-right', }) }

    if (clickable) {
      setClickable(false)
      authService.login(data.email, data.password)
        .then(() => {
          const emailVerified = localStorage.getItem('emailVerified')
          console.log(emailVerified)

          if(emailVerified === 'true'){
            localStorage.setItem('authenticated', true)
            toast.success('Login Success', { duration: 4000, position: 'top-right', })
            navigate('/admin')
          }else{
            toast.error('Please verify your Email to continue', { duration: 4000, position: 'top-right', })
          }
        })
        .catch((err) => {
          console.log(err)
          if (err.code === 'auth/invalid-credential') {
            return toast.error('Invalid Email or Password, Please try again...', { duration: 4000, position: 'top-right', })
          }

          if (err.code === 'auth/too-many-requests') {
            return toast.error('Oops you tride many times, Please try again later', { duration: 4000, position: 'top-right', })
          }
        })
        .finally(() => {
          setClickable(true)
        })


    }
  }

  const handleGoogleLogin = () => {
    authService.googleLogin()
    .then(()=>{
      navigate('/')
    })
  }

  const handleChange = e => {
    const { name, value } = e.target;
    setData(prevState => ({
        ...prevState,
        [name]: value
    }));
};


  return (
    <div className="form" style={{ padding: 40 }}>
      <div className="mg-b-20">

        <h5 className="info-title" style={{ textAlign: 'center', marginBottom: 40 }}>
          Login to your account
        </h5>

        <div className="form-group" style={{ marginBottom: 20 }}>
          <label >Email Address</label>
          <input type="text" className="form-control" name="email" placeholder="Email" required="" value={data.email} onChange={handleChange} />
          <span className="help-block">
          </span>
        </div>

        <div className="form-group" style={{ marginBottom: 50 }}>
          <label >Password</label>
          <input type="password" className="form-control" name="password" placeholder="Enter your password" value={data.password} onChange={handleChange} />
          <span className="help-block">
          </span>
        </div>


        <button onClick={handleLogin} className='btn' style={{ backgroundColor: '#007BFF', color: '#fff', fontWeight: '600', width: '100%', borderColor: '#007BFF', borderWidth: 1, marginBottom: 20 }}>
          {clickable ? <span> Login </span> : <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />}
        </button>

        <button onClick={handleGoogleLogin} className='btn' style={{ backgroundColor: '#fff', color: '#000', fontWeight: '600', width: '100%', borderColor: '#007BFF', borderWidth: 1, marginBottom: 20 }}>
          <span style={{ marginRight: 10 }}><img src={googleImage} style={{ height: 20, width: 20 }} alt='googlelogo' /></span>
          <span> Login with google </span>
        </button>



      </div>

      <div className="clearfix"></div>
      <div className="separator">
        <p className="change_link">Don't have account !
          <Link to='/register' style={{ marginLeft: 10, textDecoration: 'none' }}>Create Account</Link>
        </p>

      </div>


      <p className="info">Your data will not be used outside of Devlomatix. By signing up you agree that your statistics may be used anonymously inside www.devlomatix.com.</p>

    </div>
  )
}

export default Login