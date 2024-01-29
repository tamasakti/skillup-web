import { Link, useNavigate } from 'react-router-dom'
import Input from '../../components/Input'
import Button from '../../components/Button'
import iconRight from "../../assets/login-right-side.webp"
import logoSkillup from "../../assets/logo-skillup.webp"
import { FaGooglePlusSquare } from "react-icons/fa"
import { FaSquareTwitter } from "react-icons/fa6";
import { FaSquareGithub } from "react-icons/fa6";
import withReactContent from 'sweetalert2-react-content'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from '../../utils/types/Swal'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import {auth} from "../../config/firebase"
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { login } from '../../utils/redux/slice/userSlice'
import { useCookies } from 'react-cookie'
import { GoogleAuthProvider  } from 'firebase/auth'
import Spinner from '../../components/Spinner'


interface authData {
  email: string,
  password : string
}

const Login = () => {
  const MySwal = withReactContent(Swal)
  const [disable, setDisable] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [, setCookie] = useCookies(["token"])
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [remember, setRemember] = useState<boolean>(false)
  const [authUser, setAuthUser] = useState<authData>({
    email : "",
    password: ""
  })
  const {email, password} = authUser
  const navigate = useNavigate()
  const dispatch = useDispatch()


  
  useEffect(() => {
    if(email && password) {
      setDisable(false)
    } else {
      setDisable(true)
    }
  }, [email, password])

  function handleLoginAccount(e: React.ChangeEvent<HTMLInputElement>) {
    const {name, value} = e.target
    setAuthUser(prev => ({
      ...prev,
      [name] : value
    }))
  }

  function handleTogglePass() {
    setShowPassword(!showPassword)
  }

  function rememberMeDate() {

    const date = new Date()

    if(remember) {
      date.setDate(date.getDate() + 7)
    } else {
      date.setDate(date.getDate() + 1)
    }

    return date.getTime()
}

rememberMeDate()

function handleRememberToken() {
  setRemember(!remember)
}
  

  function handleLogin(e:React.FormEvent) {
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
    .then((response:any) => {
      const {accessToken} = response.user
      dispatch(login({
        token : accessToken,
        data: response.user
      }))
      MySwal.fire({
        title: "Sukses",
        text: "Berhasil Log in",
        showCancelButton : false
      });
      setCookie("token", accessToken, {
        path: "/",
        maxAge : rememberMeDate()
      })
      navigate("/")
    }).catch((error) => {
      const message = error.message
      MySwal.fire({
        title: 'Gagal',
        text: message,
        showCancelButton: false
      })
    }).finally(() => setLoading(false))
    
  }

  

   function handleLoginGoogle() {
    const provider = new GoogleAuthProvider()
     signInWithPopup(auth, provider)
    .then((res) => {
      const credentials = GoogleAuthProvider.credentialFromResult(res)
      const token = credentials?.accessToken
      const user = res.user
      dispatch(login({
        token : token,
        data : user
      }))
      setCookie("token", token, {
        path: "/"
      })
      navigate("/")
    }).catch((error) => {
      const {message} = error
      console.log(message)
    })
  }

  if(loading) {
    <Spinner />
  }
  
  return (
    <div className='grid order-last w-full min-h-screen md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2'>
      <div className='flex flex-col justify-center order-last w-11/12 h-full p-4 mx-auto lg:w-9/12 xl:w-9/12 md:w-10/12 sm:w-10/12 lg:order-first xl:order-first md:order-last'>
        <div className='flex flex-col gap-5 mx-auto'>
          <img src={logoSkillup} alt='Skillup-logo' className='w-2/12 cursor-pointer' onClick={() => navigate("/")}/>
          <h1 className='text-2xl font-bold'>Masuk ke akun kamu</h1>
          <h3 className='max-w-md text-md font-semibild'>Belajar gratis di Skillup, dan memulai karir yang kamu cita-citata sejak dalam embrio!</h3>
          <form onSubmit={handleLogin} className='flex flex-col w-full gap-8'>
            <Input 
            label='Email'
            name = "email" 
            htmlFor='Email'
            ariaLabel='email'  
            id='email' 
            placeholder='Type your Email Here' 
            onChange={handleLoginAccount}
            type='email'
            className='p-2 font-semibold rounded-lg bg-input'
          />
          <div className='relative'>
          <Input 
            label='Password' 
            htmlFor='Password'
            ariaLabel='password'  
            id='password' 
            onChange={handleLoginAccount}
            placeholder='*******' 
            name='password' 
            type= {showPassword ? "text" : "password"}
            className='p-2 font-semibold rounded-lg bg-input'
          />
          <button type='button' onClick={handleTogglePass} className='absolute right-5 bottom-3'>
              {showPassword ? <FaEye /> : <FaEyeSlash />}
          </button>
          </div>
          <div className='flex flex-row justify-between'>
            <span className='flex flex-row gap-2'>
            <input type='checkbox'value="ingat saya" onChange={handleRememberToken}/>
              <label className='font-bold'>Ingat Saya</label>
            </span>
            <Link to="/forgotPass" className='font-semibold text-blue-700'>Lupa Password</Link>
          </div>
          <Button 
          id='btn-login'
          type='submit'
          label='Login'
          disabled={disable}
          className='p-3 text-lg font-bold text-white rounded-lg shadow-xl disabled:cursor-not-allowed disabled:bg-slate-300 bg-primary hover:bg-black hover:rounded-2xl'
          />
        </form>
        <span className='flex flex-row gap-1 mx-auto my-4 font-semibold'>
          <p>Belum punya akun?</p>
          <Link to="/register" className='text-primary'>Daftar sekarang gratis!</Link>
        </span>
      </div>
        <p className='text-lg text-center text-slate-400'>atau login menggunakan</p>
        <hr className='my-2'/>
        <div className='flex flex-row gap-8 mx-auto my-4'>
          <FaGooglePlusSquare className="text-6xl cursor-pointer text-slate-400 hover:text-red-700 hover:shadow-lg" onClick={handleLoginGoogle}/>
          <FaSquareTwitter className="text-6xl cursor-pointer text-slate-400 hover:text-primary hover:shadow-lg" />
          <FaSquareGithub className="text-6xl cursor-pointer text-slate-400 hover:text-black hover:shadow-lg"/>
        </div>
      </div>
      <div className='flex-col justify-center order-first hidden w-full gap-4 mx-auto sm:flex md:flex lg:flex xl:flex lg:order-last xl:order-last md:order-first bg-gradient-to-tr from-auth via-blue-700 to-blue-900'>
        <img src={iconRight} className='mx-auto lg:w-full xl:w-full md:max-w-xl sm:max-w-xl' alt='icon-right'/>
        <span className='flex flex-col gap-2 mx-auto text-white'>
        <p className='hidden text-sm font-semibold xl:flex lg:flex md:hidden sm:hidden'>NAMANYAJUGABELAJAR.IO X SkillUp</p>
        <p className='hidden max-w-lg text-2xl font-semibold xl:flex lg:flex md:hidden sm:hidden'>Belajar secara online semakin mudah – tetep belajar walaupun pake kuota dari Kemendikbud hehe~</p>
        </span>
      </div>
      </div>
     )
}

export default Login