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
        responsive: [
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
                breakpoint: 600,
                settings: {
                    slidesToShow: 3,
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
        <div className="container mx-auto p-0" style={{ position: 'relative' }}>
            <Flex align="center" style={{ position: 'absolute', right: '0', top: '-40px', }} justify="end" gap={10} className="flex  justify-between mb-2 mr-auto">
                <Button onClick={() => sliderRef.current.slickPrev()} icon={<LeftOutlined />} />
                <Button onClick={() => sliderRef.current.slickNext()} icon={<RightOutlined />} />
            </Flex>
            <div className="">
                <Slider ref={sliderRef} {...settings}>
                    {categories?.map((category, index) => {
                        return <a href={`/products?&categories=${category?.id}&page=1&type=&sort=desc`} key={index} className="px-2">
                            <Card
                                hoverable
                                cover={<img loading='lazy'
                                    onError={(e)=>{e.target.onerror=null; e.target.src='/images/placeholder-category.jpg'}}
                                    style={{ height: '200px', objectFit: 'cover' }} alt={category.title} src={category.image ? (category.image.startsWith('public/') ? category.image.replace('public','/storage') : `/storage/${category.image}`) : '/images/placeholder-category.jpg'} />}
                                className="h-full"
                            >
                                <Card.Meta
                                    title={<a>{category.name}</a>}
                                    description={`Products: ${category?.prods_count[0]?.count}`}
                                />
                            </Card>
                        </a>
                    }
                    )}
                </Slider>
            </div>
        </div>
    );
};

export default CategoryCarousel;
