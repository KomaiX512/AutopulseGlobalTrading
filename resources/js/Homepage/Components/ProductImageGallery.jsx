import React, { useState, useRef, useEffect } from 'react';
import { Image } from 'antd';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ProductImageGallery = ({ 
    images = [], 
    fallbackImage = '/storage/images/default-product.jpg',
    height = '400px',
    showThumbnails = true,
    thumbnailCount = 4
}) => {
    const [nav1, setNav1] = useState(null);
    const [nav2, setNav2] = useState(null);
    
    const sliderRef1 = useRef(null);
    const sliderRef2 = useRef(null);

    useEffect(() => {
        setNav1(sliderRef1.current);
        setNav2(sliderRef2.current);
    }, []);

    // Prepare images array with fallback
    const processedImages = images && images.length > 0 
        ? images.map(img => ({
            ...img,
            src: img?.image_path?.replace('public', '/storage') || fallbackImage,
            alt: img?.alt || 'Product Image'
        }))
        : [{ src: fallbackImage, alt: 'Default Product Image' }];

    const mainSliderSettings = {
        asNavFor: nav2,
        ref: sliderRef1,
        fade: true,
        arrows: true,
        dots: false,
        infinite: processedImages.length > 1,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
    };

    const thumbnailSettings = {
        asNavFor: nav1,
        ref: sliderRef2,
        slidesToShow: Math.min(thumbnailCount, processedImages.length),
        slidesToScroll: 1,
        arrows: processedImages.length > thumbnailCount,
        dots: false,
        infinite: processedImages.length > thumbnailCount,
        focusOnSelect: true,
        vertical: false,
        centerMode: processedImages.length > thumbnailCount,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: Math.min(3, processedImages.length),
                    vertical: false,
                    arrows: false,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: Math.min(2, processedImages.length),
                    vertical: false,
                    arrows: false,
                }
            }
        ]
    };

    return (
        <div className="product-image-gallery">
            {/* Main Image Slider */}
            <div className="main-image-container">
                <Image.PreviewGroup>
                    <Slider {...mainSliderSettings}>
                        {processedImages.map((image, index) => (
                            <div key={index} className="main-image-slide">
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    className="main-product-image"
                                    style={{ 
                                        width: '100%', 
                                        height: height, 
                                        objectFit: 'cover',
                                        borderRadius: '8px'
                                    }}
                                    placeholder={
                                        <div style={{ 
                                            width: '100%', 
                                            height: height, 
                                            backgroundColor: '#f0f0f0',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderRadius: '8px'
                                        }}>
                                            Loading...
                                        </div>
                                    }
                                />
                            </div>
                        ))}
                    </Slider>
                </Image.PreviewGroup>
            </div>

            {/* Thumbnail Slider */}
            {showThumbnails && processedImages.length > 1 && (
                <div className="thumbnail-container">
                    <Slider {...thumbnailSettings}>
                        {processedImages.map((image, index) => (
                            <div key={index} className="thumbnail-slide">
                                <img
                                    src={image.src}
                                    alt={`Thumbnail ${index + 1}`}
                                    className="thumbnail-image"
                                    style={{
                                        width: '80px',
                                        height: '80px',
                                        objectFit: 'cover',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                        border: '2px solid transparent',
                                        margin: '0 5px',
                                        transition: 'all 0.3s ease'
                                    }}
                                />
                            </div>
                        ))}
                    </Slider>
                </div>
            )}
        </div>
    );
};

export default ProductImageGallery; 