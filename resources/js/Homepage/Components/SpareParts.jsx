import React, { useContext, useEffect } from 'react'
import { HomeContext } from '../context/HomeContext';
import { Button, Col, Flex, Image, Row, Tag } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';

import Slider from 'react-slick';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';


import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



function Latest({ header = true }) {

    const context = useContext(HomeContext);

    const { state, dispatch, methods } = context;

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


    useEffect(() => {

        methods.loadProducts();

        window.addEventListener('resize', () => {
            if (screen.availWidth < 787) {
                let elementsArray = document.querySelectorAll('.latest-products .col-lg-3');
                console.log('elements', elementsArray);
                elementsArray.forEach((el) => {
                    el.classList.remove('col-lg-3', 'col-md-8');
                    el.classList.add('col-6')
                })
            }
        })
    }, [])


    const handleAddtToCart = (id) => {

        methods.addToCart(id);

    };

    return (

        <div className="latest-products container" style={{ padding: '60px 12px' }}>
            {header && <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                <h4 className="mb-3 text-left p-2">Business <span className="text-primary">Products</span></h4>
            </div>}
            <div className="container mx-auto p-0" style={{ position: 'relative' }}>
                <Flex align="center" style={{ position: 'absolute', right: '0', top: '-40px', }} justify="end" gap={10} className="flex  justify-between mb-2 mr-auto">
                    <Button onClick={() => sliderRef.current.slickPrev()} icon={<LeftOutlined />} />
                    <Button onClick={() => sliderRef.current.slickNext()} icon={<RightOutlined />} />
                </Flex>
                <div className="p-3 bg-white pr-0" style={{ paddingRight: '0px !important' }}>
                    <Slider ref={sliderRef} {...settings}>
                        {state?.products?.map((prod, index) => (

                            <div className=" product-card mb-5  wow fadeInUp" style={{ height: '100%' }} data-wow-delay="0.2s">
                                <div className="product-item" >
                                    <Image
                                        loading='lazy'
                                        src={prod.image_url}
                                    />
                                    <div className="product-details pt-3 pb-0 p-2">
                                        <div className="down-content">
                                            <a title='View Product Details' className='card-title-link' href={`/product/${prod.slug}`}><h4 className='m-0'>{prod.name}</h4></a>
                                            <Flex className='py-2' align='center' gap={15}><small><del>${prod.stock_price}</del></small><strong>${prod.price}</strong></Flex>
                                        </div>
                                        <Flex align='center' wrap justify='space-between' className="card-footers py-2">
                                            {prod.stock > 1 ? <>

                                                <div className="icon-rount-container p-1">
                                                    <Button
                                                        type="link"
                                                        icon={<ShoppingCartOutlined style={{ fontSize: '20px' }} />}
                                                        onClick={() => handleAddtToCart(prod.id)}
                                                    />
                                                </div>
                                                <div style={{ fontSize: '13px' }} className='btn btn-primary btn-home-primary py-1 px-3 mt-2'>
                                                    Buy Now
                                                </div>
                                            </>
                                                :
                                                <Tag color="error">OUT OF STOCK</Tag>
                                            }
                                        </Flex>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </div >
    )
}

export default Latest

