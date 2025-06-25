import React from 'react'
import { Outlet } from 'react-router-dom'
import BrandsContextProvider from './context/BrandContext'
function BrandIndex() {
    return (
        <div>
            <BrandsContextProvider >
                <Outlet />
            </BrandsContextProvider>
        </div>
    )
}

export default BrandIndex

