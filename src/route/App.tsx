
import Login from "../feature/auth/Login"
import Register from "../feature/auth/Register"
import "../styling/App.css"
import ForgetPassword from "../feature/auth/ForgetPassword"
import PassConfirmation from "../feature/auth/PassConfirmation"
import {  createBrowserRouter, createRoutesFromElements, Route, RouterProvider  } from "react-router-dom"
import Layout from "../components/Layout"
import HomePage from "../pages/HomePage"
import Career from "../pages/Career"

const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route path="login" element={<Login />}/>
      <Route path="register" element={<Register />} />
      <Route path="forgotPass" element={<ForgetPassword />}/>
      <Route path="resetPassword" element={<PassConfirmation />}/>
      <Route path="career" element={<Career />}/>
    </Route>
    // <Route path="login" element={<Login />}/>
    // <Route path="register" element={<Register />} />
    
))

function App() {
  return <RouterProvider router={router}/>
}

export default App
