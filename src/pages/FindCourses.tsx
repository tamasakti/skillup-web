import { DocumentData, collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa"
import { auth, db } from "../config/firebase";
import Spinner from "../components/Spinner";
import CardCourse from "../components/CardCourse";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router";

// interface courseProps {
//     category:string,
//     coupounBoolean:boolean,
//     createdTime:any,
//     currencyType: string,
//     date:string,
//     description:string,
//     endCourse:string,
//     forwho:string,
//     imageCover:string,
//     judul:string,
//     language:string,
//     levelCourse:string,
//     price:string,
//     requirement:string,
//     startCourse:string,
//     uploadedImage:string,
//     u
// }

interface courseProps {
    id:string, 
    data: DocumentData
}

const FindCourses = () => {
  const [sortProducts, setProducts] = useState<string>("")

  const [sortCategory, setSortCategory] = useState<string>("")
const [courseList, setCourseList] = useState<courseProps[]>([])
const [loading, setLoading] = useState<boolean>(false)
const [searchItem, setSearchItem] = useState<string>("")
// const [filteredData, setFilteredData] = useState<courseProps[]>([])

console.log(courseList)

async function fetchDataCourse() {
    setLoading(true)
    try {
        const listRef = collection(db, "courses")
        const q = query(listRef)
        const querySnap = await getDocs(q)
        const listingCourses:courseProps[] = []
        querySnap.forEach((doc) => {
            return listingCourses.push({
                id: doc.id,
                data: doc.data()
            })
        })
        setCourseList(listingCourses)
    } catch (error) {
        if(error instanceof Error) return console.log(error.message)
    } finally {
        setLoading(false)
    }
}
    useEffect(() => {
        fetchDataCourse()
    }, [])
   
    // useEffect(() => {
    //     let sliceProduct = courseList.slice()
    //     const filterSearchData = sliceProduct.filter((product) => {
    //         return product.data.judul.toLowerCase().includes(searchItem.toLocaleLowerCase())
    //     })
    
    //     sliceProduct = filterSearchData
    
    //     switch(sortProducts) {
    //         case "Paling Murah":
    //             sliceProduct.sort((a,b) => parseInt(a.data.price) - parseInt(b.data.price))
    //             break;
    //         case "Paling Mahal":
    //             sliceProduct.sort((a,b) => parseInt(b.data.price) - parseInt(a.data.price))
    //             break;
    //         case "asc":
    //             sliceProduct.sort((a,b) => a.data.judul.localeCompare(b.data.judul))
    //             break;
    //         case "desc":
    //             sliceProduct.sort((a,b) => b.data.judul.localeCompare(a.data.judul))
    //             break;
    //             default:
    //             sliceProduct
    //     }
    
    //     if(sortCategory !== "All Categories") {
    //         const filterDataProduct = sliceProduct.filter((product) => product.data.category.toLowerCase() === sortCategory.toLowerCase())
    //         sliceProduct = filterDataProduct
    //     } else {
    //         sliceProduct
    //     }

    //     setFilteredData(sliceProduct)

    // }, [courseList, searchItem, sortCategory, sortProducts])

    
   
    const navigate = useNavigate()

    function handleGetDetail(id:string) {
        navigate(`detail/${id}`)
    }

    if(loading) return <Spinner />


    


  return (
    <div className="flex flex-col w-full min-h-screen py-0 md:py-5 lg:py-5 xl:py-5 2xl:py-5 sm:py-0 sm:flex-col md:flex-row lg:flex-row xl:flex-row 2xl:flex-row">
      <div className="w-11/12 p-5 mx-auto sm:mx-auto md:m-0 lg:m-0 xl:m-0 2xl:m-0 sm:w-11/12 md:w-2/12 lg:w-2/12 xl:w-2/12 2xl:w-2/12">
      <div className="relative">
            <input value={searchItem} onChange={(e:React.ChangeEvent<HTMLInputElement>) => setSearchItem(e.target.value)} className="w-full p-2 border-2 border-black rounded-lg"/>
            <FaSearch className="absolute right-5 bottom-3"/>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-5 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 2xl:grid-cols-1">
            <div className="flex flex-col gap-2">
          <label className="font-semibold ">Sorting Products</label>
          <select onChange={(e:React.ChangeEvent<HTMLSelectElement>) => setProducts(e.target.value)} className="p-2 rounded-lg bg-slate-200 text-md">
                  <option value="Select Filter">Sort Product</option>
                  <option value="asc">Ascending (A - Z)</option>
                  <option value="desc">Descending (Z - A)</option>
                  <option value="Paling Mahal">Highest Price</option>
                  <option value="Paling Murah">Lower Price</option>
              </select>
          </div>
          <div className="flex flex-col gap-2">
          <label className="font-semibold ">Select by Categories</label>
              <select onChange={(e:React.ChangeEvent<HTMLSelectElement>) => setSortCategory(e.target.value)} className="p-2 rounded-lg bg-slate-200 text-md">
                  <option value="All Categories">Filter Categories</option>
                  <option value="Computer Science" >Computer Science</option>
                  <option value="Digital Marketing">Digital Marketing</option>
                  <option value="Network & Security">Network & Security</option>
                  <option value="subject">Subject School</option>
                  <option value="others">Others</option>
              </select>
          </div>
          <div className="flex flex-col gap-2">
          <label className="font-semibold ">Sort by Date</label>
              <select onChange={(e:React.ChangeEvent<HTMLSelectElement>) => setSortCategory(e.target.value)} className="p-2 rounded-lg bg-slate-200 text-md">
                  <option value="All Categories">Filter</option>
                  <option value="recent uploads" >Recent Uploads</option>
                  <option value="old uploads">Old Uploads</option>
                  
              </select>
          </div>
          <div className="flex flex-col gap-2">
          <label className="font-semibold ">Sort</label>
              <select onChange={(e:React.ChangeEvent<HTMLSelectElement>) => setSortCategory(e.target.value)} className="p-2 rounded-lg bg-slate-200 text-md">
                  <option value="All Categories">Filter</option>
                  <option value="recent uploads" >Your Relevancies</option>
                  <option value="old uploads">Top Rating</option>
                  
              </select>
          </div>
          <div className="flex flex-col gap-2">
          <label className="font-semibold ">Level Course</label>
              <select onChange={(e:React.ChangeEvent<HTMLSelectElement>) => setSortCategory(e.target.value)} className="p-2 rounded-lg bg-slate-200 text-md">
                  <option value="All Categories">Beginner</option>
                  <option value="recent uploads" >Intermediate</option>
                  <option value="old uploads">Expert</option>
                  
              </select>
          </div>
          <div className="flex flex-col gap-2">
          <label className="font-semibold ">Language</label>
              <select onChange={(e:React.ChangeEvent<HTMLSelectElement>) => setSortCategory(e.target.value)} className="p-2 rounded-lg bg-slate-200 text-md">
                  <option value="All Categories">Bahasa Indonesia</option>
                  <option value="recent uploads" >Bahasa Inggris</option>
                 
                  
              </select>
          </div>
          </div>
      </div>
      <div>
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 px-7">
            {courseList?.map((data) => {
                return (
                    <CardCourse 
                    key={data.id}
                    id={data.id}
                    image={data.data.imageCover}
                    title={data.data.judul}
                    desc={data.data.description}
                    onDetail={() => handleGetDetail(data.id)}
                    category={data.data.category}
                    levelCourse={data.data.levelCourse}
                    price={data.data.price}
                    priceAfterDiscount={data.data.priceAfterDisc}
                    discountPrice={data.data.discountPrice}
                    />
                )
            })}
             
          </div>
          
      </div>
     
    </div>
  )
}

export default FindCourses