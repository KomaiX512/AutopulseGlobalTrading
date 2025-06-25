import React from 'react'
import ProductContextProvider from './context/ProductContext'
import { Outlet } from 'react-router-dom'

function ProductIndex() {
    return (
        <>
            <ProductContextProvider>
                <Outlet />
            </ProductContextProvider>
        </>
    )
}

export default ProductIndex
