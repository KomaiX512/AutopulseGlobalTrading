import React, { useContext, useEffect, useState } from 'react';
import { HomeContext } from '../context/HomeContext';
import { Parser } from 'html-to-react';
import RelatedProducts from '../Components/RelatedProducts';
import { MdWhatsapp } from 'react-icons/md';
import { Row, Col, Card, Divider } from 'antd';
import './singleproduct.scss';
import ProductSpecificationTable from '../Components/ProductSpecificationTable';
import ProductImageGallery from '../Components/ProductImageGallery';
import ProductHero from '../Components/ProductHero';





const App = () => {
    const [reviewData, setReviewData] = useState([]);

    const context = useContext(HomeContext);
    const { state, methods } = context;

    useEffect(() => {
        methods.getProductDetails(location.pathname.split('/').pop());
    }, []);

    async function fetchReviews() {
        let reviews = await methods.loadReviews(state?.selectedProduct?.id);
        if (reviews) {
            setReviewData(reviews);
        }
    }

    useEffect(() => {
        fetchReviews();
    }, [state.selectedProduct]);

    const product = state?.selectedProduct;

    // Normalize images for gallery and ensure main image is included
    let galleryImages = product?.images?.map(img => ({
        ...img,
        path: img.path || img.image_path,
    })) || [];

    // Ensure main image is included in gallery if it exists and is not already present
    if (product?.image) {
        const mainImagePath = product.image.replace('public', '/storage');
        const mainImageAlreadyInGallery = galleryImages.some(img => {
            const imgPath = (img.path || img.image_path)?.replace('public', '/storage');
            return imgPath === mainImagePath;
        });
        
        if (!mainImageAlreadyInGallery) {
            galleryImages = [
                { 
                    path: product.image, 
                    alt: product.name || 'Main Image',
                    isMainImage: true 
                },
                ...galleryImages
            ];
        }
    }

    return (
        <div className="product-page-container">
            {/* Hero Section with Product Image */}
            <ProductHero product={product} />

            <div className="container mx-auto py-4">
                {/* Product Title Section - This can be removed if title is in Hero */}
                {/* <div className="product-title-section mb-6">
                    <h1 className="product-main-title">{product?.name}</h1>
                </div> */}

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
                            <ProductSpecificationTable product={product} />
                            
                            <Divider />

                            {/* Short Description */}
                            {product?.features && (
                                <Card title="Key Features" className="features-card mb-4">
                                    <div className="product-features">
                                        {Parser().parse(product.features)}
                                    </div>
                                </Card>
                            )}

                            {/* Action Buttons */}
                            <div className="action-buttons">
                                <a
                                    href={`https://wa.me/13072950382?text=${encodeURIComponent('Hey, I\'m interested in ' + product?.name)}`}
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
                    <Card title="Product Description" className="description-card">
                        <div className="product-description">
                            {product?.description ? 
                                Parser().parse(product.description) : 
                                <p>No description available for this product.</p>
                            }
                        </div>
                    </Card>
                </div>

                <Divider className="section-divider" />

                {/* Related Products */}
                <RelatedProducts />
            </div>
        </div>
    );
};

export default App;
