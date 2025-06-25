import React, { useContext, useEffect } from 'react'
import { HomeContext } from '../context/HomeContext';
import { Button, Col, Flex, Image, Row, Tag } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';

import Slider from 'react-slick';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';


import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MdWhatsapp } from 'react-icons/md';


function BusinessProd({ header = true }) {

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
        arrows: false,
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

        methods.loadBusinessprods();

    }, [])


    const handleAddtToCart = (id) => {

        methods.addToCart(id);

    };

    return (

        <div className="latest-products container p-3 border mt-3" style={{ padding: '30px 12px' }}>
            {header && <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                <h1 style={{fontSize:'20px'}} className="mb-3 text-left p-2">Business <span className="text-primary">Products</span></h1>
            </div>}
            <div className="container mx-auto p-0" style={{ position: 'relative' }}>
                <Flex align="center" style={{ position: 'absolute', right: '0', top: '-40px', }} justify="end" gap={10} className="flex  justify-between mb-2 mr-auto">
                    <Button onClick={() => sliderRef.current.slickPrev()} icon={<LeftOutlined />} />
                    <Button onClick={() => sliderRef.current.slickNext()} icon={<RightOutlined />} />
                </Flex>
                <div className=" pr-0" style={{ paddingRight: '0px !important' }}>
                    <Slider ref={sliderRef} {...settings}>
                        {state?.business_products?.map((prod, index) => (

                            <div className=" product-card" style={{ height: '100%' }} data-aos="zoom-in" data-aos-delay="100">
                                <div className="product-item" >
                                    <Image
                                        src={`${prod?.image.replace('public', '/storage')}`}
                                    />
                                    {prod?.is_business_product == 1 &&
                                        <Tag style={{ width: 'fit-content', position: 'absolute', top: "0px" }} color='purple'>
                                            Business
                                        </Tag>

                                    }
                                    <div className="product-details">
                                        <div className="down-content">
                                            <a title='View Product Details' className='card-title-link' href={`/product/${prod.slug}`}><h4>{prod.name}</h4></a>
                                            <Flex className='py-2' align='center' gap={15}><small><del>${prod.stock_price}</del></small><strong>${prod.price}</strong></Flex>
                                        </div>

                                        <a href={`https://wa.me/3126745947?text=${encodeURIComponent('Check out this product: ' + location.origin + '/product/' + prod.slug)}`} className="card-footers py-2 mb-3">

                                            <button
                                                style={{ width: '100%', background: "#52ca52" }}
                                                className='btn btn-primary btn-home-primary my-2'
                                                href=''
                                            >
                                                <MdWhatsapp size={20} stroke='3' />
                                                Send Message

                                            </button>

                                        </a>
                                    
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

export default BusinessProd

