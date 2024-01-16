
import Footer from './Footer'
import Header from './Header'
import { Outlet } from 'react-router'
import { useLocation } from "react-router"


const Layout = () => {
  const location = useLocation()
  const pathname = location.pathname
  let hidden = false;
  // const dataGet = JSON.parse(localStorage.getItem("rf._") || "")
  // const split = dataGet.split("/")
  // const unique = split[1]
  // console.log(unique)

  switch(pathname) {
    case "/":
      hidden = true
      break;
    case "/career":
      hidden = true
      break;
    case "/blog" :
      hidden = true
      break;
    case "/aboutus" :
      hidden = true
      break;
    case "/profile" :
      hidden = true
      break;
    case "/profile/course" :
      hidden = true
    break;
    case "/profile/dashboard" :
      hidden = true
      break;
    case "/profile/coupouns" :
      hidden = true
      break;
    case `/detail/course`:
      hidden = true
      break;
    default:
      hidden = false
  }


  return (
    <div className="w-full min-h-screen mx-auto overflow-hidden">
      {hidden ? (
        <header className="w-full h-auto bg-navbar">
        <Header />
      </header>
      ) : null}
      <main className="w-full min-h-screen">

        <Outlet />
      </main>
      {hidden ? (
        <footer className="w-full h-[27rem] bg-footer">
        <Footer />
      </footer>
      ) : null}
      
    </div>
  )
}

export default Layout