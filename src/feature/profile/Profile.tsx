

import { getAuth, onAuthStateChanged } from "firebase/auth"
import defaultPhoto from "../../assets/user.webp"
import Button from "../../components/Button"
import Input, { InputCustom } from "../../components/Input"

import { db, storage } from "../../config/firebase"
import {collection, query, where, getDocs, doc, updateDoc, getDoc, serverTimestamp } from "firebase/firestore"
import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react"
import withReactContent from "sweetalert2-react-content"
import Swal from "../../utils/types/Swal"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import Spinner from "../../components/Spinner"


  
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
  phone: string
  
}

const Profile = () => {
  const auth = getAuth()
  const MySwal = withReactContent(Swal)
  const [image, setImage] = useState<string>("")
  const [profile, setProfile] = useState({})
  const [uid, setUid] = useState<string>("")
  const [progressPercent, setProgressPercent] = useState<number>(0)
  const [updatedImage, setUpdatedImage] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(true)
  const [dataUpdated, setDataUpdated] = useState<profilProps> ({
    email : "",
    firstName : "",
    lastName : "",
    instagram :"",
    twitter : "",
    linkedin : "",
    facebook: "", 
    imgUrl : updatedImage,
    phone : ""
  })
  function handleChangeInput(e:React.ChangeEvent<HTMLInputElement>) {
    const {name, value } = e.target

    setDataUpdated(prev => ({
      ...prev,
      [name] : value
    }))
  }


  async function fetchDataUser(uid:string) {
    try {
      setLoading(true)
      const userRef = collection(db, "users")
      const q = query(userRef, where("uid", "==", uid));
      const querySnap = await getDocs(q)
      if(querySnap) {
        querySnap.forEach((doc) => {
          setProfile(doc.data())
        })
      }
      
    }  catch (error:any) {
      console.log(error.message)
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
  }, [auth])

  

  async function uploadImage(e:any) {
    e.preventDefault()
    const file = e.target[0]?.files[0]
    if(!file) return;
    const imageRefs = ref(storage, `files/${file.name}`)
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
    }
    )
    const imageDoc = doc(db, "users", uid)
    await updateDoc(imageDoc, {
      imgUrl : updatedImage
    })
  }

  async function handleSubmitUpdate (e:React.FormEvent) {
    e.preventDefault()
    try {
      const postDoc = doc(db, "users", uid)
      const formDataCopy = {
        ...dataUpdated,
        timestamp: serverTimestamp()
      }
      await updateDoc(postDoc, formDataCopy)
      MySwal.fire({
        title: "Success",
        text : "Data Profile Updated",
        showCancelButton: false
      })
    } catch(error:any) {
      console.log(error)
      MySwal.fire({
        title: 'Failed',
        text : error.message,
        showCancelButton: false
      })
    }
  }


  return (
    <div className='flex items-center justify-center w-full min-h-screen mx-auto '>
      {loading ? <Spinner /> : (
        <div className="grid w-11/12 grid-cols-1 py-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
        <div className="flex flex-col items-center gap-5 -mt-14 lg:mt-0 xl:mt-0 md:mt-0 sm:-mt-14">
            <img src={`${image ? image : defaultPhoto}`} className="w-3/12"/>
            <Input id="input-img" label="" name="image" type="file" className="p-2 border-2 border-slate-400 text-slate-400 rounded-xl"
            onChange={(e:ChangeEvent<HTMLInputElement>) => {
              if(!e.currentTarget.files) {
                return;
              }
              setImage(URL.createObjectURL(e.currentTarget.files[0]))
            }}
            />
        <Button label="Upload Image" id="btn-upload" className="p-4 text-white bg-black rounded-xl" onClick={() => uploadImage}/>
        </div>
        <div className="flex flex-col w-10/12 gap-3 mx-auto">
        <form onSubmit={handleSubmitUpdate}>
          <h1 className="py-6 text-xl font-bold">Edit Profile Section</h1>
          <div className="grid grid-cols-2 gap-1">
            <div className="flex flex-col w-10/12 gap-2">
             
              <label>First Name</label>
              <InputCustom id="firstName" placeholder="FirstName" name="firstName" type="text" className="p-2 border-2 rounded-lg border-slate-300"
              defaultValue={profile?.firstName}
              onChange={handleChangeInput}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label>Last Name</label>
              <InputCustom id="firstName" placeholder="FirstName" name="firstName" type="text"
              className="p-2 border-2 rounded-lg border-slate-300"
              defaultValue={profile?.lastName}
              onChange={handleChangeInput}
              />
            </div>
          </div>
          <Input id="input-email" label="Email" type="text" placeholder="Email" name="email" className="p-2 border-2 rounded-lg border-slate-300 bg-slate-200 text-slate-600" disabled 
          defaultValue={profile?.email} 
          />
          <Input id="input-phone" label="No. Telp" type="text" maxLength={12} placeholder="No.telp" name="phone" className="p-2 border-2 rounded-lg border-slate-300" 
          defaultValue={profile?.phone} 
          onChange={handleChangeInput}/>
          <h1 className="py-4 text-xl font-bold ">Social Media</h1>
          <Input id="input-instagram" label="Instagram Account" type="text" placeholder="" name="instagram" className="p-2 border-2 rounded-lg border-slate-300" 
          defaultValue={profile?.instagram} 
          onChange={handleChangeInput}/>
          <Input id="input-twitter" label="Twitter Account" type="text" placeholder="" name="twitter" className="p-2 border-2 rounded-lg border-slate-300" 
          defaultValue={profile?.twitter} 
          onChange={handleChangeInput}/>
          <Input id="input-facebook" label="Facebook Account" type="text" placeholder="" name="facebook" className="p-2 border-2 rounded-lg border-slate-300" 
          defaultValue={profile?.facebook} 
          onChange={handleChangeInput}/>
          <Input id="input-linkedin" label="Linkedin Account" type="text" placeholder="" name="linkedin" className="p-2 border-2 rounded-lg border-slate-300" 
          defaultValue={profile?.linkedin} 
          onChange={handleChangeInput}/>
          <Button id="btn-update" name="btn-update" label="Update" className="p-2 text-white bg-black rounded-lg hover:bg-blue-700" type="submit" />
          
          </form>
        </div>
        
      </div>
      )}
      
      
    </div>
    
  )
}

export default Profile