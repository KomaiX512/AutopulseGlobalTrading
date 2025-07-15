import React, { useContext, useEffect, useState } from 'react';
import { HomeContext } from '../context/HomeContext';
import { Col, Row, Button } from 'antd';
import { FaArrowRight } from 'react-icons/fa';
import { useMobileDetector } from '../../utils/useMobileDetector';

function MachinesByBrand() {
    const { state, methods } = useContext(HomeContext);
    const { isMobile } = useMobileDetector();
    const [showAllBrands, setShowAllBrands] = useState(false);

    useEffect(() => {
        // Load brands for machines - this is the real brand loading from backend
        methods.loadBrandsAndCats({ slug: 'machine' });
    }, []);

    const brands = state?.brands || [];

    // For mobile: show only 4 brands initially, or all if "View All" is clicked
    const displayedBrands = isMobile && !showAllBrands 
        ? brands.slice(0, 4) 
        : brands;

    const handleViewAllBrands = () => {
        window.location.href = '/products/machine';
    };

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
                    <Row gutter={[]} style={{ gap: '20px' }}>
                        {displayedBrands.map((brand, index) => (
                            <Col
                                key={index}
                                xs={8}
                                sm={8}
                                md={6}
                                lg={4}
                                xl={3}
                                xxl={2}
                            >
                                <a 
                                    href={`/products/machine/search?brands=${brand.id}&page=1&price=&type=machine`} 
                                    className="product-card group block" 
                                    style={{ height: '100%' }} 
                                    data-aos="zoom-in" 
                                    data-aos-delay="100"
                                >
                                    <div className="product-item w-full flex flex-col bg-white border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden" style={{ height: '100%', minHeight: '140px' }}>
                                        <div className="relative h-20 w-full flex items-center justify-center p-3 bg-gray-50">
                                            <img
                                                loading='lazy'
                                                style={{ height: '50px', width: '100%', objectFit: "contain" }} 
                                                src={`${brand?.logo?.replace('public', '/storage')}`}
                                                alt={brand?.name}
                                                className="transition-transform duration-300 group-hover:scale-110"
                                            />
                                        </div>
                                        <div className="p-3 flex-1 flex flex-col justify-center" style={{ minHeight: '60px' }}>
                                            <h3 className="text-base font-semibold text-gray-800 text-center group-hover:text-gray-600 transition-colors duration-300" style={{ fontSize: '16px', fontWeight: '600', lineHeight: '1.3' }}>
                                                {brand?.name}
                                            </h3>
                                        </div>
                                    </div>
                                </a>
                            </Col>
                        ))}
                    </Row>

                    {/* Mobile: Show "View All Brands" button if there are more than 4 brands */}
                    {isMobile && brands.length > 4 && !showAllBrands && (
                        <div className="text-center mt-8">
                            <Button 
                                type="primary" 
                                size="large"
                                onClick={handleViewAllBrands}
                                className="px-8 py-2 bg-yellow-600 hover:bg-yellow-700 border-yellow-600 hover:border-yellow-700 mobile-view-all-button"
                                icon={<FaArrowRight />}
                            >
                                View All Brands
                            </Button>
                        </div>
                    )}

                    {brands.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-lg">
                                No brands available at the moment.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

export default MachinesByBrand; 