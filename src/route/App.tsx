
import { Routes, Route } from "react-router"
import Login from "../feature/auth/Login"
import Register from "../feature/auth/Register"
// import HomePage from "../pages/HomePage"
import "../styling/App.css"
import ForgetPassword from "../feature/auth/ForgetPassword"
import PassConfirmation from "../feature/auth/PassConfirmation"
// import { BrowserRouter, createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Routes } from "react-router-dom"

// const router = createBrowserRouter(createRoutesFromElements(
//     <BrowserRouter>
//     <Routes>
//     <Route path="login" element={<Login />}/>
//     <Route path="register" element={<Register />} />
//     </Routes>
//     </BrowserRouter>
// ))

function App() {
return (
  <>
  <Routes>
  <Route path="login" element={<Login />}/>
  <Route path="register" element={<Register />} />
  <Route path="forgotPass" element={<ForgetPassword />}/>
  <Route path="resetPassword" element={<PassConfirmation />}/>
  </Routes>
  </>
)
}

export default App
