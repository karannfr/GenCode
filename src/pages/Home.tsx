import { button, div } from "motion/react-client"
import LoginModal from "../components/LoginModal"
import SignUpModal from "../components/SignUpModal"
import { useState,useEffect } from "react"
import memoji from '../assets/memoji.png'
type HomeProps = {
  logged: boolean,
  setLogged: React.Dispatch<React.SetStateAction<boolean>>
}

const Home = ({logged, setLogged}: HomeProps) => {
  const [login,setLogin] = useState(false)
  const [signup,setSignUp] = useState(false)
  const [profile,setProfile] = useState(false)
  return (
    <>
    {!logged ?
      <div>
        <button className="px-6 py-2 text-white border border-purple-800 rounded cursor-pointer" onClick={() => setLogin(true)}>Login</button>
        <button className="px-4 py-2 text-white bg-purple-800 rounded cursor-pointer" onClick={() => setSignUp(true)}>Sign Up</button>
      </div> :
      <img src={memoji} alt=""/>
    }
    {login && <LoginModal setLogin={setLogin} setSignUp={setSignUp} setLogged={setLogged}/>}
    {signup && <SignUpModal setLogin={setLogin} setSignUp={setSignUp}/>}
    </>
  )
}

export default Home