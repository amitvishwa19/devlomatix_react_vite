import React from 'react'
import {Link, Outlet } from 'react-router-dom'

function ClientLayout() {
  return (
    <div>
      <div>
        <ul>
          <Link to='/login'>Login</Link>
          <Link to='/admin'>Admin</Link>
        </ul>
      </div>

      <Outlet />
    </div>
  )
}

export default ClientLayout