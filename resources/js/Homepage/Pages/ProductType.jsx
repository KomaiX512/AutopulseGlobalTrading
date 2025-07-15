import React, { useContext, useEffect } from 'react'
import { HomeContext } from '../context/HomeContext'
import { Button, Col, Row } from 'antd';
import ProductComponent from '../Components/ProductComponent';

function ProductType() {

    const { state, methods, dispatch } = useContext(HomeContext);

    const prod_type = location.pathname.split('/').pop();

    // NEW: Determine if current product type is machine
    const isMachineType = prod_type === 'machine';

    useEffect(() => {

        methods.loadBrandsAndCats({ slug: prod_type });
        methods.filterProducts({ prod_type: prod_type, page: 1 });

    }, [])

    return (
        <div className='sm-p-0 container pt-5 p-3 sm:p-0 flex flex-col gap-3'>

            <div className="brands-container p-3 bg-white py-5">

                <div className="text-center mb-8 py-5 pb-5">
                    <span className="text-primary text-lg font-semibold">Brands</span>
                    <h2 className="text-secondary text-2xl font-semibold">Explore By Brands</h2>
                </div>

                <Row gutter={[16, 16]} justify="center">
                    {state?.brands?.map((brand, index) => (
                        <Col
                            key={index}
                            xs={12}
                            sm={8}
                            md={6}
                            lg={4}
                            xl={3}
                            xxl={2}
                            style={{ marginBottom: '1rem' }}
                        >
                            <a href={`${location.pathname.split('/')[1] == 'parts' ? '/parts' : ''}/products/${prod_type}/search?brands=${brand.id}&page=1&price=&type=${prod_type}`} 
                               className="product-card block" 
                               style={{ height: '100%' }} 
                               data-aos="zoom-in" 
                               data-aos-delay="100">
                                <div className="product-item w-full h-full flex flex-col items-center justify-center p-3 bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-all duration-300" style={{ minHeight: '120px' }}>
                                    <div className="image-container" style={{ height: '60px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.5rem' }}>
                                        <img
                                            loading='lazy'
                                            style={{ 
                                                maxHeight: '60px', 
                                                maxWidth: '100%', 
                                                objectFit: "contain",
                                                width: 'auto',
                                                height: 'auto'
                                            }} 
                                            src={`${brand?.logo?.replace('public', '/storage')}`}
                                            alt={brand?.name || 'Brand logo'} 
                                        />
                                    </div>
                                    <div className="text-dark font-medium text-primary text-center" style={{ fontSize: '1rem', lineHeight: '1.3', fontWeight: '600' }}>
                                        {brand?.name}
                                    </div>
                                </div>
                            </a>
                        </Col>
                    ))}
                </Row>
            </div>

            {prod_type != 'electric-bikes' && (
                <div className="categories-container p-3 bg-white">
                    <div className="text-center mb-8 py-5 pb-5">
                        <span className="text-primary text-lg font-semibold">Categories</span>
                        <h2 className="text-secondary text-2xl font-semibold">Explore By Categories</h2>
                    </div>
                    <Row gutter={[16, 16]} justify="center">
                        {state?.categories?.map((cat, index) => (
                            <Col
                                key={index}
                                xs={12}
                                sm={8}
                                md={6}
                                lg={4}
                                xl={3}
                                xxl={2}
                                style={{ marginBottom: '1rem' }}
                            >
                                <a href={`${location.pathname.split('/')[1] == 'parts' ? '/parts' : ''}/products/${prod_type}/search?categories=${cat.id}&page=1&price=&type=${prod_type}`} 
                                   className="product-card block" 
                                   style={{ height: '100%' }} 
                                   data-aos="zoom-in" 
                                   data-aos-delay="100">
                                    <div className="product-item w-full h-full flex flex-col bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300" style={{ minHeight: '160px' }}>
                                        <div className="image-container" style={{ height: '120px', width: '100%', overflow: 'hidden' }}>
                                            <img
                                                loading='lazy'
                                                style={{ 
                                                    height: '100%', 
                                                    width: '100%', 
                                                    objectFit: "cover"
                                                }} 
                                                src={`${cat?.image?.replace('public', '/storage')}`}
                                                alt={cat?.name || 'Category image'} 
                                            />
                                        </div>
                                        <div className="p-3 flex-1 flex items-center justify-center">
                                            <div className="text-dark font-medium text-primary text-center" style={{ fontSize: '1rem', lineHeight: '1.3', fontWeight: '600' }}>
                                                {cat?.name}
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </Col>
                        ))}
                    </Row>
                </div>
            )}

            <div className="latest-products my-5 bg-white">
                <div className="text-center mb-8 py-5 pb-5">
                    <span className="text-primary text-lg font-semibold">Products</span>
                    <h2 className="text-secondary text-2xl font-semibold">Explore Products</h2>
                </div>
                <div className="p-3 sm-p-0" style={{ minHeight: '70vh' }}>
                    <Row gutter={[8, 8]} justify="center">
                        {state?.filterProducts?.products?.map((prod, index) => (
                            index <= 11 && (
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
                                    <ProductComponent prod={prod} index={index} />
                                </Col>
                            )
                        ))}
                    </Row>

                    <div className="text-center mt-6">
                        <Button 
                            type='link' 
                            href={location.pathname + '/search'} 
                            className='primary-btn mx-auto px-10 py-3'
                            style={{ 
                                minHeight: '44px',
                                borderRadius: '8px'
                            }}
                        >
                            View All Products
                        </Button>
                    </div>

                </div>
            </div>

        </div >
    )
}

export default ProductType
