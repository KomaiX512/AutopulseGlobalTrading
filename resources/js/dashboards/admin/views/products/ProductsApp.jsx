import React from 'react'
import ProductContextProvider from './context/ProductContext'
import Products from './Products'
import { Outlet } from 'react-router-dom'


function ProductsApp() {
    return (

        <ProductContextProvider>
            <Products />
            <Outlet />
        </ProductContextProvider>
    )
}

export default ProductsApp
