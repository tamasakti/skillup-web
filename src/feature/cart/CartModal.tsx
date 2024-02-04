import { useSelector } from "react-redux";
import Modal from "../../components/Modal";
import { 
    add,
    updatedTotalPrice,
    substractQuantity,
    selectCartItems,
    selectCartTotalItems, 
    totalPriceUpdated
} from "../../utils/redux/cartslice/cartSlice";
import { useDispatch } from "react-redux";


const CartModal = ({handleHideModalCart}) => {
    const cartItems = useSelector(selectCartItems)
    console.log("cartItems",cartItems)
    const totalItems = useSelector(selectCartTotalItems)
    const totalPrice = useSelector(totalPriceUpdated)
    const dispatch = useDispatch()

    const handleAddQuantity = (product) => {
        dispatch(add(product))
        dispatch(updatedTotalPrice(product))
    }

    const handleSubstractQUantity = (product) => {
        dispatch(substractQuantity(product))
        dispatch(updatedTotalPrice(product))
    }

    const handleCheckoutTOWhatsapp = () => {
        if (totalItems === 0) return;

        const phoneNumber = "6283818380526";
        const message = encodeURIComponent(
            `Halo, saya ingin membeli ${totalItems} barang dengan total harga Rp.${totalPrice}, tolong segera diproses ya untuk pemesanannya
            `
        );
        const URL = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;

        window.open(URL, "_blank")
    }

    return (
        <Modal>
            <div className="flex flex-col gap-6 p-1: sm:p-2 w-full lg:w-[900px]">
                <div className="flex flex-col gap-6 max-h-[500px] overflow-auto">
                    {cartItems.map((product:any) => {
                        return (
                            <div className="w-full pb-4 border-b-4 border-blue-200"
                            key={product.id}>
                                <div className="flex items-center w-full">
                                    <div className="w-[120px] h-auto overflow-hidden">
                                    <img
                      src={product.data.imageCover}
                      alt={product.data.judul}
                      className="object-cover w-full h-full"
                    />
                                    </div>
                                    <div className="ml-10 w-[75%]">
                                    <h3 className="mt-3 text-lg capitalize">{product.data.judul}</h3>
                                    <div className="flex items-center justify-between gap-2">
                                    <h4 className="text-sm">Item Price : Rp.{parseInt(product.data.price)}</h4>
                                    <h3 className="text-lg font-bold">
                        Total Price : Rp.{product.totalPrice.toFixed(2)} 
                       </h3>
                                    </div>
                                    <div className="flex items-center gap-4 mt-4 ml-auto">
                                    <button
                        type="button"
                        className="flex items-center justify-center w-5 h-5 text-white bg-blue-400 rounded-full"
                        onClick={() => {
                            handleSubstractQUantity(product)
                            product.totalPrice.toFixed(2)
                        }}
                        >
                        -
                      </button>
                      <h3>{product.quantity}</h3>
                      <button
                        type="button"
                        className="flex items-center justify-center w-5 h-5 text-white bg-blue-400 rounded-full"
                        onClick={() => {
                            handleAddQuantity(product)
                            product.totalPrice.toFixed(2)
                        }}
                      >
                        +
                      </button>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div>
                <h3 className="font-bold text-md">Total Item: {totalItems}</h3>
          <h3 className="font-bold text-md">
                Total Price : Rp.{totalPrice.toFixed(2).toLocaleString()}
            </h3> 
                </div>
                <div className="flex items-center justify-between">
                <button
            type="button"
            className="px-8 py-3 text-sm text-white bg-slate-600 hover:bg-slate-800 rounded-xl"
            onClick={handleHideModalCart}
          >
            Close
            </button>
          <button
            type="button"
            className="px-8 py-3 text-sm font-bold text-white bg-green-600 hover:bg-slate-800 rounded-xl"
            onClick={handleCheckoutTOWhatsapp}
          >
            Checkout (whatsapp)
          </button>
                </div>
            </div>
        </Modal>
    )


}

export default CartModal