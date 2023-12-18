//ItemList recibe productos como props
import { useState } from "react";
import Flex from "../Flex/Flex";
import Item from "../Item/Item";
import Loader from "../Loader/Loader";
import './ItemListSearch.css'


function FilterList ({children, items}) {
    const [searchword, setSearchword] = useState ('')

    function filterList () {
        if (searchword === '') {
            return items;
        } else {
            return items.filter( (item) => {
                let textTitle = item.title.toLowerCase()
                let word = searchword.toLowerCase()
                return textTitle.includes (word)
            })
        }
    }

    function handleSearch (evt) {
        setSearchword(evt.target.value)
    }


    return children (handleSearch,filterList())
}



function ItemListSearch ({products, isLoading}) {

    if (isLoading) return <Loader/>

    if (products.length === 0 ) return <h2> No encontramos productos </h2>

    return (
        <div>
            <FilterList items = {products}>
                {(handleSearch, filterList) => (
                    <>
                    <div className="searcher">
                        <input placeholder="Buscar productos" className="search" onChange={handleSearch} />
                    </div>
                    <Flex title='Mi Catalogo'>
                        {filterList.map((itemInArray) => (
                            <Item key = {itemInArray.id} {...itemInArray} />
                        ))}
                    </Flex>
                    </>
                )}
            </FilterList>
        </div>
    )
}  

export default ItemListSearch