import React, { useContext, useEffect } from 'react';
import { HomeContext } from '../context/HomeContext';
import { Col, Row } from 'antd';
import { FaArrowRight } from 'react-icons/fa';

function MachinesByBrand() {
    const { state, methods } = useContext(HomeContext);

    useEffect(() => {
        // Load brands for machines - this is the real brand loading from backend
        methods.loadBrandsAndCats({ slug: 'machine' });
    }, []);

    const brands = state?.brands || [];

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">
                        Heavy Machinery by Brand
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Choose from leading global manufacturers of heavy machinery and construction equipment
                    </p>
                </div>

                <div className="brands-container bg-gray-50 shadow-lg p-8">
                    <Row gutter={[]} style={{ gap: '30px' }}>
                        {brands.map((brand, index) => (
                            <Col
                                key={index}
                                xs={10}
                                sm={10}
                                md={8}
                                lg={10}
                                xl={6}
                                xxl={4}
                            >
                                <a 
                                    href={`/products/machine/search?brands=${brand.id}&page=1&price=&type=machine`} 
                                    className="product-card group block" 
                                    style={{ height: '100%' }} 
                                    data-aos="zoom-in" 
                                    data-aos-delay="100"
                                >
                                    <div className="product-item w-full bg-white border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
                                        <div className="relative h-24 w-full flex items-center justify-center p-4 bg-gray-50">
                                            <img
                                                loading='lazy'
                                                style={{ height: '60px', width: '100%', objectFit: "contain" }} 
                                                src={`${brand?.logo?.replace('public', '/storage')}`}
                                                alt={brand?.name}
                                                className="transition-transform duration-300 group-hover:scale-110"
                                            />
                                        </div>
                                        <div className="p-4">
                                            <h3 className="text-lg font-bold text-gray-800 text-center group-hover:text-yellow-600 transition-colors duration-300">
                                                {brand?.name}
                                            </h3>
                                            {brand.description && (
                                                <p className="text-gray-600 text-sm text-center mt-2 leading-relaxed">
                                                    {brand.description.replace(/<[^>]*>/g, '').substring(0, 100)}...
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </a>
                            </Col>
                        ))}
                    </Row>

                    {brands.length === 0 && (
                        <div className="text-center py-12">
                            <div className="max-w-md mx-auto">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                                    <FaArrowRight className="text-gray-400" size={24} />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                                    Brands Coming Soon
                                </h3>
                                <p className="text-gray-500">
                                    We're partnering with leading manufacturers to bring you the best heavy machinery brands.
                                </p>
                            </div>
                        </div>
                    )}

                    {/* View All Button - only show if there are brands */}
                    {brands.length > 0 && (
                        <div className="text-center mt-12">
                            <button 
                                className="btn-professional px-8 py-4 text-base font-bold flex items-center gap-2 mx-auto"
                                onClick={() => window.location.href = '/products/machine'}
                            >
                                <span>View All Machinery</span>
                                <FaArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

export default MachinesByBrand; 