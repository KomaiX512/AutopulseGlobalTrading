import React, { useEffect, useState } from 'react';
import { ajaxRequest } from '@/utils/helpers';
import { motion } from 'framer-motion';

/**
 * HeroBanner – a modern, minimal hero section that pulls its content
 * (hero image + overlay text) from the backend API. The backend should
 * return data via GET /api/get/slides/home_slider. Each slide record is expected to have:
 *  - image      (string) – storage path to the image
 *  - url        (string) – slide URL
 *  - metadata   (string) – JSON string containing title, subtitle, description
 *
 * If the API is unreachable or returns no records, the component falls back to a local placeholder.
 */
function HeroBanner() {
    const [slides, setSlides] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const res = await ajaxRequest('get', '/api/get/slides/home_slider', {}, {});
                if (res?.success && Array.isArray(res.data) && res.data.length > 0) {
                    // Process slides to extract metadata
                    const processedSlides = res.data.map(slide => {
                        let metadata = {};
                        try {
                            if (slide.metadata) {
                                metadata = JSON.parse(slide.metadata);
                            }
                        } catch (e) {
                            console.error('Error parsing metadata:', e);
                        }
                        
                        return {
                            ...slide,
                            title: metadata.title || slide.title || 'Heavy Machinery Experts',
                            subtitle: metadata.subtitle || slide.subtitle || 'Delivering worldwide, reliably and fast.',
                            description: metadata.description || slide.description || 'Premium heavy machinery and construction equipment exported worldwide with unmatched quality and reliability.'
                        };
                    });
                    setSlides(processedSlides);
                } else {
                    // Fallback to default slide
                    setSlides([{
                        image: 'https://via.placeholder.com/1920x1080?text=Hero+Banner',
                        title: 'Heavy Machinery Experts',
                        subtitle: 'Delivering worldwide, reliably and fast.',
                        description: 'Premium heavy machinery and construction equipment exported worldwide with unmatched quality and reliability.',
                        url: '#'
                    }]);
                }
            } catch (error) {
                console.error('Failed to load hero slides:', error);
                // Fallback to default slide
                setSlides([{
                    image: 'https://via.placeholder.com/1920x1080?text=Hero+Banner',
                    title: 'Heavy Machinery Experts',
                    subtitle: 'Delivering worldwide, reliably and fast.',
                    description: 'Premium heavy machinery and construction equipment exported worldwide with unmatched quality and reliability.',
                    url: '#'
                }]);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    // Auto-advance slides
    useEffect(() => {
        if (slides.length > 1) {
            const interval = setInterval(() => {
                setCurrentSlide((prev) => (prev + 1) % slides.length);
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [slides.length]);

    if (loading) {
        return (
            <section className="relative w-full h-[60vh] md:h-[80vh] flex items-center justify-center overflow-hidden bg-gray-200">
                <div className="animate-pulse">Loading...</div>
            </section>
        );
    }

    const currentSlideData = slides[currentSlide] || slides[0];

    return (
        <section className="relative w-full h-[60vh] md:h-[80vh] flex items-center justify-center overflow-hidden">
            {/* Background Slides */}
            {slides.map((slide, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ 
                        opacity: index === currentSlide ? 1 : 0,
                        scale: index === currentSlide ? 1.05 : 1
                    }}
                    transition={{ 
                        opacity: { duration: 1 },
                        scale: { duration: 10, repeat: Infinity, repeatType: "reverse" }
                    }}
                    className="absolute inset-0"
                >
                    <img
                        src={typeof slide.image === 'string' ? slide.image.replace('public', '/storage') : slide.image}
                        alt={slide.title || 'Slide'}
                        className="w-full h-full object-cover object-center"
                    />
                    {/* Dark overlay for readability */}
                    <div className="absolute inset-0 bg-black/50" />
                </motion.div>
            ))}

            {/* Text overlay */}
            <motion.div 
                key={currentSlide}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 text-center px-4"
            >
                <h1 className="text-white text-3xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">
                    {currentSlideData?.title || 'Heavy Machinery Experts'}
                </h1>
                {currentSlideData?.subtitle && (
                    <h2 className="text-white text-xl md:text-3xl font-bold mb-4 drop-shadow-lg">
                        {currentSlideData.subtitle}
                    </h2>
                )}
                {currentSlideData?.description && (
                    <p className="text-white text-lg md:text-xl opacity-90 max-w-3xl mx-auto drop-shadow-lg">
                        {currentSlideData.description}
                    </p>
                )}
                {currentSlideData?.url && currentSlideData.url !== '#' && (
                    <motion.a
                        href={currentSlideData.url}
                        className="inline-block mt-6 px-8 py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-100 transition-colors duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Learn More
                    </motion.a>
                )}
            </motion.div>

            {/* Slide indicators */}
            {slides.length > 1 && (
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                                index === currentSlide ? 'bg-white' : 'bg-white/50'
                            }`}
                        />
                    ))}
                </div>
            )}

            {/* Navigation arrows */}
            {slides.length > 1 && (
                <>
                    <button
                        onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-4xl hover:text-gray-300 transition-colors duration-300"
                    >
                        ‹
                    </button>
                    <button
                        onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-4xl hover:text-gray-300 transition-colors duration-300"
                    >
                        ›
                    </button>
                </>
            )}
        </section>
    );
}

export default HeroBanner; 