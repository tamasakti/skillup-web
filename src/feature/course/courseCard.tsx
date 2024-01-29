
    interface cardCourseInt {
        key: string,
        image:string,
        judul: string,
        createdBy?: string,
        price: string,
        description?:string,
        levelCourse?: string, 
        onEdit?: (id:string) => void,
        onDelete? : (id:string) => void
    }

const CourseCard = ({key, image, judul, createdBy, price, description, levelCourse, onEdit, onDelete}:cardCourseInt) => {
  const backgroundImage = {
    width: "100%",
    height: "15rem",
    backgroundImage : `url(${image})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    margin: "0 auto",
    borderRadius: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
}
  return (
    <div key={key} className='px-5'>
    <div className="shadow-xl aspect-auto card w-80 h-96 bg-base-100">
   
      <div className="relative bg-center bg-no-repeat bg-contain" style={backgroundImage}>
      <div className="absolute p-4 font-semibold badge badge-primary top-5 left-5">{levelCourse} Level</div>
      <h2 className="w-8/12 p-4 mx-auto font-semibold text-center border-2 border-none rounded-lg bg-main text-md">
      {judul}
    </h2>
      </div>
  <div className="-mt-5 card-body">
    <p className="truncate">{description}</p>
    <div className="flex justify-between card-actions ">
      <div className="badge badge-outline">{createdBy}</div>
      <div className="badge badge-outline">{price}</div> 
    </div>
    <div className='flex gap-2'>
        <button type="submit" onClick={() => onEdit(key)}>Edit</button>
        <button type="submit" onClick={() => onDelete(key)}>Delete</button>
    </div>
  </div>
</div>
</div>
  )
}

export default CourseCard