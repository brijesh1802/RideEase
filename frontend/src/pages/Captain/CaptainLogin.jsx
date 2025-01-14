import React, {useState} from "react"
import { Link } from "react-router-dom"

const CaptainLogin = () => {

  const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [captainData, setCaptainData] = useState({})
  
    function onSubmitHandler(e){
      e.preventDefault()
      setCaptainData({
        email: email,
        password: password
      })
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
          <p className="text-center">New here?<Link to={'/captain/signup'} className='text-blue-600'> Register as Captain</Link></p>
        </form>
        </div>
        <div>
          <Link 
          to={'/login'}
          className="bg-[#d5622d] flex items-center justify-center mb-7 rounded px-4 py-2  w-full text-lg placeholder:text-base text-white font-semibold">
            Sign in as User
          </Link>
        </div>
      </div>
    </>
  );
}

export default CaptainLogin