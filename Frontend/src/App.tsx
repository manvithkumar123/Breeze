import { Route, Routes } from "react-router-dom"
import { useState, useEffect } from "react"
import "./app.css"
import Homepage from "./Pages/Homepage/Homepage"
import Loginpage from "./Pages/LoginPage/Loginpage.tsx"
import Navbar from "./Components/Navbar/Navbar"
import Sidebar from "./Components/Sidebar/Sidebar"
import RegisterPage from "./Pages/RegisterPage/RegisterPage.tsx"
import { ToastContainer } from 'react-toastify';
import NewsPage from "./Pages/NewsPage/NewsPage.tsx"

const App = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(window.innerWidth > 1393)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1393) {
        setSidebarOpen(true)
      } else {
        setSidebarOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <>
    <Navbar setSidebarOpen={setSidebarOpen}/>
    <div className="main-layout">
      {isSidebarOpen && <Sidebar setSidebarOpen={setSidebarOpen}/>}
    <div className="page-content">
       <Routes>
           <Route path="/" element={<Homepage/>} />
           <Route path="/Login" element={<Loginpage/>} />
           <Route path="/Register" element={<RegisterPage/>} />
           <Route path="/news-page" element={<NewsPage/>} />
      </Routes>
    </div>
    </div>
    <ToastContainer
        position="top-right"
        limit={1}
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        closeButton={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        />
    </>
  )
}

export default App
