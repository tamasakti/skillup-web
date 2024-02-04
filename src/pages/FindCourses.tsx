import { DocumentData, collection, endAt, endBefore, getDocs, limit, orderBy, query, startAfter, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa"
import { auth, db } from "../config/firebase";
import Spinner from "../components/Spinner";
import CardCourse from "../components/CardCourse";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { add } from "../utils/redux/cartslice/cartSlice";

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
  
    const [sortProducts, setProducts] = useState<string>("All")

const [sortCategory, setSortCategory] = useState<string>("All Categories")
const [courseList, setCourseList] = useState<courseProps[]>([])
const [sortLevel, setSortLevel] = useState<string>("")
const [sortLanguage, setSortLanguage] = useState<string>("All Languages")


courseList.map((data:any) => {
    console.log("cekdatatime",data.data.createdTime.seconds)
})

const [loading, setLoading] = useState<boolean>(false)

const [searchItem, setSearchItem] = useState<string>("")



const [filteredData, setFilteredData] = useState<courseProps[]>([])
const [lastFetchListings, setLastFetchListings] = useState(null)
const [currentPage, setCurrentPage] = useState<number>(1)

console.log("currPage",currentPage)


    useEffect(() => {
        async function fetchDataCourse() {
            setLoading(true)
            try {
                const listRef = collection(db, "courses")
                const q = query(listRef, orderBy("judul", "desc"), limit(2))
                const querySnap = await getDocs(q)
                const lastVisible = querySnap.docs[querySnap.docs.length - 1]
                setLastFetchListings(lastVisible)
                const listingCourses:courseProps[] = []
                querySnap.forEach((doc) => {
                    return listingCourses.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })
                setCourseList(listingCourses)
                setCurrentPage(1)
              } catch (error) {
                if(error instanceof Error) return console.log(error.message)
            } finally {
                setLoading(false)
            }
        }
       fetchDataCourse()
    }, [])


    async function onFetchNextListings() {
        setLoading(true)
        try {
            const listingRef = collection(db, "courses")
            const q = query(listingRef, orderBy("judul", "desc"), startAfter(lastFetchListings), limit(2))
            const querySnap = await getDocs(q)
            const lastVisible = querySnap.docs[querySnap.docs.length - 1]
            setLastFetchListings(lastVisible)
            const listingCourses:courseProps[] = []
            querySnap.forEach((doc) => {
                return listingCourses.push({
                    id: doc.id,
                    data: doc.data()
                })
            })
            setCurrentPage(currentPage + 1)
            setCourseList((prev) => [...prev, ...listingCourses])
        } catch (error) {
            if(error instanceof Error) {
                console.log(error.message)
            }
        } finally {
            setLoading(false)
        }
    }
    console.log("list",courseList)

    // async function onPrevListings() {
    //     setLoading(true);
    //     try {
    //         if(prevCourses && prevCourses.length > 0) {
    //             const listingRef = collection(db, "courses");
    //         const q = query(
    //             listingRef,
    //             orderBy("judul", "desc"),
    //             endBefore(courseList[courseList.length -1]),
    //             limit(2)
    //         );
    //         const querySnap = await getDocs(q);
    //         const listingCourses: courseProps[] = [];
    //         querySnap.forEach((doc) => {
    //             return listingCourses.push({
    //                 id: doc.id,
    //                 data: doc.data(),
    //             });
    //         });
    //         setCurrentPage((prevPage) => prevPage - 1);
    //         setCourseList(listingCourses);
    //         }
            
    //     } catch (error) {
    //         if (error instanceof Error) {
    //             console.log(error.message);
    //         }
    //     } finally {
    //         setLoading(false);
    //     }
    // }

    useEffect(() => {
        let updatedProduct = [...courseList]

        const filteredSearchData = updatedProduct.filter((product) => {
            return product.data.judul.toLowerCase().includes(searchItem.toLocaleLowerCase())
        })

        updatedProduct = filteredSearchData

        if(sortProducts === "Paling Murah") {
            updatedProduct.sort((a,b) => parseInt(a.data.price) - parseInt(b.data.price))
        } else if (sortProducts === "Paling Mahal") {
            updatedProduct.sort((a,b) => parseInt(b.data.price) - parseInt(a.data.price))
        } else if (sortProducts === "asc") {
            updatedProduct.sort((a,b) => a.data.judul.localeCompare(b.data.judul))
        } else if (sortProducts === "desc") {
            updatedProduct.sort((a,b) => b.data.judul.localeCompare(a.data.judul))
        } else {
            updatedProduct
        }

        if(sortCategory !== "All Categories") {
            const filteredDataCategory = updatedProduct.filter((product) => {
                return product.data.category.toLowerCase().includes(sortCategory.toLocaleLowerCase())
            })
            updatedProduct = filteredDataCategory
        } else {
            updatedProduct
        }

        if(sortLevel !== "All Levels") {
           const filteredDataLevel = updatedProduct.filter((product) => {
            return product.data.levelCourse.toLowerCase().includes(sortLevel.toLocaleLowerCase())
            
           })
           updatedProduct = filteredDataLevel 
        } else {
            updatedProduct
        }

        if(sortLanguage !== "All Languages") {
            const filterDataLanguage = updatedProduct.filter((product) => {
             return product.data.language.toLowerCase().includes(sortLanguage.toLocaleLowerCase())
             
            })
            updatedProduct = filterDataLanguage 
         } else {
             updatedProduct
         }
 

        setFilteredData([...updatedProduct])

    }, [courseList,searchItem, sortCategory,sortProducts, sortLevel,sortLanguage])

    console.log("filter", filteredData)

    const dispatch = useDispatch()

    const handleAddToChart = (id:string) => {
        courseList?.map((item:any) => {
            if(item.id === id) {
                dispatch(add({
                    id: item.id,
                    data: item.data
                }))
            }
        })
    }

    const navigate = useNavigate()

    function handleGetDetail(id:string) {
        navigate(`detail/${id}`)
    }

    if(loading) return <Spinner />


  return (
    <>    <div className="flex flex-col w-full min-h-screen py-0 md:py-5 lg:py-5 xl:py-5 2xl:py-5 sm:py-0 sm:flex-col md:flex-row lg:flex-row xl:flex-row 2xl:flex-row">
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
                  <option value="All Categories">All Categories</option>
                  <option value="Computer Science" >Computer Science</option>
                  <option value="Digital Marketing">Digital Marketing</option>
                  <option value="Network & Security">Network & Security</option>
                  <option value="Subject School">Subject School</option>
                  <option value="others">Others Categories</option>
              </select>
          </div>
          <div className="flex flex-col gap-2">
          <label className="font-semibold ">Level Course</label>
              <select onChange={(e:React.ChangeEvent<HTMLSelectElement>) => setSortLevel(e.target.value)} className="p-2 rounded-lg bg-slate-200 text-md">
                  <option value="All Levels">All Levels</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate" >Intermediate</option>
                  <option value="Expert">Expert</option>
                  
              </select>
          </div>
          <div className="flex flex-col gap-2">
          <label className="font-semibold ">Language</label>
              <select onChange={(e:React.ChangeEvent<HTMLSelectElement>) => setSortLanguage(e.target.value)} className="p-2 rounded-lg bg-slate-200 text-md">
                  <option value="All Languages">All Languages</option>
                  <option value="indonesia">Bahasa Indonesia</option>
                  <option value="inggris" >Bahasa Inggris</option>
                 
                  
              </select>
          </div>
          </div>
      </div>
        <div className="flex flex-col">
       <div className="grid grid-cols-1 gap-6 xl:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 px-7">  
            {filteredData?.map((data) => {
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
                    handleAddToChart={() => handleAddToChart(data.id)}
                    />
                )
            })}
             
          </div>
          
       </div>   
      </div>
      <div className="flex justify-center w-full py-10 ">
          {lastFetchListings ? (
            <div className="join">
            <button onClick={onFetchNextListings} className="join-item btn">Load More</button>
          </div>
          ): (
            <div className="join">
            <button onClick={onFetchNextListings} className={lastFetchListings ? "join-item btn" : "join-item btn disabled bg-slate-400 cursor-not-allowed"}>Load More</button>
          </div>
          )}
          
        {/* {filteredData.length > 5 ? (
                
        ):null} */}
      
            </div>
     </>
    )
}

export default FindCourses