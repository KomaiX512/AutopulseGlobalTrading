import React, { useContext, useEffect } from 'react'
import { HomeContext } from '../context/HomeContext';
import { Button, Col, Flex, Image, Row, Tag } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { RiWeightLine } from "react-icons/ri";

import Slider from 'react-slick';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';


import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MdWhatsapp } from 'react-icons/md';
import ProductComponent from './ProductComponent';


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

        <div className="latest-products container p-3 bg-white mt-3" style={{ padding: '30px 12px' }}>
            <div className="text-center mb-8 py-2 pb-4 flex align-center justify-between px-1">
                <h2 className="text-secondary text-lg font-semibold">Related Products</h2>
                <button className='btn btn-primary btn-home-primary'>View All</button>
            </div>
            <div className="container mx-auto p-0" style={{ position: 'relative' }}>
                <Flex align="center" style={{ position: 'absolute', right: '0', top: '-40px', }} justify="end" gap={10} className="flex  justify-between mb-2 mr-auto">
                    <Button onClick={() => sliderRef.current.slickPrev()} icon={<LeftOutlined />} />
                    <Button onClick={() => sliderRef.current.slickNext()} icon={<RightOutlined />} />
                </Flex>
                <div className=" pr-0" style={{ paddingRight: '0px !important' }}>
                    <Slider ref={sliderRef} {...settings}>
                        {state?.relatedProducts?.map((prod, index) => (

                            <ProductComponent prod={prod} index={index} />
                        ))}
                    </Slider>
                </div>
            </div>
        </div >
    )
}

export default BusinessProd

