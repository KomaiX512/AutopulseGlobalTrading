import React from 'react';
import { Card, Table } from 'antd';

const ProductSpecificationTable = ({ 
    product, 
    title = "Specifications",
    customFields = [],
    showDefaults = true 
}) => {
    // Default specification fields
    const defaultSpecifications = [
        {
            key: 'model',
            parameter: 'Model',
            details: product?.model || null,
            condition: () => product?.model
        },
        {
            key: 'condition',
            parameter: 'Condition',
            details: 'Used, Excellent',
            condition: () => true // Always show condition
        },
        {
            key: 'year',
            parameter: 'Year',
            details: product?.make || null,
            condition: () => product?.make
        },
        {
            key: 'weight',
            parameter: 'Operating Weight',
            details: product?.weight ? `${product.weight} kg` : null,
            condition: () => product?.weight
        },
        {
            key: 'category',
            parameter: 'Category',
            details: product?.category?.name || null,
            condition: () => product?.category?.name
        },
        {
            key: 'brand',
            parameter: 'Brand',
            details: product?.brand?.name || null,
            condition: () => product?.brand?.name
        },
        {
            key: 'price',
            parameter: 'Price',
            details: product?.price ? `$${product.price}` : null,
            condition: () => product?.price
        },
        {
            key: 'location',
            parameter: 'Location',
            details: 'China',
            condition: () => true // Always show location
        },
        {
            key: 'availability',
            parameter: 'Availability',
            details: product?.stock > 0 ? 'In Stock / Ready to Ship' : 'Out of Stock',
            condition: () => true // Always show availability
        }
    ];

    // Combine default and custom fields
    const allFields = showDefaults ? [...defaultSpecifications, ...customFields] : customFields;
    
    // Filter specifications based on conditions and available data
    const specifications = allFields
        .filter(spec => spec.condition && spec.condition() && spec.details !== null)
        .map((spec, index) => ({
            ...spec,
            key: spec.key || `spec-${index}`
        }));

    const columns = [
        {
            title: 'Parameter',
            dataIndex: 'parameter',
            key: 'parameter',
            width: '40%',
            render: (text) => <strong style={{ color: '#2c3e50' }}>{text}</strong>
        },
        {
            title: 'Details',
            dataIndex: 'details',
            key: 'details',
            width: '60%',
            render: (text) => <span style={{ color: '#555' }}>{text}</span>
        }
    ];

    if (specifications.length === 0) {
        return null; // Don't render if no specifications
    }

    return (
        <Card title={title} className="specifications-card">
            <Table
                columns={columns}
                dataSource={specifications}
                pagination={false}
                size="middle"
                bordered
                className="specifications-table"
                showHeader={false} // Hide header for cleaner look
            />
        </Card>
    );
};

export default ProductSpecificationTable; 