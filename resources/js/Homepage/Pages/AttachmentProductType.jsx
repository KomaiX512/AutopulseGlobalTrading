import React, { useContext, useEffect } from 'react'
import { HomeContext } from '../context/HomeContext'
import { Button, Col, Row } from 'antd';
import AttachmentComponent from '../Components/AttachmentComponent';
import AttachmentsByCategory from '../Components/AttachmentsByCategory';

function AttachmentProductType() {

    const { state, methods, dispatch } = useContext(HomeContext);

    useEffect(() => {
        methods.loadAttachmentCategories();
        methods.filterAttachments({ page: 1 });
    }, [])

    return (
        <div className='sm-p-0 container pt-5 p-3 sm:p-0 flex flex-col gap-3'>

            {/* Category Section */}
            <AttachmentsByCategory rounded={false} cardRounded={false} />

            <div className="categories-container p-3 bg-white py-5">

                <div className="text-center mb-8 py-5 pb-5">
                    <span className="text-primary text-lg font-semibold">Products</span>
                    <h2 className="text-secondary text-2xl font-semibold">Explore Attachments & Accessories</h2>
                </div>

                <Row gutter={[16, 16]} justify="center">
                    {state?.filterAttachments?.attachments?.slice(0, 8)?.map((attachment, index) => (
                        <Col key={index} xs={12} sm={12} md={8} lg={6} xl={6}>
                            <AttachmentComponent attachment={attachment} index={index} />
                        </Col>
                    ))}
                </Row>

                <div className="text-center mt-8">
                    <Button 
                        type="primary" 
                        size="large"
                        onClick={() => window.location.href = '/products/attachments'}
                        className="px-8 py-2"
                    >
                        View All Attachments
                    </Button>
                </div>

            </div>

        </div>
    )
}

export default AttachmentProductType 