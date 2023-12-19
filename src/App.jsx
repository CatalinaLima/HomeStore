import NavBar from './components/NavBar/NavBar'
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Homepage from './components/pages/Homepage'
import { CartContextProvider } from './context/cartContext'
import CartView from './components/CartView/CartView'
import OrderConfirm from './components/OrderConfirm/OrderConfirm'
import { exportDataWithBatch } from './services/firebase'
import Footer from './components/Footer/Footer'



function App() {
  return (
    <CartContextProvider>
      <BrowserRouter>
        <div className='app-container'>
          <NavBar/>
        {/* <button onClick={exportDataWithBatch}>Export Data</button> */}
          <Routes>
            <Route path= '/' element= {<Homepage/>} />
            <Route path= '/product/:id' element= {<ItemDetailContainer/>} />
            <Route path= '/category/:categoryid' element= {<Homepage/>} />
            <Route path= '/cart' element= {<CartView/>} />
            <Route path= '/order-confirmation/:orderid' element= {<OrderConfirm/>} />
            <Route path= '*' element = { <OrderConfirm/> } />
          </Routes>
        </div>
      <Footer/>
    </BrowserRouter>
  </CartContextProvider>
)}

export default App

