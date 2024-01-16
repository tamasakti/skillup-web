

const ModalContent = ({ handleHideModal }:any) => {
  return (
    <div className='modal'>
        <div>
            Content Dialog Modal
        </div>
        <button onClick={handleHideModal}>
            Close
        </button>
    </div>
  )
}

export default ModalContent