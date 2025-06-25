import React from 'react';

const ProductHero = ({ product }) => {
    // Use product's primary image, fallback to category image, then to a default
    const heroImageUrl = product?.image
        ? product.image.replace('public', '/storage')
        : (product?.category?.image
            ? product.category.image.replace('public', '/storage')
            : '/storage/images/default-category.jpg');

    const heroTitle = product?.name || 'Product Details';

    return (
        <div className="hero-section">
            <div className="hero-image-container">
                <img
                    src={heroImageUrl}
                    alt={product?.name || 'Product'}
                    className="hero-image"
                />
                <div className="hero-overlay">
                    <h1 className="hero-title">{heroTitle}</h1>
                </div>
            </div>
        </div>
    );
};

export default ProductHero; 