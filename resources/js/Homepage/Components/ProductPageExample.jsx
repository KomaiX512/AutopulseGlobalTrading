import React from 'react';
import { Row, Col, Card, Divider } from 'antd';
import ProductImageGallery from './ProductImageGallery';
import ProductSpecificationTable from './ProductSpecificationTable';

// Example usage of the reusable components
const ProductPageExample = ({ product, productType = 'machinery' }) => {
    
    // Custom specifications for different product types
    const getCustomSpecifications = (type, product) => {
        switch (type) {
            case 'excavator':
                return [
                    {
                        key: 'engine_power',
                        parameter: 'Engine Power',
                        details: product?.engine_power ? `${product.engine_power} HP` : null,
                        condition: () => product?.engine_power
                    },
                    {
                        key: 'bucket_capacity',
                        parameter: 'Bucket Capacity',
                        details: product?.bucket_capacity ? `${product.bucket_capacity} m³` : null,
                        condition: () => product?.bucket_capacity
                    },
                    {
                        key: 'max_digging_depth',
                        parameter: 'Max Digging Depth',
                        details: product?.max_digging_depth ? `${product.max_digging_depth} m` : null,
                        condition: () => product?.max_digging_depth
                    }
                ];
            
            case 'truck':
                return [
                    {
                        key: 'payload_capacity',
                        parameter: 'Payload Capacity',
                        details: product?.payload_capacity ? `${product.payload_capacity} tons` : null,
                        condition: () => product?.payload_capacity
                    },
                    {
                        key: 'fuel_type',
                        parameter: 'Fuel Type',
                        details: product?.fuel_type || 'Diesel',
                        condition: () => true
                    },
                    {
                        key: 'transmission',
                        parameter: 'Transmission',
                        details: product?.transmission || 'Manual',
                        condition: () => true
                    }
                ];
            
            case 'spare_parts':
                return [
                    {
                        key: 'part_number',
                        parameter: 'Part Number',
                        details: product?.part_number || null,
                        condition: () => product?.part_number
                    },
                    {
                        key: 'compatibility',
                        parameter: 'Compatible With',
                        details: product?.compatibility || null,
                        condition: () => product?.compatibility
                    },
                    {
                        key: 'warranty',
                        parameter: 'Warranty',
                        details: product?.warranty || '6 months',
                        condition: () => true
                    }
                ];
            
            default:
                return [];
        }
    };

    const customSpecs = getCustomSpecifications(productType, product);

    return (
        <div className="product-page-example">
            <Row gutter={[24, 24]}>
                {/* Image Gallery Examples */}
                <Col xs={24} lg={12}>
                    <Card title="Standard Image Gallery" className="mb-4">
                        <ProductImageGallery 
                            images={product?.images}
                            height="300px"
                            showThumbnails={true}
                            thumbnailCount={4}
                        />
                    </Card>
                </Col>

                <Col xs={24} lg={12}>
                    <Card title="Compact Image Gallery" className="mb-4">
                        <ProductImageGallery 
                            images={product?.images}
                            height="200px"
                            showThumbnails={false}
                        />
                    </Card>
                </Col>
            </Row>

            <Divider />

            <Row gutter={[24, 24]}>
                {/* Specification Table Examples */}
                <Col xs={24} lg={12}>
                    <ProductSpecificationTable 
                        product={product}
                        title="Standard Specifications"
                        showDefaults={true}
                        customFields={customSpecs}
                    />
                </Col>

                <Col xs={24} lg={12}>
                    <ProductSpecificationTable 
                        product={product}
                        title="Custom Specifications Only"
                        showDefaults={false}
                        customFields={customSpecs}
                    />
                </Col>
            </Row>

            <Divider />

            {/* Full Product Layout Example */}
            <Card title="Complete Product Layout Example">
                <Row gutter={[24, 24]}>
                    <Col xs={24} lg={14}>
                        <ProductImageGallery 
                            images={product?.images}
                            height="400px"
                            showThumbnails={true}
                            thumbnailCount={5}
                        />
                    </Col>
                    <Col xs={24} lg={10}>
                        <ProductSpecificationTable 
                            product={product}
                            title={`${productType.charAt(0).toUpperCase() + productType.slice(1)} Specifications`}
                            showDefaults={true}
                            customFields={customSpecs}
                        />
                    </Col>
                </Row>
            </Card>
        </div>
    );
};

export default ProductPageExample; 