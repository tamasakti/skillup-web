import { onAuthStateChanged } from "firebase/auth"
import { useEffect, useState } from "react"
import { auth, db } from "../../config/firebase"
import { doc, getDoc, serverTimestamp, updateDoc} from "firebase/firestore"
import Coupouns from "../../utils/interface/coupouns"
import { useNavigate, useParams } from "react-router"
import Spinner from "../../components/Spinner"
import withReactContent from "sweetalert2-react-content"
import Swal from "../../utils/types/Swal"




const CoupounsDetail = () => {
const [loading, setLoading] = useState<boolean>(false)
const [detailCoupouns, setDetailCoupouns] = useState<Coupouns>({
    coupoun:"",
    coupounPrice:"",
    createdAt:null,
    discountTypeCreate:"",
    uid:""
})
  const params = useParams()

  const {coupoun, coupounPrice, discountTypeCreate, createdAt} = detailCoupouns

  const [idDoc, setIdDoc] = useState<string>("")

  async function fetchDataCoupouns() {
    setLoading(true)
    try {
        const coupounRef = doc(db, "coupouns", params.coupounsId)
        const docSnap = await getDoc(coupounRef)
        if(docSnap.exists()) {
          setDetailCoupouns(docSnap.data() as Coupouns)
          setIdDoc(docSnap.id) 
        }
    } catch(error) {
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

  function handleChangeInput(e:any) {
    const {name, value} = e.target

    setDetailCoupouns((prev) => ({
      ...prev,
      [name] : value
    }))
  }

  const MySwal = withReactContent(Swal)
  const navigate = useNavigate()

  async function handleSubmitUpdate(e:React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const postDoc = doc(db, "coupouns", idDoc)
      const coupounData = {
       coupoun,
       coupounPrice,
       createdAt: serverTimestamp(),
       discountTypeCreate
      }
      await updateDoc(postDoc, coupounData)
      MySwal.fire({
        title: "Coupouns Updated",
        text: "Coupouns Successfully Updated",
        showCancelButton:false
      })
      navigate("/editProfile/coupouns")
    } catch(error) {
      if(error instanceof Error) {
        MySwal.fire({
          title: "Coupouns Failed Updated",
          text: error.message,
          showCancelButton:false
        })
      }
    } finally {
      setLoading(false)
    }
  }

  if(loading) return <Spinner />

  return (
    <div className="flex items-center justify-center w-full h-screen ">
      <div className="w-10/12 sm:w-10/12 md:w-4/12 lg:w-4/12 xl:w-4/12 2xl:w-4/12 h-[20rem]  flex flex-col gap-5 items-center justify-center">
          <h1 className="font-semibold text-center">Edit Course</h1>
          <form onSubmit={handleSubmitUpdate} className="flex flex-col gap-4">
          <input value={coupoun} onChange={handleChangeInput} className="w-full p-2 border-2 rounded-lg border-slate-600" type="text" name="coupoun"/>
          
       
    <div className="flex flex-row w-full gap-2 ">
          <select name="discountTypeCreate" className="w-4/12 p-2 rounded-lg" value={discountTypeCreate} onChange={handleChangeInput}>
            <option value="">Pilih</option>
            <option value="%">%</option>
            <option value="price">price</option>
          </select>
          <input type="text" name="coupounPrice" className="w-full p-2 border-2 border-black rounded-lg" value={coupounPrice} onChange={handleChangeInput}/>
          </div>
          <button type="submit" className="w-full p-2 font-semibold text-white transition duration-150 ease-in-out bg-blue-700 rounded-lg hover:bg-blue-400 hover:shadow-lg">Update</button>
          </form>
      </div>
    </div>
  )
}

export default CoupounsDetail