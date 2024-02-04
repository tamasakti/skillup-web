import React from "react"
import ReactDOM from "react-dom"

const BackdropOverlay = () => {
    return (
        <div className="fixed top-0 left-0 z-20 w-full h-screen bg-black bg-opacity-75" />
    )
}

interface ModalOverlayProps {
    children: React.ReactNode
}

const ModalOverlay = ({children}:ModalOverlayProps) => {
    return (
        <div className="fixed top-0 z-30 flex items-center justify-center w-full h-screen">
            <div className="p-4 mx-2 text-gray-900 bg-white rounded-lg shadow-lg">
                {children}
            </div>
        </div>
    )
}

const portalElement = document.getElementById("modal")

const Modal = ({children}:ModalOverlayProps) => {
    return (
        <>
            {ReactDOM.createPortal(<BackdropOverlay />, portalElement)}
            {ReactDOM.createPortal(
                <ModalOverlay>
                    {children}
                </ModalOverlay>, portalElement
            )}
        </>
    )
}

export default Modal


