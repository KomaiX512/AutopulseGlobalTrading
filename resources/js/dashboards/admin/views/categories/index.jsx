import React from 'react'
import CategoriesContextProvider from './context/CategoriesContext'
import {
    CCard,
    CCardBody,
    CCardHeader,

} from '@coreui/react'
import { Outlet } from 'react-router-dom'

// import Categories from './Categories'

function CategoryIndex({ business = false }) {
    return (
        <div>
            <CategoriesContextProvider busines={business}>
                {/* <CCard className="mb-4"> */}
                {/* <CCardHeader>Categories</CCardHeader> */}
                {/* <CCardBody> */}
                <Outlet />
                {/* </CCardBody> */}
                {/* </CCard> */}

            </CategoriesContextProvider>
        </div>
    )
}

export default CategoryIndex


// import React from 'react'
// import ProductContextProvider from './context/ProductContext'
// import {
//     CCard,
//     CCardBody,
//     CCardHeader,

// } from '@coreui/react'

// function ProductIndex() {
//     return (
//         <>
//             <ProductContextProvider>
//                 <CCard className="mb-4">
//                     <CCardHeader>Products</CCardHeader>
//                     <CCardBody>
//                         <Outlet />
//                     </CCardBody>
//                 </CCard>
//             </ProductContextProvider>
//         </>
//     )
// }

// export default ProductIndex
