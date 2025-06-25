import React from 'react'
import { Brands } from './Brands'
import BrandsContextProvider from './context/BrandContext'

function BrandsApp() {
    return (

        <BrandsContextProvider>
            <Brands />
        </BrandsContextProvider>
    )
}

export default BrandsApp
