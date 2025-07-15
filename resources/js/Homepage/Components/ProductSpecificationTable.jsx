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
            render: (text) => (
                <strong 
                    style={{ 
                        color: '#2c3e50',
                        fontSize: window.innerWidth <= 768 ? '14px' : '16px',
                        lineHeight: '1.4'
                    }}
                >
                    {text}
                </strong>
            ),
            responsive: ['xs', 'sm', 'md', 'lg', 'xl']
        },
        {
            title: 'Details',
            dataIndex: 'details',
            key: 'details',
            width: '60%',
            render: (text) => (
                <span 
                    style={{ 
                        color: '#555',
                        fontSize: window.innerWidth <= 768 ? '14px' : '16px',
                        lineHeight: '1.4',
                        wordBreak: 'break-word'
                    }}
                >
                    {text}
                </span>
            ),
            responsive: ['xs', 'sm', 'md', 'lg', 'xl']
        }
    ];

    if (specifications.length === 0) {
        return null; // Don't render if no specifications
    }

    return (
        <Card 
            title={title} 
            className="specifications-card"
            bodyStyle={{ padding: window.innerWidth <= 768 ? '12px' : '24px' }}
        >
            {/* Mobile-optimized table */}
            <div className="specifications-table-container">
                <Table
                    columns={columns}
                    dataSource={specifications}
                    pagination={false}
                    size={window.innerWidth <= 768 ? "small" : "middle"}
                    bordered
                    className="specifications-table"
                    showHeader={false} // Hide header for cleaner look
                    scroll={{ x: true }} // Enable horizontal scroll on mobile
                />
            </div>
            
            <style jsx>{`
                .specifications-card {
                    margin-bottom: 20px;
                }
                
                .specifications-table-container {
                    overflow-x: auto;
                    -webkit-overflow-scrolling: touch;
                }
                
                .specifications-table .ant-table {
                    font-size: 14px;
                }
                
                .specifications-table .ant-table-tbody > tr > td {
                    padding: 12px 16px;
                    border-right: 1px solid #f0f0f0;
                    vertical-align: top;
                }
                
                .specifications-table .ant-table-tbody > tr:hover > td {
                    background-color: #f5f5f5;
                }
                
                @media (max-width: 768px) {
                    .specifications-card .ant-card-head {
                        padding: 12px 16px;
                        min-height: auto;
                    }
                    
                    .specifications-card .ant-card-head-title {
                        font-size: 16px;
                        font-weight: 600;
                    }
                    
                    .specifications-table .ant-table {
                        font-size: 13px;
                    }
                    
                    .specifications-table .ant-table-tbody > tr > td {
                        padding: 8px 12px;
                        min-height: 44px;
                        display: table-cell;
                        vertical-align: middle;
                    }
                    
                    .specifications-table .ant-table-tbody > tr > td:first-child {
                        background-color: #fafafa;
                        font-weight: 600;
                        width: 35%;
                        min-width: 120px;
                    }
                    
                    .specifications-table .ant-table-tbody > tr > td:last-child {
                        width: 65%;
                        word-wrap: break-word;
                        word-break: break-word;
                        hyphens: auto;
                    }
                }
                
                @media (max-width: 480px) {
                    .specifications-card {
                        margin: 0 -8px 16px -8px;
                        border-radius: 8px;
                    }
                    
                    .specifications-table .ant-table {
                        font-size: 12px;
                    }
                    
                    .specifications-table .ant-table-tbody > tr > td {
                        padding: 6px 8px;
                        min-height: 40px;
                    }
                    
                    .specifications-table .ant-table-tbody > tr > td:first-child {
                        width: 40%;
                        min-width: 100px;
                        font-size: 11px;
                        line-height: 1.3;
                    }
                    
                    .specifications-table .ant-table-tbody > tr > td:last-child {
                        width: 60%;
                        font-size: 12px;
                        line-height: 1.4;
                    }
                }
                
                /* Accessibility improvements */
                @media (prefers-reduced-motion: reduce) {
                    .specifications-table .ant-table-tbody > tr:hover > td {
                        transition: none;
                    }
                }
                
                /* High contrast mode support */
                @media (prefers-contrast: high) {
                    .specifications-table .ant-table-tbody > tr > td {
                        border-color: #000;
                    }
                    
                    .specifications-table .ant-table-tbody > tr > td:first-child {
                        background-color: #f0f0f0;
                    }
                }
            `}</style>
        </Card>
    );
};

export default ProductSpecificationTable; 