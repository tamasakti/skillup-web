import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import logoSkillUp from "../assets/logo-skillup.webp"
import { useRef, useState } from 'react'
import { useClickAway } from 'react-use'
import { AnimatePresence, motion } from 'framer-motion'
import { Squash as Hamburger } from 'hamburger-react'

const Header = () => {
    const [isOpen, setIsOpen] = useState(false)
    const ref = useRef(null)
    const location = useLocation()
    const pathname = location.pathname
    const navigate = useNavigate()

    useClickAway(ref, () => setIsOpen(false))
  return (
        <>
        <div className='hidden xl:flex lg:flex md:flex sm:hidden'>
            <nav className='w-full h-[7rem] bg-main flex flex-row'>
            <div className='flex items-center flex-1 w-full px-16'>
                <img src = {logoSkillUp} alt='Logo Skil Up' onClick={() => navigate("/")} className={pathname !== "/career" ? "w-3/12 cursor-pointer" : "w-2/12 cursor-pointer"}/>
            </div>
            {pathname !== "/career" ? (
                <div className='flex items-center justify-around flex-1'>
                <NavLink to="/">Home</NavLink>
                <NavLink to="career">Career</NavLink>
                <NavLink to="blog">Blog</NavLink>
                <NavLink to="aboutus">About Us</NavLink>
                </div>
            ):null}
            <div className={pathname !== "/career" ? "flex items-center justify-center flex-1 " : "flex items-center justify-end px-24 flex-1"}>
            {pathname !== "/career" ? (
                <NavLink to="/login" className="py-3 text-black bg-white rounded-lg px-7">Login</NavLink>
            ): (
                <NavLink to="/contact us" className="px-4 py-2 text-black bg-white rounded-lg">Contact Us</NavLink>
            )}
            
            </div>
            </nav>
        </div>
        <div className='z-10 flex md:hidden sm:flex lg:hidden xl:hidden'>    
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
                                {/* Refactor code later */}
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
        </div>
        </>
        )}

export default Header