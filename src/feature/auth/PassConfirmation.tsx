import Input from '../../components/Input'
import Button from '../../components/Button'
import iconRight from "../../assets/login-right-side.webp"
import logoSkillup from "../../assets/logo-skillup.webp"


const PassConfirmation = () => {
  return (
    <div className='grid order-last w-full min-h-screen md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2'>
      <div className='flex flex-col justify-center order-last w-11/12 h-full p-4 mx-auto lg:w-9/12 xl:w-9/12 md:w-10/12 sm:w-10/12 lg:order-first xl:order-first md:order-last'>
        <div className='flex flex-col gap-5 mx-auto'>
        <img src={logoSkillup} alt='Skillup-logo' className='w-2/12' />
          <h1 className='text-2xl font-bold'>Atur ulang kata sandi</h1>
          <h3 className='max-w-md text-md font-semibild'>Jangan pake kata sandi yang susah-susah makannya, ngerepotin mulu jadi orang.</h3>
          <form className='flex flex-col w-full gap-8'>
          <div>
          <Input 
            label='Kata Sandi' 
            htmlFor='Password'
            ariaLabel='password'  
            id='password' 
            placeholder='*******' 
            name='password' 
            type='password'
            className='p-2 font-semibold rounded-lg bg-input'
          />
          </div>
          <div>
          <Input 
            label='Konfirmasi Kata Sandi' 
            htmlFor='Password'
            ariaLabel='password'  
            id='password' 
            placeholder='*******' 
            name='password' 
            type='password'
            className='p-2 font-semibold rounded-lg bg-input'
          />
          </div>
          
          <Button 
          id='btn-login'
          label='Atur Ulang'
          className='p-3 text-lg font-bold text-white rounded-lg shadow-xl bg-primary hover:bg-black hover:rounded-2xl'
          />
        </form>
        
      </div>
      </div>
      <div className='flex-col justify-center order-first hidden w-full gap-4 mx-auto sm:flex md:flex lg:flex xl:flex lg:order-last xl:order-last md:order-first bg-gradient-to-tr from-auth via-blue-700 to-blue-900'>
        <img src={iconRight} className='mx-auto lg:w-full xl:w-full md:max-w-xl sm:max-w-xl' alt='icon-right'/>
        <span className='flex flex-col gap-2 mx-auto text-white'>
        <p className='hidden text-sm font-semibold xl:flex lg:flex md:hidden sm:hidden'>NAMANYAJUGABELAJAR.IO X SkillUp</p>
        <p className='hidden max-w-lg text-2xl font-semibold xl:flex lg:flex md:hidden sm:hidden'>Biar nanti nggak lupa lagi sama kata sandinya, disimpen di password manager ya, bang!</p>
        </span>
      </div>
      </div>
  )
}

export default PassConfirmation