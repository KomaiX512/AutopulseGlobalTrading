import React, { useContext, useEffect, useState } from 'react';
import { HomeContext } from '../context/HomeContext';
import { Col, Row, Button } from 'antd';
import { FaArrowRight } from 'react-icons/fa';
import { useMobileDetector } from '../../utils/useMobileDetector';

function MachinesByBodyType() {
    const { state, methods } = useContext(HomeContext);
    const { isMobile } = useMobileDetector();
    const [showAllCategories, setShowAllCategories] = useState(false);

    useEffect(() => {
        // Load categories for machines
        methods.loadBrandsAndCats({ slug: 'machine' });
    }, []);

    const categories = state?.categories || [];
    
    // Filter to show only machine categories (you can adjust this filter as needed)
    const filteredCategories = categories.filter(cat => cat.product_type_id === 1);

    // For mobile: show only 4 categories initially, or all if "View All" is clicked
    const displayedCategories = isMobile && !showAllCategories 
        ? filteredCategories.slice(0, 4) 
        : filteredCategories;

    const handleViewAllCategories = () => {
        window.location.href = '/products/machine';
    };

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">
                        Heavy Machinery by Category
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Explore different types of heavy machinery and construction equipment by category
                    </p>
                </div>

                <div className="categories-container bg-gray-50 shadow-lg p-8">
                    <Row gutter={[]} style={{ gap: '20px' }}>
                        {displayedCategories.map((cat, index) => (
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
                                    href={`/products/machine/search?categories=${cat.id}&page=1&price=&type=machine`} 
                                    className="product-card group block" 
                                    style={{ height: '100%' }} 
                                    data-aos="zoom-in" 
                                    data-aos-delay="100"
                                >
                                    <div className="product-item w-full flex flex-col bg-white border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden" style={{ height: '100%', minHeight: '180px' }}>
                                        <div className="relative w-full overflow-hidden" style={{ height: '120px', flex: '0 0 120px' }}>
                                            <img
                                                loading='lazy'
                                                style={{ height: '100%', width: '100%', objectFit: "cover" }} 
                                                src={`${cat?.image?.replace('public', '/storage')}`}
                                                alt={cat?.name}
                                                className="transition-transform duration-500 group-hover:scale-110"
                                            />
                                            {/* Overlay for better text readability */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                                        </div>
                                        <div className="p-3 flex-1 flex flex-col justify-center" style={{ minHeight: '60px' }}>
                                            <h3 className="text-base font-semibold text-gray-800 text-center group-hover:text-yellow-600 transition-colors duration-300" style={{ fontSize: '16px', fontWeight: '600', lineHeight: '1.3' }}>
                                                {cat?.name}
                                            </h3>
                                        </div>
                                    </div>
                                </a>
                            </Col>
                        ))}
                    </Row>

                    {/* Mobile: Show "View All Categories" button if there are more than 4 categories */}
                    {isMobile && filteredCategories.length > 4 && !showAllCategories && (
                        <div className="text-center mt-8">
                            <Button 
                                type="primary" 
                                size="large"
                                onClick={handleViewAllCategories}
                                className="px-8 py-2 bg-yellow-600 hover:bg-yellow-700 border-yellow-600 hover:border-yellow-700 mobile-view-all-button"
                                icon={<FaArrowRight />}
                            >
                                View All Categories
                            </Button>
                        </div>
                    )}

                    {filteredCategories.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-lg">
                                No machinery categories available at the moment.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

export default MachinesByBodyType; 