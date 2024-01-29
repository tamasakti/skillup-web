import spinner from "../assets/svg/Spinner-1s-200px.svg"

const Spinner = () => {
  return (
    <div className="z-50 flex w-full min-h-screen items-center justify-center bg-white bg-opacity-50 ">
        <div>
            <img src={spinner} alt="loading..." className="h-24"/>
        </div>
    </div>
  )
}

export default Spinner