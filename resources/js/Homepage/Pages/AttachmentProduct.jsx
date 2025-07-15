import React, { useContext, useEffect, useState } from 'react';
import { HomeContext } from '../context/HomeContext';
import { Parser } from 'html-to-react';
import RelatedAttachments from '../Components/RelatedAttachments';
import { MdWhatsapp } from 'react-icons/md';
import { Row, Col, Card, Divider } from 'antd';
import '../Pages/singleproduct.scss';
import ProductSpecificationTable from '../Components/ProductSpecificationTable';
import ProductImageGallery from '../Components/ProductImageGallery';

const AttachmentProduct = () => {
    const [reviewData, setReviewData] = useState([]);

    const context = useContext(HomeContext);
    const { state, methods } = context;

    useEffect(() => {
        methods.getAttachmentDetails(location.pathname.split('/').pop());
    }, []);

    async function fetchReviews() {
        let reviews = await methods.loadReviews(state?.selectedAttachment?.id);
        if (reviews) {
            setReviewData(reviews);
        }
    }

    useEffect(() => {
        fetchReviews();
    }, [state.selectedAttachment]);

    const attachment = state?.selectedAttachment;

    // Normalize images for gallery and ensure main image is included
    let galleryImages = attachment?.images?.map(img => ({
        ...img,
        path: img.path || img.image_path,
    })) || [];

    // Ensure main image is included in gallery if it exists and is not already present
    if (attachment?.primary_image?.path) {
        const mainImagePath = attachment.primary_image.path.replace('public', '/storage');
        const mainImageAlreadyInGallery = galleryImages.some(img => {
            const imgPath = (img.path || img.image_path)?.replace('public', '/storage');
            return imgPath === mainImagePath;
        });
        
        if (!mainImageAlreadyInGallery) {
            galleryImages = [
                { 
                    path: attachment.primary_image.path, 
                    alt: attachment.name || 'Main Image',
                    isMainImage: true 
                },
                ...galleryImages
            ];
        }
    }

    // Create custom specifications for attachments
    const getAttachmentSpecifications = (attachment) => {
        return [
            {
                key: 'attachment_type',
                parameter: 'Attachment Type',
                details: attachment?.type || 'Standard',
                condition: () => attachment?.type
            },
            {
                key: 'compatibility',
                parameter: 'Compatibility',
                details: attachment?.compatibility || 'Universal Fit',
                condition: () => true
            },
            {
                key: 'material',
                parameter: 'Material',
                details: attachment?.material || 'High-Grade Steel',
                condition: () => true
            },
            {
                key: 'working_pressure',
                parameter: 'Working Pressure',
                details: attachment?.working_pressure ? `${attachment.working_pressure} bar` : null,
                condition: () => attachment?.working_pressure
            },
            {
                key: 'flow_rate',
                parameter: 'Flow Rate',
                details: attachment?.flow_rate ? `${attachment.flow_rate} L/min` : null,
                condition: () => attachment?.flow_rate
            }
        ];
    };

    const customSpecs = getAttachmentSpecifications(attachment);

    return (
        <div className="product-page-container">
            {/* Hero Section with Category Image */}
            {attachment?.category && (
                <div className="hero-section">
                    <div className="hero-image-container">
                        <img
                            src={`${attachment?.category?.image?.replace('public', '/storage') || '/storage/images/default-category.jpg'}`}
                            alt={`${attachment?.category?.name} Category`}
                            className="hero-image"
                        />
                        <div className="hero-overlay">
                            <h1 className="hero-title">{attachment?.category?.name}</h1>
                        </div>
                    </div>
                </div>
            )}

            <div className="container mx-auto py-4">
                {/* Product Title Section */}
                <div className="product-title-section mb-6">
                    <h1 className="product-main-title">{attachment?.name}</h1>
                </div>

                {/* Main Product Content */}
                <Row gutter={[24, 24]} align="top" justify="start">
                    {/* Left Column - Images */}
                    <Col xs={24} lg={12}>
                        <ProductImageGallery 
                            images={galleryImages}
                            height="400px"
                            showThumbnails={true}
                            thumbnailCount={4}
                        />
                    </Col>

                    {/* Right Column - Specifications and Actions */}
                    <Col xs={24} lg={12}>
                        <div className="product-info-section">
                            <ProductSpecificationTable 
                                product={attachment}
                                title="Attachment Specifications"
                                customFields={customSpecs}
                            />
                            
                            <Divider />

                            {/* Short Description */}
                            {attachment?.features && (
                                <Card title="Key Features" className="features-card mb-4">
                                    <div className="product-features">
                                        {Parser().parse(attachment.features)}
                                    </div>
                                </Card>
                            )}

                            {/* Action Buttons */}
                            <div className="action-buttons">
                                <a
                                    href={`https://wa.me/13072950382?text=${encodeURIComponent('Hey, I\'m interested in ' + attachment?.name)}`}
                                    className="whatsapp-button"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <MdWhatsapp size={20} />
                                    <span>Chat to Buy</span>
                                </a>
                            </div>
                        </div>
                    </Col>
                </Row>

                <Divider className="section-divider" />

                {/* Product Description Section */}
                <div className="product-description-section">
                    <Card title="Attachment Description" className="description-card">
                        <div className="product-description">
                            {attachment?.description ? 
                                Parser().parse(attachment.description) : 
                                <p>No description available for this attachment.</p>
                            }
                        </div>
                    </Card>
                </div>

                <Divider className="section-divider" />

                {/* Related Attachments */}
                <RelatedAttachments />
            </div>
        </div>
    );
};

export default AttachmentProduct; 