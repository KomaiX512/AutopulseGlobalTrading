import React, { useContext, useEffect } from 'react';
import { HomeContext } from '../context/HomeContext';
import { FaArrowRight } from 'react-icons/fa';

function SolutionsByProject({ showExploreButton = true }) {
    const { state, methods } = useContext(HomeContext);

    useEffect(() => {
        methods.loadSolutions();
    }, []);

    // Remove fallback solutions - use only backend data
    const solutions = state?.solutions || [];

    // Show only the first six solutions when explore button is visible (homepage)
    const displayedSolutions = showExploreButton ? solutions.slice(0, 6) : solutions;

    const handleCardClick = (slug) => {
        window.location.href = `/solutions/${slug}`;
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
                                className="group relative bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden cursor-pointer"
                                onClick={() => handleCardClick(solution.slug)}
                            >
                                {/* Background Image */}
                                {solution.image && (
                                    <div className="relative h-48 overflow-hidden">
                                        <div
                                            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                                            style={{
                                                backgroundImage: `url(${solution.image.replace('public', '/storage')})`
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                                        
                                        {/* Product Count Badge */}
                                        {solution.products_count > 0 && (
                                            <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                                {solution.products_count} Machines
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Content */}
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-yellow-600 transition-colors duration-300">
                                        {solution.name}
                                    </h3>
                                    <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-3">
                                        {solution.description}
                                    </p>
                                    
                                    <div className="flex items-center justify-between">
                                        <button className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-all duration-300 transform group-hover:scale-105">
                                            View Machines
                                        </button>
                                        <div className="text-gray-400 group-hover:text-yellow-600 transition-colors duration-300">
                                            <FaArrowRight className="text-sm transform group-hover:translate-x-1 transition-transform duration-300" />
                                        </div>
                                    </div>
                                </div>

                                {/* Hover Border Effect */}
                                <div className="absolute inset-0 border-2 border-transparent group-hover:border-yellow-200 transition-colors duration-300" />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No solutions available at the moment.</p>
                    </div>
                )}

                {/* Explore All Solutions Button - Only show if showExploreButton is true and we're not on solutions page */}
                {showExploreButton && solutions.length > 0 && (
                    <div className="text-center mt-12">
                        <button 
                            className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-bold py-4 px-8 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
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