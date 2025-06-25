import React, { useContext, useEffect } from 'react';
import { HomeContext } from '../context/HomeContext';
import { FaArrowRight, FaWrench, FaLink, FaTools, FaCogs } from 'react-icons/fa';

function AttachmentsSection() {
    const { state, methods } = useContext(HomeContext);

    useEffect(() => {
        // Load attachments from database
        methods.loadAttachments();
    }, []);

    const attachments = state?.attachments || [];

    // Default icon mapping based on attachment name
    const getAttachmentIcon = (name) => {
        const iconMap = {
            'hydraulic': FaWrench,
            'hammer': FaWrench,
            'coupler': FaLink,
            'quick': FaLink,
            'bucket': FaTools,
            'ripper': FaCogs,
            'auger': FaCogs,
            'default': FaTools
        };

        const lowerName = name.toLowerCase();
        for (const [key, Icon] of Object.entries(iconMap)) {
            if (lowerName.includes(key)) {
                return Icon;
            }
        }
        return iconMap.default;
    };

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">
                        Attachments & Accessories
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Enhance your machinery's capabilities with our premium attachments and accessories
                    </p>
                </div>

                {attachments.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                        {attachments.map((attachment) => {
                            const IconComponent = getAttachmentIcon(attachment.name);
                            
                            return (
                                <div
                                    key={attachment.id}
                                    className="group relative bg-white border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden cursor-pointer"
                                    onClick={() => window.location.href = `/products/attachments`}
                                >
                                    {/* Background Image */}
                                    <div className="relative h-40 overflow-hidden">
                                        <div 
                                            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                                            style={{
                                                backgroundImage: `url(${attachment.image ? attachment.image.replace('public', '/storage') : '/images/placeholder-attachment.jpg'})`,
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center'
                                            }}
                                        >
                                            {/* Fallback gradient background */}
                                            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-yellow-600 opacity-90"></div>
                                        </div>
                                        
                                        {/* Icon Overlay */}
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="text-white group-hover:scale-110 transition-transform duration-300">
                                                <IconComponent size={40} />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-yellow-600 transition-colors duration-300">
                                            {attachment.name}
                                        </h3>
                                        <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                                            {attachment.description ? 
                                                attachment.description.replace(/<[^>]*>/g, '').substring(0, 80) + '...' : 
                                                `Professional ${attachment.name.toLowerCase()} attachment for enhanced machinery performance`
                                            }
                                        </p>
                                        
                                        {/* Action */}
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center text-yellow-600 group-hover:text-yellow-700 transition-colors duration-300">
                                                <span className="text-sm font-medium mr-2">Learn More</span>
                                                <FaArrowRight className="text-xs transform group-hover:translate-x-1 transition-transform duration-300" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    // Placeholder content when no attachments are available
                    <div className="text-center py-12">
                        <div className="max-w-md mx-auto">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                                <FaTools className="text-gray-400" size={24} />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-700 mb-2">
                                Attachments Coming Soon
                            </h3>
                            <p className="text-gray-500">
                                We're preparing our comprehensive attachment catalog. Check back soon for the latest accessories and attachments.
                            </p>
                        </div>
                    </div>
                )}

                {/* View All Button - only show if there are attachments */}
                {attachments.length > 0 && (
                    <div className="text-center mt-12">
                        <button 
                            className="btn-professional px-8 py-4 text-base font-bold flex items-center gap-2 mx-auto"
                            onClick={() => window.location.href = '/products/attachments'}
                        >
                            <span>View All Attachments</span>
                            <FaArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}

export default AttachmentsSection; 