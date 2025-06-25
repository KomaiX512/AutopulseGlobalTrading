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

            <div className="brands-container p-3 bg-white py-5 ">

                <div className="text-center mb-8 py-5 pb-5">
                    <span className="text-primary text-lg font-semibold">Brands</span>
                    <h2 className="text-secondary text-2xl font-semibold">Explore By Brands</h2>
                </div>

                <Row gutter={[]} style={{ gap: '30px' }}>
                    {state?.brands?.map((brand, index) => (
                        <Col
                            key={index}
                            xs={10}
                            sm={10}
                            md={8}
                            lg={10}
                            xl={6}
                            xxl={4}
                        >
                            <a href={`${location.pathname.split('/')[1] == 'parts' ? '/parts' : ''}/products/${prod_type}/search?brands=${brand.id}&page=1&price=&type=${prod_type}`} className=" product-card" style={{ height: '100%' }} data-aos="zoom-in" data-aos-delay="100">
                                <div className="product-item w-full"  >
                                    <img
                                        loading='lazy'
                                        style={{ height: '100px', width: '100%', objectFit: "contain" }} src={`${brand?.logo?.replace('public', '/storage')}`}
                                        alt="" />
                                    <div className="text-dark font-medium text-primary text-center">
                                        {brand?.name}
                                    </div>
                                </div>
                            </a>
                        </Col>
                    ))}
                </Row>
            </div>

            {prod_type != 'electric-bikes' && <div className="categories-container p-3 py-5 bg-white  ">
                <div className="text-center mb-8 py-5 pb-5">
                    <span className="text-primary text-lg font-semibold">Categories</span>
                    <h2 className="text-secondary text-2xl font-semibold">Explore By Categories</h2>
                </div>
                <Row gutter={[]} style={{ gap: '30px' }}>
                    {(isMachineType ? (state?.categories || []).filter(cat => {
                        const name = (cat?.name || '').toLowerCase();
                        return !name.includes('attachment') && !name.includes('accessor') && !name.includes('coupler') && !name.includes('coupling');
                    }) : state?.categories)?.map((cat, index) => (
                        <Col
                            key={index}
                            xs={10}
                            sm={10}
                            md={8}
                            lg={10}
                            xl={6}
                            xxl={4}
                        >
                            {/* <a
                                href={`/products/${prod_type}/search?categories=${cat.id}&page=1&price=&type=${prod_type}`}
                                className="product-card" style={{ height: '100%' }} data-aos="zoom-in" data-aos-delay="100">
                                <div className="product-item flex border flex-col align-center gap-1" >
                                    <img loading='lazy'

                                        style={{ height: '200px', objectFit: 'cover' }} src={`${cat?.image?.replace('public', '/storage')}`}
                                        alt="" />
                                    <div className="text-dark text-primary text-center py-3">
                                        {cat?.name}
                                    </div>
                                </div>
                            </a> */}
                            <a href={`${location.pathname.split('/')[1] == 'parts' ? '/parts' : ''}/products/${prod_type}/search?categories=${cat.id}&page=1&price=&type=${prod_type}`} className=" product-card" style={{ height: '100%' }} data-aos="zoom-in" data-aos-delay="100">
                                <div className="product-item w-full flex  flex-col align-center gap-1"  >
                                    <img
                                        loading='lazy'
                                        style={{ height: '200px', width: '100%', objectFit: "cover" }} src={`${cat?.image?.replace('public', '/storage')}`}
                                        alt="" />
                                    <div className="text-dark font-medium text-primary text-center">
                                        {cat?.name}
                                    </div>
                                </div>
                            </a>
                        </Col>
                    ))}
                </Row>
            </div>}

            <div className="latest-products my-5 bg-white">
                <div className="text-center mb-8 py-5 pb-5">
                    <span className="text-primary text-lg font-semibold">Products</span>
                    <h2 className="text-secondary text-2xl font-semibold">Explore Products</h2>
                </div>
                <div className="p-3 sm-p-0" style={{ minHeight: '70vh' }}>
                    <Row gutter={[]}>
                        {state?.filterProducts?.products?.map((prod, index) => (
                            index <= 11 && <Col
                                key={index}
                                xs={12}
                                sm={10}
                                md={8}
                                lg={8}
                                xl={5}
                                xxl={5}
                            >
                                <ProductComponent prod={prod} index={index} />

                            </Col>
                        ))}
                    </Row>

                    <Button type='link' href={location.pathname + '/search'} className='primary-btn my-3 mx-auto !px-10 w-fit !py-5'>View All Products</Button>

                </div>
            </div>

        </div >
    )
}

export default ProductType
