import { onAuthStateChanged } from "firebase/auth"
import { useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router"
import { auth, db, storage } from "../../config/firebase"
import {addDoc, collection, doc, getDoc, serverTimestamp } from "firebase/firestore"
import Button from "../../components/Button"
import Input from "../../components/Input"
import withReactContent from "sweetalert2-react-content"
import Swal from "../../utils/types/Swal"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"

interface courseProps {
    judul : string,
    price: string,
    date: string,
    coupoun? : string,
    coupounId?:string
  }
  


const CourseDetail = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [detailCourse, setDetailCourse] = useState({})
    const [uid, setUid] = useState<string>("")
    const location = useLocation()
    const MySwal = withReactContent(Swal)
    const [uploadedImage, setUploadedImage] = useState<string>("")
    const [useCoupoun, setUseCoupoun] = useState<string>("false")
    const [levelCourse, setLevelCourse] = useState<string>("")
    const [language, setLanguage] = useState<string>("")
    const [currencyType, setCurrencyType] = useState<string>("")
    const [startCourse, setStartCourse] = useState<string>("")
    const [endCourse, setEndCourse] = useState<string>("")
    const [availCoupoun, setAvailCoupoun] = useState([])
    const [courseLists, setCourseLists] = useState([])
    const navigate = useNavigate()
    localStorage.setItem("rf._", JSON.stringify(location.pathname))
    const [courseTextArea, setCourseTextArea] = useState({
        description: "",  
        requirement: "",
        whatlearn : "",
        forwho: "",
      })
      const [courseData, setCourseData] = useState<courseProps>({
        judul : "",
        price: "",
        date: "",
        coupoun : "",
        coupounId:""
      })
  
      function handleChangeCourse(e:React.ChangeEvent<HTMLInputElement>) {
        const {name, value } = e.target
    
        setCourseData(prev => ({
          ...prev,
          [name] : value
        }))
        
      }
      const [progressPercent, setProgressPercent] = useState<number>(0)
    const params = useParams()
    const header = {
        width: "80%",
        height: "25rem",
        backgroundImage: `url(${detailCourse.imageCover})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      };

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
            availCoupoun, 
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
          navigate(`/detail/course/${docRef.id}`)
        } catch (error:any) {
            MySwal.fire({
              title: "Failed Submitted",
              text: error.message,
              showCancelButton: false
            })
        } 
      }
    
      const {judul, price, date} = courseData

    const {description, requirement,whatlearn,forwho} = courseTextArea

    async function fetchDetailCourse() {
        try {
            setLoading(true)
            const courseRef = doc(db, "courses", params.courseId)
            const docSnap = await getDoc(courseRef)
            if(docSnap.exists()) {
                setDetailCourse(docSnap.data())
            }
        } catch (error:any) {
            console.log(error.message)
        } finally {
            setLoading(false)
        }
    }

    function handleChangeTextArea(e:React.ChangeEvent<HTMLTextAreaElement>) {
        const {name, value} = e.target
  
        setCourseTextArea((prev) => ({
          ...prev,
          [name] : value
        }))
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


    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if(user) {
                const uid = user.uid
                setUid(uid)                
                fetchDetailCourse()
            }   
        })
    }, [])

    

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

                <div className="flex justify-center w-full">
                  <Button
                    id="loadMore"
                    label="Load More"
                    className="w-6/12 py-2 mt-8 font-semibold text-white bg-bg-button rounded-xl font-poppins hover:bg-red-600"
                  />
                </div>
              </div>
            </div>
            <div className="lg:w-[35%] w-full text-black flex justify-center sticky">
              <div className="card bg-card w-full h-[45rem] items-center">
                <div className="flex flex-row w-[85%] h-auto mt-32 lg:mt-5">
                  <div className="flex-1">
                    <p className="text-sm font-bold font-poppins">
                      Harga Kursus
                    </p>
                    {/* <p className="mt-2 text-sm font-bold font-poppins">Tax</p> */}
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
                    <p className="mt-2 text-sm font-bold font-poppins">{detailCourse.price}</p>
                  </div>
                </div>
                {/* <div className="w-11/12 py-5">
                <div className="shadow-xl card card-side bg-base-100 h-[12rem]">
  <figure><img src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg" alt="Movie" className="w-full h-full"/></figure>
  <div className="h-full p-4 card-body">
    <h2 className="card-title">New movie is released!</h2>
    <p>Click the button to watch on Jetflix app.</p>
    <div className="justify-start card-actions">
      <button className="btn btn-primary">Chat Mentor</button>
    </div>
  </div>
</div>
                </div> */}
                <div className="flex justify-start w-[85%]">
                  {uid ===  detailCourse.uid ? 
                    (
                        <div className="py-5">
                        {/* You can open the modal using document.getElementById('ID').showModal() method */}
<button className="btn" onClick={()=>document.getElementById('my_modal_4').showModal()}>Edit Kursus</button>
<dialog id="my_modal_4" className="modal">
     <div className="w-11/12 max-w-5xl modal-box">
       <h3 className="text-lg font-bold text-center">Edit Course</h3>
       <div
            className="mx-auto mt-10 bg-center bg-no-repeat bg-auto rounded-2xl"
            style={header}
          ></div>
          
           <div>
            
           
              <form onSubmit={storeImage}>
                <div className={`flex justify-center py-5 mx-auto`}>
                {/* {!uploadedImage && <progress className={`w-56 progress`} value={progressPercent} max="100"></progress>} */}
                </div>
               <Input 
               label=""
               name="input-bg"
               id="input-img"
               htmlFor="input-img"
                type="file"
               className="w-full max-w-xs mx-auto file-input file-input-bordered"

               />
                <div className="flex justify-center w-full py-4">
               <button type="submit" className="p-2 mx-auto text-white bg-blue-600 rounded-lg">Change Image</button>
               </div>
               </form>
              
           </div>
           <div className="flex flex-col items-center justify-center w-full gap-5 py-5">
             <input type="text" name="judul"  
            //  value={judul}
            defaultValue={detailCourse.judul} 
             onChange={handleChangeCourse} 
             placeholder="Judul Course" 
             className="w-6/12 p-2 border-2 rounded-lg border-slate-500" 
             required />
             <select name="levelCourse" defaultValue={detailCourse.levelCourse} onChange={(e:React.ChangeEvent<HTMLSelectElement>) => setLevelCourse(e.target.value)} className="w-6/12 p-2 bg-white border-2 rounded-lg border-slate-500" required>
               <option value="">Pilih Level Course</option>
               <option value="beginner">Beginner</option>
               <option value="intermediate">Intermediate</option>
               <option value="expert">Expert</option>
             </select>
             <textarea name="description" value={detailCourse.description}  onChange={handleChangeTextArea} placeholder="Deskripsi Course" className="w-6/12 p-2 border-2 rounded-lg border-slate-500" required></textarea>
             <textarea name="requirement" value={detailCourse.requirement} onChange={handleChangeTextArea} placeholder="Requirement" className="w-6/12 p-2 border-2 rounded-lg border-slate-500" required></textarea>
             <textarea name="whatlearn" value={detailCourse.whatlearn} onChange={handleChangeTextArea} placeholder="Apa yang akan dipelajari" className="w-6/12 p-2 border-2 rounded-lg border-slate-500" required></textarea>
             <textarea name="forwho" value={detailCourse.forwho} onChange={handleChangeTextArea} placeholder="Untuk siapa kursus ini" className="w-6/12 p-2 border-2 rounded-lg border-slate-500" required></textarea>
             <select defaultValue={detailCourse.language} onChange={(e:React.ChangeEvent<HTMLSelectElement>) => setLanguage(e.target.value)} className="w-6/12 p-2 bg-white border-2 rounded-lg border-slate-500" required>
               <option value="">Pilih Bahasa</option>
               <option value="indonesia">Bahasa Indonesia</option>
               <option value="inggris">Bahasa Inggris</option>
             </select>
             <div className="flex flex-row w-6/12 gap-3">
             <select defaultValue={detailCourse.currencyType} onChange={(e:React.ChangeEvent<HTMLSelectElement>) => setCurrencyType(e.target.value)} className="w-2/12 p-3 rounded-lg bg-slate-100" required>
               <option>Pilih Currency</option>
               <option>RP</option>
               <option>USD</option>
             </select>
             
            <input type="number" value={detailCourse.price}  onChange={handleChangeCourse} className="w-full p-2 border-2 rounded-lg border-slate-500"/>

             {/* <input type="text" name="price" value={price} defaultValue={detailCourse.price} maxLength={12} onChange={handleChangeCourse} placeholder="Harga Course" className="w-full p-2 border-2 rounded-lg border-slate-500" required/> */}
             </div>
             <div className="flex flex-col w-6/12 gap-2 ">
               <h1 className="font-semibold text-black">Tanggal Kursus</h1>
               <input
      type="date"
      defaultValue={detailCourse.date}
      className="p-2 border-2 rounded-lg border-slate-500"
    />
         
             </div>
             <div className="flex flex-col w-6/12 gap-2 ">
               <h1 className="font-semibold text-black">Durasi Course</h1>
               <div className="flex flex-row w-full gap-2 py-2">
                <div className="flex flex-col items-center flex-1 gap-2">
                  <label className="font-semibold">Start</label>
                  <input defaultValue={detailCourse.startCourse} type="time" onChange={(e:React.ChangeEvent<HTMLInputElement>) => setStartCourse(e.target.value)} className="px-6 py-2 border-2 border-black rounded-md"/>
                </div>
                <div className="flex flex-col items-center flex-1 gap-2">
                  <label  className="font-semibold">End</label>
                  <input defaultValue={detailCourse.endCourse} type="time" onChange={(e:React.ChangeEvent<HTMLInputElement>) => setEndCourse(e.target.value)} className="px-6 py-2 border-2 border-black rounded-md"/>
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
               
               {useCoupoun === "true" && availCoupoun.length > 0 ? (
                   <select className="p-2 my-2 rounded-lg bg-slate-100">
                     {/* {courseLists?.map((data, index) => {
                      return (
                        <option key={index} value={data.judul}>{data.judul}</option>
                      )
                     })} */}
                   </select>
                 ) : useCoupoun === "true" && availCoupoun.length === 0 ? (
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
                    )
                   : (
                    <div className="py-5">
                        <Button
                   id="btn-belikursus"
                   label="Beli Kursus"
                   className="px-16 py-2 mt-5 text-white bg-blue-700 border-none hover:bg-blue- btn"
                   // onClick={() => navigate(`/payment/${id}`)}
                 />
                    </div>
                   )}
                </div>
                <div>
                    
                </div>
              </div>
            </div>
          </div>
    </div>
  )
}

export default CourseDetail