import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import logoSkillUp from "../assets/logo-skillup.webp"
import { useEffect, useRef, useState } from 'react'
import { useClickAway } from 'react-use'
import { AnimatePresence, motion } from 'framer-motion'
import { Squash as Hamburger } from 'hamburger-react'
import { useCookies } from 'react-cookie'
import { auth } from "../config/firebase"
import withReactContent from 'sweetalert2-react-content'
import Swal from '../utils/types/Swal'
import { signOut } from 'firebase/auth'
import defaultPhoto from "../assets/user.webp"
import { useSelector } from 'react-redux'
import { selectCartItems, totalPriceUpdated } from '../utils/redux/cartslice/cartSlice'


const Header = ({handleOpenModalCart}) => {
    const items = useSelector(selectCartItems)
    const totalPrice = useSelector(totalPriceUpdated)
    const [isOpen, setIsOpen] = useState(false)
    const [cookie, , removeCookie] = useCookies(["token", "role"])
    const token = cookie.token
    const ref = useRef(null)
    const location = useLocation()
    const pathname = location.pathname
    const navigate = useNavigate()
    const MySwal = withReactContent(Swal)

    const user = auth.currentUser
    const photoUrl = user?.photoURL


    function handleLogout() {
        signOut(auth)
        .then(() => {
            MySwal.fire({
                title: "Logout",
                text: "Logout Berhasil",
                showCancelButton:false
            })
            removeCookie("token")
            removeCookie("role")
            localStorage.removeItem("role")
            navigate("/login")
        })
        .catch((err) => {
            const {message} = err
            MySwal.fire({
                title: "Logout",
                text : message,
                showCancelButton: false
            })
        })
    }


    useClickAway(ref, () => setIsOpen(false))
  return (
        <>
       
        <div className={`${pathname !== "/" ? "bg-white" : "bg-main"} py-5`}>
        <div className={`navbar ${pathname !== "/" ? "bg-white" : "bg-main"} bg-main w-10/12 mx-auto`}>
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="findCourses">Courses</NavLink></li>
        <li><NavLink to="blog">Blog</NavLink></li>
        <li><NavLink to="aboutus">Feedback</NavLink></li>
      </ul>
    </div>
    <div className='flex items-center flex-1 w-full px-16'>
                <img src = {logoSkillUp} alt='Logo Skil Up' onClick={() => navigate("/")} className="w-8/12 cursor-pointer sm:w-8/12 lg:w-5/12 xl:w-5/12 2xl:w-5/12"/>
            </div>
  </div>
  <div className="hidden navbar-center lg:flex">
    <ul className="px-1 text-lg menu menu-horizontal gap-7">
    <NavLink to="/">Home</NavLink>
                <NavLink to="findCourses">Courses</NavLink>
                <NavLink to="blog">Blog</NavLink>
                <NavLink to="aboutus">Feedback</NavLink>
    </ul>
  </div>
  <div className="navbar-end">
  <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
        <div className="indicator">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
          {items.length > 0 ? (
            <span className="badge badge-sm indicator-item">{items.length}</span>  
          ):null}
          
        </div>
      </div>
      
      <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
        <div className="card-body">
          <span className="text-lg font-bold">{items.length} Items</span>
          <span className="text-info">Subtotal: Rp.{totalPrice}</span>
          <div className="card-actions">
            <button className="btn btn-primary btn-block" onClick={handleOpenModalCart}>View cart</button>
          </div>
        </div>
      </div>
    </div>
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS Navbar component" src={ token && photoUrl ? photoUrl : defaultPhoto}  />
        </div>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 gap-2">
        <li>
          <NavLink to="/profile" className="justify-between p-2">
            Profile
            <span className="badge">New</span>
          </NavLink>
        </li>
       
        <li><button onClick={handleLogout} className='p-2'>Logout</button></li>
      </ul>
      </div>
      </div>
  </div>
</div>
              

        {/* <div className='z-10 flex md:hidden sm:flex lg:hidden xl:hidden'>    
        <nav className='w-full h-[3rem] bg-main flex flex-row '>
            <div ref={ref} className='fixed flex items-center justify-center flex-1 w-full cursor-pointer bg-main text-md'>
                <Hamburger toggled={isOpen} size={20} toggle={setIsOpen}/>
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                        initial={{opacity : 0}}
                        animate={{opacity: 1}}
                        exit={{ opacity : 0}}
                        transition={{duration : 0.2}}
                        className='fixed left-0 shadow-4xl right-0 top-[2.8rem] p-5 pt-0 border-b bg-main border-b-white/20'
                        >   
                            <ul className='grid gap-4'>
                               
                                <motion.li
                                initial={{scale : 0, opacity: 0}}
                                animate={{scale: 1, opacity:1}}
                                transition={{
                                    type: "spring",
                                    stiffness:260,
                                    damping: 20,
                                    delay: 0.1 ,
                                }}
                                className='w-full p-[0.08rem] rounded-xl bg-white'
                                >
                                    <NavLink to="/"
                                    className="flex items-center justify-between w-full p-5 text-black text-md rounded-xl "
                                    >
                                       Home
                                    </NavLink>
                                </motion.li>
                                <motion.li
                                initial={{scale : 0, opacity: 0}}
                                animate={{scale: 1, opacity:1}}
                                transition={{
                                    type: "spring",
                                    stiffness:260,
                                    damping: 20,
                                    delay: 0.1 ,
                                }}
                                className='w-full p-[0.08rem] rounded-xl bg-white'
                                >
                                    <NavLink to="career"
                                    className="flex items-center justify-between w-full p-5 text-black text-md rounded-xl "
                                    >
                                       Career
                                    </NavLink>
                                </motion.li>
                                <motion.li
                                initial={{scale : 0, opacity: 0}}
                                animate={{scale: 1, opacity:1}}
                                transition={{
                                    type: "spring",
                                    stiffness:260,
                                    damping: 20,
                                    delay: 0.1 ,
                                }}
                                className='w-full p-[0.08rem] rounded-xl bg-white'
                                >
                                    <NavLink to="blog"
                                    className="flex items-center justify-between w-full p-5 text-black text-md rounded-xl "
                                    >
                                       Blog
                                    </NavLink>
                                </motion.li>
                                <motion.li
                                initial={{scale : 0, opacity: 0}}
                                animate={{scale: 1, opacity:1}}
                                transition={{
                                    type: "spring",
                                    stiffness:260,
                                    damping: 20,
                                    delay: 0.1 ,
                                }}
                                className='w-full p-[0.08rem] rounded-xl bg-white'
                                >
                                    <NavLink to="aboutus"
                                    className="flex items-center justify-between w-full p-5 text-black text-md rounded-xl "
                                    >
                                       About Us
                                    </NavLink>
                                </motion.li>
                                <motion.li
                                initial={{scale : 0, opacity: 0}}
                                animate={{scale: 1, opacity:1}}
                                transition={{
                                    type: "spring",
                                    stiffness:260,
                                    damping: 20,
                                    delay: 0.1 ,
                                }}
                                className='w-full p-[0.08rem] rounded-xl bg-white'
                                >
                                    <NavLink to="login"
                                    className="flex items-center justify-between w-full p-5 text-black text-md rounded-xl "
                                    >
                                      Login
                                    </NavLink>
                                </motion.li>
                            </ul>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            </nav>
            <section>
            
            </section> 
        </div> */}
        </>
        )}

export default Header