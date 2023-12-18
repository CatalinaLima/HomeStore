import Button from "../Button/Button"
import ItemCount from "../ItemCount/ItemCount"
import './Item.css'
import { useState } from "react";
import {Link} from 'react-router-dom'

function CardDescription ({price, category, discount}) {
    const classNamePrice = discount > 25 ? "item-card_price-tag_offer" :  "item-card_price-tag"
    //npm classNames
    return(
        <div className="item-card_detail">
            {discount && <small>Descuento: {discount} % </small>}
            <h4 className= {classNamePrice} >${price}</h4>
            <small>{category}</small>
        </div>
    )
}

function Item ({title, image, price, category, color, id, discount, stock}) {
    const [isFavourite, setIsFavourite] = useState (false);
    let classNameFavourite; 

    if (isFavourite === false) {
        classNameFavourite = 'item-card_favicon';
    } else {
        classNameFavourite = 'item-card_favicon favourite'
    }

    function handleClickFav(event) {
        //para que no se superponga con Link que navega
        event.preventDefault ()
        event.stopPropagation()
        setIsFavourite (!isFavourite)
    }

    const stylesButton = {
        backgroundColor: stock ===0 ? 'red' : 'inherit'
    }

    return(
    //id dinamico
    <Link to = {`/product/${id}`} > 
        <div className="item-card">
            <button onClick={handleClickFav} className={classNameFavourite}>
                ♥
            </button>
            <div className="item-card_header">
                <h2>{title}</h2>
                <small>{category}</small>
            </div>
            <div className="item-card_img">
                <img src={image} alt="imagen"></img>
            </div>
            <CardDescription discount={discount} price={price} color={color}/>
            {/* <ItemCount stock = {5} /> */}
            <Button style={stylesButton} color ={color}>Ver detalle</Button>
        </div>
    </Link>
)}

export default Item 