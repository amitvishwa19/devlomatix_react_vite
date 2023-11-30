import React from 'react'
import toast,{ Toaster } from 'react-hot-toast';

function Notify(msg) {
    console.log(msg)


  return (
    <Toaster />
  )
}

export default Notify