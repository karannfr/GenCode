import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home";
import QuestionPage from "./pages/QuestionPage";
import Missing from "./pages/Missing";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import axiosInstance from "./api/axiosInstance";

function App() {
  const [logged, setLogged] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const response = await axiosInstance.get('/refresh');
        if (response.status === 200) {
          localStorage.setItem('accessToken', response.data.accessToken);
          setLogged(true);
        }
      } catch (error) {
        // Optional: handle errors here
      }
    };
    checkLogin();
  }, []);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    checkScreenSize(); // on mount
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<RootLayout />}>
        <Route index element={<Home logged={logged} setLogged={setLogged} />} />
        <Route path="/question/:id" element={<QuestionPage />} />
        <Route path="*" element={<Missing />} />
      </Route>
    )
  );

  // ✅ Show message on small screen
  if (isSmallScreen) {
    return (
      <div style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
        textAlign: "center",
        fontSize: "1.5rem",
        color: "white",
      }}>
        🚫 Please view this app on a larger screen (tablet/desktop recommended).
      </div>
    );
  }

  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
