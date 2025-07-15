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
        autoplay: false,
        pauseOnHover: true,
        responsive: [
            {
                breakpoint: 1400,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    dots: true,
                    arrows: false
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    dots: true,
                    arrows: false
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: true,
                    arrows: false,
                    centerMode: true,
                    centerPadding: '20px'
                }
            }
        ]
    };

    return (
        <div className="section-professional">
            <div className="container mx-auto px-4">
                <div className="card-professional p-8">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
                        <div className="flex-1">
                            <h2 className="heading-secondary mb-2">
                                Explore {prod_types[product_type_key]}
                            </h2>
                            <p className="text-muted">
                                Discover our premium collection of heavy machinery
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                            {/* Navigation Buttons - Hidden on mobile */}
                            <div className="hidden md:flex gap-2">
                                <button 
                                    onClick={() => sliderRef.current.slickPrev()}
                                    className="btn-ghost p-3 rounded-full hover:bg-gray-100 min-w-[44px] min-h-[44px]"
                                    aria-label="Previous products"
                                >
                                    <FaChevronLeft />
                                </button>
                                <button 
                                    onClick={() => sliderRef.current.slickNext()}
                                    className="btn-ghost p-3 rounded-full hover:bg-gray-100 min-w-[44px] min-h-[44px]"
                                    aria-label="Next products"
                                >
                                    <FaChevronRight />
                                </button>
                            </div>
                            {/* View All Button */}
                            <a 
                                href={`/products/${prod_links[product_type_key]}`} 
                                className="btn-primary px-6 py-3 text-sm whitespace-nowrap min-h-[44px] flex items-center"
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
                            <div className="products-slider-container" style={{ margin: '0 -8px' }}>
                                <Slider ref={sliderRef} {...settings}>
                                    {product_type?.map((prod, index) => (
                                        <div key={prod.id || index} style={{ padding: '0 8px' }}>
                                            <ProductComponent prod={prod} index={index} />
                                        </div>
                                    ))}
                                </Slider>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductsList
