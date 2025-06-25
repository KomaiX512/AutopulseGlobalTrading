import React, { useContext, useEffect } from 'react';
import { HomeContext } from '../context/HomeContext';
import CategoryCarousel from './ReactSlick';

function Categories() {

    const context = useContext(HomeContext);
    const { state, methods } = context;

    useEffect(() => {
        methods.loadCategories();
    }, []);

    const categories = state?.categories || [];

    return (
        <section id="categories-section" className="container p-3 border" style={{ padding: "30px 12px !important" }}>
            <div className="text-center mb-8 py-5 pb-5">
                <span className="text-primary text-lg font-semibold">Machine</span>
                <h2 className="text-secondary text-2xl font-semibold">Explore Machines</h2>
            </div>
            <div id='categories-slider' className="">
                <CategoryCarousel categories={categories} />
            </div>
        </section>
    );
}

export default Categories;
