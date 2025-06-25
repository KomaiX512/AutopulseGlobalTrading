import React from 'react';
import { 
    FaTruck,
    FaTree,
    FaRoad,
    FaBuilding,
    FaMountain,
    FaTractor
} from 'react-icons/fa';
import { FaArrowRight } from 'react-icons/fa';

const projectTypes = [
    {
        id: 1,
        title: 'Material Handling Machines',
        description: 'Specialized equipment for moving and managing materials',
        icon: <FaTruck size={32} />,
        image: '/images/projects/material-handling.jpg',
        link: '/products/machine?project=material-handling',
        color: 'from-blue-500 to-blue-700'
    },
    {
        id: 2,
        title: 'Land/Ground Clearing Machines',
        description: 'Equipment for site preparation and land development',
        icon: <FaTree size={32} />,
        image: '/images/projects/land-clearing.jpg',
        link: '/products/machine?project=land-clearing',
        color: 'from-green-500 to-green-700'
    },
    {
        id: 3,
        title: 'Road Construction Machines',
        description: 'Heavy machinery for road building and infrastructure',
        icon: <FaRoad size={32} />,
        image: '/images/projects/road-construction.jpg',
        link: '/products/machine?project=road-construction',
        color: 'from-gray-500 to-gray-700'
    },
    {
        id: 4,
        title: 'General Construction Machines',
        description: 'Versatile equipment for various construction projects',
        icon: <FaBuilding size={32} />,
        image: '/images/projects/general-construction.jpg',
        link: '/products/machine?project=general-construction',
        color: 'from-orange-500 to-orange-700'
    },
    {
        id: 5,
        title: 'Mining & Excavation Equipment',
        description: 'Heavy-duty machines for mining and excavation work',
        icon: <FaMountain size={32} />,
        image: '/images/projects/mining-excavation.jpg',
        link: '/products/machine?project=mining-excavation',
        color: 'from-red-500 to-red-700'
    },
    {
        id: 6,
        title: 'Agricultural / Farm Support Machinery',
        description: 'Specialized equipment for agricultural applications',
        icon: <FaTractor size={32} />,
        image: '/images/projects/agricultural.jpg',
        link: '/products/machine?project=agricultural',
        color: 'from-yellow-500 to-yellow-700'
    }
];

function MachinesByProject() {
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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projectTypes.map((project) => (
                        <div
                            key={project.id}
                            className="group relative bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden cursor-pointer"
                            onClick={() => window.location.href = project.link}
                        >
                            {/* Background Image */}
                            <div className="relative h-48 overflow-hidden">
                                <div 
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                                    style={{
                                        backgroundImage: `url(${project.image})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center'
                                    }}
                                >
                                    {/* Fallback gradient background if image doesn't load */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-80`}></div>
                                </div>
                                
                                {/* Icon Overlay */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="bg-white bg-opacity-20 backdrop-blur-sm p-4 text-white group-hover:bg-opacity-30 transition-all duration-300">
                                        {project.icon}
                                    </div>
                                </div>
                                
                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-gray-900 line-clamp-2">
                                    {project.title}
                                </h3>
                                <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-3">
                                    {project.description}
                                </p>

                                {/* CTA Button */}
                                <div className="flex items-center justify-between">
                                    <button className={`bg-gradient-to-r ${project.color} text-white text-sm font-medium py-2 px-4 rounded-lg hover:shadow-lg transition-all duration-300 transform group-hover:scale-105`}>
                                        View More
                                    </button>
                                    
                                    <div className="text-gray-400 group-hover:text-gray-600 transition-colors duration-300">
                                        <FaArrowRight className="text-sm transform group-hover:translate-x-1 transition-transform duration-300" />
                                    </div>
                                </div>
                            </div>

                            {/* Hover Border Effect */}
                            <div className="absolute inset-0 border-2 border-transparent group-hover:border-gray-200 transition-colors duration-300"></div>
                        </div>
                    ))}
                </div>

                {/* View All Projects Button */}
                <div className="text-center mt-12">
                    <button 
                        className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                        onClick={() => window.location.href = '/products/machine'}
                    >
                        Explore All Solutions
                    </button>
                </div>
            </div>
        </section>
    );
}

export default MachinesByProject; 