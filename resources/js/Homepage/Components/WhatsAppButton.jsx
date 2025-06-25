import React, { useState } from 'react';
import { FaWhatsapp, FaTimes, FaComments } from 'react-icons/fa';

function WhatsAppButton() {
    const [isOpen, setIsOpen] = useState(false);
    
    // WhatsApp number - replace with actual number
    const whatsappNumber = "+8613800000000"; // Replace with actual number
    
    const handleWhatsAppClick = () => {
        const message = "Hello! I'm interested in your heavy machinery. Can you help me?";
        const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    return (
        <>
            {/* Main WhatsApp Button */}
            <div 
                className={`whatsapp-btn ${isOpen ? 'scale-105' : ''}`}
            >
                <button
                    onClick={handleWhatsAppClick}
                    onMouseEnter={() => setIsOpen(true)}
                    onMouseLeave={() => setIsOpen(false)}
                    className="relative group w-full h-full flex items-center justify-center"
                >
                    <FaWhatsapp size={24} className="relative z-10" />
                    
                    {/* Tooltip */}
                    <div className={`absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-sm py-2 px-3 rounded-lg whitespace-nowrap transition-all duration-300 shadow-professional ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'}`}>
                        Chat with us on WhatsApp
                        <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-900"></div>
                    </div>
                </button>
            </div>

            {/* Chat Popup (Alternative design) */}
            {isOpen && (
                <div className="fixed bottom-20 right-6 z-40 card-professional max-w-sm transform transition-all duration-300">
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center">
                                <div className="gradient-primary rounded-full p-2 mr-3">
                                    <FaWhatsapp className="text-white" size={16} />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-800">Autopulse Support</h4>
                                    <p className="text-xs text-muted">Typically replies instantly</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1"
                            >
                                <FaTimes size={14} />
                            </button>
                        </div>
                        
                        <div className="mb-4">
                            <p className="text-sm text-gray-600 mb-3">
                                Hi there! 👋 How can we help you with heavy machinery today?
                            </p>
                            <div className="space-y-2">
                                <button 
                                    onClick={handleWhatsAppClick}
                                    className="w-full text-left p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200 text-sm border border-gray-200 hover:border-gray-300"
                                >
                                    💬 Get Product Information
                                </button>
                                <button 
                                    onClick={handleWhatsAppClick}
                                    className="w-full text-left p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200 text-sm border border-gray-200 hover:border-gray-300"
                                >
                                    💰 Request Quote
                                </button>
                                <button 
                                    onClick={handleWhatsAppClick}
                                    className="w-full text-left p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200 text-sm border border-gray-200 hover:border-gray-300"
                                >
                                    🚚 Shipping Information
                                </button>
                            </div>
                        </div>
                        
                        <button
                            onClick={handleWhatsAppClick}
                            className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                        >
                            <FaWhatsapp className="mr-2" />
                            Start Chat
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default WhatsAppButton; 