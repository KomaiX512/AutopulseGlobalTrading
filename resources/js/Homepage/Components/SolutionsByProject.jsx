import React, { useContext, useEffect, useState } from 'react';
import { HomeContext } from '../context/HomeContext';
import { FaArrowRight } from 'react-icons/fa';
import { Button } from 'antd';
import { useMobileDetector } from '../../utils/useMobileDetector';

function SolutionsByProject({ showExploreButton = true }) {
    const { state, methods } = useContext(HomeContext);
    const { isMobile } = useMobileDetector();
    const [showAllSolutions, setShowAllSolutions] = useState(false);

    useEffect(() => {
        methods.loadSolutions();
    }, []);

    // Remove fallback solutions - use only backend data
    const solutions = state?.solutions || [];

    // For mobile: show only 1 solution initially, or all if "View All" is clicked
    // For desktop: show only the first three solutions when explore button is visible (homepage)
    const displayedSolutions = isMobile && !showAllSolutions 
        ? solutions.slice(0, 1) 
        : showExploreButton 
            ? solutions.slice(0, 3) 
            : solutions;

    const handleCardClick = (slug) => {
        window.location.href = `/solutions/${slug}`;
    };

    const handleViewAllSolutions = () => {
        window.location.href = '/solutions';
    };

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">
                        Solutions by Industry or Project
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Find the perfect heavy machinery solutions tailored to your specific industry needs and project requirements
                    </p>
                </div>

                {displayedSolutions.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {displayedSolutions.map((solution) => (
                            <div
                                key={solution.id}
                                className="group relative bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden cursor-pointer flex flex-col"
                                style={{ height: '100%', minHeight: '450px' }}
                                onClick={() => handleCardClick(solution.slug)}
                            >
                                {/* Enhanced Background Image with larger placeholder */}
                                {solution.image && (
                                    <div className="relative overflow-hidden" style={{ height: '280px', flex: '0 0 280px' }}>
                                        <div
                                            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                                            style={{
                                                backgroundImage: `url(${solution.image.replace('public', '/storage')})`,
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center'
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                                        
                                        {/* Product Count Badge */}
                                        {solution.products_count > 0 && (
                                            <div className="absolute top-4 right-4 bg-gray-600 text-white px-3 py-1 rounded-full text-sm font-semibold" style={{ fontSize: '14px', fontWeight: '600' }}>
                                                {solution.products_count} Machines
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Enhanced Content with better typography */}
                                <div className="p-6 flex-1 flex flex-col justify-between" style={{ minHeight: '170px' }}>
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-gray-600 transition-colors duration-300" style={{ fontSize: '20px', fontWeight: '700', lineHeight: '1.3' }}>
                                            {solution.name}
                                        </h3>
                                        <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3 flex-1" style={{ fontSize: '15px', lineHeight: '1.5' }}>
                                            {solution.description}
                                        </p>
                                    </div>
                                    
                                    <div className="flex items-center justify-between">
                                        <button className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 transform group-hover:scale-105" style={{ fontSize: '14px', fontWeight: '600' }}>
                                            View Machines
                                        </button>
                                        <div className="text-gray-400 group-hover:text-gray-600 transition-colors duration-300">
                                            <FaArrowRight className="text-sm transform group-hover:translate-x-1 transition-transform duration-300" />
                                        </div>
                                    </div>
                                </div>

                                {/* Hover Border Effect */}
                                <div className="absolute inset-0 border-2 border-transparent group-hover:border-gray-200 transition-colors duration-300" />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No solutions available at the moment.</p>
                    </div>
                )}

                {/* Mobile: Show "View All Solutions" button if there are more than 1 solution */}
                {isMobile && solutions.length > 1 && !showAllSolutions && (
                    <div className="text-center mt-8">
                        <Button 
                            type="primary" 
                            size="large"
                            onClick={handleViewAllSolutions}
                            className="px-8 py-2 bg-yellow-600 hover:bg-yellow-700 border-yellow-600 hover:border-yellow-700 mobile-view-all-button"
                            icon={<FaArrowRight />}
                        >
                            View All Solutions
                        </Button>
                    </div>
                )}

                {/* Desktop: Explore All Solutions Button - Only show if showExploreButton is true and we're not on solutions page */}
                {!isMobile && showExploreButton && solutions.length > 0 && (
                    <div className="text-center mt-12">
                        <button 
                            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-4 px-8 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                            onClick={() => window.location.href = '/solutions'}
                        >
                            Explore All Solutions
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}

export default SolutionsByProject; 