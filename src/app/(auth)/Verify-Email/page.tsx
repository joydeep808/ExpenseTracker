
"use client"
import React from 'react'
import { verifyEmail } from './VerifyEmail'

function Page() {
  const onSubmit = async()=>{
    console.log(await verifyEmail())
  }
  return (
    <>
<button onClick={onSubmit}>click me </button>
    </>
  )
}

export default Page