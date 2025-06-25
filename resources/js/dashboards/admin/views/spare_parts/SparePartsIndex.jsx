import React from 'react'
import ProductContextProvider from './context/ProductContext'
import { Outlet } from 'react-router-dom'

function SparePartsIndex() {
    return (
        <>
            <ProductContextProvider>
                <Outlet />
            </ProductContextProvider>
        </>
    )
}

export default SparePartsIndex
