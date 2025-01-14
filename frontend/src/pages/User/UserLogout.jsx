import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const UserLogout = () => {

    const navigate = useNavigate()

    useEffect(() => {
        let token = localStorage.getItem('token')
        if (token) {
            token = token.replace(/^"|"$/g, '')
        }

        axios.get(`${import.meta.env.VITE_API_URL}/user/logout`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then(() => {
                localStorage.removeItem('token')
                navigate('/login')
        })
    }, [navigate])

  return (
    <div>UserLogout</div>
  )
}

export default UserLogout