import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight, FaShip, FaTruck, FaPlane } from 'react-icons/fa';

const shipmentData = [
    {
        id: 1,
        image: '/images/shipments/container-loading.jpg',
        title: 'Container Loading - Dubai',
        description: '5 Excavators shipped to UAE',
        date: '2024-01-15',
        destination: 'Dubai, UAE',
        type: 'container'
    },
    {
        id: 2,
        image: '/images/shipments/truck-delivery.jpg',
        title: 'Truck Delivery - Kenya',
        description: '3 Bulldozers delivered to Nairobi',
        date: '2024-01-12',
        destination: 'Nairobi, Kenya',
        type: 'truck'
    },
    {
        id: 3,
        image: '/images/shipments/port-loading.jpg',
        title: 'Port Loading - Nigeria',
        description: '8 Road Rollers shipped to Lagos',
        date: '2024-01-10',
        destination: 'Lagos, Nigeria',
        type: 'ship'
    },
    {
        id: 4,
        image: '/images/shipments/crane-loading.jpg',
        title: 'Heavy Lift - Brazil',
        description: '2 Large Excavators to São Paulo',
        date: '2024-01-08',
        destination: 'São Paulo, Brazil',
        type: 'crane'
    },
    {
        id: 5,
        image: '/images/shipments/warehouse.jpg',
        title: 'Warehouse Preparation - Ghana',
        description: '6 Wheel Loaders ready for shipment',
        date: '2024-01-05',
        destination: 'Accra, Ghana',
        type: 'warehouse'
    },
    {
        id: 6,
        image: '/images/shipments/delivery-truck.jpg',
        title: 'Final Delivery - Tanzania',
        description: '4 Forklifts delivered to Dar es Salaam',
        date: '2024-01-03',
        destination: 'Dar es Salaam, Tanzania',
        type: 'delivery'
    }
];

const getShipmentIcon = (type) => {
    switch (type) {
        case 'ship':
        case 'container':
            return <FaShip className="text-gray-600" />;
        case 'truck':
        case 'delivery':
            return <FaTruck className="text-green-500" />;
        case 'plane':
            return <FaPlane className="text-orange-500" />;
        default:
            return <FaShip className="text-gray-600" />;
    }
};

function ShipmentsShowcase() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlay, setIsAutoPlay] = useState(true);

    useEffect(() => {
        if (isAutoPlay) {
            const interval = setInterval(() => {
                setCurrentSlide((prev) => (prev + 1) % shipmentData.length);
            }, 4000);
            return () => clearInterval(interval);
        }
    }, [isAutoPlay]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % shipmentData.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + shipmentData.length) % shipmentData.length);
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    const getVisibleSlides = () => {
        const slides = [];
        for (let i = 0; i < 3; i++) {
            const index = (currentSlide + i) % shipmentData.length;
            slides.push(shipmentData[index]);
        }
        return slides;
    };

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">
                        Recent Shipments & Deliveries
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        See our latest machinery deliveries to clients worldwide
                    </p>
                </div>

                <div className="relative">
                    {/* Navigation Buttons */}
                    <button
                        onClick={prevSlide}
                        onMouseEnter={() => setIsAutoPlay(false)}
                        onMouseLeave={() => setIsAutoPlay(true)}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110"
                    >
                        <FaChevronLeft className="text-gray-600" />
                    </button>

                    <button
                        onClick={nextSlide}
                        onMouseEnter={() => setIsAutoPlay(false)}
                        onMouseLeave={() => setIsAutoPlay(true)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110"
                    >
                        <FaChevronRight className="text-gray-600" />
                    </button>

                    {/* Carousel */}
                    <div className="overflow-hidden">
                        <div 
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{ transform: `translateX(-${currentSlide * (100 / 3)}%)` }}
                        >
                            {shipmentData.map((shipment, index) => (
                                <div
                                    key={shipment.id}
                                    className="w-1/3 flex-shrink-0 px-3"
                                >
                                    <div className="bg-white shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                                        {/* Image */}
                                        <div className="relative h-48 overflow-hidden">
                                            <div
                                                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 hover:scale-110"
                                                style={{
                                                    backgroundImage: `url(${shipment.image})`,
                                                    backgroundSize: 'cover',
                                                    backgroundPosition: 'center'
                                                }}
                                            >
                                                {/* Fallback gradient */}
                                                <div className="absolute inset-0 bg-gradient-to-br from-gray-500 to-gray-600 opacity-80"></div>
                                            </div>
                                            
                                            {/* Date Badge */}
                                            <div className="absolute top-4 right-4 bg-white bg-opacity-90 px-3 py-1">
                                                <span className="text-xs font-medium text-gray-600">
                                                    {new Date(shipment.date).toLocaleDateString()}
                                                </span>
                                            </div>

                                            {/* Shipment Type Icon */}
                                            <div className="absolute bottom-4 left-4 bg-white bg-opacity-90 p-2">
                                                {getShipmentIcon(shipment.type)}
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-6">
                                            <h3 className="text-lg font-bold text-gray-800 mb-2">
                                                {shipment.title}
                                            </h3>
                                            <p className="text-gray-600 text-sm mb-3">
                                                {shipment.description}
                                            </p>
                                            <div className="flex items-center text-xs text-gray-500">
                                                <span className="font-medium">Destination:</span>
                                                <span className="ml-1">{shipment.destination}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Dots Indicator */}
                    <div className="flex justify-center mt-8 space-x-2">
                        {shipmentData.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                    index === currentSlide 
                                        ? 'bg-gray-600 scale-125' 
                                        : 'bg-gray-300 hover:bg-gray-400'
                                }`}
                            />
                        ))}
                    </div>
                </div>

                {/* Stats Section */}
                <div className="mt-16 bg-white shadow-lg p-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-3xl font-bold text-gray-600 mb-2">200+</div>
                            <div className="text-gray-600">Shipments This Year</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-green-600 mb-2">50+</div>
                            <div className="text-gray-600">Countries Delivered</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-orange-600 mb-2">99%</div>
                            <div className="text-gray-600">On-Time Delivery</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
                            <div className="text-gray-600">Tracking Support</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ShipmentsShowcase; 