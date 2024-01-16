import  ReactDOM  from "react"


const BackdropOverlay = () => {
    return (
        <div className="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-75 z-70">

        </div>
    )
}

interface props {
    children: React.ReactNode
}

const ModalOverlay = ({children}:props) => {
    return (
        <div className="fixed top-0 flex items-center justify-center w-full h-screen z-80">
            <div className="p-4 mx-2 text-gray-900 bg-white rounded-lg shadow-lg">
                {children}
            </div>
        </div>
    )
}

const portalElement = document.getElementById("modal")

const Portal = ({ children }:props) => {
    return (
    <div>
        {ReactDOM.createPortal(<BackdropOverlay />, portalElement)}
        {ReactDOM.createPortal(
            <ModalOverlay>
                {children}
            </ModalOverlay>,
            portalElement
        )}
    </div>
  )
}

export default Portal