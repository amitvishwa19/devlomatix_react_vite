import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import '../../css/auth.css'
import logo from '../../assets/images/devlomatix_dark.png'
import auth_cover_image from '../../assets/images/auth_cover_image.jpg'
import { Toaster } from 'react-hot-toast';



function AuthLayout() {
    return (
        <div className='auth-page' style={styles.styles}>
            <div className='row'>
                <div className='col col-lg-9 d-none d-sm-none d-md-none d-lg-block left-area' >
                    <img src={auth_cover_image} alt="background" style={{}} />
                </div>

                <div className='col col-lg-3  right-area' >

                    <div className='brand-logo' >
                        <Link to="/">
                            <img src={logo} alt='logo' />
                        </Link>
                    </div>


                    <div className='right-area' style={{ width: '100%', height: '100%' }}>
                        <Outlet />
                    </div>


                </div>
            </div>
            <Toaster />
        </div>
    )
}

export default AuthLayout

const styles = {
    body: {
        backgroundColor: '#131B25',
        color: '#fff'
    }
}
