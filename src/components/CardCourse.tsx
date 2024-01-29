import { FaCartShopping } from "react-icons/fa6"

interface cardProps {
    image: string,
    id: string,
    title: string,
    desc:string,
    onDetail : (id:string) => void,
    category?: string,
    levelCourse: string,
    price: string,
    priceAfterDiscount?:number,
    discountPrice?: string,
}

const CardCourse = ({image, id, title, desc, onDetail, levelCourse, price, priceAfterDiscount, discountPrice}:cardProps) => {

  const backgroundImage = {
    width: "100%",
    height: "10rem",
    backgroundImage : `url(${image})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    margin: "0 auto",
    
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }

  return (
  
    <div key={id} className="shadow-xl w-80 card bg-base-100">
      <div onClick={() => onDetail(id)} className="relative bg-center bg-no-repeat bg-contain rounded-t-lg rounded-b-none opacity-90" style={backgroundImage}>
       
      {priceAfterDiscount > 0 ? (
         <div className="absolute flex flex-row items-center justify-around w-full top-2">
        <div className="flex items-center justify-center badge badge-secondary">OFF {discountPrice}</div>
        <p className="p-3 text-white bg-blue-700 rounded-lg ">{levelCourse} Level</p>
        </div>
      ):(
        <p className="absolute p-3 text-white bg-blue-700 rounded-lg top-3 right-5 ">{levelCourse} Level</p>
      )}
        
      </div>
  
  <div className="card-body">
    <h2 className="card-title">
      {title}
      
      
    </h2>
    <p className="truncate">{desc}</p>
    <div className="justify-between card-actions">
    
    <div className="w-full text-center">
     
      {priceAfterDiscount > 0 ? (
        <div className="flex justify-between">
           <p className="line-through text-slate-500">Rp.{price},-</p>
          
         <p className="p-2 font-semibold rounded-md bg-main">Rp.{priceAfterDiscount},-</p>
         
        </div>
        
      ):  <div className="w-6/12 p-2 font-semibold text-center rounded-md bg-main">
           <p>Rp.{price},-</p>
          
         
        </div>}
      
    </div>
    <div className="w-full my-3">
    <button className="w-full btn">
        <span className="flex flex-row gap-2">
        <FaCartShopping />
        <p>Add To Cart</p>
        </span>
    </button>
    </div>
      {/* <div className="badge badge-outline">{category}</div> */}
    </div>
  </div>
</div>

  //   <div key={id}  className="shadow-xl card lg:card-side bg-base-100">
  //   <figure><img onClick={(id:any) => onDetail(id)} src={image} alt="Album" className="w-full"/></figure>
  //   <div className="card-body">
  //     <h2 className="card-title">{title}</h2>
  //     <p >{desc}</p>
  //     <div className="justify-start card-actions">
  //       <button className="btn btn-primary"><FaCartShopping className="text-white"/>Add To Chart</button>
  //     </div>
  //   </div>
  // </div>
  )
}

export default CardCourse