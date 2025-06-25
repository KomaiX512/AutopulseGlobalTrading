import React, { useContext, useEffect } from 'react';
import { HomeContext } from '../context/HomeContext';
import { Col, Row } from 'antd';

function MachinesByBodyType() {
    const { state, methods } = useContext(HomeContext);

    useEffect(() => {
        // Load categories for machines - this is the real category loading from backend
        methods.loadBrandsAndCats({ slug: 'machine' });
    }, []);

    const categories = state?.categories || [];

    // Filter out attachment, accessory, and coupling/coupler categories by name
    const filteredCategories = categories.filter(cat => {
        const name = cat?.name?.toLowerCase() || '';
        return !name.includes('attachment') && !name.includes('accessor') && !name.includes('coupler') && !name.includes('coupling');
    });

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">
                        Heavy Machinery by Category
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Explore our comprehensive range of heavy machinery across different categories
                    </p>
                </div>

                <div className="categories-container bg-white shadow-lg p-8">
                    <Row gutter={[]} style={{ gap: '30px' }}>
                        {filteredCategories.map((cat, index) => (
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
                                    href={`/products/machine/search?categories=${cat.id}&page=1&price=&type=machine`} 
                                    className="product-card group block" 
                                    style={{ height: '100%' }} 
                                    data-aos="zoom-in" 
                                    data-aos-delay="100"
                                >
                                    <div className="product-item w-full flex flex-col align-center gap-1 bg-white border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
                                        <div className="relative h-48 w-full overflow-hidden">
                                            <img
                                                loading='lazy'
                                                style={{ height: '200px', width: '100%', objectFit: "cover" }} 
                                                src={`${cat?.image?.replace('public', '/storage')}`}
                                                alt={cat?.name}
                                                className="transition-transform duration-500 group-hover:scale-110"
                                            />
                                            {/* Overlay for better text readability */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                                        </div>
                                        <div className="p-4 flex-1 flex flex-col justify-between">
                                            <h3 className="text-lg font-bold text-gray-800 text-center group-hover:text-yellow-600 transition-colors duration-300">
                                                {cat?.name}
                                            </h3>
                                            {cat.description && (
                                                <p className="text-gray-600 text-sm text-center mt-2 leading-relaxed">
                                                    {cat.description.replace(/<[^>]*>/g, '').substring(0, 80)}...
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </a>
                            </Col>
                        ))}
                    </Row>

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