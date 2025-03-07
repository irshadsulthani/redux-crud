
import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet,Navigate } from 'react-router-dom'

function UserWithLogin() {
  let currentUser = useSelector(state => state.user)
  return  currentUser ? <Navigate to ='/' /> : <Outlet/> 
}

export default UserWithLogin