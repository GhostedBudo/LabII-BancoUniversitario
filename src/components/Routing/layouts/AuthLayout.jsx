import React from 'react'
import { Outlet } from 'react-router-dom'
import HeaderAuth from '../../OnlineBank/Header/HeaderAuth'
const AuthLayout = () => {
  return (
    <>
     <HeaderAuth />
    <Outlet />
    </>
  )
}

export default AuthLayout