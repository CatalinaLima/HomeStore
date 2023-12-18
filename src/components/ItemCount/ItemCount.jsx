import Flex from '../Flex/Flex'
import { useState } from 'react'
import './ItemCount.css'


function ItemCount ({stock, onAddToCart}) {
    const [count, setCount] = useState (1);

    function handleAdd () {
        if (count < stock)
        setCount (count +1)
    }

    function handleSubstract () {
        if (count > 1)
        setCount (count -1)
    }

    let isDisabledSubstract = count === 1 ? true : false

        return (
            <div className="itemcount_container">
                <small>Agrega la cantidad deseada al carrito</small>
                <div className="itemcount_control">
                    <Flex>
                        <button className='btn' disabled = {isDisabledSubstract} onClick={handleSubstract}> - </button>
                        <span className='itemcount_count'>{count}</span>
                        <button className='btn' onClick={handleAdd}> + </button>
                    </Flex>
                </div>

                <div className='itemcount_btns'>
                    <button onClick={ () => {onAddToCart(count)} } className='btn'>Agregar a mi carrito</button>
                </div>
            </div>
        )
    }

export default ItemCount


//si no hay stock, podemos deshabilitar el boton de agregar al carrito