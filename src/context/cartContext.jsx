import { createContext, useState } from "react";

export const cartContext = createContext ({cart:[]})

export function CartContextProvider ({children}) {
    const [cart, setCart] = useState ([])

    function addItem (product, count) {
        const newCart = [...cart] 

        if (isInCart(product.id)) { 
            let newCart = cart.map ((cartItem) => { 
            if (cartItem.id===product.id) {
            return {...cartItem, count: cartItem.count + count}
            }else {
            return {...cartItem}
            }
        })
        setCart(newCart)
        } else {
            newCart.push ({...product, count})
            setCart(newCart)
        }
    }

    //154.toFixed(2)

    //1- al agregar un item , verificar si ya esta en el cart
    function isInCart (id) {
        const itemBuscado = cart.some (item => item.id === id) 
        return itemBuscado
    }

    function countItems () {
        let total = 0;
        cart.forEach((item) => {
            total += item.count
        })
        return total
    }

    function countTotalPrice() {
      let totalPrice = 0;
      cart.forEach((item) => {
        totalPrice += item.price * item.count;
      });
      return totalPrice.toFixed(2);
    }
    

    function clear() {
        setCart ([])
    }

    function removeItem(idDelete, quantityToRemove = 1) {
        const updatedCart = cart.map((item) => {
          if (item.id === idDelete) {
            // Reduce la cantidad solo si es mayor que la cantidad a eliminar
            if (item.count > quantityToRemove) {
              return { ...item, count: item.count - quantityToRemove };
            } else {
              // Si la cantidad es menor o igual a la cantidad a eliminar, elimina el elemento
              return null;
            }
          } else {
            return { ...item };
          }
        }).filter((item) => item !== null);
      
        setCart(updatedCart);
      }
      

    return (
        <cartContext.Provider value = {{cart: cart, setCart: setCart, addItem, countItems, removeItem, isInCart, countTotalPrice, clear}} >
            {children}
        </cartContext.Provider>
    )
}