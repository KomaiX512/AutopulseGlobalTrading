import React, { useContext, useEffect } from 'react'
import { HomeContext } from '../context/HomeContext';
import Slider from 'react-slick';
import { FaChevronLeft, FaChevronRight, FaArrowRight } from 'react-icons/fa';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import AttachmentComponent from './AttachmentComponent';
import ProductListSkeleton from './ProductSkeleton';

function ExploreAttachments() {
    const { state, methods } = useContext(HomeContext);

    useEffect(() => {
        // Load attachments for the exploration section
        methods.loadAttachments();
    }, []);

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

    const attachments = state?.attachments || [];

    return (
        <div className="section-professional">
            <div className="container mx-auto px-4">
                <div className="card-professional p-8">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="heading-secondary mb-2">
                                Explore Attachments & Accessories
                            </h2>
                            <p className="text-muted">
                                Discover our premium collection of attachments and accessories
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            {/* Navigation Buttons */}
                            <div className="flex gap-2">
                                <button 
                                    onClick={() => sliderRef.current?.slickPrev()}
                                    className="btn-ghost p-3 rounded-full hover:bg-gray-100"
                                    disabled={state?.loadingAttachments || attachments.length === 0}
                                >
                                    <FaChevronLeft />
                                </button>
                                <button 
                                    onClick={() => sliderRef.current?.slickNext()}
                                    className="btn-ghost p-3 rounded-full hover:bg-gray-100"
                                    disabled={state?.loadingAttachments || attachments.length === 0}
                                >
                                    <FaChevronRight />
                                </button>
                            </div>
                            {/* View All Button */}
                            <a 
                                href="/products/attachments" 
                                className="btn-primary px-6 py-3 text-sm"
                            >
                                <span className="mr-2">View All</span>
                                <FaArrowRight className="text-xs" />
                            </a>
                        </div>
                    </div>
                    
                    <div className="relative">
                        {state?.loadingAttachments ? (
                            <ProductListSkeleton count={5} />
                        ) : attachments.length > 0 ? (
                            <Slider ref={sliderRef} {...settings}>
                                {attachments.map((attachment, index) => (
                                    <AttachmentComponent 
                                        key={attachment.id || index} 
                                        attachment={attachment} 
                                        index={index} 
                                    />
                                ))}
                            </Slider>
                        ) : (
                            <div className="text-center py-8">
                                <p className="text-gray-500">No attachments available at the moment.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ExploreAttachments 