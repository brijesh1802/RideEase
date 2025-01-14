import React, {useContext, useState} from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { UserDataContext } from "../../context/UserContext"

const UserSignup = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  
  const navigate = useNavigate()
  const {user, setUser} = useContext(UserDataContext)
  
  const onSubmitHandler = async (e) =>{
    e.preventDefault()
    const newUser = {
      fullName:{
        firstName: firstname,
        lastName: lastname,
      },
      email: email,
      password: password
    }

    const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/register`,newUser)

    if(res.status === 201){
      const data = res.data
      setUser(data.user)
      localStorage.setItem('token', JSON.stringify(data.token))
      navigate('/home')
    }
    
    setPassword('')
    setEmail('')
    setFirstname('')
    setLastname('')
  }

    
  return (
    <>
      <div className="flex flex-col justify-between h-screen p-7">
        <div>
          
        <img className='w-16 mb-10' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="Logo" />

        <form onSubmit={onSubmitHandler}>
          
        <h3 className="mb-2 text-lg font-medium">
            Enter your name
          </h3>
          <div className="flex gap-4 mb-5">
            <input
            className="bg-[#eeeeee] rounded px-4 py-2 border w-1/2  text-lg placeholder:text-base" 
            type="text" 
            placeholder="Firstname" 
            required
            value={firstname}
            onChange={(e)=>{
              setFirstname(e.target.value);
            }} />

          <input
            className="bg-[#eeeeee] rounded px-4 py-2 border w-1/2  text-lg placeholder:text-base" 
            type="text" 
            placeholder="Lastname" 
            required
            value={lastname}
            onChange={(e)=>{
              setLastname(e.target.value);
            }} />
          </div>
          
          
          <h3 className="mb-2 text-lg font-medium">
            Enter your email
          </h3>
          <input
          className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base" 
          type="email" 
          placeholder="email@example.com" 
          required
          value={email}
          onChange={(e)=>{
            setEmail(e.target.value);
          }} />
          
          <h3 className="mb-2 text-lg font-medium">
            Enter your password
          </h3>
          <input
          type="password"
          placeholder="password" 
          required
          className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
          value={password}
          onChange={(e)=>{
            setPassword(e.target.value);
          }}  />
          
          <button className="bg-[#000000] mb-5 rounded px-4 py-2  w-full text-lg placeholder:text-base text-white font-semibold">Create Account</button>
          
          <p className="text-center">Existing user?<Link to={'/login'} className='text-blue-600'> Login here</Link></p>
          
        </form>
        </div>
        <div>
          
          <p className="text-[10px] leading-tight">This site is protected by <span className="font-bold underline">reCAPTCH</span> and the <span className="font-bold underline">Google Privacy Policy</span> and Terms of Service apply</p>
          
        </div>
      </div>
    </>
  );
}

export default UserSignup