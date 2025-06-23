import React, { useState } from 'react'
import aashditLogo from '../../assets/logo.png'
import aimpact from '../../assets/aimpact.svg'
import { loginApi } from '../../api/ApiCall'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";

const Login = () => {
  const [loginCreds, setLoginCreds] = useState({
    userId: '',
    password: ''
  })
  const handleInp = (e) => {
    const { name, value } = e.target
    setLoginCreds({ ...loginCreds, [name]: value })
  }
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      debugger;
      const response = await loginApi(loginCreds);
      console.log("Login successful:", response);
      localStorage.setItem('token', response.token)
      toast.success(response.message);
      navigate('/')
    } catch (error) {
      if (error.response) {
        console.error("Login failed:", error.response.data.message);
        toast.error(error.response.data.message);
      } else {
        console.error("Error:", error.message);
        alert("Something went wrong. Please try again.");
      }
    }
  }
  const [show, setShow] = useState(false)
  const showPassword = (e) => {
    e.preventDefault()
    setShow(!show)
  }

  return (
    <div className="login-container min-h-screen w-full flex items-center justify-center px-4 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#3b82f6] relative overflow-hidden">

      <div className="shape1"></div>
      <div className="shape2"></div>

      <div className="absolute top-[-50px] left-[-50px] w-[300px] h-[300px] bg-blue-600 opacity-30 rounded-full blur-3xl z-0"></div>
      <div className="absolute bottom-[-80px] right-[-80px] w-[300px] h-[300px] bg-purple-500 opacity-30 rounded-full blur-3xl z-0"></div>

      <div className="relative z-10 max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 text-white">
        <div className="flex flex-col justify-center text-center md:text-left px-6">
          <h1 className="text-4xl font-bold mb-4">
            Welcome to <img src={aashditLogo} alt="logo" className="inline-block w-40 ml-2" />
          </h1>
          <p className="text-gray-300 leading-relaxed text-justify text-[14px]">
            Today is full of opportunities to learn, grow, and succeed. Stay motivated and focused—this platform is here to help you work smarter and achieve your goals. <span className='block font-semibold text-[18px]'>Welcome back buddy!</span>
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl px-10 py-8 text-white w-full max-w-sm mx-auto md:mx-0">
          <img src={aimpact} alt="" className='m-auto w-32 mb-6' />
          <h2 className="text-lg font-semibold mb-6 text-center tracking-wide">
            Login to Your Account
          </h2>

          <form className="space-y-5 relative" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="userId" className="block text-sm font-medium text-gray-200 mb-1">User ID</label>
              <input
                type="text"
                name="userId"
                placeholder="Enter your user ID"
                onChange={handleInp}
                className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="relative">
              <label htmlFor="password" className="block text-sm font-medium text-gray-200 mb-1">Password</label>
              <input
                type={!show ? 'password' : 'text'}
                name="password"
                placeholder="Enter your password"
                onChange={handleInp}
                className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                className="absolute top-[38px] right-3 text-white/70 hover:text-white"
                type="button"
                onClick={showPassword}
              >
                {!show ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-2.5 text-sm font-semibold rounded-lg shadow-lg transition"
            >
              Log In Now →
            </button>
          </form>
        </div>
      </div>
    </div>

  )
}

export default Login