
import Login from "../feature/auth/Login"
import Register from "../feature/auth/Register"
import "../styling/App.css"
import ForgetPassword from "../feature/auth/ForgetPassword"
import PassConfirmation from "../feature/auth/PassConfirmation"
import {  createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider  } from "react-router-dom"
import Layout from "../components/Layout"
import HomePage from "../pages/HomePage"
import Career from "../pages/Career"
import Profile from "../feature/profile/Profile"
import { useCookies } from "react-cookie"
import ProfileHost from "../feature/profile/ProfileHost"
import Course from "../feature/course/Course"
import Dashboard from "../feature/dashboard/Dashboard"
import { ToastContainer } from "react-toastify"
import Coupuns from "../feature/coupoun/Coupuns"
import CourseDetail from "../feature/course/CourseDetail"



function App() {
  const [cookie, ] = useCookies(["token"])
  const token = cookie.token
  const router = createBrowserRouter(createRoutesFromElements(  
    <Route path="/" element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route path="login" element={<Login />}/>
      <Route path="register" element={<Register />} />
      <Route path="forgotPass" element={<ForgetPassword />}/>
      
      <Route path="resetPassword" element={<PassConfirmation />}/>  
      <Route path="career" element={<Career />}/>
      <Route path="profile" element={token ? <ProfileHost />  : <Navigate to="/login" />}>
          <Route index element={<Profile />}/>
          <Route path="coupouns" element={<Coupuns />}/>
          <Route path="course/:courseId" element={<CourseDetail />}/>
          <Route path="course" element={<Course />}/>
          <Route path="dashboard" element={<Dashboard />}/>
      </Route>
    </Route>
    
))
  return (
    <>
      <RouterProvider router={router}/>
      <ToastContainer 
      position="bottom-center"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      />
    </>
  )
}

export default App
