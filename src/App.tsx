import { Route,createBrowserRouter,createRoutesFromElements,RouterProvider } from "react-router-dom"
import RootLayout from "./layouts/RootLayout"
import Home from "./pages/Home"
import QuestionPage from "./pages/QuestionPage"
import Missing from "./pages/Missing"
import { Toaster } from "react-hot-toast"
import { useEffect,useState } from "react"
import axiosInstance from "./api/axiosInstance"

function App() {
  const [logged,setLogged] = useState(false)
  
  useEffect(() => {
    const checkLogin = async() => {
      const response = await axiosInstance.get('/refresh')
      if(response.status == 200){
        localStorage.setItem('accessToken', response.data.accessToken)
        setLogged(true)
      }
    } 
    checkLogin()
  },[])

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<RootLayout/>}>
        <Route index element={<Home logged={logged} setLogged={setLogged}/>}/>
        <Route path="/question/:id" element={<QuestionPage/>}/>
        <Route path="*" element={<Missing/>}/>
      </Route>
    )
  )
  return (
    <div>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
