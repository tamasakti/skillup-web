import { Link, useNavigate } from 'react-router-dom'
import Input, { InputCustom } from '../../components/Input'
import Button from '../../components/Button'
import iconRight from "../../assets/Register Icon.webp"
import logoSkillup from "../../assets/logo-skillup.webp"
import { useEffect, useState } from 'react'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from 'react-redux'
import {  createUserWithEmailAndPassword } from 'firebase/auth'
import { register } from '../../utils/redux/slice/userSlice'
import {auth, db} from "../../config/firebase"
import withReactContent from 'sweetalert2-react-content'
import Swal from '../../utils/types/Swal'
import { addDoc, collection } from 'firebase/firestore'

interface inputData {
  uid? : string,
  firstName : string,
  lastName : string,
  email : string,
  password: string,
}


const Register = () => { 
  const MySwal = withReactContent(Swal)
  const [disable, setDisable] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [role, setRole] = useState<string>("")
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [authUser, setAuthUser] = useState<inputData>({
    firstName : "",
    lastName : "",
    email : "",
    password: "",
  })
 const {firstName, lastName, email, password} = authUser



  useEffect(() => {
    if(firstName && lastName && email && password.length > 6 && role !== "") {
      setDisable(false)
    } else {
      setDisable(true)
    } 

  }, [firstName, lastName, email, password, role])
  
 
  function handleRegisterAccount(e: React.ChangeEvent<HTMLInputElement>) {
    const {name, value} = e.target
    setAuthUser(prev => ({
      ...prev,
      [name] : value
    }))
  }

  function handleTogglePass() {
    setShowPassword(!showPassword)
  }

  function handleRegister (e:React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    createUserWithEmailAndPassword(auth, email, password) 
    .then((user) => {
      const {uid} = user.user
      dispatch(register({
          firstName : firstName,
          lastName : lastName,
          email : email,
          password : password,
          role : role,
          uid : uid,
          imgUrl: "",
      }))
      addUserToDB(uid)
      MySwal.fire({
        title: "Sukses",
        text : "Berhasi Mendaftar",
        showCancelButton : false
      });
      navigate("/login")
    })
    .catch((error) => {
      const message = error.message
      MySwal.fire({
        title: "Gagal",
        text: message,
        showCancelButton:false,
      })
    })
    .finally(() => setLoading(false))
  }

  async function addUserToDB(uid:string) {
    try {
      const docRef = await addDoc(collection(db, "users"), {
        firstName : firstName,
          lastName : lastName,
          email : email,
          password : password,
          role : role,
          uid : uid,
          phone : "",
          instagram : "",
          facebook : "",
          twitter : "",
          linkedin : "",
          imgUrl: ""    
      })
    } catch (error:any) {
        console.log(error.message)
    }
  }

 
  return (
    <div className='grid order-last w-full min-h-screen md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2'>
    <div className='flex flex-col justify-center order-last w-11/12 h-full p-4 mx-auto lg:w-9/12 xl:w-9/12 md:w-10/12 sm:w-10/12 lg:order-first xl:order-first md:order-last'>
      <div className='flex flex-col gap-5 mx-auto'>
      <img src={logoSkillup} alt='Skillup-logo' className='w-3/12 cursor-pointer lg:w-2/12 xl:w-2/12 md:w-3/12 sm:w-3/12' onClick={() => navigate("/")}/>
        <h1 className='text-2xl font-bold'>Bikin akun kamu</h1>
        <h3 className='max-w-md text-md font-semibild'>Nggak susah kok, kamu cuma tinggal masukin beberapa data aja terus langsung jadi deh!</h3>
        <form className='flex flex-col w-full gap-8' onSubmit={handleRegister}>
            <div className='flex flex-col gap-4'>
                <label htmlFor='fullName' aria-label='fullName' className='font-semibold'>Nama Lengkap</label>
                <div className='grid grid-cols-2 gap-2'>
                <InputCustom id='firstName' name='firstName' type='text' placeholder='First Name'
                onChange={handleRegisterAccount} className='p-2 text-lg font-semibold text-black rounded-lg bg-input'/>
                <InputCustom id='lastName' name='lastName' type='text'
                onChange={handleRegisterAccount} placeholder='Last Name' className='p-2 text-lg font-semibold rounded-lg bg-input'/>
                </div>
            </div>
            <div className='flex flex-col flex-1 gap-3'>
              <label className='font-semibold text-md'>Account Type</label>
            <select name="role" onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setRole(e.target.value)} className={disable ? "p-3 font-semibold rounded-lg text-slate-400 hover:text-black" : "p-3 font-semibold rounded-lg text-black"}>
              <option value="">Select Account Type</option>
              <option value="teacher">Teacher</option>
              <option value="student">Student</option>
            </select>
            </div>
          <Input 
          label='Email' 
          htmlFor='Email'
          ariaLabel='email'  
          onChange={handleRegisterAccount}
          id='email' 
          placeholder='Type your Email Here' name='email' 
          type='email'
          className='p-2 font-semibold rounded-lg bg-input'
        />
        <div className='relative'>
        <Input 
          label='Password' 
          htmlFor='Password'
          ariaLabel='password'  
          id='password' 
          onChange={handleRegisterAccount}
          placeholder='*******' 
          name='password' 
          type={showPassword ? "text" : "password"}
          className='p-2 font-semibold rounded-lg bg-input'
        />
        <button type='button' onClick={handleTogglePass} className='absolute right-5 bottom-3'>
          {showPassword ? <FaEye/> : <FaEyeSlash />}
          
        </button>
        </div>
        
        <Button 
        id='btn-login'
        label='Daftar'
        className='p-3 text-lg font-bold text-white rounded-lg shadow-xl bg-primary hover:bg-black hover:rounded-2xl disabled:bg-slate-400 disabled:cursor-not-allowed'
        type='submit'
        disabled = {disable ? true : false}
        />
      </form>
      <span className='flex flex-row gap-1 mx-auto my-4 font-semibold'>
        <p>Sudah punya akun?</p>
        <Link to="/login" className='text-primary'>Login sekarang!</Link>
      </span>
    </div>
    </div>
    <div className='flex-col justify-center order-first hidden w-full gap-4 mx-auto sm:flex md:flex lg:flex xl:flex lg:order-last xl:order-last md:order-first bg-gradient-to-tr from-auth via-blue-700 to-blue-900'>
      <img src={iconRight} className='mx-auto lg:w-full xl:w-full md:max-w-xl sm:max-w-xl' alt='icon-right'/>
      <span className='flex flex-col gap-2 mx-auto text-white'>
      <p className='hidden text-sm font-semibold xl:flex lg:flex md:hidden sm:hidden'>NAMANYAJUGABELAJAR.IO X SkillUp</p>
      <p className='hidden max-w-lg text-2xl font-semibold xl:flex lg:flex md:hidden sm:hidden'>Ayo mendaftar dan belajar dengan rajin di sini supaya jadi pinter dan nggak jadi beban kayak si Denis!</p>
      </span>
    </div>
    </div>
  )
}

export default Register