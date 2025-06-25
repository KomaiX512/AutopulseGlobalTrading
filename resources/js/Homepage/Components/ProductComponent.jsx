import React, { useContext, useState } from 'react';
import { Flex, Image, Modal, Tooltip } from 'antd';
import { RiWeightLine } from 'react-icons/ri';
import { PiEngineBold } from 'react-icons/pi';
import { GrCalendar, GrCar, GrCart } from 'react-icons/gr';
import { IoPricetagsOutline } from 'react-icons/io5';
import { MdWhatsapp } from 'react-icons/md';
import { FaPlus } from 'react-icons/fa6';
import { FaShoppingCart } from 'react-icons/fa';
import { HomeContext } from '../context/HomeContext';

function ProductComponent({ prod, index }) {


    const { methods, dispatch, state } = useContext(HomeContext);

    const handleAddToCart = () => {
        methods.addToCart(prod.id)

    }

    return (
        <div key={index} className="product-card" style={{ height: '100%' }} data-wow-delay={`0.${index + 2}s`}>
            <div className="product-item">

                <Flex gap={10} className='prod-images-modal'>
                    <Image.PreviewGroup >
                        <Image
                            loading='lazy'
                            key={index}
                            src={`${prod?.image ? (prod.image.startsWith('public/') ? prod.image.replace('public','/storage') : `/storage/${prod.image}`) : ''}`}
                            fallback="/images/placeholder-product.jpg"
                            alt={`Product Image ${index + 1}`}
                            style={{ width: '100%', maxHeight: '250px', marginBottom: '10px' }}
                        />
                        {prod?.images?.map((image, index) => (
                            <Image
                                loading='lazy'
                                key={index}
                                src={`${image?.image_path?.replace('public', '/storage')}`}
                                alt={`Product Image ${index + 1}`}
                                style={{ width: '0px !important', height: 'auto', marginBottom: '10px', display: 'none' }}
                            />
                        ))}
                    </Image.PreviewGroup>
                </Flex>

                <div className="product-details">
                    <div className="down-content">
                        {prod.is_business_product && <div className="flex text-cats flex-wrap align-center gap-3 pb-3 py-1" style={{ lineHeight: "normal" ,fontSize:"12px"}}>

                            {prod?.category?.product_type_id != 2 && <div className="flex align-center gap-2">
                                <GrCalendar color='#ceaa4d' size={16} />
                                <span className='text-dark'>{prod?.make}</span>
                            </div>}
                            {prod?.category?.product_type_id !== 2 && (
                                <>
                                    <div className="flex align-center gap-2">
                                        <GrCar color='#ceaa4d' size={16} />
                                        <span className='text-dark'>{prod?.category?.name}</span>
                                    </div>
                                </>
                            )}
                            {prod?.category?.product_type_id === 1 && (
                                <>
                                    <div className="flex align-center gap-1">
                                        <RiWeightLine color='#ceaa4d' size={20} />
                                        <span className='text-dark'>{prod?.weight} Tons</span>
                                    </div>
                                </>

                            )}
                        </div>}
                        <a title='View Product Details' className='card-title-link' style={{ height: '40px', display: 'block' }} href={`${location.pathname.split('/')[1]=='parts' ? '/parts':''}/product/${prod?.slug}`}>
                            <Tooltip title={prod?.name}>
                                <h4 className='m-0'>
                                    {prod?.name}
                                </h4>
                            </Tooltip>
                        </a>
                        {!prod?.is_business_product && <>

                            <small ><div style={{ color: "gray" }} className='mb-2 text-zinc-400'>Sotck: {prod?.stock}</div></small>
                        </>}
                    </div>

                    {prod?.is_business_product ? <a target='_blank' style={{ height: "60px" }} href={`https://wa.me/13072950382?text=${encodeURIComponent('I would like to investigate ' + prod?.name)}`} className="card-footers py-2">
                        <button
                            style={{ width: '100%' }}
                            className='btn-whatsapp'
                            href=''
                        >
                            <MdWhatsapp size={20} stroke='3' />
                            Chat Now
                        </button>
                    </a>
                        :
                        <button
                            style={{ width: '100%' }}
                            className='primary-btn !gap-3 flex items-center mb-2'
                            onClick={handleAddToCart}
                        >
                            <FaShoppingCart color='white' size={20} stroke='3' />
                            Add to Cart
                        </button>
                    }
                </div>
            </div>
        </div>
    );
}

export default ProductComponent;
