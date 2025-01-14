import React from 'react'
import logo from '../assets/RideEase.png'
import { Link } from 'react-router-dom'

const Start = () => {
  return (
    <>
    <div>
      <div className='bg-cover bg-bottom bg-[url(https://images.unsplash.com/photo-1609822075274-645f6f35dc3b?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] h-screen  flex flex-col justify-between w-full'>
        <img src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png' alt="Logo" className='w-12 mt-3 ml-5' />
        <div className='px-5 py-5 bg-white pb-7'>
          <h2 className='text-3xl font-bold'>Get Started with RideEase</h2>
          <Link to='/login' className='flex items-center justify-center w-full py-3 mt-5 text-white bg-black rounded'>Continue</Link>
        </div>
      </div>
    </div>
    </>
  )
}

export default Start