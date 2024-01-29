import { onAuthStateChanged } from "firebase/auth"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { auth, db, storage } from "../../config/firebase"
import {DocumentData, collection, doc, getDoc, getDocs, query, serverTimestamp, updateDoc, where } from "firebase/firestore"
import Button from "../../components/Button"
import withReactContent from "sweetalert2-react-content"
import Swal from "../../utils/types/Swal"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import Spinner from "../../components/Spinner"
import courses from "../../utils/interface/courses"
import { FaUpload } from "react-icons/fa"


// interface courseProps {
//     judul : string,
//     price: string,
//     date: string,
//     coupoun? : string,
//     coupounId?:string
//   }

  interface coupounsProps {
    id: string, 
    data: DocumentData
  }

const CourseDetail = () => {
    const initialCourseState:courses = {
    
    coupounBoolean: false,
    description:"",
    forwho:"",
    judul:"",
    language:"",
    levelCourse:"",
    requirement:"",
    whatlearn:""
    }
    const [loading, setLoading] = useState<boolean>(false)
    
    const [uid, setUid] = useState<string>("")
    const [availCoupoun, setavailCoupoun] = useState<coupounsProps[]>([])
    const MySwal = withReactContent(Swal)
    const [uploadedImage, setUploadedImage] = useState<string>("")
    const [detailCourse, setDetailCourse] = useState<courses>(initialCourseState)
    const [useCoupoun, setUseCoupoun] = useState<string>("false")
    const [price, setPrice] = useState<string>("")
    const [date, setDate] = useState<string>("")
    const [startCourse, setStartCourse] = useState<string>("")
    const [endCourse, setEndCourse] = useState<string>("")
    const navigate = useNavigate();
    
    const {priceAfterDisc} = detailCourse

    let priceAfterDiscount = priceAfterDisc
 
     
    const params = useParams()
    const header = {
        width: "80%",
        height: "25rem",
        backgroundImage: `url(${uploadedImage !== "" ? uploadedImage : detailCourse.imageCover})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      };

      const [progressPercent, setProgressPercent] =useState<number>(0)

      async function storeImage(e:any) {
        e.preventDefault()
        const file = e.target[0]?.files[0]
        if(!file) return;
        const filename = `files/${file.name}-${auth.currentUser?.uid}`
        const storageRef = ref(storage, filename)
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on("state_changed", (snapshot) => {
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
          setProgressPercent(progress)
          console.log("Upload is " + progress + "% done");
        }, (error) => {
          alert(error)
        }, () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setUploadedImage(downloadURL)
          })
        })
    }

    let coupounBoolean:boolean;

    if(useCoupoun === "true") {
      coupounBoolean = true
    } else {
      coupounBoolean = false
    }

    console.log(params)


      const [initialCoupoun, setInitialCoupoun] = useState({})

    
      let validateMessage = ""

      

      if(Object.keys(initialCoupoun).length > 0) {
        availCoupoun.forEach((item) => {
          if(item.data.coupoun === initialCoupoun.coupoun) {
            const data = item.data
            const coupounType = data.discountTypeCreate
            const priceCoupoun = data.coupounPrice
            const currPrice = +price
            let priceAfter;
            
            if(coupounType === "%" && initialCoupoun.coupoun !== "" && useCoupoun === "true") {
              const priceSubstract = (currPrice * priceCoupoun) / 100
              priceAfter = currPrice - priceSubstract
              priceAfterDiscount = priceAfter
            } else if(coupounType === "price" && initialCoupoun.coupoun !== "" && useCoupoun === "true") {
              if(currPrice < priceCoupoun) {
                validateMessage = "Potongan kupon tidak boleh lebih dari harga course"
              } else {
                const priceSubtstract = currPrice - priceCoupoun
                priceAfter = priceSubtstract
                priceAfterDiscount = priceAfter
              }
            }
          }
        })
      }
      

    async function fetchDetailCourse() {
      setLoading(true)
        try {
            const courseRef = doc(db, "courses", params.courseId)
            const docSnap = await getDoc(courseRef)
            if(docSnap.exists()) {
                setDetailCourse(docSnap.data() as courses)
                setPrice(docSnap.data().price)
                setDate(docSnap.data().date)
                setStartCourse(docSnap.data().startCourse)
                setEndCourse(docSnap.data().endCourse)
                setUseCoupoun(docSnap.data().coupounBoolean.toString())
                setInitialCoupoun(docSnap.data().payloadCoupoun)
            }
        } catch (error) {
            if(error instanceof Error) return console.log(error.message)
            
        } finally {
            setLoading(false)
        }
    }


      const split = startCourse.split(":")
      const startHours = parseInt(split[0])
      const endHours = parseInt(split[1])

      const splitEnd = endCourse.split(":")
      const startEndHours = parseInt(splitEnd[0])
      const SplitEndHours = parseInt(splitEnd[1])
      
      let message;

      if(startEndHours < startHours ) {
        message = "Tolong set waktu dengan benar"
      } else if (startHours === startEndHours && SplitEndHours < endHours) {
        message = "Tolong set waktu dengan benar"
      } else {
        message = ""
      }

      

    

      async function fetchDataCoupouns() {
        setLoading(true)
        try {
          const coupounref = collection(db, "coupouns")
          const q = query(coupounref, where("uid", "==", auth.currentUser?.uid))
          const querySnap = await getDocs(q)
          const listingsCoupouns: coupounsProps[] = []
          querySnap.forEach((doc) => {
            return listingsCoupouns.push({
              id: doc.id,
              data: doc.data()
            })
          })
          setavailCoupoun(listingsCoupouns)
        } catch(error) {
          if(error instanceof Error) return console.log(error.message) 
          
        }
      }

      

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if(user) {
                const uid = user.uid
                setUid(uid)                
                fetchDetailCourse()
                fetchDataCoupouns()
            }   
        })
    }, [])


    // function handleSelectCoupoun(e:React.ChangeEvent<HTMLSelectElement>) {
    //   const target = e.target.value
    //   setChoosenCoupoun(target)
    // }
    

    function handleChangeInput(e:any) {
      const {name, value} = e.target

      setDetailCourse((prev) => ({
        ...prev,
        [name] : value
      }))
    }

    if(loading) {
       return <Spinner />
    }

    function handleSelectCoupoun(e:React.ChangeEvent<HTMLSelectElement>) {
      let payloadCoupoun = {}
      const target = e.target.value

      if(target !== "") {
        availCoupoun.forEach((data) => {
          if(target === data.data.coupoun) {
            payloadCoupoun = data.data
          }
        })
      }
      setInitialCoupoun(payloadCoupoun)
    }

    console.log(Object.keys(initialCoupoun).length)
   
    
    async function submitUpdateCourse(e:React.FormEvent) {
      e.preventDefault()
      setLoading(true)
      try {
        const docUpdate = doc(db, "courses", params.courseId)
        const copyData = {
          ...detailCourse,
          startCourse,
          endCourse,
          priceAfterDisc,
          date,
          payloadCoupoun: initialCoupoun,
          coupounBoolean,
          imageCover : uploadedImage, 
          createdTime: serverTimestamp(), 
        }

        copyData.priceAfterDisc = priceAfterDiscount  

        if(Object.keys(initialCoupoun).length === 0 || !coupounBoolean) {
          copyData.payloadCoupoun = {}
          copyData.priceAfterDisc = 0
        }

        if(uploadedImage === "") {
          delete copyData.imageCover
          delete copyData.uploadedImage
        }

        await updateDoc(docUpdate, copyData)
        MySwal.fire({
        title: "Uploaded Course",
        text: "Course Submitted",
        showCancelButton:false
        })
        navigate("/editProfile/course")
      } catch (error) {
          if(error instanceof Error) {
            
            MySwal.fire({
              title: "Failed Submitted",
              text: error.message,
              showCancelButton: false
            })
          }
         
      } finally {
        setLoading(false)
      } 
    }

    
   


  return (
    <div className="flex flex-col items-center w-full min-h-screen my-16 bg-white">
          <h3 className="text-lg font-bold text-center">Edit Course</h3>
          <form className="w-full" onSubmit={storeImage}>
          <div
            className="mx-auto mt-10 bg-center bg-no-repeat bg-auto rounded-2xl"
            style={header}
          ></div>
          <p className="max-w-xs mx-auto text-center truncate sm:max-w-xs md:max-w-lg lg:max-w-lg xl:max-w-xl 2xl:max-w-xl">{detailCourse.imageCover}</p>
          <div className={`flex justify-center py-5 mx-auto`}>
                {!uploadedImage && <progress className={`w-80 progress`} value={progressPercent} max="100"></progress>}
                </div>
                <div className="flex h-[4rem] w-10/12 sm:w-10/12 md:w-6/12 lg:w-6/12 xl:w-6/12 2xl:w-6/12 flex-row mx-auto">
                  <div className="flex items-center justify-center w-10/12 ">
                  <input type="file" className="w-full file-input file-input-bordered" />
                  </div>
                  <div className="flex items-center justify-center w-2/12 text-2xl ">
                  <button  type="submit">
                    <FaUpload />
                </button>
                  </div>
                </div>
            </form>
          <form className="w-full" onSubmit={submitUpdateCourse}>
         
          <div className="flex flex-col items-center w-full gap-3 pt-5 ">
          <input type="text" name="judul"  
            
            value={detailCourse.judul} 
             onChange={handleChangeInput} 
             placeholder="Judul Course" 
             className="w-10/12 p-2 border-2 rounded-lg md:w-6/12 lg:w-6/12 xl:w-6/12 2xl:w-6/12 sm:w-10/12 border-slate-500" 
             required />
              <select name="levelCourse" value={detailCourse.levelCourse} onChange={handleChangeInput}  className="w-10/12 p-2 bg-white border-2 rounded-lg md:w-6/12 lg:w-6/12 xl:w-6/12 2xl:w-6/12 sm:w-10/12 border-slate-500" required>
               <option value="">Pilih Level Course</option>
               <option value="beginner">Beginner</option>
               <option value="intermediate">Intermediate</option>
               <option value="expert">Expert</option>
             </select>
             <textarea name="description" value={detailCourse.description}  onChange={handleChangeInput} placeholder="Deskripsi Course" className="w-10/12 p-2 bg-white border-2 rounded-lg md:w-6/12 lg:w-6/12 xl:w-6/12 2xl:w-6/12 sm:w-10/12 h-[10rem] border-slate-500" required></textarea>
             <textarea name="requirement" value={detailCourse.requirement} onChange={handleChangeInput} placeholder="Requirement" className="w-10/12 p-2 bg-white border-2 rounded-lg md:w-6/12 lg:w-6/12 xl:w-6/12 2xl:w-6/12 sm:w-10/12 h-[10rem] border-slate-500" required></textarea>
             <textarea name="whatlearn" value={detailCourse.whatlearn} onChange={handleChangeInput} placeholder="Apa yang akan dipelajari" className="w-10/12 p-2 bg-white border-2 rounded-lg md:w-6/12 lg:w-6/12 xl:w-6/12 2xl:w-6/12 sm:w-10/12 h-[10rem] border-slate-500" required></textarea>
             <textarea name="forwho" value={detailCourse.forwho} onChange={handleChangeInput} placeholder="Untuk siapa kursus ini" className="w-10/12 p-2 bg-white border-2 rounded-lg md:w-6/12 lg:w-6/12 xl:w-6/12 2xl:w-6/12 sm:w-10/12 h-[10rem] border-slate-500" required></textarea>
             <select value={detailCourse.language} onChange={handleChangeInput} className="w-10/12 p-2 bg-white border-2 rounded-lg md:w-6/12 lg:w-6/12 xl:w-6/12 2xl:w-6/12 sm:w-10/12 border-slate-500" name="language" required>
               <option value="">Pilih Bahasa</option>
               <option value="indonesia">Bahasa Indonesia</option>
               <option value="inggris">Bahasa Inggris</option>
             </select>
             <div className="flex flex-row w-10/12 gap-3 sm:w-10/12 md:w-6/12 lg:w-6/12 xl:w-6/12 2xl:w-6/12">
             <input value="RP" disabled className="w-2/12 font-semibold text-center text-white border-2 border-none rounded-lg disabled:bg-slate-400"/>
             
            <input type="number" value={price}  onChange={(e:React.ChangeEvent<HTMLInputElement>) => setPrice(e.target.value)} className="w-full p-2 border-2 rounded-lg border-slate-500"/>
            
             </div>
              {validateMessage === "Potongan kupon tidak boleh lebih dari harga course" ? (
                <div role="alert" className="w-10/12 p-4 alert alert-warning sm:w-10/12 md:w-6/12 lg:w-6/12 xl:w-6/12 2xl:w-6/12">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 stroke-current shrink-0" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                <span>{validateMessage}</span>
              </div>
              ) : (
                <p className="w-10/12 p-4 sm:w-10/12 md:w-6/12 lg:w-6/12 xl:w-6/12 2xl:w-6/12 bg-base-200">Price After Discount :  {priceAfterDiscount}</p>
              )}
              
          
             
             <div className="flex flex-col w-10/12 gap-2 sm:w-10/12 md:w-6/12 lg:w-6/12 xl:w-6/12 2xl:w-6/12 ">
               <h1 className="font-semibold text-black">Tanggal Kursus</h1>
               <input
      type="date"
      value={date}
      onChange={(e:React.ChangeEvent<HTMLInputElement>) => setDate(e.target.value)}
      className="w-full p-2 border-2 rounded-lg border-slate-500"
    />
         
             </div>
             <div className="flex flex-col w-10/12 gap-3 sm:w-10/12 md:w-6/12 lg:w-6/12 xl:w-6/12 2xl:w-6/12 ">
               <h1 className="font-semibold text-black">Durasi Course</h1>
               <div className="flex flex-row w-full gap-2 py-2">
                <div className="flex flex-col items-center flex-1 gap-2">
                  <label className="font-semibold">Start</label>
                  <input value={startCourse} type="time" onChange={(e:React.ChangeEvent<HTMLInputElement>) => setStartCourse(e.target.value)} className="px-6 py-2 border-2 border-black rounded-md"/>
                </div>
                <div className="flex flex-col items-center flex-1 gap-2">
                  <label  className="font-semibold">End</label>
                  <input value={endCourse} type="time" onChange={(e:React.ChangeEvent<HTMLInputElement>) => setEndCourse(e.target.value)} className="px-6 py-2 border-2 border-black rounded-md"/>
                </div>
               </div>
               {message !== "" ? (
                <div role="alert" className="alert alert-error">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 stroke-current shrink-0" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>{message}</span>
              </div>
               ): null}
               
              
             </div>
             <div className="flex flex-col w-10/12 gap-3 sm:w-10/12 md:w-6/12 lg:w-6/12 xl:w-6/12 2xl:w-6/12 ">
               <div className="px-4">
                 <h1>Using Coupoun?</h1>
               </div>
               <div className="flex flex-row justify-between gap-5 px-4">
                 <Button label="Yes" id="btn-coupoun" value="true" onClick={(e:any) => {
                  e.preventDefault()
                  setUseCoupoun("true")
                 }} className={`px-12 py-2  ${useCoupoun === "true" ? "bg-blue-700 text-white" : "bg-white shadow-lg text-black"} rounded-lg`} />
                 <Button label="No" onClick={(e:any) => {
                  e.preventDefault()
                  setUseCoupoun("false")
                 }} id="btn-coupoun" value="false"  className={`px-12 py-2  ${useCoupoun === "false" ? "bg-blue-700 text-white" : "bg-white shadow-lg text-black"} rounded-lg`} />
               </div>
               
               {useCoupoun === "true" && availCoupoun.length > 0 ? (
                   <select value={initialCoupoun.coupoun} onChange={handleSelectCoupoun} className="p-2 my-2 rounded-lg bg-slate-100">
                     <option>Pilih Kupon</option>
                     {availCoupoun?.map((data) => {
                      return (
                        <option
                        key={data.id}
                        value={data.data.coupoun}
                        >
                          {data.data.coupoun}
                        </option>
                      )
                     })}
                   </select>
                 ) : useCoupoun === "true" && availCoupoun.length === 0 ? (
                  <div role="alert" className="alert alert-warning">
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 stroke-current shrink-0" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
  <span>Belum ada Kupon</span>
</div>
                 ) : null}
             </div>
             <Button label="Update Course" id="btn-create" type="submit" className="w-10/12 gap-3 p-3 text-white transition duration-150 ease-in-out bg-blue-700 rounded-lg disabled:cursor-not-allowed disabled:bg-slate-400 sm:w-10/12 md:w-6/12 lg:w-6/12 xl:w-6/12 2xl:w-6/12 hover:bg-blue-500 hover:shadow-xl" disabled={validateMessage === "Potongan kupon tidak boleh lebih dari harga course" || message === "Tolong set waktu dengan benar" ? true : false}/> 
          </div>
          </form>
    
   
    </div>
  )
}

export default CourseDetail