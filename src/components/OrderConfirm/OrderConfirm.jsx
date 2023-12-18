import { useParams } from "react-router-dom"



function OrderConfirm () {
    const {orderid} = useParams ()
    return (
        <div>
            <h1>Gracias por tu compra</h1>
            <p>Este es tu comprobante de compra: {orderid}</p>  
        </div>
    )
}


export default OrderConfirm