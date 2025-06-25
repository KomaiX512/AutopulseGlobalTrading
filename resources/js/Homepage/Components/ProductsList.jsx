import React, { useContext } from 'react'
import { HomeContext } from '../context/HomeContext';
import Slider from 'react-slick';
import { FaChevronLeft, FaChevronRight, FaArrowRight } from 'react-icons/fa';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import ProductComponent from './ProductComponent';
import ProductListSkeleton from './ProductSkeleton';

const prod_types = {
    machines: 'Heavy Machinery',
}
const prod_links = {
    machines: 'machine',
}

function ProductsList({ product_type_key = null, product_type = {} }) {

    const { state, dispatch, methods } = useContext(HomeContext);

    const sliderRef = React.useRef(null);

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
        initialSlide: 0,
        arrows: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 4,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 750,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 3,
                    initialSlide: 3
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }
        ]
    };

    return (
        <div className="section-professional">
            <div className="container mx-auto px-4">
                <div className="card-professional p-8">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="heading-secondary mb-2">
                                Explore {prod_types[product_type_key]}
                            </h2>
                            <p className="text-muted">
                                Discover our premium collection of heavy machinery
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            {/* Navigation Buttons */}
                            <div className="flex gap-2">
                                <button 
                                    onClick={() => sliderRef.current.slickPrev()}
                                    className="btn-ghost p-3 rounded-full hover:bg-gray-100"
                                >
                                    <FaChevronLeft />
                                </button>
                                <button 
                                    onClick={() => sliderRef.current.slickNext()}
                                    className="btn-ghost p-3 rounded-full hover:bg-gray-100"
                                >
                                    <FaChevronRight />
                                </button>
                            </div>
                            {/* View All Button */}
                            <a 
                                href={`/products/${prod_links[product_type_key]}`} 
                                className="btn-primary px-6 py-3 text-sm"
                            >
                                <span className="mr-2">View All</span>
                                <FaArrowRight className="text-xs" />
                            </a>
                        </div>
                    </div>
                    
                    <div className="relative">
                        {state?.loadingProds ? (
                            <ProductListSkeleton count={4} />
                        ) : (
                            <Slider ref={sliderRef} {...settings}>
                                {product_type?.map((prod, index) => (
                                    <ProductComponent key={prod.id || index} prod={prod} index={index} />
                                ))}
                            </Slider>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductsList
