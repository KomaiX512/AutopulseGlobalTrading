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
    const [imageErrors, setImageErrors] = useState(new Set());
    
    const sliderRef1 = useRef(null);
    const sliderRef2 = useRef(null);

    useEffect(() => {
        setNav1(sliderRef1.current);
        setNav2(sliderRef2.current);
    }, []);

    // Prepare images array with fallback and error handling
    const processedImages = images && images.length > 0 
        ? images.map(img => {
            const imageSrc = (img?.path || img?.image_path)?.replace('public', '/storage') || fallbackImage;
            return {
                ...img,
                src: imageSrc,
                alt: img?.alt || 'Product Image',
                originalSrc: imageSrc // Keep original for debugging
            };
        })
        : [{ src: fallbackImage, alt: 'Default Product Image', originalSrc: fallbackImage }];

    // Filter out images that have failed to load
    const validImages = processedImages.filter((img, index) => {
        if (imageErrors.has(index)) {
            console.warn(`Image failed to load: ${img.originalSrc}`);
            return false;
        }
        return true;
    });

    // If no valid images, use fallback
    const finalImages = validImages.length > 0 ? validImages : [{ 
        src: fallbackImage, 
        alt: 'Default Product Image',
        originalSrc: fallbackImage 
    }];

    const handleImageError = (index) => {
        setImageErrors(prev => new Set([...prev, index]));
    };

    const mainSliderSettings = {
        asNavFor: nav2,
        ref: sliderRef1,
        fade: true,
        arrows: true,
        dots: false,
        infinite: finalImages.length > 1,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
    };

    const thumbnailSettings = {
        asNavFor: nav1,
        ref: sliderRef2,
        slidesToShow: Math.min(thumbnailCount, finalImages.length),
        slidesToScroll: 1,
        arrows: finalImages.length > thumbnailCount,
        dots: false,
        infinite: finalImages.length > thumbnailCount,
        focusOnSelect: true,
        vertical: false,
        centerMode: finalImages.length > thumbnailCount,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: Math.min(3, finalImages.length),
                    vertical: false,
                    arrows: false,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: Math.min(2, finalImages.length),
                    vertical: false,
                    arrows: false,
                }
            }
        ]
    };

    return (
        <div className="product-image-gallery">
            {/* Debug info - remove in production */}
            {process.env.NODE_ENV === 'development' && (
                <div style={{ 
                    background: '#f0f0f0', 
                    padding: '10px', 
                    margin: '10px 0', 
                    fontSize: '12px',
                    borderRadius: '4px'
                }}>
                    <strong>Debug Info:</strong><br/>
                    Total images: {images?.length || 0}<br/>
                    Valid images: {finalImages.length}<br/>
                    Failed images: {imageErrors.size}<br/>
                    {images?.map((img, idx) => (
                        <div key={idx}>
                            Image {idx + 1}: {(img?.path || img?.image_path)?.replace('public', '/storage')} 
                            {imageErrors.has(idx) ? ' ❌' : ' ✅'}
                        </div>
                    ))}
                </div>
            )}

            {/* Main Image Slider */}
            <div className="main-image-container">
                <Image.PreviewGroup>
                    <Slider {...mainSliderSettings}>
                        {finalImages.map((image, index) => (
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
                                    onError={() => handleImageError(index)}
                                    fallback={fallbackImage}
                                />
                            </div>
                        ))}
                    </Slider>
                </Image.PreviewGroup>
            </div>

            {/* Thumbnail Slider */}
            {showThumbnails && finalImages.length > 1 && (
                <div className="thumbnail-container">
                    <Slider {...thumbnailSettings}>
                        {finalImages.map((image, index) => (
                            <div key={index} className="thumbnail-slide">
                                <Image
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
                                    onError={() => handleImageError(index)}
                                    fallback={fallbackImage}
                                    preview={false}
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