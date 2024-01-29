import React from 'react'

import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth"
import defaultPhoto from "../../assets/user.webp"
import Button from "../../components/Button"
import Input, { InputCustom } from "../../components/Input"

import { db, storage } from "../../config/firebase"
import {collection, query, where, getDocs, doc, updateDoc, serverTimestamp } from "firebase/firestore"
import {  useEffect, useState } from "react"
import withReactContent from "sweetalert2-react-content"
import Swal from "../../utils/types/Swal"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import Spinner from "../../components/Spinner"
import { useNavigate } from "react-router"


  
interface profilProps {
  id? : string,
  uid? : string,
  email? : string,
  firstName : string,
  username: string,
  lastName : string,
  password? : string,
  role? : string,
  instagram? :string,
  twitter? : string,
  linkedin? : string,
  facebook?: string, 
  imgUrl? : string,
  imageCover: string,
  phone: string,
  aboutme:string,
}
const EditProfileStudent = () => {
    const auth = getAuth()
  const MySwal = withReactContent(Swal)
  const [image, setImage] = useState<string>("")
 
  const [uid, setUid] = useState<string>("")
  const [updatedImage, setUpdatedImage] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(true)
  const [dataUpdated, setDataUpdated] = useState<profilProps> ({
    email : "",
    firstName : "",
    lastName : "",
    instagram :"",
    username: "",
    twitter : "",
    linkedin : "",
    facebook: "", 
    imageCover : "",
    phone : "",
    aboutme: "",
  })

  const [aboutme, setAboutme] = useState<string>("")


 
  const {
    email,
    firstName,
    lastName,
    instagram,
    username,
    twitter,
    linkedin,
    facebook,
    phone,
    imageCover
  } = dataUpdated



  function handleChangeInput(e:React.ChangeEvent<HTMLInputElement>) {
    const {name, value } = e.target

    setDataUpdated(prev => ({
      ...prev,
      [name] : value
    }))
   
  }

  const [idDoc, setIdDoc] = useState<string>("")

  async function fetchDataUser(uid:string) {
    try {
      setLoading(true)
      const userRef = collection(db, "users")
      const q = query(userRef, where("uid", "==", uid));
      const querySnap = await getDocs(q)
      if(querySnap) {
        querySnap.forEach((doc) => {
          setIdDoc(doc.id)
          setDataUpdated(doc.data() as profilProps)
          setAboutme(doc.data().aboutme)
          setImage(doc.data().imageCover)
        })
      }
      
    }  catch (error) {
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
      setUid(uid)
      console.log(user)
    }
   })
  }, [auth])

  const [progressPercent, setProgressPercent] = useState<number>(0)

  async function uploadImage(e:any) {
    e.preventDefault()
    const file = e.target[0]?.files[0]
    if(!file) return;
    const imageRefs = ref(storage, `files/${file.name}-${auth.currentUser?.uid}`)
    const uploadTask = uploadBytesResumable(imageRefs, file)

    uploadTask.on("state_chaged", 
    (snapshot) => {
      const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
      setProgressPercent(progress)
     
    },
    (error) => {
      alert(error)
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref)
      .then((downloadURL:string) => {
        setUpdatedImage(downloadURL)
      })
    })
  }

  const navigate= useNavigate()

  async function handleSubmitUpdate (e:React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const postDoc = doc(db, "users", idDoc)
      const formDataCopy = {
        ...dataUpdated,
        aboutme,
        imageCover: updatedImage,
        createdAt: serverTimestamp()
      }
      await updateDoc(postDoc, formDataCopy)
      MySwal.fire({ 
        title: "Success",
        text : "Data Profile Updated",
        showCancelButton: false
      })
      const auth = getAuth()
      await updateProfile(auth.currentUser, {
        photoURL: updatedImage,
        phoneNumber: phone
      }).then(() => {
        console.log("Profile Updated")
      }).catch((error) => {
        if(error instanceof Error) return console.log(error.message)
      })
      navigate("/profile")
    } catch(error) {
      if(error instanceof Error) {
        MySwal.fire({
          title: 'Failed',
          text : error.message,
          showCancelButton: false
        })
      }
    }
    navigate("/profile")
  }

    if(loading) {
      return <Spinner />
    }


  return (
    <div className='flex flex-col items-center justify-center w-full min-h-screen mx-auto'>
    <div className="grid w-11/12 grid-cols-1 py-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
    <div className="flex flex-col items-center gap-5 -mt-14 lg:mt-0 xl:mt-0 md:mt-0 sm:-mt-14">
      <form onSubmit={uploadImage}>
      <img src={`${!imageCover ? defaultPhoto : imageCover}`} className="w-6/12 mx-auto rounded-full mt-7 sm:mt-7 md:mt-0 lg:mt-0 xl:mt-0 2xl:mt-0"/>
        <div className={`flex justify-center py-5 mx-auto`}>
          {!updatedImage && <progress className={`w-56 progress`} value={progressPercent} max="100"></progress>}
        </div>
        <Input id="input-img" label="" name="image" type="file" className="w-8/12 p-2 mx-auto border-2 md:w-5/12 lg:w-5/12 xl:w-5/12 2xl:w-5/12 sm:w-8/12 border-slate-400 text-slate-400 rounded-xl"
        />
        
    <div className="flex flex-col justify-center gap-4 mt-5">
    <Button label="Change Image" id="btn-upload" className="p-3 px-20 mx-auto text-white bg-black rounded-xl" type="submit"/>
   
    </div>
    </form>
    </div>
    <div className="flex flex-col w-10/12 gap-3 mx-auto mt-10 sm:mt-10 md:mt-0 lg:mt-0 xl:mt-0 2xl:mt-0">
    <form onSubmit={handleSubmitUpdate}>
      <h1 className="pb-6 text-xl font-bold">Edit Profile Section</h1>
      <div className="flex flex-col gap-3">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 sm:grid-cols-1">
        <div className="flex flex-col gap-2">
          <label>First Name</label>
          <InputCustom id="firstName" placeholder="FirstName" name="firstName" type="text" className="p-2 border-2 rounded-lg border-slate-300"
          value={firstName}
       
          onChange={handleChangeInput}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label>Last Name</label>
          <InputCustom id="lastname" placeholder="Lastname" name="lastName" type="text"
          className="p-2 border-2 rounded-lg border-slate-300"
       
          value={lastName}
          onChange={handleChangeInput}
          />
        </div>
      </div>
      <Input id="input-email" label="Email" type="text" placeholder="Email" name="email" className="p-2 border-2 rounded-lg border-slate-300 bg-slate-200 text-slate-600" disabled 
      value={email} 
      />
      <Input id="input-username" label="Username" onChange={handleChangeInput} value={username} type="text" placeholder="Username" name="username" className="p-2 border-2 rounded-lg border-slate-300 text-slate-600" 
       
      />
      <div className="flex flex-col gap-2">
          <label>About me</label>
          <textarea id="aboutme" placeholder="About Me" name="aboutme" 
          className="p-2 border-2 rounded-lg border-slate-300"
          value={aboutme}
          onChange={(e:React.ChangeEvent<HTMLTextAreaElement>) => setAboutme(e.target.value)}
          ></textarea>
        </div>
      <Input id="input-phone" label="No. Telp" type="text" maxLength={12} placeholder="No.telp" name="phone" className="p-2 border-2 rounded-lg border-slate-300" 
    
      value={phone} 
      onChange={handleChangeInput}/>
      </div>
      <h1 className="py-4 text-xl font-bold ">Social Media</h1>
      <div className="flex flex-col gap-3">
      <Input id="input-instagram" label="Instagram Account" type="text" placeholder="" name="instagram" className="p-2 border-2 rounded-lg border-slate-300"
      value={instagram} 
      onChange={handleChangeInput}/>
      <Input id="input-twitter" label="Twitter Account" type="text" placeholder="" name="twitter" className="p-2 border-2 rounded-lg border-slate-300" 
      value={twitter} 
      onChange={handleChangeInput}/>
      <Input id="input-facebook" label="Facebook Account" type="text" placeholder="" name="facebook" className="p-2 border-2 rounded-lg border-slate-300" 
      value={facebook}
       
      onChange={handleChangeInput}/>
      <Input id="input-linkedin" label="Linkedin Account" type="text" placeholder="" name="linkedin" className="p-2 border-2 rounded-lg border-slate-300" 
   
      value={linkedin} 
      onChange={handleChangeInput}/>
      <Button id="btn-update" name="btn-update" label="Update" className="w-full p-3 mt-3 text-white bg-black rounded-lg hover:bg-blue-700" type="submit" />
      </div>
      </form>
    </div>
    
  </div>

  
  
</div>
  )
}

export default EditProfileStudent