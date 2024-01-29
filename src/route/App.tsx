
import Login from "../feature/auth/Login"
import Register from "../feature/auth/Register"
import "../styling/App.css"
import ForgetPassword from "../feature/auth/ForgetPassword"
import PassConfirmation from "../feature/auth/PassConfirmation"
import {  createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider  } from "react-router-dom"
import Layout from "../components/Layout"
import HomePage from "../pages/HomePage"

import Profile from "../feature/profile/Profile"
import NewProfile from "../feature/profile/newProfile"
import { useCookies } from "react-cookie"
import ProfileHost from "../feature/profile/ProfileHost"
import Course from "../feature/course/Course"
import { ToastContainer } from "react-toastify"
import Coupuns from "../feature/coupoun/Coupuns"
import CourseDetail from "../feature/course/CourseDetail"
import CoupounsDetail from "../feature/coupoun/CoupounsDetail"
import FindCourses from "../pages/FindCourses"
import Blog from "../pages/Blog"
import CourseDetailPage from "../pages/CourseDetailPage"
import ProfileStudent from "../feature/profile/ProfileStudent"
import EditProfileStudent from "../feature/profile/EditProfileStudent"



function App() {
  const [cookie, ] = useCookies(["token", "role"])
  const role = cookie.role
  const token = cookie.token
  const router = createBrowserRouter(createRoutesFromElements(  
    <Route path="/" element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route path="login" element={<Login />}/>
      <Route path="register" element={<Register />} />
      <Route path="blog" element={<Blog />}/>
      <Route path="forgotPass" element={<ForgetPassword />}/>
      <Route path="resetPassword" element={<PassConfirmation />}/>  
      <Route path="findCourses" element={<FindCourses />} />
      <Route path="findCourses/detail/:courseId" element={<CourseDetailPage />}/>
      <Route path="profile" 
      element={token && role === "teacher" ? <NewProfile />  
      : token && role === "student" ? <ProfileStudent /> 
      : <Navigate to="/login" />} />
      <Route path="editProfile" element={<ProfileHost />}> 
          <Route index element={role === "teacher" ? <Profile /> : <EditProfileStudent />}/>
          <Route path="coupouns" element={<Coupuns />}/>
          <Route path="coupouns/:coupounsId" element={<CoupounsDetail />}/>
          <Route path="course/:courseId" element={<CourseDetail />}/>
          <Route path="course" element={<Course />}/>
          
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
