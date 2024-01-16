import { Outlet, useLocation } from 'react-router'
import { NavLink } from 'react-router-dom'

const ProfileHost = () => {
  const location = useLocation()

  

  return (
    <div>
        <div className=' w-10/12 h-[5rem] mx-auto flex items-center justify-start gap-5 px-7'>
            <NavLink to="." end className={({isActive}) => isActive ? "underline font-semibold " : ""}>Profile</NavLink>
            <div className="dropdown">
            <div tabIndex={0} role="button" className="m-1 bg-white border-none btn "><span className='flex flex-row gap-1'>
                <p className={location.pathname === "/profile/course" ? "underline font-bold text-blue-700" :""}>Courses</p>
                <p>&</p>
                <p className={location.pathname === "/profile/coupouns" ? "underline font-bold text-blue-700  " :""}>Coupouns</p>
              </span></div>
              <ul tabIndex={0} className="flex flex-col gap-2 p-4 bg-white dropdown-content shadow-lg z-[1] menu rounded-box w-52">
                <NavLink to="course" className={({isActive}) => isActive ? "text-blue-700 font-bold underline ":""}>My Course</NavLink>
                <NavLink to="coupouns" className={({isActive}) => isActive ? "text-blue-700 font-bold underline ":""}>My Coupouns</NavLink>
              </ul>
            </div>
            <NavLink to="dashboard" className={({isActive}) => isActive ? "underline font-semibold " : ""}>Dashboard</NavLink>
        </div>
        <div>
            <Outlet />
        </div>
    </div>
  )
}

export default ProfileHost