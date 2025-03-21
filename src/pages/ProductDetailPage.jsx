import React from 'react'
import Navbar from '../components/navbar/Navbar'
import ProductDetail from '../components/productDetail/ProductDetail'
import { MobileContextProvider } from '../components/mobile-context/MobileContext'

const ProductDetailPage = () => {
  return (
    <div>
      <MobileContextProvider>
        <Navbar/>
        <ProductDetail/>
      </MobileContextProvider>
    </div>
  )
}

export default ProductDetailPage;