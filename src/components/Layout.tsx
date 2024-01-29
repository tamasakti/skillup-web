
import { useEffect, useState } from 'react'
import Footer from './Footer'
import Header from './Header'
import { Outlet } from 'react-router'
import { useLocation } from "react-router"
import { useCookies } from 'react-cookie'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { auth, db } from '../config/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import Spinner from './Spinner'


const Layout = () => {
  const location = useLocation()
  const pathname = location.pathname
  let hidden
  const [loading, setLoading] = useState<boolean>(true)
  const [, setCookie] = useCookies(["role"])
  async function fetchDataUser(uid:string) {
    setLoading(true)
    try {
      const userRef = collection(db, "users")
      const q = query(userRef, where("uid", "==", uid));
      const querySnap = await getDocs(q)
      if(querySnap) {
        querySnap.forEach((doc) => {
          const docData = doc.data()
          setCookie("role", docData.role, {
            path: "/"
          })
        })
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if(user) {
        const uid = user.uid
        fetchDataUser(uid)
      } else {
        setLoading(false)
      }
    })
  }, [])

  if(loading) {
    return <Spinner />
  }
  

  switch(pathname) {
    case "/login":
      hidden = true
      break;
    case "/register":
      hidden = true
      break;
    case "/forgotPass":
      hidden = true
      break;
    default:
      hidden : false
  }
  

  // switch(pathname) {
  //   case "/":
  //     hidden = true
  //     break;
   
  //   case "/blog" :
  //     hidden = true
  //     break;
  //   case "/findCourses" :
  //     hidden = true
  //     break;
  //   case "/aboutus" :
  //     hidden = true
  //     break;
  //   case "/profile" :
  //     hidden = true
  //     break;
  //   case "/profile/course" :
  //     hidden = true
  //   break;
    
  //   case "/editProfile/coupouns" :
  //     hidden = true
  //     break;
  //   case `/editProfile/course`:
  //     hidden = true
  //     break;
  //   case "/editProfile":
  //     hidden = true
  //     break;
  //   case "/findCourse/"
  //   default:
  //     hidden = false
  // }

  if(loading) {
    return <Spinner />
  }

  return (
    <div className="w-full min-h-screen mx-auto overflow-hidden">
      {!hidden ? (
        <header className="w-full h-auto bg-navbar">
        <Header />
      </header>
      ) : null}
      <main className="w-full min-h-screen">

        <Outlet />
      </main>
      {!hidden ? (
        <footer className="w-full h-[27rem] bg-footer">
        <Footer />
      </footer>
      ) : null}
      
    </div>



  )
}

export default Layout