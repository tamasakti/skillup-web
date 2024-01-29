import { useEffect, useState } from "react"
import courses from "../utils/interface/courses"
import { onAuthStateChanged } from "firebase/auth"
import { auth, db } from "../config/firebase"
import { doc, getDoc } from "firebase/firestore"
import { useParams } from "react-router"
import Button from "../components/Button"
import Spinner from "../components/Spinner"

const CourseDetailPage = () => {
  const initialCourseState:courses = {
    availCoupoun : [],
    coupounBoolean: false,
    createdBy : "",
    createdTime:"",
    description:"",
    forwho:"",
    imageCover:"",
    judul:"",
    language:"",
    levelCourse:"",
    requirement:"",
    uid:"",
    uploadedImage:"",
    whatlearn:""
  }

  const [detailCourse, setDetailCourse] = useState<courses>(initialCourseState)
  const [loading, setLoading] = useState<boolean>(false)

  const params = useParams()

  async function fetchDetailCourse() {
    setLoading(true)
    try {
      const courseRef = doc(db, "courses", params.courseId)
      const docSnap = await getDoc(courseRef)
      if(docSnap.exists()) {
        setDetailCourse(docSnap.data() as courses)
      }
    } catch (error) {
      if(error instanceof Error) return console.log(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if(user) {
        fetchDetailCourse()
      }
    })
  }, [])

  if(loading) return <Spinner />

  const header = {
    width: "80%",
    height: "25rem",
    backgroundImage: `url(${detailCourse.imageCover})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  }

  return (
    <div className="flex flex-col items-center w-full min-h-screen mt-10 bg-white">
      <h1 className="flex justify-start w-9/12 -mt-8 text-2xl font-bold text-black font-poppins lg:mt-0">
            {detailCourse.judul}
          </h1>
          <h2 className="flex justify-start w-9/12 mt-5 text-xl font-semibold text-slate-500 font-poppins">
            Tingkatan Kelas : {detailCourse.levelCourse}
          </h2>
          <div
            className="mt-10 bg-center bg-no-repeat bg-auto rounded-2xl"
            style={header}
          ></div>
          <div className="flex flex-col-reverse lg:flex-row w-[80%] min-h-screen mt-20">
          <div className="w-full lg:mt-0 -mt-16 lg:w-[65%] text-black">
              <div className="flex flex-col w-11/12">
                <h1 className="text-2xl font-bold text-black font-poppins">
                  Deskripsi Khusus:
                </h1>
                <p className="mt-8 text-lg font-semibold text-black font-poppins">
                  {detailCourse.description}
                </p>
                <h1 className="mt-10 text-2xl font-bold text-black font-poppins">
                  Apa yang akan anda Pelajari:
                </h1>
                <p className="mt-8 text-lg font-semibold text-black font-poppins">
                  {detailCourse.whatlearn}
                </p>
                <h1 className="mt-10 text-2xl font-bold text-black font-poppins">
                  Prasyarat Khusus:
                </h1>
                <p className="mt-8 text-lg font-semibold text-black font-poppins">
                  {detailCourse.requirement}
                </p>
                <h1 className="mt-10 text-2xl font-bold text-black font-poppins">
                  Untuk Siapa Kursus ini:
                </h1>
                <p className="mt-8 text-lg font-semibold text-black font-poppins">
                  {detailCourse.forwho}
                </p>

                {/* <div className="flex justify-center w-full">
                  <Button
                    id="loadMore"
                    label="Load More"
                    className="w-6/12 py-2 mt-8 font-semibold text-white bg-bg-button rounded-xl font-poppins hover:bg-red-600"
                  />
                </div> */}
              </div>
            </div>
            <div className="lg:w-[35%] w-full text-black flex justify-center sticky">
              <div className="card bg-card w-full h-[45rem] items-center">
                <div className="flex flex-row w-[85%] h-auto mt-32 lg:mt-5">
                  <div className="flex-1">
                    <p className="text-sm font-bold font-poppins">
                      Harga Kursus
                    </p>
                    <p className="mt-2 text-sm font-bold font-poppins">Tax</p>
                  </div>
                  <div className="flex flex-col items-end flex-1">
                    <p className="text-sm font-bold font-poppins">
                      Rp.{detailCourse.price},-
                    </p>
                    {/* <p className="mt-2 text-sm font-bold font-poppins">
                      Rp.{tax},-
                    </p> */}
                  </div>
                </div>
                <hr className="w-10/12 mt-4 border-black border-1" />
                <div className="flex flex-row w-[85%] h-auto mt-5">
                  <div className="flex-1">
                    <p className="mt-2 text-sm font-bold font-poppins">
                      Jumlah Total
                    </p>
                  </div>
                  <div className="flex flex-col items-end flex-1">
                    <p className="mt-2 text-sm font-bold font-poppins"></p>
                  </div>
                </div>
                <div className="flex justify-start w-[85%]">
                  {/* {checkRole === "Mentor" ? (
                    <></>
                  ) : (
                    <>
                      {" "}
                      <Button
                        id="btn-belikursus"
                        label="Beli Kursus"
                        className="px-16 py-2 mt-5 text-white border-none btn bg-button"
                        onClick={() => navigate(`/payment/${id}`)}
                      />
                    </>
                  )} */}
                </div>
              </div>
            </div>
          </div>
      </div>
  )
}

export default CourseDetailPage