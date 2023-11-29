import React, {useState}  from 'react'
import googleImage from '../../assets/images/google.png'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { login, logout } from '../../redux/reducers/AuthReducer';


function Login() {
  const dispach = useDispatch()


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [clickable, setClickable] = useState(true);
  const [gClickable, setGClickable] = useState(true);
  const [loginInfo, setLoginInfo] = useState({email:'email', password:'password'})


  const handleLogin = ()=>{
    console.log('Login clicked from login component');
    dispach(login(loginInfo));
  }

  const handleGoogleLogin = ()=>{
    console.log('Google Login clicked from login component');
  }


  return (
    <div className="form" style={{ padding: 40 }}>
      <div className="mg-b-20">

        <h5 className="info-title" style={{ textAlign: 'center', marginBottom: 40 }}>
          Login to your account
        </h5>

        <div className="form-group" style={{ marginBottom: 20 }}>
          <label >Email Address</label>
          <input type="text" className="form-control" name="email" placeholder="Email" required="" value={email} onChange={(e) => { setEmail(e.target.value) }} />
          <span className="help-block">
          </span>
        </div>

        <div className="form-group" style={{ marginBottom: 50 }}>
          <label >Password</label>
          <input type="password" className="form-control" name="password" placeholder="Enter your password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
          <span className="help-block">
          </span>
        </div>


        <button onClick={handleLogin} className='btn' style={{ backgroundColor: '#007BFF', color: '#fff', fontWeight: '600', width: '100%', borderColor: '#007BFF', borderWidth: 1, marginBottom: 20 }}>
          {clickable ? <span> Login </span> : <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />}
        </button>

        <button onClick={handleGoogleLogin} className='btn' style={{ backgroundColor: '#fff', color: '#000', fontWeight: '600', width: '100%', borderColor: '#007BFF', borderWidth: 1, marginBottom: 20 }}>
          <span style={{ marginRight: 10 }}><img src={googleImage} style={{ height: 20 , width:20}} alt='googlelogo' /></span>
          <span> Login with google </span>
        </button>



      </div>

      <div className="clearfix"></div>
      <div className="separator">
        <p className="change_link">Don't have account !
          <Link to='/register' style={{ marginLeft: 10,textDecoration:'none' }}>Create Account</Link>
        </p>

      </div>


      <p className="info">Your data will not be used outside of Devlomatix. By signing up you agree that your statistics may be used anonymously inside www.devlomatix.com.</p>

    </div>
  )
}

export default Login