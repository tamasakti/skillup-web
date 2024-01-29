 import { onAuthStateChanged } from "firebase/auth"
import { useEffect, useState } from "react"
import { auth, db } from "../../config/firebase"
import { DocumentData, collection, deleteDoc, doc, getDocs, limit, query, where } from "firebase/firestore"
import Spinner from "../../components/Spinner"
import Button from "../../components/Button"
import CourseCard from "../course/courseCard"
import defaultPhoto from "../../assets/user.webp"
import { useNavigate } from "react-router"
import { FaFacebook } from "react-icons/fa"
import { FaInstagram } from "react-icons/fa"
import { FaTwitter } from "react-icons/fa"
import { FaLinkedin } from "react-icons/fa"
import withReactContent from "sweetalert2-react-content"
import Swal from "../../utils/types/Swal"
import { Link } from "react-router-dom"

interface profilProps {
    id? : string,
    uid? : string,
    email? : string,
    firstName : string,
    lastName : string,
    password? : string,
    role? : string,
    instagram? :string,
    twitter? : string,
    linkedin? : string,
    facebook?: string, 
    imgUrl? : string,
    phone: string, 
    aboutme: string
  }

  interface coursePropsData {
    id:string,
    data: DocumentData
  }
  

const NewProfile = () => {
const [profile, setProfile] = useState<profilProps | undefined>(undefined)
const [course, setCourse] = useState<coursePropsData[]>([])
const [imageUrl, setImageUrl] = useState(null)
const [loading, setLoading] = useState<boolean>(false)
const [uid, setUid] = useState<string>("")

const backgroundProfile = {
    width: "50%",
    height: "10rem",
    backgroundImage: `url(${!imageUrl ? defaultPhoto : imageUrl})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    margin: "0 auto",
    borderRadius: "20px",
    
}

async function fetchDataUser(uid:string) {
    setLoading(true)
    try {
       const userRef = collection(db, "users")
       const q = query(userRef, where("uid", "==", uid));
       const querySnap = await getDocs(q)
       if(querySnap) {
        querySnap.forEach((doc) => {
            setProfile(doc.data() as profilProps)
        })
       } 
    } catch (error) {
        if(error instanceof Error) return console.log(error.message)
    } finally {
        setLoading(false)
    }
}

async function fetchDataCourse(uid:string) {
    setLoading(true)
    try {
        const courseRef = collection(db, "courses")
        const q = query(courseRef, where("uid", "==", uid), limit(2))
        const querySnap = await getDocs(q)
        const listingCourses:coursePropsData[] = []
        querySnap.forEach((doc) => {
            return listingCourses.push({
                id: doc.id,
                data:doc.data()
            })
        } )
        setCourse(listingCourses)
    } catch (error) {
        if(error instanceof Error) return console.log(error.message)
    } finally {
        setLoading(false)
    }
}



useEffect(() => {
    onAuthStateChanged(auth, (user) => {
        if(user) {
          const uid = user.uid
          fetchDataUser(uid)
          fetchDataCourse(uid)
          const image = user.photoURL
          setImageUrl(image)
          setUid(uid)
        }
    })
}, [])

const navigate = useNavigate()

const MySwal = withReactContent(Swal)

async function handleDeleteCourse(id:string) {
  MySwal.fire({
    title: "Are You Sure?",
        text: "You Can't Retrieve your Data After Delete your Courses",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#dc3545",
        cancelButtonColor: "#6c757d",
        confirmButtonText: "Delete Course!",
        cancelButtonText: "Batal",
  })
  .then((result) => {
    if(result.isConfirmed) {
      setLoading(true)
      deleteDoc(doc(db, "courses", id))
      const updatedListCourse =course.filter((data:coursePropsData) => data.id !== id)
      setCourse(updatedListCourse)
    }
  })
  .catch((error) => {
    if(error instanceof Error) return console.log(error.message)
  }).finally(() => setLoading(false))
}

async function handleNavigateEdit(id:string) {
  window.location.href = `editProfile/course/${id}`
}

    if(loading) return <Spinner />

  return (
    <div className="container min-h-screen mx-auto w-[80%] flex md:flex-row lg:flex-row xl:flex-row 2xl:flex-row sm:flex-col flex-col mt-7">
      <div className="w-11/12 px-0 lg:px-14 xl:px-14 md:px-14 2xl:px-14 sm:px-0">
      <p className="text-3xl font-semibold opacity-80">Teacher</p>
      <p className="text-5xl font-bold">{profile?.firstName + " " + profile?.lastName}</p>
      <div className="mt-2">
              <p className="font-semibold opacity-75">Ulasan</p>
              <p className="text-sm font-bold">47.889</p>
            </div>
            <div className="mt-7">
              <p className="text-xl font-semibold">About Me</p>
              <p className="w-10/12 text-lg">{profile?.aboutme}</p>
            </div>
            <div className="mt-7">
              <p className="text-xl font-semibold">my Course</p>
              {course.length < 1 ? (
                <div className="flex items-center justify-center w-4/12 mx-auto"><div role="alert" className="alert alert-warning">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 stroke-current shrink-0" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                <span>Belum ada Course</span>
              </div></div>
              ): (
                <>
                 <div className="grid grid-cols-1 gap-5 py-14 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 sm:grid-cols-1 ">
                
                {course?.map((item) => {
                  return (
                    <CourseCard
                      key={item.id}
                      image={item.data.imageCover}
                      judul={item.data.judul}
                      price={item.data.price}
                      levelCourse={item.data.levelCourse}
                      createdBy={item.data.createdBy}
                      onDelete={() => handleDeleteCourse(item.id)}
                      onEdit={() => handleNavigateEdit(item.id)}
                      
                    />
                  );
                })}
              </div>
              <div className="flex justify-start px-5 mb-10">
              <Link to="/editProfile/course" className="w-6/12 p-2 text-center text-white bg-blue-700 rounded-md">See Full Course</Link>
              </div>
                </>
              )}
            {profile?.role !== "teacher" && profile?.uid !== uid ? (
              <>
              <h1 className="mt-5 text-xl font-bold text-black font-poppins">Ulasan</h1>
             <div className="flex flex-col gap-2">
             
             <textarea className="w-4/12 mt-5 border-2 p-2 rounded-lg border-slate-500 m]" placeholder="Give Feedback to Mentor" maxLength={500}>

             </textarea>
             <button className="w-4/12 p-2 text-white bg-blue-700 rounded-lg">Give Feedback</button>
             </div>
              </>
            ):null}
             
            </div>  
      </div>
      
      <div className="w-full md:w-6/12 lg:w-6/12 xl:w-6/12 2xl:w-6/12 sm:w-full ">
      <div className="flex flex-col items-center">
          <div className="w-full h-[10rem] bg-no-repeat bg-center bg-contain" style={backgroundProfile}>
          </div>
          <p>{profile?.email}</p>
          <p>{profile?.phone}</p>
          <div className="flex flex-col w-full gap-3 mt-3 md:w-7/12 lg:w-7/12 xl:w-7/12 2xl:w-7/12">
          <button className="px-12 py-2 text-white bg-blue-700 rounded-lg">Chat</button>
          <button onClick={() => navigate("/editProfile")} className="px-12 py-2 text-white bg-blue-700 rounded-lg">Edit Profile</button>
          <button onClick={() => navigate("/forgotPass")} className="px-12 py-2 text-white bg-blue-700 rounded-lg">Reset Password</button>
          </div>
          
          <div className="flex flex-col w-full gap-3 sm:w-full md:w-7/12 lg:w-7/12 xl:w-7/12 2xl:w-7/12 py-7">
            <h1>Social Media</h1>
            <span  className="flex flex-row items-center w-full gap-2 text-xl ">
            <FaInstagram />
            <p>{profile?.instagram}</p>
            </span>
             <span className="flex flex-row items-center w-full gap-2 text-xl ">
              <FaFacebook />
              <p>{profile?.facebook}</p>
             </span>
             <span className="flex flex-row items-center w-full gap-2 text-xl ">
              <FaTwitter />
              <p>{profile?.twitter}</p>
             </span>
             <span className="flex flex-row items-center w-full gap-2 text-xl ">
              <FaLinkedin />
             <p>{profile?.linkedin}</p>
             </span>
          </div>
      </div>
       </div> 
    </div>
  )
}

export default NewProfile