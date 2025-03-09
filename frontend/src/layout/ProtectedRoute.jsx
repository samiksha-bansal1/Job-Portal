import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({children,role}) => {
 
    const {user} = useSelector(state => state.auth);
    const location = useLocation();
    if(user?.role ==='recruiter' && location.pathname === '/'){
        return  <Navigate to={"/admin"} replace />
    }
    if(role && user?.role !== role){
        return  <Navigate to={"/"} replace />
    }
  return children
}

export default ProtectedRoute