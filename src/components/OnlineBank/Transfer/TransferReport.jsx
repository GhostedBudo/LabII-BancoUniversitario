import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useParams, useActionData } from 'react-router-dom'


const TransferReport = () => {
    let params = useParams(); 
    let data = useActionData(); 
    useEffect(() => {
        console.log(data)
    }, [])

  return (
    <div>TransferReport
        <span>Referencia {params.transferId}</span>
    </div>
  )
}

export default TransferReport