import React from 'react'
import { Outlet } from 'react-router-dom'
const BankLayout = () => {
  return (
    <>
    <div> Bank AuthLayout</div>
    <Outlet />
    </>
  )
}

export default BankLayout