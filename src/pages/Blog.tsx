import webMaintance from "../assets/svg/Web Maintenance.svg"

const Blog = () => {
  return (
    <div className="w-full min-h-screen flex justify-center items-center flex-col">
      <img src={webMaintance} className="w-2/12"/>
      <h1 className="text-center font-bold text-blue-700 text-xl">Blog Under Development / Maintance</h1>
    </div>
  )
}

export default Blog