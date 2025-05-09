import React from 'react'
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <>
    <div> Header AuthLayout</div>
    <Outlet />
    </>
  )
}

export default AuthLayout