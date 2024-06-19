import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
const ProtectedRoute = ({Component}) => {
    const navigate = useNavigate()


    useEffect(()=>{
        const checkToken = localStorage.getItem('userToken');
        if(!checkToken){
            // redirect to login page...
            navigate('/')
        }
    },[])

  return (
    <div>
      <Component/>
    </div>
  )
}

export default ProtectedRoute
