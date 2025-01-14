import React, {useContext, useState} from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { UserDataContext } from "../../context/UserContext"

const UserLogin = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  const { setUser } = useContext(UserDataContext)

  const  onSubmitHandler = async(e) =>{
    e.preventDefault()
    const loginData ={
      email: email,
      password: password
    }

    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/login`, loginData);

      if (res.status === 200) {
      const data = res.data;
      setUser(data.user);
      localStorage.setItem('token', JSON.stringify(data.token));
      navigate('/home');
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
    
    setPassword('')
    setEmail('')
  }

  
  return (
    <>
      <div className="flex flex-col justify-between h-screen p-7">
        <div>
        <img className='w-16 mb-10' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="Logo" />
        <form onSubmit={onSubmitHandler}>
          <h3 className="mb-2 text-lg font-medium">
            Enter your email
          </h3>
          <input
          className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base" 
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
          className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
          value={password}
          onChange={(e)=>{
            setPassword(e.target.value);
          }}  />
          <button className="bg-[#000000] mb-7 rounded px-4 py-2  w-full text-lg placeholder:text-base text-white font-semibold">Login</button>
          <p className="text-center">New here?<Link to={'/signup'} className='text-blue-600'> Create new Account</Link></p>
        </form>
        </div>
        <div>
          <Link 
          to={'/captain/login'}
          className="bg-[#10b461] flex items-center justify-center mb-7 rounded px-4 py-2  w-full text-lg placeholder:text-base text-white font-semibold">Sign in as Captain</Link>
        </div>
      </div>
    </>
  );
};

export default UserLogin;
