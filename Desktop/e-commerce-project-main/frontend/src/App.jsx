import React from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import {LoginPage,SignupPage,Home,CreateProduct,MyProducts,Cart} from "./Routes";
import "./App.css";
import ProductDetails from './pages/productDetails';

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/create-product" element={<CreateProduct />} />
      <Route path="/my-products" element={<MyProducts/>} />
      <Route path="/create-product/:id" element={<CreateProduct />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/product/:id" element={<ProductDetails />} />
    </Routes>
    </BrowserRouter>
    
  )
}

export default App