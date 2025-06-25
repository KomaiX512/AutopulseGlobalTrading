import React, { useContext } from 'react';
import { Flex, Image, Tooltip } from 'antd';
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
        <div key={index} className="product-card" style={{ height: '100%' }} data-wow-delay={`0.${index + 2}s`}>
            <div className="product-item">
                <Flex gap={10} className='prod-images-modal'>
                    <Image.PreviewGroup>
                        <Image
                            loading='lazy'
                            src={`${attachment?.image ?
                                (attachment.image.startsWith('public/') ?
                                    attachment.image.replace('public', '/storage') :
                                    attachment.image.startsWith('/') ?
                                        `/storage${attachment.image}` :
                                        `/storage/${attachment.image}`
                                ) : '/images/placeholder-attachment.jpg'}`}
                            fallback="/images/placeholder-attachment.jpg"
                            alt={`Attachment Image ${index + 1}`}
                            style={{ width: '100%', maxHeight: '250px', marginBottom: '10px' }}
                        />
                        {attachment?.images?.map((image, idx) => (
                            <Image
                                loading='lazy'
                                key={idx}
                                src={`${image?.image_path?.replace('public', '/storage')}`}
                                alt={`Attachment Image ${idx + 1}`}
                                style={{ width: '0px !important', height: 'auto', marginBottom: '10px', display: 'none' }}
                            />
                        ))}
                    </Image.PreviewGroup>
                </Flex>

                <div className="product-details">
                    <div className="down-content">
                        {isBusiness && (
                            <div className="flex text-cats flex-wrap align-center gap-3 pb-3 py-1" style={{ lineHeight: "normal", fontSize: "12px" }}>
                                <div className="flex align-center gap-2">
                                    <GrCalendar color='#ceaa4d' size={16} />
                                    <span className='text-dark'>{attachment?.year || 'Latest'}</span>
                                </div>
                                <div className="flex align-center gap-2">
                                    <GrCar color='#ceaa4d' size={16} />
                                    <span className='text-dark'>{attachment?.category?.name}</span>
                                </div>
                                {attachment?.weight && (
                                    <div className="flex align-center gap-1">
                                        <RiWeightLine color='#ceaa4d' size={20} />
                                        <span className='text-dark'>{attachment.weight} kg</span>
                                    </div>
                                )}
                            </div>
                        )}
                        <a title='View Attachment Details' className='card-title-link' style={{ height: '40px', display: 'block' }} href={`/attachment/${attachment?.slug}`}>
                            <Tooltip title={attachment?.name}>
                                <h4 className='m-0'>
                                    {attachment?.name}
                                </h4>
                            </Tooltip>
                        </a>
                        {!isBusiness && (
                            <small>
                                <div style={{ color: "gray" }} className='mb-2 text-zinc-400'>Stock: {attachment?.stock || 0}</div>
                            </small>
                        )}
                    </div>

                    {isBusiness ? (
                        <a target='_blank' rel="noopener noreferrer" style={{ height: "60px" }} href={`https://wa.me/13072950382?text=${encodeURIComponent('I would like to inquire about ' + attachment?.name)}`} className="card-footers py-2">
                            <button style={{ width: '100%' }} className='btn-whatsapp'>
                                <MdWhatsapp size={20} stroke='3' />
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