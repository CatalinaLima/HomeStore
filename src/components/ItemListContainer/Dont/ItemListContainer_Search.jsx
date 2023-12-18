import { useEffect, useState } from "react"
import ItemList from "./ItemList"

/* -------------- SERVICIO REMOTO BE ☁️-------------- */
import productsStore from "../data/productsStore"
function getData() {
    return new Promise (resolve => {
        setTimeout ( () => {resolve (productsStore) }, 2000 )
    } )
}


//------------------------------------------------------//


//*HOC*//
function withSearch (OrigComponent) {
    function WrappedComponent () {
    const [searchword, setSearchWord] = useState ('')

    function handleChange (evt){
        //en el evento va a estar guardado el valor
        const valor = evt.target.value;
        setSearchWord(valor)
    }

    //Funcion para filtrar
    function filterList(products) {
        if (searchword === '') {
            return products
        } else {
            return products.filter( (item) => {
                let textTitle = item.title.toLowerCase()
                let word = searchword.toLowerCase()
                return textTitle.includes (word)
            })
        }
    }



        return (
            <>
            <input onChange={handleChange}placeholder="Buscar productos"></input>
            <OrigComponent filterList = {filterList}/>
            </>
        )
    }

    return WrappedComponent;
}
//*END HOC*//


function ItemListContainerSearch ({filterList}) {
    let [products, setProducts] = useState ([]);

    useEffect( () => {
    getData().then((respuesta) => {
        setProducts(respuesta);
    });
}, [])

    return (
        <div>
            <h1>Catalogo</h1>
                <ItemList products={filterList(products)} />
        </div>
    )
}

const WrappedItemListContainerSearch = withSearch(ItemListContainerSearch)

export default WrappedItemListContainerSearch