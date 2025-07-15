import React, { useContext } from 'react';
import { Image, Tooltip } from 'antd';
import { GrCalendar, GrCar } from 'react-icons/gr';
import { RiWeightLine } from 'react-icons/ri';
import { MdWhatsapp } from 'react-icons/md';
import { HomeContext } from '../context/HomeContext';

function AttachmentComponent({ attachment, index }) {
    const { methods } = useContext(HomeContext);

    // A placeholder for adding to cart if this functionality is added later
    const handleAddToCart = () => {
        // methods.addToCart(attachment.id);
        console.log("Add to cart clicked for attachment:", attachment.id);
    };

    const isBusiness = attachment.type === 'business'; // Assuming 'business' type exists

    return (
        <div key={index} className="product-card group" style={{ height: '100%' }} data-wow-delay={`0.${index + 2}s`}>
            <div className="product-item relative w-full flex flex-col bg-white border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden" style={{ height: '100%', minHeight: '400px' }}>
                {/* Enhanced Image section with larger size and zoom & gradient overlay + preview */}
                <div className="relative w-full overflow-hidden" style={{ height: '280px', flex: '0 0 280px' }}>
                    <Image.PreviewGroup>
                        <Image
                            loading='lazy'
                            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                            src={`${attachment?.primary_image?.path ?
                                attachment.primary_image.path.replace('public', '/storage') :
                                '/images/placeholder-attachment.jpg'}`}
                            fallback="/images/placeholder-attachment.jpg"
                            alt={attachment?.name || `Attachment ${index + 1}`}
                        />
                        {attachment?.images?.map((image, idx) => (
                            <Image
                                loading='lazy'
                                key={idx}
                                src={`${image?.path?.replace('public', '/storage')}`}
                                alt={`Attachment Image ${idx + 1}`}
                                style={{ width: '0px !important', height: 'auto', marginBottom: '10px', display: 'none' }}
                            />
                        ))}
                    </Image.PreviewGroup>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                </div>

                <div className="product-details p-4 flex-1 flex flex-col justify-between" style={{ minHeight: '120px' }}>
                    <div className="down-content flex-1">
                        {isBusiness && (
                            <div className="flex text-cats flex-wrap align-center gap-3 pb-3 py-2" style={{ lineHeight: "normal", fontSize: "14px" }}>
                                <div className="flex align-center gap-2">
                                    <GrCalendar color='#6B7280' size={18} />
                                    <span className='text-dark' style={{ fontSize: '14px', fontWeight: '500' }}>{attachment?.year || 'Latest'}</span>
                                </div>
                                {attachment?.category?.product_type_id != 2 && <div className="flex align-center gap-2">
                                    <GrCalendar color='#6B7280' size={18} />
                                    <span className='text-dark' style={{ fontSize: '14px', fontWeight: '500' }}>{attachment?.make}</span>
                                </div>}
                                {attachment?.category?.product_type_id !== 2 && (
                                    <>
                                        <div className="flex align-center gap-2">
                                            <GrCar color='#6B7280' size={18} />
                                            <span className='text-dark' style={{ fontSize: '14px', fontWeight: '500' }}>{attachment?.category?.name}</span>
                                        </div>
                                    </>
                                )}
                                {attachment?.category?.product_type_id === 1 && (
                                    <>
                                        <div className="flex align-center gap-1">
                                            <RiWeightLine color='#6B7280' size={20} />
                                            <span className='text-dark' style={{ fontSize: '14px', fontWeight: '500' }}>{attachment?.weight} Tons</span>
                                        </div>
                                    </>
                                )}
                            </div>
                        )}
                        <a title='View Attachment Details' className='card-title-link' style={{ height: '50px', display: 'block' }} href={`/attachment/${attachment?.slug}`}>
                            <Tooltip title={attachment?.name}>
                                <h4 className='text-xl font-bold text-gray-800 text-center group-hover:text-gray-600 transition-colors duration-300 m-0' style={{ lineHeight: '1.3', fontSize: '18px' }}>
                                    {attachment?.name}
                                </h4>
                            </Tooltip>
                        </a>
                        {!isBusiness && (
                            <small>
                                <div style={{ color: "gray", fontSize: '14px', fontWeight: '500' }} className='mb-2 text-zinc-400'>Stock: {attachment?.stock || 0}</div>
                            </small>
                        )}
                    </div>

                    {isBusiness ? (
                        <a target='_blank' rel="noopener noreferrer" style={{ height: "60px" }} href={`https://wa.me/13072950382?text=${encodeURIComponent('I would like to inquire about ' + attachment?.name)}`} className="card-footers py-2">
                            <button style={{ width: '100%' }} className='btn-whatsapp'>
                                <MdWhatsapp size={22} stroke='3' />
                                Chat Now
                            </button>
                        </a>
                    ) : (
                        <a title='View Attachment Details' href={`/attachment/${attachment?.slug}`} className="card-footers py-2">
                             <button style={{ width: '100%' }} className='primary-btn !gap-3 flex items-center mb-2'>
                                View Details
                            </button>
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AttachmentComponent; 