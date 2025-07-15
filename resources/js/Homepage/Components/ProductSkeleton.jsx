import React from 'react';
import { Card, Col, Row, Skeleton } from 'antd';

const ProductCardSkeleton = () => {
    return (
        <Card className='prod-card-skelton' style={{ margin: '8px 0', borderRadius: '12px', overflow: 'hidden' }}>
            <Skeleton.Image 
                style={{ 
                    width: '100%', 
                    height: 280,
                    borderRadius: '8px'
                }} 
                active 
            />
            <div style={{ padding: '12px' }}>
                <Skeleton 
                    active 
                    paragraph={{ rows: 2, width: ['100%', '60%'] }}
                    title={{ width: '80%' }}
                />
                <div style={{ marginTop: '12px' }}>
                    <Skeleton.Button 
                        active 
                        style={{ 
                            width: '100%', 
                            height: '40px',
                            borderRadius: '8px'
                        }} 
                    />
                </div>
            </div>
        </Card>
    );
};

const ProductListSkeleton = ({ count = 12 }) => {
    return (
        <Row gutter={[8, 8]} justify="center">
            {Array.from({ length: count }).map((_, index) => (
                <Col
                    key={index}
                    xs={12}
                    sm={12}
                    md={8}
                    lg={6}
                    xl={6}
                    xxl={4}
                    style={{ marginBottom: '1rem' }}
                >
                    <ProductCardSkeleton />
                </Col>
            ))}
        </Row>
    );
};

export default ProductListSkeleton;
