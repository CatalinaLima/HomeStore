//import productsStore from "../data/productsStore"
import {useContext, useEffect, useState} from 'react'
import ItemCount from "../ItemCount/ItemCount"
import './ItemDetailContainer.css'
import {useParams} from 'react-router-dom'
import { cartContext } from "../../context/cartContext"
import Loader from "../Loader/Loader"
import { Link } from "react-router-dom"
import Button from '../Button/Button'
import { getItemData } from "../../services/firebase"
import Swal from 'sweetalert2'




/* -------------- SERVICIO REMOTO BE ☁️-------------- */

//Funcion para que devuelva un solo elemento 

// function getItemData(idURL) {
//     return new Promise ((resolve, reject) => {
//         setTimeout ( () => {
//             const requestedItem = productsStore.find ( (item) => item.id === parseInt(idURL)  )

//             if (requestedItem)
//             resolve (requestedItem)
            
//             else
//             reject(new Error ('Error: producto no encontrado'))
            
//         }, 1000)
//     })
// }

//queremos encontrar producto que coincida con el id que le pasamos
//encuentra un itme, me lo devuleve y corta ejecucion de find 

/*-------------------------*/

function ItemDetailContainer (stock) {
    const [errors, setErrors] = useState (null)

    //estado
    const [product, setProduct] = useState (null); //podemos dejarlo vacio xq teemos rendering condicional
    const [countInCart, setCountInCart] = useState(0) //La cant de unidades que se representan en carrito

    const {addItem, removeItem} = useContext(cartContext) //a que contexto nos estamos conectando

    //Guardar los datos de mi carrito + suma de ItemCount: funcion cuando se agregue algo al carrito
    //Agregar al array del context este producto

    function onAddToCart (count) { 
    addItem(product, count)
    setCountInCart (count)

    Swal.fire({
        icon: "success",
        title: `Agregaste ${count} ${product.title} al carrito `,
    });

}

    const id = useParams().id
    
    //efecto
    useEffect (() => {
        getItemData(id).then ((respuesta) => {
            setProduct(respuesta);
        })
        .catch( error => {
            setErrors(error.message)
        }
        );
    }, [id]); //lo dejamos seteado por si queremos agregar otra navegacion a otro producto

    if (errors)
    return(
        <div>
            <h1>Error</h1>
            <p>{errors}</p>
        </div>
    )

    //UI
    if (product) {
    return (
        <div className="card-detail_main">
            <div className="card-detail_img">
                <img src={product.image} alt={product.title} />
            </div>
            <div className="card-detail_detail">
                <h1>{product.title}</h1> 
                <h2 className="priceTag"> $ {product.price} </h2>
                <small>{product.detail}</small>

                {countInCart===0 ? ( <ItemCount onAddToCart={onAddToCart} stock = {product.stock} />):( <Link to='/cart'> Ir al carrito </Link>)}
                
                {/* <Button onClick={ () => removeItem (product.id) }>Eliminar</Button>  */}
            </div>
        </div>
    )
    }
    
    return <Loader/>
}

export default ItemDetailContainer