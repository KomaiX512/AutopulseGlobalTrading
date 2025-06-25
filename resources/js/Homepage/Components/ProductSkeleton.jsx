import React from 'react';
import { Card, Col, Row, Skeleton } from 'antd';

const ProductCardSkeleton = () => {
    return (
        <Card className='prod-card-skelton' style={{ margin: '16px 0' }}>
            <Skeleton.Image style={{ width: '100%', height: 200 }} />
            <Skeleton active paragraph={{ rows: 2 }} />
        </Card>
    );
};

const ProductListSkeleton = ({ count = 12 }) => {
    return (
        <Row gutter={[16, 16]}>
            {Array.from({ length: count }).map((_, index) => (
                <Col
                    key={index}
                    xs={24}
                    sm={12}
                    md={8}
                    lg={8}
                    xl={6}
                    xxl={6}
                >
                    <ProductCardSkeleton />
                </Col>
            ))}
        </Row>
    );
};

export default ProductListSkeleton;
