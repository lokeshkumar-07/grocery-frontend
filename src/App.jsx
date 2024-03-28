import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Login from './pages/Login'
import Admin from './pages/Admin'
import CreateProduct from './pages/CreateProduct'
import Products from './pages/products'
import Carts from './pages/Carts'
import Checkout from './pages/Checkout'
import MyOrder from './pages/MyOrder'
import OrderDetails from './pages/OrderDetails'
import UpdateProduct from './pages/UpdateProduct'
import OrderPlaced from './pages/OrderPlaced'
import { useSelector } from 'react-redux'
import NotAdmin from './pages/NotAdmin'
import {useGoogleLogin} from '@react-oauth/google'
import NotFound from './components/NotFound'

function App() {
  const [count, setCount] = useState(0)
  const {currentUser} = useSelector((state) => state.auth)

  const AdminRoute = ({ element }) => {
    if (currentUser && currentUser.role === 'admin') {
      return element;
    } else {
      return <Navigate to="/notadmin" />;
    }
  };

  const UserRoute = ({element}) => {
    if(currentUser){
      return element
    }else{
      return <Navigate to="/auth" />
    }
  }

  const AlreadyLogin = ({element}) => {
    if(currentUser){
      return <Navigate to='/' />
    }else{
      return element
    }
  }


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />} >
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<AdminRoute element={<Admin />} />} />
            <Route path='/create' element={<AdminRoute element={<CreateProduct />} />} />
            <Route path='/products' element={<Products />} />
            <Route path="/carts" element={<UserRoute element={<Carts />} />} />
            <Route path='/checkout' element={<UserRoute element={<Checkout />}/>} />
            <Route path="/myorders" element={<UserRoute element={<MyOrder />} />} />
            <Route path='/order/:orderId' element={<UserRoute element={<OrderDetails />} /> } />
            <Route path='/productupdate/:productId' element={<AdminRoute element={<UpdateProduct />} />} />
            <Route path='/orderplaced' element={<UserRoute element={<OrderPlaced />}/>} />
            <Route path='/notadmin' element={<NotAdmin />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path='/auth' element={<AlreadyLogin element={<Login />} /> } />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
