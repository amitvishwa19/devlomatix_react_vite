import React ,{useEffect} from 'react'
import { Outlet , useNavigate } from 'react-router-dom'

export default function AdminLayout() {
  const authenticated = localStorage.getItem('authenticated')
  const navigate = useNavigate()


  useEffect(() => {
    if( authenticated === null || authenticated === 'false'){
      return navigate('/login')
    }
  }, [])
  


  return (
    

    <div>
      <Outlet />
    </div>
  )
}
