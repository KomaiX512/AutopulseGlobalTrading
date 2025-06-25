import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { HomeContext } from '../context/HomeContext';
import ProductComponent from '../Components/ProductComponent';
import { Row, Col, Empty, Spin, Breadcrumb } from 'antd';
import { FaHome, FaCog, FaArrowLeft } from 'react-icons/fa';

function SolutionProducts() {
    const { slug } = useParams();
    const { state } = useContext(HomeContext);
    const [loading, setLoading] = useState(true);
    const [solution, setSolution] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSolution = async () => {
            try {
                setLoading(true);
                setError(null);
                const res = await fetch(`/api/solution/details/${slug}`);
                const data = await res.json();
                
                if (data.success && data.solution) {
                    setSolution(data.solution);
                } else {
                    setError('Solution not found');
                }
            } catch (e) {
                console.error('Error fetching solution:', e);
                setError('Failed to load solution');
            } finally {
                setLoading(false);
            }
        };
        
        if (slug) {
            fetchSolution();
        }
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Spin size="large" />
                <span className="ml-3 text-lg">Loading solution...</span>
            </div>
        );
    }

    if (error || !solution) {
        return (
            <div className="container mx-auto py-10 px-4">
                <div className="text-center py-20">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Solution Not Found</h2>
                    <p className="text-gray-600 mb-6">The solution you're looking for doesn't exist or has been removed.</p>
                    <button
                        onClick={() => window.location.href = '/solutions'}
                        className="primary-btn px-6 py-3 rounded-lg transition-colors duration-300"
                    >
                        <FaArrowLeft className="inline mr-2" />
                        Back to Solutions
                    </button>
                </div>
            </div>
        );
    }

    const products = solution.products || [];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Breadcrumb */}
            <div className="bg-white shadow-sm">
                <div className="container mx-auto px-4 py-4">
                    <Breadcrumb
                        items={[
                            {
                                href: '/',
                                title: <FaHome />,
                            },
                            {
                                href: '/solutions',
                                title: 'Solutions',
                            },
                            {
                                title: solution.name,
                            },
                        ]}
                    />
                </div>
            </div>

            {/* Hero Section */}
            <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">{solution.name}</h1>
                        <p className="text-xl md:text-2xl opacity-90 mb-8">{solution.description}</p>
                        {products.length > 0 && (
                            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 inline-block">
                                <span className="text-lg font-semibold">
                                    <FaCog className="inline mr-2" />
                                    {products.length} Machine{products.length !== 1 ? 's' : ''} Available
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Products Section */}
            <div className="container mx-auto py-12 px-4">
                {products.length > 0 ? (
                    <>
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-gray-800 mb-4">
                                Featured Machines for {solution.name}
                            </h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">
                                Explore our carefully selected heavy machinery designed specifically for {solution.name.toLowerCase()} applications.
                            </p>
                        </div>

                        <Row gutter={[24, 24]}>
                            {products.map((prod, idx) => (
                                <Col key={idx} xs={24} sm={12} md={8} lg={6} xl={6}>
                                    <ProductComponent prod={prod} index={idx} />
                                </Col>
                            ))}
                        </Row>

                        {/* Call to Action */}
                        <div className="text-center mt-12 p-8 bg-white rounded-lg shadow-md">
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">
                                Need Help Choosing the Right Machine?
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Our experts are here to help you find the perfect solution for your specific needs.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button 
                                    onClick={() => window.location.href = '/contact'}
                                    className="primary-btn px-8 py-3 rounded-lg font-semibold transition-colors duration-300"
                                >
                                    Get Expert Consultation
                                </button>
                                <button 
                                    onClick={() => window.location.href = '/products/machine'}
                                    className="bg-white text-yellow-600 border border-yellow-500 px-8 py-3 rounded-lg font-semibold transition-colors duration-300 hover:bg-yellow-50"
                                >
                                    Browse All Machines
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="text-center py-16">
                        <Empty 
                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                            description={
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                        No Machines Found
                                    </h3>
                                    <p className="text-gray-600 mb-6">
                                        We're currently updating our inventory for {solution.name}. 
                                        Check back soon or browse our complete machine catalog.
                                    </p>
                                </div>
                            }
                        >
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button 
                                    onClick={() => window.location.href = '/solutions'}
                                    className="primary-btn px-6 py-3 rounded-lg transition-colors duration-300"
                                >
                                    <FaArrowLeft className="inline mr-2" />
                                    Back to Solutions
                                </button>
                                <button 
                                    onClick={() => window.location.href = '/products/machine'}
                                    className="bg-white text-yellow-600 border border-yellow-500 px-6 py-3 rounded-lg transition-colors duration-300 hover:bg-yellow-50"
                                >
                                    Browse All Machines
                                </button>
                            </div>
                        </Empty>
                    </div>
                )}
            </div>

            {/* Related Solutions */}
            {state?.solutions && state.solutions.length > 1 && (
                <div className="bg-white py-12">
                    <div className="container mx-auto px-4">
                        <h3 className="text-2xl font-bold text-gray-800 text-center mb-8">
                            Other Solutions You Might Like
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {state.solutions
                                .filter(s => s.slug !== slug)
                                .slice(0, 3)
                                .map((relatedSolution) => (
                                    <div
                                        key={relatedSolution.id}
                                        className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow duration-300 cursor-pointer"
                                        onClick={() => window.location.href = `/solutions/${relatedSolution.slug}`}
                                    >
                                        <h4 className="text-lg font-semibold text-gray-800 mb-2">
                                            {relatedSolution.name}
                                        </h4>
                                        <p className="text-gray-600 text-sm mb-4">
                                            {relatedSolution.description?.substring(0, 100)}...
                                        </p>
                                        <span className="text-yellow-600 font-medium text-sm hover:text-yellow-700">
                                            Learn more →
                                        </span>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SolutionProducts; 