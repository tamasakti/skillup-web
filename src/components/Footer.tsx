import LogoFooter from "../assets/skillup-logo.webp"
import Button from "./Button"
import { InputCustom } from "./Input"


const Footer = () => {
  return (
    
    <div className='flex flex-col items-center justify-center w-full h-full'>
        <div className='flex flex-row justify-around max-w-2xl mx-auto py-11'>
            <img src={LogoFooter} className="w-5/12 p-3 border-white"/>
            <span className="text-white border-r-2"></span>
            <h1 className="p-3 text-xl font-semibold text-white">Virtual Class<br /> for zoom</h1>
        </div>
        <div className="flex flex-col w-10/12 gap-4 mx-auto">
            <h1 className="text-xl font-bold text-center text-footerText">Subscribe to get our Newsletter</h1>
            <span className="flex flex-col justify-center w-full gap-6 sm:flex-col md:flex-row lg:flex-row xl:flex-row 2xl:flex-row">
                <InputCustom id="email" name="sendEmail" placeholder="Your Email" type="email" className="p-2 text-black border-2 xl:w-3/12 md:w-3/12 2xl:w-3/12 lg:w-3/12 border-footerText-100 rounded-xl"/>
                <Button id="btn-sendEmail" label="Subscribe" className="px-10 py-2 font-semibold text-white bg-blue-800 rounded-xl hover:bg-black"/>
            </span>
        </div>
        <div className="flex flex-row justify-between gap-2 mx-auto font-semibold md:gap-0 lg:gap-0 xl:gap-0 2xl:gap-0 sm:gap-2 lg:w-3/12 md:w-3/12 xl:w-3/12 2xl:w-3/12 pt-14 text-footerText ">
            <p>Careers</p>
            <span className="border-r-2 text-footerText opacity-10"></span>
            <p>Privacy Policy</p>
            <span className="border-r-2 text-footerText opacity-10"></span>
            <p>Terms & Conditions</p>
          </div>
        <h1 className="py-4 font-semibold text-center text-footerText">© 2021 Class Technologies Inc. </h1>
    </div>
  )
}

export default Footer