import { Link } from 'react-router-dom'
import Input, { InputCustom } from '../../components/Input'
import Button from '../../components/Button'
import iconRight from "../../assets/login-right-side.webp"
import logoSkillup from "../../assets/logo-skillup.webp"


const Register = () => {
  return (
    <div className='grid order-last w-full min-h-screen md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2'>
    <div className='flex flex-col justify-center order-last w-11/12 h-full p-4 mx-auto lg:w-9/12 xl:w-9/12 md:w-10/12 sm:w-10/12 lg:order-first xl:order-first md:order-last'>
      <div className='flex flex-col gap-5 mx-auto'>
      <img src={logoSkillup} alt='Skillup-logo' className='w-3/12 lg:w-2/12 xl:w-2/12 md:w-3/12 sm:w-3/12 ' />
        <h1 className='text-2xl font-bold'>Bikin akun kamu</h1>
        <h3 className='max-w-md text-md font-semibild'>Nggak susah kok, kamu cuma tinggal masukin beberapa data aja terus langsung jadi deh!</h3>
        <form className='flex flex-col w-full gap-8'>
            <div className='flex flex-col gap-4'>
                <label htmlFor='fullName' aria-label='fullName' className='font-semibold'>Nama Lengkap</label>
                <div className='grid grid-cols-2 gap-2'>
                <InputCustom id='firstName' name='firstName' type='text' placeholder='First Name' className='p-2 text-lg font-semibold text-black rounded-lg bg-input'/>
                <InputCustom id='lastName' name='lastName' type='text' placeholder='Last Name' className='p-2 text-lg font-semibold rounded-lg bg-input'/>
                </div>
            </div>
          <Input 
          label='Email' 
          htmlFor='Email'
          ariaLabel='email'  
          id='email' 
          placeholder='Type your Email Here' name='email' 
          type='email'
          className='p-2 font-semibold rounded-lg bg-input'
        />
        <div>
        <Input 
          label='Password' 
          htmlFor='Password'
          ariaLabel='password'  
          id='password' 
          placeholder='*******' 
          name='password' 
          type='password'
          className='p-2 font-semibold rounded-lg bg-input'
        />
        </div>
        <div className='flex flex-row justify-between'>
          <span className='flex flex-row gap-2'>
          <input type='checkbox'value="ingat saya"/>
            <label className='font-bold'>Ingat Saya</label>
          </span>
          <Link to="#" className='font-semibold text-blue-700'>Lupa Password</Link>
        </div>
        <Button 
        id='btn-login'
        label='Daftar'
        className='p-3 text-lg font-bold text-white rounded-lg shadow-xl bg-primary hover:bg-black hover:rounded-2xl'
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