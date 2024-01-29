import { useEffect, useState } from "react"
import withReactContent from "sweetalert2-react-content"
import Swal from "../../utils/types/Swal"
import { collection, deleteDoc, doc, getDocs, query, updateDoc, where } from "firebase/firestore"
import { auth, db } from "../../config/firebase"
import { onAuthStateChanged, signOut } from "firebase/auth"
import Spinner from "../../components/Spinner"
import defaultPhoto from "../../assets/user.webp"
import { FaFacebook } from "react-icons/fa"
import { FaInstagram } from "react-icons/fa"
import { FaTwitter } from "react-icons/fa"
import { FaLinkedin } from "react-icons/fa"
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router"
import { NavLink } from "react-router-dom"

interface profilProps {
  id? : string,
  uid? : string,
  email? : string,
  firstName : string,
  lastName : string,
  password? : string,
  role? : string,
  instagram? :string,
  imageCover:string,
  twitter? : string,
  linkedin? : string,
  facebook?: string, 
  imgUrl? : string,
  phone: string, 
  aboutme: string
}

const ProfileStudent = () => {
  const [profile, setProfile] = useState<profilProps | undefined>(undefined)
  const [loading, setLoading] = useState<boolean>(false)
  const [idDocs, setIdDocs] = useState<string>("")
  const MySwal = withReactContent(Swal)
  const [cookie, , removeCookie] = useCookies(["token", "role"])

  async function fetchDataUser(uid:string) {
    setLoading(true)
    try {
      const userrRef = collection(db, "users")
      const q = query(userrRef, where("uid", "==", uid))
      const querySnap = await getDocs(q)
      if(querySnap) {
        querySnap.forEach((doc) => {
          setProfile(doc.data() as profilProps)
          setIdDocs(doc.id)
        })
      }
    } catch (error) {
      if(error instanceof Error) {
        MySwal.fire({
          title: "Fetch Status",
          text: error.message,
          showCancelButton:false
        })
      }
    } finally {
      setLoading(false)
    }
  }

  const [uid, setUid] = useState<string>("")

  async function handleChangeRole() {
    setLoading(true)
    try {
      const postDoc = doc(db, "users", idDocs)
      MySwal.fire({
        title: "Are You Sure?",
        text: "You Can't Retrieve your Data After Change your Account Type",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "blue",
        cancelButtonColor: "#6c757d",
        confirmButtonText: "Upgrade Accounts!",
        cancelButtonText: "Batal",
      }).then((result) => {
        if(result.isConfirmed) {
          updateDoc(postDoc, {
            role: "teacher"
          })
          MySwal.fire({
            title: "Profile Upgraded",
            text: "Profile Successfully Changed",
            showCancelButton:false
          })
          signOut(auth)
        .then(() => {
          MySwal.fire({
            title: "Logout",
                text: "Logout Berhasil",
                showCancelButton:false
          })
          removeCookie("token")
          removeCookie("role")
          navigate("/login")
        })
        }
      })
    } catch (error) {
      if(error instanceof Error) return console.error(error.message)
    } finally {
  setLoading(false)
}
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if(user) {
        const uid = user.uid
        fetchDataUser(uid)
        setUid(uid)
        
      }
    })
  }, [])

  const navigate = useNavigate()

  async function handleDeleteAccount() {
    MySwal.fire({
      title: "Are You Sure?",
      text: "You Can't Retrieve your Account After Deactivate it!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Deactivate Account!",
      cancelButtonText: "Batal",
    })
    .then((res) => {
      if(res.isConfirmed) {
        deleteDoc(doc(db, "users", idDocs))
        signOut(auth)
        .then(() => {
          MySwal.fire({
            title: "Logout",
                text: "Logout Berhasil",
                showCancelButton:false
          })
          removeCookie("token")
          removeCookie("role")
          navigate("/login")
        })
      }
    }).catch((error) => {
      if(error instanceof Error) {
        console.log(error.message)
      }
    })
  }

  

  if(loading) {
    return <Spinner />
  }

  return (
    <div className="flex flex-col w-full min-h-screen sm:flex-col md:flex-col lg:flex-row xl:flex-row 2xl:flex-row">
      <div className="flex flex-col items-center justify-center w-full h-full lg:min-h-screen xl:min-h-screen 2xl:min-h-screen md:h-full sm:h-full sm:w-full md:w-full lg:w-7/12 xl:w-7/12 2xl:w-7/12">
        <div className="w-full sm:w-full md:w-full lg:w-5/12 xl:w-5/12 2xl:w-5/12 flex rounded-lg flex-col lg:h-[20rem] xl:h-[20rem] 2xl:h-[20rem] md:h-[25rem] sm:h-[25rem] h-[25rem] border-2 border-slate-500">
          <div className="flex justify-center items-center gap-3 border-b-[1px] border-b-slate-400 w-full lg:h-[15rem] xl:h-[15rem] 2xl:h-[15rem] md:h-[20rem] sm:h-[20rem] h-[20rem] flex-col p-5">
            <img src={!profile?.imageCover ? defaultPhoto : profile?.imageCover} className="w-5/12 rounded-full"/>
            <p className="font-semibold">{profile?.firstName + " " + profile?.lastName}</p>
          </div>
          <div className="flex justify-around flex-row w-full h-[5rem]">
            <div className="flex items-center justify-center flex-1 cursor-pointer hover:bg-black hover:text-white">
              <NavLink to="/editProfile">
                <button className="font-semibold hover:underline">Edit Profile</button>
              </NavLink>
            </div>
            <div className="flex items-center justify-center flex-1 text-red-600 cursor-pointer hover:bg-red-600 hover:text-white">
              <button type="submit" onClick={handleDeleteAccount} className="w-full h-full font-semibold">Delete Account</button>
            </div>
          
          </div>
        
        </div>
        <div className="py-10">
          <button onClick={handleChangeRole} type="submit" className="px-20 py-3 text-white bg-black rounded-lg">Wanna be Teacher ?</button>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center w-full h-full py-16 lg:min-h-screen xl:min-h-screen 2xl:min-h-screen lg:p-0 xl:p-0 2xl:p-0 md:py-16 sm:py-16 md:h-full sm:h-full lg:items-start xl:items-start 2xl:items-start md:items-center sm:items-center lg:w-5/12 xl:w-5/12 2xl:w-5/12 md:w-full sm:w-full">
        <h1 className="text-6xl">Hi, {profile?.firstName}</h1>
        <p className="py-5 text-2xl font-bold">Contact Me</p>
        <span className="flex flex-row gap-2 text-xl font-semibold">
          <p>Email : </p>
          <p>{profile?.email}</p>
        </span>
        <span  className="flex flex-row gap-2 text-xl font-semibold">
          <p>No. Hp : </p>
          <p>{profile?.phone}</p>
        </span>
        <div className="flex flex-col items-center w-full gap-3 sm:items-center md:items-center lg:items-start xl:items-start 2xl:items-start sm:w-full md:w-7/12 lg:w-7/12 xl:w-7/12 2xl:w-7/12 py-7">
            <h1>Social Media</h1>
            <span  className="flex flex-row items-center justify-center w-full gap-2 text-xl sm:justify-center md:justify-center lg:justify-start xl:justify-start 2xl:justify-start ">
            <FaInstagram />
            <p>{profile?.instagram}</p>
            </span>
             <span className="flex flex-row items-center justify-center w-full gap-2 text-xl sm:justify-center md:justify-center lg:justify-start xl:justify-start 2xl:justify-start ">
              <FaFacebook />
              <p>{profile?.facebook}</p>
             </span>
             <span className="flex flex-row items-center justify-center w-full gap-2 text-xl sm:justify-center md:justify-center lg:justify-start xl:justify-start 2xl:justify-start ">
              <FaTwitter />
              <p>{profile?.twitter}</p>
             </span>
             <span className="flex flex-row items-center justify-center w-full gap-2 text-xl sm:justify-center md:justify-center lg:justify-start xl:justify-start 2xl:justify-start ">
              <FaLinkedin />
             <p>{profile?.linkedin}</p>
             </span>
          </div>
      </div>
    </div>
  )
}

export default ProfileStudent