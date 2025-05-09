import React from 'react'
import { Outlet } from 'react-router-dom'
const BankLayout = () => {
  return (
    <>
    <div> Bank Header</div>
    <Outlet />
    <div>Bank footer</div>
    </>
  )
}

export default BankLayout