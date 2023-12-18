//ItemList recibe productos como props

import Flex from "../Flex/Flex";
import Item from "../Item/Item";

function ItemList ({products}) {   
    return (
        <div>
            <Flex title='Mi Catalogo'>
            {products.map((itemInArray) => (
                <Item key = {itemInArray.id} {...itemInArray} />
            ))}
            </Flex>
        </div>
    )
}  

export default ItemList