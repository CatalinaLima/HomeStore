import { useParams } from "react-router-dom"
import Flex from "../Flex/Flex";
import './OrderConfirm.css'
import { cartContext } from "../../context/cartContext";
import React, { useContext } from "react";


function OrderConfirm () {
    const {orderid} = useParams ()
    const { cart } = useContext(cartContext);

    return (
        <div>
            <Flex>
                <div className="order">
                    <h1>Gracias por tu compra!</h1>
                    <p>Este es tu comprobante de la orden: {orderid}</p>
                </div>
            </Flex>
        </div>
    )
}

export default OrderConfirm

