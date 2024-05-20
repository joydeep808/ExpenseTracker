"use client"

import React, { useEffect } from 'react'
import { RateLimiter } from './Ratelimit'

function Page() {
  useEffect(()=>{
    async function a() {
   const response =  await  RateLimiter()
   console.log(response)
    }
    a()
  })
  
  return (
    <div>Page</div>
  )
}

export default Page