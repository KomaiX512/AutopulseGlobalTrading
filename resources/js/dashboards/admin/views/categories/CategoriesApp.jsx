import React from 'react'
import CategoriesContextProvider from './context/CategoriesContext'
import { Categories } from './Categories'

function CategoriesApp() {
    return (

        <CategoriesContextProvider>
            <Categories />
        </CategoriesContextProvider>
    )
}

export default CategoriesApp
