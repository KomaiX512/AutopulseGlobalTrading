import React from 'react'
import ProductContextProvider from './context/ProductContext'
import { SpareParts } from './SpareParts'
import { Outlet } from 'react-router-dom'

function ProductsApp() {
    return (

        <ProductContextProvider>
            <SpareParts />
            <Outlet />
        </ProductContextProvider>
    )
}

export default ProductsApp
