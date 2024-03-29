import React, { useEffect, useState } from 'react'
import withReactContent from 'sweetalert2-react-content'
import Swal from '../../utils/types/Swal'
import Button from '../../components/Button'
import { auth, db } from '../../config/firebase'
import { DocumentData, addDoc, collection, deleteDoc, doc, getDocs, query, serverTimestamp, where } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
import Spinner from '../../components/Spinner'
import CoupounsCard from './CoupounsCard'
import { useNavigate } from 'react-router'


interface coupounProps {
  coupoun : string,
  coupounPrice: number,
}

interface coursePropsData {
  id:string,
  data: DocumentData
}

const Coupuns = () => {
  const MySwal = withReactContent(Swal)
  const [coupounLists, setCoupounLists] = useState<coursePropsData[]>([])
  const [loading, setLoading] = useState<boolean>(false)
    const [discountTypeCreate, setDiscountTypeCreate] = useState<string>("")
    
    const [coupounData, setCoupounData] = useState<coupounProps>({
      coupoun : "",
      coupounPrice: 0,
    })

    let messageCoupun = "";

    if(discountTypeCreate === "%") {
      if(coupounData.coupounPrice > 100) {
        messageCoupun = "Angka yang kamu masukan tidak valid"
      }
    } 

    async function fetchDataCoupouns() {
      try {
        setLoading(true)
        const listref = collection(db, "coupouns")
        const q = query(listref, where("uid", "==", auth.currentUser?.uid))
        const querySnap = await getDocs(q)
        const listingsCoupouns:coursePropsData[] = []
        querySnap.forEach((doc) => {
          return listingsCoupouns.push({
            id: doc.id,
            data: doc.data()
          })
        })
        setCoupounLists(listingsCoupouns)
      } catch (error) {
        if(error instanceof Error) return console.log(error.message)
      } finally {
        setLoading(false)
      }
    }

    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        if(user) {
          fetchDataCoupouns()
        }
      })
    }, [])


    function handleChangeCoupoun(e:React.ChangeEvent<HTMLInputElement>) {
      const {name, value } = e.target
  
      setCoupounData((prevState) => ({
        ...prevState,
        [name] : value
      }))

     
    }
    const {coupoun, coupounPrice} = coupounData

    let message = "";

    if(coupoun !== "") {
      coupounLists.forEach((item) => {
        if(item.data.coupoun.toLowerCase() === coupoun.toLowerCase()) {
          message = "Nama Kupon Harus Unique, tidak boleh sama"
        }
      })
    }

     async function submitCoupoun() {
      setLoading(true)
      try {
        
        const coupounBody = {
      ...coupounData, 
      discountTypeCreate,
      uid: auth.currentUser?.uid,
      createdBy: auth.currentUser?.email,
      createdAt: serverTimestamp()
    }
    const docRef = await addDoc(collection(db, "coupouns"), coupounBody)
    MySwal.fire({
      title: "Create Coupoun",
      text: "Coupouns Submitted",
      showCancelButton: false
    })
    navigate(`/editProfile/coupouns/${docRef.id}`)
      } catch (error) {
        if(error instanceof Error) {
          MySwal.fire({
            title: "Create Coupoun",
            text: error.message,
            showCancelButton: false
          })
        }
        
      } finally {
        setLoading(false)
      }
    }

    const navigate = useNavigate()

    function handleEdit(id:string) {
    navigate(`${id}`)
    }

    async function handleDelete(id:string) {
      setLoading(true)
      try {
        
        MySwal.fire({
          title: "Are You Sure?",
          text: "You Can't Retrieve your Data After Delete your Coupouns",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#dc3545",
          cancelButtonColor: "#6c757d",
          confirmButtonText: "Ya, hapus Kupon!",
          cancelButtonText: "Batal",
        }).then((result) => {
          if(result.isConfirmed) {
          deleteDoc(doc(db, "coupouns", id))
          const updatedListCoupouns = coupounLists.filter((data:coursePropsData) => data.id !== id)
          setCoupounLists(updatedListCoupouns)
          }
        }).catch((error) => {
          if(error instanceof Error) return  console.log(error.message)
        }).finally(() => setLoading(false ))
          
        
      } catch (error) {
        if(error instanceof Error) {
          console.log(error.message)
        }
        
      } finally {
        setLoading(false)
      }
      
    }
   
    const [disabled, setDisabled] = useState<boolean>(false);

    useEffect(() => {
      if(coupoun  && discountTypeCreate  && coupounPrice > 0 && messageCoupun !== "Angka yang kamu masukan tidak valid" && message !== "Nama Kupon Harus Unique, tidak boleh sama" ) {
        setDisabled(false)
      } else {
        setDisabled(true)
      }

      return () => {
        setDisabled(false)
      }
    }, [coupoun, coupounPrice, discountTypeCreate, message, messageCoupun])

    if(loading) {
      return <Spinner />
    }

  return (
    <div className='flex flex-col w-10/12 min-h-screen mx-auto'>
        <div className='px-5 mb-5 '>
             <button className="btn" onClick={()=>document.getElementById('my_modal_1').showModal()}>Create Coupun</button>
   <dialog id="my_modal_1" className="modal">
     <div className="modal-box">
     <div className="flex flex-col gap-2">
       <h1 className="text-lg font-bold">Create Coupouns</h1>
       {message !== "" ? <p className='text-red-600'>{message}</p>:null}
       <input type="text"name="coupoun" value={coupoun} onChange={handleChangeCoupoun} placeholder="Coupouns Name" className="w-full p-2 border-2 rounded-lg border-slate-500" required />
       <p className="font-semibold">Discount Type</p>
       <div className="flex flex-row w-full gap-3">
             <select className="w-4/12 p-3 rounded-lg bg-slate-100" onChange={(e:React.ChangeEvent<HTMLSelectElement>) => setDiscountTypeCreate(e.target.value)} required>
               <option>Discount</option>
               <option value="%">%</option>
               <option value="price">Price</option>
             </select>
             <input type="number" name="coupounPrice" maxLength={10} value={coupounPrice} onChange={handleChangeCoupoun} placeholder="Harga Course" className="w-full p-2 border-2 rounded-lg border-slate-500" required  />
             
             </div>
             {messageCoupun !== "" && (
              <div role="alert" className="alert alert-error">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 stroke-current shrink-0" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>{messageCoupun}</span>
            </div>
             )}
             
            
             
             <Button id="btn-submitcoupoun" label="Create Coupoun" className="w-full p-3 text-white transition duration-150 ease-in-out bg-blue-700 rounded-lg disabled:bg-slate-400 disabled:cursor-not-allowed hover:bg-blue-500 hover:shadow-lg" type="submit"  onClick={submitCoupoun} disabled = {disabled ? true : false}/>
       </div>
       <div className="modal-action">
         <form method="dialog">
           <button className="btn">Close</button>
         </form>
       </div>
     </div>
   </dialog>
           </div>
          <div>
            {loading ? <Spinner /> : coupounLists.length < 1 ? <div className="flex items-center justify-center w-4/12 min-h-screen mx-auto"><div role="alert" className="alert alert-warning">
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 stroke-current shrink-0" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
  <span>Anda belum Membuat Coupouns</span>
</div></div> : (
    <div className='w-full min-h-screen px-5'>
      <div className='grid w-full grid-cols-1 gap-5 md:grid-cols-3 sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3'>
        {coupounLists?.map((data) => {
          return (
            <CoupounsCard 
            key={data.id}
            coupoun={data.data.coupoun}
            coupounPrice={data.data.coupounPrice}
            // createdAt={data.data.createdAt}
            createdBy={data.data.createdBy}
            onEdit={() => handleEdit(data.id)}
            onDelete={() => handleDelete(data.id)}
            />
          )
        })}
       

      </div>
    </div>
)}
          </div>
        </div>
  )
}

export default Coupuns