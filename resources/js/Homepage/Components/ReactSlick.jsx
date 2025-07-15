import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from 'react';
import Slider from 'react-slick';
import { Button, Card, Flex } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

const CategoryCarousel = ({ categories = [] }) => {
    const sliderRef = React.useRef(null);

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
        initialSlide: 0,
        arrows: false, // Hide default arrows
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
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    dots: true,
                    arrows: false
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                    dots: true,
                    arrows: false,
                    centerMode: true,
                    centerPadding: '20px'
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
                    centerPadding: '40px'
                }
            }
        ]
    };

    return (
        <div className="category-carousel-container container mx-auto p-0" style={{ position: 'relative' }}>
            {/* Navigation Buttons - Hidden on mobile */}
            <Flex 
                align="center" 
                style={{ position: 'absolute', right: '0', top: '-50px', zIndex: 10 }} 
                justify="end" 
                gap={10} 
                className="hidden md:flex justify-between mb-2 mr-auto"
            >
                <Button 
                    onClick={() => sliderRef.current.slickPrev()} 
                    icon={<LeftOutlined />}
                    className="min-w-[44px] min-h-[44px] rounded-full"
                    aria-label="Previous categories"
                />
                <Button 
                    onClick={() => sliderRef.current.slickNext()} 
                    icon={<RightOutlined />}
                    className="min-w-[44px] min-h-[44px] rounded-full"
                    aria-label="Next categories"
                />
            </Flex>
            
            <div className="slider-content" style={{ margin: '0 -8px' }}>
                <Slider ref={sliderRef} {...settings}>
                    {categories?.map((category, index) => {
                        return (
                            <div key={index} style={{ padding: '0 8px' }}>
                                <a 
                                    href={`/products?&categories=${category?.id}&page=1&type=&sort=desc`} 
                                    className="block"
                                >
                                    <Card
                                        hoverable
                                        cover={
                                            <div className="category-image-container flex items-center justify-center bg-white" style={{ height: '120px', padding: '8px 0' }}>
                                                <img 
                                                    loading='lazy'
                                                    onError={(e) => {
                                                        e.target.onerror = null; 
                                                        e.target.src = '/images/placeholder-category.jpg';
                                                    }}
                                                    style={{ 
                                                        height: '100%',
                                                        width: '100%',
                                                        objectFit: 'contain',
                                                        display: 'block',
                                                        maxHeight: '90px',
                                                        margin: '0 auto'
                                                    }} 
                                                    alt={category.title} 
                                                    src={category.image ? 
                                                        (category.image.startsWith('public/') ? 
                                                            category.image.replace('public', '/storage') : 
                                                            `/storage/${category.image}`
                                                        ) : 
                                                        '/images/placeholder-category.jpg'
                                                    } 
                                                />
                                            </div>
                                        }
                                        className="h-full category-card transition-transform duration-300 hover:scale-105"
                                        bodyStyle={{ padding: '12px' }}
                                    >
                                        <Card.Meta
                                            title={
                                                <span className="text-base font-semibold text-gray-800 line-clamp-2 category-title" style={{ fontSize: '1.1rem', lineHeight: '1.3', minHeight: '2.5em', wordBreak: 'break-word' }}>
                                                    {category.name}
                                                </span>
                                            }
                                            description={
                                                <span className="text-sm text-gray-600" style={{ fontSize: '14px', fontWeight: '500' }}>
                                                    Products: {category?.prods_count[0]?.count || 0}
                                                </span>
                                            }
                                        />
                                    </Card>
                                </a>
                            </div>
                        );
                    })}
                </Slider>
            </div>
            
            <style jsx>{`
                .category-carousel-container .slick-dots {
                    bottom: -40px;
                    display: flex !important;
                    justify-content: center;
                    padding: 0;
                    margin: 0;
                }
                
                .category-carousel-container .slick-dots li {
                    margin: 0 4px;
                }
                
                .category-carousel-container .slick-dots li button {
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    background: #d1d5db;
                }
                
                .category-carousel-container .slick-dots li.slick-active button {
                    background: #3b82f6;
                }
                
                .category-image-container {
                    overflow: hidden;
                    border-radius: 8px 8px 0 0;
                }
                
                .category-card:hover .category-image-container img {
                    transform: scale(1.05);
                }
                
                @media (max-width: 768px) {
                    .category-carousel-container .slick-dots {
                        bottom: -30px;
                    }
                    
                    .category-carousel-container .slick-dots li button {
                        width: 8px;
                        height: 8px;
                    }
                    
                    .category-card {
                        margin: 0 4px;
                    }
                }
                
                @media (max-width: 480px) {
                    .category-image-container img {
                        height: 160px !important;
                    }
                }
                @media (min-width: 768px) {
                    .category-title {
                        font-size: 1.25rem !important;
                    }
                }
                @media (max-width: 480px) {
                    .category-title {
                        font-size: 1rem !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default CategoryCarousel;
