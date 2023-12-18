import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import {getCategoryData, getData} from '../../services/firebase'


import ItemListSearch from "./ItemListSearch"
//import productsStore from "../data/productsStore"


/* -------------- SERVICIO REMOTO BE ☁️-------------- */

// function getData() {
//     return new Promise ((resolve) => {
//         setTimeout ( () => {resolve (productsStore) }, 2000 )
//     } )
// }


//------------------------------------------------------//
function ItemListContainer () {
    let [isLoading, setIsLoading] = useState (true)
    let [products, setProducts] = useState ([]);
    const {categoryid} = useParams()
    
    //Aca diferenciamos si lo que pedimos es con categoria o solo datos

    const fechData = categoryid === undefined? getData : getCategoryData 

    useEffect( () => {
        fechData(categoryid)
            .then((respuesta) => setProducts(respuesta))
            .finally(() => {
                setIsLoading(false)
            })
        }, [categoryid]) //agregar la otra variable parfa el efecto : category

    return (
        <div>
                <ItemListSearch isLoading={isLoading} products={products} />
        </div>
    )
}

export default ItemListContainer