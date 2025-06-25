import React, { useContext, useEffect, useState } from 'react';
import { HomeContext } from '../context/HomeContext';
import { FaPlay, FaArrowRight } from 'react-icons/fa';

function HeroSection() {
    const { state, dispatch, methods } = useContext(HomeContext);
    const [slides, setSlides] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);

    async function fetchSlides() {
        let slides = await methods.loadSlides('home_slider');
        if (slides) {
            setSlides(slides);
        }
    }

    useEffect(() => {
        fetchSlides();
    }, []);

    useEffect(() => {
        if (slides.length > 0) {
            const interval = setInterval(() => {
                setCurrentSlide((prev) => (prev + 1) % slides.length);
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [slides]);

    return (
        <section className="hero-section relative overflow-hidden gradient-overlay">
            {/* Background Slider */}
            <div className="absolute inset-0 z-0">
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-1000 ${
                            index === currentSlide ? 'opacity-40' : 'opacity-0'
                        }`}
                    >
                        {slide.type === 'video' ? (
                            <video
                                autoPlay
                                muted
                                loop
                                className="w-full h-full object-cover"
                                src={slide.url}
                            />
                        ) : (
                            <img
                                src={slide.url}
                                alt={slide.title}
                                className="w-full h-full object-cover"
                            />
                        )}
                    </div>
                ))}
            </div>

            {/* Hero Content */}
            <div className="relative z-10 min-h-screen flex items-center">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center text-white">
                        <h1 className="heading-primary text-white text-shadow-lg mb-6">
                            Global Machinery Solutions
                            <span className="block text-accent">from China</span>
                        </h1>
                        
                        <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-2xl mx-auto text-shadow">
                            Premium heavy machinery and construction equipment exported worldwide with unmatched quality and reliability.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <button 
                                className="btn-primary text-gray-900 font-bold px-8 py-4 text-base"
                                onClick={() => window.location.href = '/products'}
                            >
                                <FaArrowRight className="mr-2" />
                                Explore Machines
                            </button>
                            
                            <button 
                                className="btn-outline text-white border-white hover:bg-white hover:text-gray-900 px-8 py-4 text-base"
                                onClick={() => window.location.href = '/contact'}
                            >
                                <FaPlay className="mr-2" />
                                Get a Quote
                            </button>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-8 border-t border-gray-400 border-opacity-30">
                            <div className="text-center fade-in-up">
                                <div className="text-3xl font-bold text-accent">50+</div>
                                <div className="text-sm opacity-75">Countries Served</div>
                            </div>
                            <div className="text-center fade-in-up">
                                <div className="text-3xl font-bold text-accent">1000+</div>
                                <div className="text-sm opacity-75">Machines Exported</div>
                            </div>
                            <div className="text-center fade-in-up">
                                <div className="text-3xl font-bold text-accent">20+</div>
                                <div className="text-sm opacity-75">Years Experience</div>
                            </div>
                            <div className="text-center fade-in-up">
                                <div className="text-3xl font-bold text-accent">24/7</div>
                                <div className="text-sm opacity-75">Support</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
                <div className="flex flex-col items-center">
                    <div className="w-1 h-8 bg-white opacity-50 rounded-full mb-2"></div>
                    <div className="text-xs opacity-75">Scroll</div>
                </div>
            </div>
        </section>
    );
}

export default HeroSection; 