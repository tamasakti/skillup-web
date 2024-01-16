import {  useEffect, useState } from "react"
import defaultImg from "../../assets/bg/bg-banner.webp"
import Input from "../../components/Input"
import Button from "../../components/Button"
import withReactContent from "sweetalert2-react-content"
import Swal from "../../utils/types/Swal"
import { auth, db, storage } from "../../config/firebase"

import { addDoc, collection, deleteDoc, doc, getDocs, query, serverTimestamp, where } from "firebase/firestore"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { useLocation, useNavigate } from "react-router"
import { onAuthStateChanged } from "firebase/auth"

import Spinner from "../../components/Spinner"
import CourseCard from "./courseCard"
import { useDispatch } from "react-redux"
import { coupouns } from "../../utils/redux/slice/CoupounsSlice"

interface courseProps {
  judul : string,
  price: number,
  date: string,
  coupoun? : string,
  coupounId?:string
}

// interface coupounProps {
//   coupoun : string,
//   coupounPrice: number,
// }

const Course = () => {
    const MySwal = withReactContent(Swal)
    const [uploadedImage, setUploadedImage] = useState<string>("")
    const [useCoupoun, setUseCoupoun] = useState<string>("false")
    const [levelCourse, setLevelCourse] = useState<string>("")
    const [language, setLanguage] = useState<string>("")
    const [currencyType, setCurrencyType] = useState<string>("")
    const [startCourse, setStartCourse] = useState<string>("")
    const [endCourse, setEndCourse] = useState<string>("")
    const [courseLists, setCourseLists] = useState([])
    const [coupounLists, setCoupounLists] = useState([])
    const navigate = useNavigate()
    const [choosenCoupoun, setChoosenCoupoun] = useState<string>("")
    const dispatch = useDispatch()

    let coupounBoolean:boolean;

    if(useCoupoun === "true") {
      coupounBoolean = true
    } else {
      coupounBoolean = false
    }

    
    const [courseTextArea, setCourseTextArea] = useState({
      description: "",  
      requirement: "",
      whatlearn : "",
      forwho: "",
    })

   
    // } 


    const [courseData, setCourseData] = useState<courseProps>({
      judul : "",
      price: 0,
      date: "",
      coupoun : "",
      coupounId:""
    })

    

    const backgroundImage = {
        width: "50%",
        height: "15rem",
        backgroundImage : `url(${uploadedImage === "" ? defaultImg : uploadedImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        
        margin: "0 auto",
        borderRadius: "20px",
        marginTop: "1rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }

    
    function handleChangeCourse(e:React.ChangeEvent<HTMLInputElement>) {
      const {name, value } = e.target
  
      setCourseData(prev => ({
        ...prev,
        [name] : value
      }))
   
    }

    

    function handleChangeTextArea(e:React.ChangeEvent<HTMLTextAreaElement>) {
      const {name, value} = e.target

      setCourseTextArea((prev) => ({
        ...prev,
        [name] : value
      }))
    }

    const [progressPercent, setProgressPercent] = useState<number>(0)

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

    
   

    async function submitCourse() {
      try {
        const copyData = {
          ...courseData,
          uploadedImage,
          levelCourse,
          ...courseTextArea,
          language,
          currencyType,
          startCourse,
          endCourse,
          coupounBoolean,
          imageCover : uploadedImage, 
          createdBy: auth.currentUser?.email,
          uid: auth.currentUser?.uid,
          createdTime: serverTimestamp(), 
        }
        if(!coupounBoolean) {
          delete copyData.coupoun
          delete copyData.coupounId
        }  
        const docRef = await addDoc(collection(db, "courses"),copyData)
        MySwal.fire({
          title: "Uploaded Course",
          text: "Course Submitted",
          showCancelButton:false
        })
        navigate(`course/${docRef.id}`)
      } catch (error:any) {
          MySwal.fire({
            title: "Failed Submitted",
            text: error.message,
            showCancelButton: false
          })
      } 
    }

    const location = useLocation()
    


    const [loading, setLoading] = useState<boolean>(false)


    async function fetchDataCourse() {
      try {
        setLoading(true)
        const listsRef = collection(db, "courses")
      const q = query(listsRef, where("uid", "==", auth.currentUser?.uid))
      const querySnap = await getDocs(q)
      const listingCourse = []
      querySnap.forEach((doc) => {
        return listingCourse.push({
          id:doc.id,
          data:doc.data()
        })
      })
      setCourseLists(listingCourse)
      } catch(error:any) {
        console.log(error.message)
      } finally {
        setLoading(false)
      }
      
    }

    async function fetchDataCoupouns() {
      try {
        setLoading(true)
        const listCoupounsRef = collection(db, "coupouns")
        const q = query(listCoupounsRef, where("uid", "==", auth.currentUser?.uid))
        const querySnap = await getDocs(q)
        const listCoupouns = []
        querySnap.forEach((doc) => {
           return listCoupouns.push({
            id: doc.id,
            data: doc.data()
          })
          
        })
        dispatch(coupouns(listCoupouns))
        setCoupounLists(listCoupouns)
      } catch(err:any) {
        console.error(err.message)
      } finally {
        setLoading(false)
      }
    }
    
    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        if(user) {
          fetchDataCourse()
          fetchDataCoupouns()
        }
      })
    }, [])

    

    async function handleEditCourse(id:string) {
      navigate(`${id}`)
    }

    async function handleDeleteCourse(id:string) {
      if(window.confirm("Are you sure want to delete")) {
        await deleteDoc(doc(db, "courses", id))
        const updatedListCourse = courseLists.filter((data:any) => data.id !== id)
        setCourseLists(updatedListCourse)
        MySwal.fire({
          title:"Deleted Course",
          text: "Course Deleted",
          showCancelButton:false
        })
      }
    }
    

    const {judul, price, date} = courseData

    const {description, requirement,whatlearn,forwho} = courseTextArea

    function handleValidateDiscount(e:React.ChangeEvent<HTMLSelectElement>) {
      const target = e.target.value
      setChoosenCoupoun(target)
  
    }
    
    

    let priceAfterDisc;
    let validateMessage;

      if(choosenCoupoun !== "") {
        
        coupounLists.forEach((item) => {
          if(item.data.coupoun === choosenCoupoun) {
            const data = item.data
            const coupounType = data.discountTypeCreate
            const priceCoupoun = +data.coupounPrice
            const currPrice = +price
            let priceAfter;
  
            if(coupounType === "%" && choosenCoupoun !== "" && useCoupoun === "true") {
              const priceSubstract = (currPrice * priceCoupoun) / 100
              priceAfter = currPrice - priceSubstract 
              priceAfterDisc = priceAfter
            } else if(coupounType === "price" && choosenCoupoun !== "" && useCoupoun === "true") {
              if(currPrice < priceCoupoun) {
                validateMessage = "Potongan kupon tidak boleh lebih dari harga course"
              } else {
                const priceSubstract = currPrice - priceCoupoun
                priceAfter = priceSubstract
                priceAfterDisc =priceAfter 
              }
            } else {
              priceAfter = 0
              setChoosenCoupoun("")
        setUseCoupoun("false")
        priceAfterDisc = 0
        validateMessage = ""
            }
          }
        })
      } 
      
      
  

    const role = JSON.parse(localStorage.getItem("role") || "")


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

  return (
    <div className='flex flex-col w-full min-h-screen mx-auto'>
        {role === "teacher" ? (
           <div className="flex justify-between w-10/12 px-3 mx-auto">
           <button className="btn" onClick={()=>document.getElementById('my_modal_4').showModal()}>Create Course</button>
   <dialog id="my_modal_4" className="modal">
     <div className="w-11/12 max-w-5xl modal-box">
       <h3 className="text-lg font-bold text-center">Upload New Course</h3>
           <div style={backgroundImage}>
                {!uploadedImage ? <p className="text-white">No File Attached</p> : null}  
           </div>
           <div>
            
           
              <form onSubmit={storeImage}>
                <div className={`flex justify-center py-5 mx-auto`}>
                {!uploadedImage && <progress className={`w-56 progress`} value={progressPercent} max="100"></progress>}
                </div>
               <Input 
               label=""
               name="input-bg"
               id="input-img"
               htmlFor="input-img"
                type="file"
               className="w-full max-w-xs mx-auto file-input file-input-bordered"

               />
                <div className="flex justify-center w-full py-2">
               <button type="submit" className="p-2 mx-auto text-white bg-blue-600 rounded-lg">Upload Image</button>
               </div>
               </form>
              
           </div>
           <div className="flex flex-col items-center justify-center w-full gap-5 py-5">
             <input type="text" name="judul" value={judul} onChange={handleChangeCourse} placeholder="Judul Course" className="w-6/12 p-2 border-2 rounded-lg border-slate-500" required />
             <select name="levelCourse" onChange={(e:React.ChangeEvent<HTMLSelectElement>) => setLevelCourse(e.target.value)} className="w-6/12 p-2 bg-white border-2 rounded-lg border-slate-500" required>
               <option value="">Pilih Level Course</option>
               <option value="beginner">Beginner</option>
               <option value="intermediate">Intermediate</option>
               <option value="expert">Expert</option>
             </select>
             <textarea name="description" value={description} onChange={handleChangeTextArea} placeholder="Deskripsi Course" className="w-6/12 p-2 border-2 rounded-lg border-slate-500" required></textarea>
             <textarea name="requirement" value={requirement} onChange={handleChangeTextArea} placeholder="Requirement" className="w-6/12 p-2 border-2 rounded-lg border-slate-500" required></textarea>
             <textarea name="whatlearn" value={whatlearn} onChange={handleChangeTextArea} placeholder="Apa yang akan dipelajari" className="w-6/12 p-2 border-2 rounded-lg border-slate-500" required></textarea>
             <textarea name="forwho" value={forwho} onChange={handleChangeTextArea} placeholder="Untuk siapa kursus ini" className="w-6/12 p-2 border-2 rounded-lg border-slate-500" required></textarea>
             <select onChange={(e:React.ChangeEvent<HTMLSelectElement>) => setLanguage(e.target.value)} className="w-6/12 p-2 bg-white border-2 rounded-lg border-slate-500" required>
               <option value="">Pilih Bahasa</option>
               <option value="indonesia">Bahasa Indonesia</option>
               <option value="inggris">Bahasa Inggris</option>
             </select>
             <div className="flex flex-row w-6/12 gap-3">
             <select onChange={(e:React.ChangeEvent<HTMLSelectElement>) => setCurrencyType(e.target.value)} className="w-2/12 p-3 rounded-lg bg-slate-100" required>
               <option>Pilih Currency</option>
               <option>RP</option>
               <option>USD</option>
             </select>
             
             <input type="number" name="price" value={price} maxLength={12} onChange={handleChangeCourse} placeholder="Harga Course" className="w-full p-2 border-2 rounded-lg border-slate-500" required/>
            
             </div>
             {choosenCoupoun !== "Pilih Kupon" && validateMessage !== "" && useCoupoun !== "false"  ?  <p className="w-6/12 p-4 bg-base-200">Price After Discount : {currencyType} {priceAfterDisc}</p> : null}
             <div className="flex flex-col w-6/12 gap-2 ">
               <h1 className="font-semibold text-black">Tanggal Kursus</h1>
               <input type="date" name="date" value={date} onChange={handleChangeCourse} className="p-2 font-semibold rounded-lg shadow-lg bg-slate-100" required/>
             </div>
             <div className="flex flex-col w-6/12 gap-2 ">
               <h1 className="font-semibold text-black">Durasi Course</h1>
               <div className="flex flex-row w-full gap-2 py-2 ">
                <div className="flex flex-col items-center flex-1 gap-2">
                  <label className="font-semibold">Start</label>
                  <input type="time" onChange={(e:React.ChangeEvent<HTMLInputElement>) => setStartCourse(e.target.value)} className="px-6 py-2 border-2 border-black rounded-md"/>
                </div>
                <div className="flex flex-col items-center flex-1 gap-2">
                  <label  className="font-semibold">End</label>
                  <input type="time" onChange={(e:React.ChangeEvent<HTMLInputElement>) => setEndCourse(e.target.value)} className="px-6 py-2 border-2 border-black rounded-md"/>
                </div>
               </div>
               {message !== "" ? (
                <div role="alert" className="alert alert-error">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 stroke-current shrink-0" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>{message}</span>
              </div>
               ): null}
               
              
             </div>
             <div className="flex flex-col w-6/12 gap-3">
               <div className="px-4">
                 <h1>Using Coupoun?</h1>
               </div>
               <div className="flex flex-row justify-between gap-5 px-4">
                 <Button label="Yes" id="btn-coupoun" value="true" className={`px-12 py-2  ${useCoupoun === "true" ? "bg-blue-700 text-white" : "bg-white shadow-lg text-black"} rounded-lg`} onClick={() => setUseCoupoun("true")}/>
                 <Button label="No" id="btn-coupoun" value="false" className={`px-12 py-2  ${useCoupoun === "false" ? "bg-blue-700 text-white" : "bg-white shadow-lg text-black"} rounded-lg`} onClick={() => setUseCoupoun("false")}/>
               </div>
               
               {useCoupoun === "true" && coupounLists.length > 0 ? (
                <>
                   <select onChange={handleValidateDiscount} className="p-2 my-2 rounded-lg bg-slate-100">
                    <option>Pilih Kupon</option>
                     {coupounLists?.map((data, index) => {
                      return (
                        <option key={index} value={data.data.coupoun}>{data.data.coupoun}</option>
                      )
                     })}
                   </select>
                   
                   {validateMessage === "Potongan kupon tidak boleh lebih dari harga course" ? (
                   <div role="alert" className="alert alert-warning">
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 stroke-current shrink-0" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
  <span>{validateMessage}</span>
</div>) : null}
                   </>
                 ) : useCoupoun === "true" && coupounLists.length < 1 ? (
                  <div role="alert" className="alert alert-warning">
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 stroke-current shrink-0" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
  <span>Belum ada Kupon</span>
</div>
                 ) : null}
              
             </div>
             <Button label="Create Course" id="btn-create" className="w-6/12 p-3 text-white transition duration-150 ease-in-out bg-blue-700 rounded-lg hover:bg-blue-500 hover:shadow-xl" onClick={submitCourse}/>
             
             
           </div>
           
       <div className="modal-action">
         <form method="dialog">
           {/* if there is a button, it will close the modal */}
           <button className="btn">Close</button>
         </form>
       </div>
     </div>
   </dialog>
   
   
   
           </div>
        ) : null}
        <div>
            {loading ? <Spinner /> : courseLists.length < 1 ?  <div className="flex items-center justify-center w-4/12 min-h-screen mx-auto"><div role="alert" className="alert alert-warning">
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 stroke-current shrink-0" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
  <span>Anda belum Membuat Course</span>
</div></div>: (
              <div className="grid w-10/12 grid-cols-1 mx-auto sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3">
              
                {courseLists?.map((data) => {
                  return (
                    <CourseCard 
                    key={data.id}
                    image={data.data.imageCover}
                    judul={data.data.judul}
                    createdBy={data.data.createdBy}
                    price={data.data.price}
                    description={data.data.description}
                    levelCourse={data.data.levelCourse}
                    onEdit={() => handleEditCourse(data.id)}
                    onDelete={() => handleDeleteCourse(data.id)}
                    />
                  )
                  
                })}
              </div>
            )}
        </div>
    </div>
  )
}

export default Course