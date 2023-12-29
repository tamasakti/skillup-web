import { Link, useNavigate } from 'react-router-dom'
import Input from '../../components/Input'
import Button from '../../components/Button'
import iconRight from "../../assets/ForgetPass.webp"
import logoSkillup from "../../assets/logo-skillup.webp"
import { auth, db } from "../../config/firebase"
import { sendPasswordResetEmail } from 'firebase/auth'
import withReactContent from 'sweetalert2-react-content'
import Swal from '../../utils/types/Swal'
import { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'

interface collectionData {
  id: string
}

const ForgetPassword = () => {
  const [email, setEmail] = useState<string>("")
  const [collectionDataUser, setCollections] = useState<collectionData[]>([])
  const MySwal = withReactContent(Swal)
  const navigate = useNavigate()

  async function getAllData() {
    try {
      const newData:collectionData[] = []
      const querySnapShot = await getDocs(collection(db, "users"));
    querySnapShot.forEach((doc) => {
      const dataUser : collectionData = {
        id: doc.id,
        ...doc.data()
      }
      newData.push(dataUser)
    })
    setCollections(newData)
    } catch(error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    getAllData()
  }, [])
  

  function handleSendResetEmail (e:React.FormEvent) {
    e.preventDefault()
    sendPasswordResetEmail(auth, email)
    .then(() => {
      MySwal.fire({
        title: "Success",
        text: "Password Reset Link",
        showCancelButton: false,
      })
      // navigate("/login")
    })
    .catch((error) => {
      const {message} = error.message
      MySwal.fire({
        title: "Failed",
        text: message,
        showCancelButton:false
      })
    })
  }


  return (
    <div className='grid order-last w-full min-h-screen md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2'>
      <div className='flex flex-col justify-center order-last w-11/12 h-full p-4 mx-auto lg:w-9/12 xl:w-9/12 md:w-10/12 sm:w-10/12 lg:order-first xl:order-first md:order-last'>
        <div className='flex flex-col gap-5 mx-auto'>
        <img src={logoSkillup} alt='Skillup-logo' className='w-2/12' />
          <h1 className='text-2xl font-bold'>Lupa kata sandi</h1>
          <h3 className='max-w-md text-md font-semibild'>Masukkan email yang kamu daftarkan sebelumnya, nanti kamu bakal dikirim email.</h3>
          <form onSubmit={handleSendResetEmail} className='flex flex-col w-full gap-8'>
            <Input 
            label='Email' 
            htmlFor='Email'
            ariaLabel='email'  
            id='email' 
            placeholder='Type your Email Here' name='email' 
            onChange={(e:React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            type='email'
            className='p-2 font-semibold rounded-lg bg-input'
          />
          
          <Button 
          id='btn-login'
          type='submit'
          label='Kirim Email'
          className='p-3 text-lg font-bold text-white rounded-lg shadow-xl bg-primary hover:bg-black hover:rounded-2xl'
          />
        </form>
        <span className='flex flex-row gap-1 mx-auto my-4 font-semibold'>
          <p>Lah, inget lagi kata sandinya?</p>
          <Link to="/register" className='text-primary'> Login!</Link>
        </span>
      </div>
      </div>
      <div className='flex-col justify-center order-first hidden w-full gap-4 mx-auto sm:flex md:flex lg:flex xl:flex lg:order-last xl:order-last md:order-first bg-gradient-to-tr from-auth via-blue-700 to-blue-900'>
        <img src={iconRight} className='mx-auto lg:w-full xl:w-full md:max-w-xl sm:max-w-xl' alt='icon-right'/>
        <span className='flex flex-col gap-2 mx-auto text-white'>
        <p className='hidden text-sm font-semibold xl:flex lg:flex md:hidden sm:hidden'>NAMANYAJUGABELAJAR.IO X SkillUp</p>
        <p className='hidden max-w-lg text-2xl font-semibold xl:flex lg:flex md:hidden sm:hidden'>Nggak apa-apa lupa sama kata sandi, asalkan kita jangan sampe lupa sama jasa para pahlawan.</p>
        </span>
      </div>
      </div>
  )
}

export default ForgetPassword   