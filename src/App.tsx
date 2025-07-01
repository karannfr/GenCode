import { Route,createBrowserRouter,createRoutesFromElements,RouterProvider } from "react-router-dom"
import RootLayout from "./layouts/RootLayout"
import Home from "./pages/Home"
import Question from "./pages/Question"
import Missing from "./pages/Missing"

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<RootLayout/>}>
        <Route index element={<Home/>}/>
        <Route path="/question/:id" element={<Question/>}/>
        <Route path="*" element={<Missing/>}/>
      </Route>
    )
  )
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
