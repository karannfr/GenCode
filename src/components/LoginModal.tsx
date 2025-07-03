import { motion } from "framer-motion"
import { useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../api/axiosInstance";

type LoginModalProps = {
  setLogin : React.Dispatch<React.SetStateAction<boolean>>,
  setSignUp : React.Dispatch<React.SetStateAction<boolean>>
  setLogged: React.Dispatch<React.SetStateAction<boolean>>
}

const LoginModal = ({setLogin,setSignUp,setLogged} : LoginModalProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try{
        const response = await axiosInstance.post('/login', {
          username,
          password
        })
        if(response.status==200){
          toast.success(response.data.message)
          await localStorage.setItem('accessToken', response.data.accessToken)
          setLogin(false)
          setLogged(true)
        }
      }catch(err:any){
        console.error(err)
        toast.error(err?.response?.data?.message)
      }
  }
  return (
    <>
    <div className="h-screen w-screen fixed top-0 left-0 bg-[rgba(0,0,0,0.4)] backdrop-blur-sm flex items-center justify-center z-40 cursor-pointer" onClick={() => setLogin(false)}>
    </div>
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.4,
        scale: { type: "spring", duration: 0.4 },
      }}
      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm p-8 rounded-xl bg-white/5 backdrop-blur-md border border-[#4a3aff4f] shadow-[0_4px_30px_rgba(0,0,0,0.1)] text-white flex flex-col gap-6 z-50"
    >
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <h1 className="font-bold text-2xl text-center">Login</h1>

        <div className="flex flex-col gap-2">
          <label htmlFor="username" className="text-sm text-white/70">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            className="p-3 rounded bg-white/10 placeholder:text-white/50 text-white focus:outline-none focus:ring-2 focus:ring-[#4a3aff] transition"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-sm text-white/70">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            className="p-3 rounded bg-white/10 placeholder:text-white/50 text-white focus:outline-none focus:ring-2 focus:ring-[#4a3aff] transition"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="mt-2 py-3 px-4 rounded-lg bg-[#4a3aff] hover:bg-[#372fff] transition text-white font-semibold"
        >
          Login
        </button>

        <div className="text-sm text-center text-white/70">
          Don’t have an account?{" "}
          <span
            className="text-[#4a3aff] hover:underline cursor-pointer"
            onClick={() => {
              setLogin(false);
              setSignUp(true);
            }}
          >
            Sign Up
          </span>
        </div>
      </form>
    </motion.div>
  </>
  )
}

export default LoginModal
