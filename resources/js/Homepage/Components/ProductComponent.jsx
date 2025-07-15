import React, { useContext } from 'react';
import { Image, Tooltip } from 'antd';
import { RiWeightLine } from 'react-icons/ri';
import { GrCalendar, GrCar } from 'react-icons/gr';
import { MdWhatsapp } from 'react-icons/md';
import { FaShoppingCart } from 'react-icons/fa';
import { HomeContext } from '../context/HomeContext';

function ProductComponent({ prod, index }) {


    const { methods } = useContext(HomeContext);

    const handleAddToCart = () => {
        methods.addToCart(prod.id)

    }

    return (
        <div key={index} className="product-card group" style={{ height: '100%' }} data-wow-delay={`0.${index + 2}s`}>
            <div className="product-item relative w-full flex flex-col bg-white border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden" style={{ height: '100%', minHeight: '400px' }}>

                {/* Enhanced Image wrapper with larger size and zoom & gradient overlay */}
                <div className="relative w-full overflow-hidden" style={{ height: '280px', flex: '0 0 280px' }}>
                    <Image.PreviewGroup>
                        <Image
                            loading='lazy'
                            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                            src={`${prod?.image ? (prod.image.startsWith('public/') ? prod.image.replace('public', '/storage') : `/storage/${prod.image}`) : '/images/placeholder-product.jpg'}`}
                            fallback="/images/placeholder-product.jpg"
                            alt={prod?.name || `Product ${index + 1}`}
                        />
                        {prod?.images?.map((image, idx) => (
                            <Image
                                loading='lazy'
                                key={idx}
                                src={`${image?.image_path?.replace('public', '/storage')}`}
                                alt={`Product Image ${idx + 1}`}
                                style={{ width: '0px !important', height: 'auto', marginBottom: '10px', display: 'none' }}
                            />
                        ))}
                    </Image.PreviewGroup>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                </div>

                <div className="product-details p-4 flex-1 flex flex-col justify-between" style={{ minHeight: '120px' }}>
                    <div className="down-content flex-1">
                        {prod.is_business_product && <div className="flex text-cats flex-wrap align-center gap-3 pb-3 py-2" style={{ lineHeight: "normal" ,fontSize:"14px"}}>

                            {prod?.category?.product_type_id != 2 && <div className="flex align-center gap-2">
                                <GrCalendar color='#6B7280' size={18} />
                                <span className='text-dark' style={{ fontSize: '14px', fontWeight: '500' }}>{prod?.make}</span>
                            </div>}
                            {prod?.category?.product_type_id !== 2 && (
                                <>
                                    <div className="flex align-center gap-2">
                                        <GrCar color='#6B7280' size={18} />
                                        <span className='text-dark' style={{ fontSize: '14px', fontWeight: '500' }}>{prod?.category?.name}</span>
                                    </div>
                                </>
                            )}
                            {prod?.category?.product_type_id === 1 && (
                                <>
                                    <div className="flex align-center gap-1">
                                        <RiWeightLine color='#6B7280' size={20} />
                                        <span className='text-dark' style={{ fontSize: '14px', fontWeight: '500' }}>{prod?.weight} Tons</span>
                                    </div>
                                </>

                            )}
                        </div>}
                        <a title='View Product Details' className='card-title-link' style={{ height: '50px', display: 'block' }} href={`${location.pathname.split('/')[1]=='parts' ? '/parts':''}/product/${prod?.slug}`}>
                            <Tooltip title={prod?.name}>
                                <h4 className='text-xl font-bold text-gray-800 text-center group-hover:text-gray-600 transition-colors duration-300 m-0' style={{ lineHeight: '1.3', fontSize: '18px' }}>
                                    {prod?.name}
                                </h4>
                            </Tooltip>
                        </a>
                        {!prod?.is_business_product && <>

                            <small ><div style={{ color: "gray", fontSize: '14px', fontWeight: '500' }} className='mb-2 text-zinc-400'>Stock: {prod?.stock}</div></small>
                        </>}
                    </div>

                    {prod?.is_business_product ? <a target='_blank' style={{ height: "60px" }} href={`https://wa.me/13072950382?text=${encodeURIComponent('I would like to investigate ' + prod?.name)}`} className="card-footers py-2">
                        <button
                            style={{ width: '100%' }}
                            className='btn-whatsapp'
                            href=''
                        >
                            <MdWhatsapp size={22} stroke='3' />
                            Chat Now
                        </button>
                    </a>
                        :
                        <button
                            style={{ width: '100%' }}
                            className='primary-btn !gap-3 flex items-center mb-2'
                            onClick={handleAddToCart}
                        >
                            <FaShoppingCart color='white' size={22} stroke='3' />
                            Add to Cart
                        </button>
                    }
                </div>
            </div>
        </div>
    );
}

export default ProductComponent;
