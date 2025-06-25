import React, { useContext, useEffect } from 'react'
import { HomeContext } from '../context/HomeContext';
import ProductsList from './ProductsList';

function Latest({ header = true }) {

    const context = useContext(HomeContext);

    const { state, dispatch, methods } = context;

    useEffect(() => {
        
        methods?.loadProductsWithTypes();

    }, []);

    return (

        <>
            {
                state?.home_prods && Object?.keys(state?.home_prods)?.map((key, index) => {
                    return <ProductsList key={index} product_type_key={key} product_type={state?.home_prods[key]} />
                })
            }
        </>
    )
}

export default Latest

