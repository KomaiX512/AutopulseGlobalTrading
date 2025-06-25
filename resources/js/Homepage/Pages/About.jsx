import React, { useContext, useEffect, useState } from 'react';
import { HomeContext } from '../context/HomeContext';
import About from '../Components/About';
import Slider from '../Components/Slider';
import { MdCheckCircle, MdBuild, MdVerified, MdMonitor, MdFeedback, MdTimeline, MdPeople, MdLanguage } from 'react-icons/md';
import { FaFacebook, FaLinkedin, FaWhatsapp, FaYoutube, FaGlobe, FaUsers, FaCog, FaAward, FaRocket, FaHandshake } from 'react-icons/fa';

const data = [
    {
        id: 1,
        icon: <MdCheckCircle size={25} />,
        title: 'Thorough Inspection',
        description: "Every product, whether used machinery, vehicles, or bikes, undergoes a meticulous inspection process. Our team of experts evaluates each item for functionality, durability, and safety, identifying any defects or issues that may affect performance.",
        delay: '0.1s',
        bgColor: 'bg-blue-500',
        textColor: 'text-blue-600'
    },
    {
        id: 2,
        icon: <MdBuild size={25} />,
        title: 'Refurbishment and Testing',
        description: "For used machinery and vehicles, we conduct thorough refurbishment and testing. This process includes replacing worn-out parts, repairing any damage, and performing rigorous operational tests to ensure optimal functionality.",
        delay: '0.2s',
        bgColor: 'bg-green-500',
        textColor: 'text-green-600'
    },
    {
        id: 3,
        icon: <MdVerified size={25} />,
        title: 'Certified Standards',
        description: "We adhere to international quality standards and certifications. Our products are inspected and certified to meet industry-specific requirements, providing our customers with the assurance that they are receiving reliable and safe products.",
        delay: '0.3s',
        bgColor: 'bg-red-500',
        textColor: 'text-red-600'
    },
    {
        id: 4,
        icon: <MdMonitor size={25} />,
        title: 'Continuous Monitoring',
        description: "Quality assurance doesn't end with inspection and testing. We continuously monitor the performance and quality of our products, making adjustments and improvements as needed to maintain the highest levels of satisfaction.",
        delay: '0.4s',
        bgColor: 'bg-yellow-500',
        textColor: 'text-yellow-600'
    },
    {
        id: 5,
        icon: <MdFeedback size={25} />,
        title: 'Customer Feedback',
        description: "We value our customers' input and use their feedback to enhance our products and services. By listening to our clients, we can address any concerns and improve our quality control processes.",
        delay: '0.5s',
        bgColor: 'bg-purple-500',
        textColor: 'text-purple-600'
    }
];

// Timeline/Milestones data
const milestones = [
    {
        year: '2009',
        title: 'Company Founded',
        description: 'Autopulse Global Trading Company was established in China with a vision to connect global buyers with quality machinery.',
        icon: <FaRocket className="text-yellow-600" />
    },
    {
        year: '2012',
        title: 'First International Partnership',
        description: 'Expanded operations to Africa and Middle East, establishing our first major international partnerships.',
        icon: <FaHandshake className="text-blue-600" />
    },
    {
        year: '2015',
        title: 'Quality Certification',
        description: 'Achieved ISO quality certifications and established our rigorous inspection processes.',
        icon: <FaAward className="text-green-600" />
    },
    {
        year: '2018',
        title: 'Digital Transformation',
        description: 'Launched our digital platform, making it easier for customers to browse and purchase machinery online.',
        icon: <FaCog className="text-purple-600" />
    },
    {
        year: '2020',
        title: 'Global Expansion',
        description: 'Extended services to Guyana and South America, becoming a truly global trading company.',
        icon: <FaGlobe className="text-red-600" />
    },
    {
        year: '2024',
        title: '15 Years of Excellence',
        description: 'Celebrating 15 years of trusted service with over 10,000+ satisfied customers worldwide.',
        icon: <FaUsers className="text-indigo-600" />
    }
];

// Partner/Brand logos (you can replace with actual logo paths)
const partnerBrands = [
    { name: 'Doosan', logo: '/images/brands/doosan-logo.png' },
    { name: 'CAT', logo: '/images/brands/cat-logo.png' },
    { name: 'XCMG', logo: '/images/brands/xcmg-logo.png' },
    { name: 'Komatsu', logo: '/images/brands/komatsu-logo.png' },
    { name: 'Hitachi', logo: '/images/brands/hitachi-logo.png' },
    { name: 'Volvo', logo: '/images/brands/volvo-logo.png' },
];

function AboutPage() {
    const { state, dispatch, methods } = useContext(HomeContext);
    const [slides, setSlides] = useState([])

    async function fetchSlides() {
        let slides = await methods.loadSlides('about_slider');
        if (slides) {
            setSlides(slides);
        }
    }

    useEffect(() => {
        fetchSlides();
    }, []);

    const videos = [
        {
            src: '/images/WhatsApp Video 2024-08-21 at 11.48.14 PM.mp4'
        }
    ]

    return (
        <div className='bg-white'>
            {/* Hero Banner */}
            <div
                className="container-fluid page-header m-0 p-0"
                style={{
                    height: "100%",
                    background: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(/images/about-banner.jpg) center center/cover`,
                }}
            >
                <div className="container-fluid page-header-inner py-20 mt-16">
                    <div className="container text-center">
                        <h1 className="display-2 text-white mb-4 font-bold animated slideInDown">
                            Who We Are – Trusted Global Machinery Exporters
                        </h1>
                        <p className="text-white text-xl mb-4 opacity-90">
                            15 years of excellence in connecting global buyers with premium machinery
                        </p>
                        <nav aria-label="breadcrumb" style={{ background: "transparent" }}>
                            <ol className="breadcrumb justify-content-center text-uppercase" style={{ background: "transparent" }}>
                                <li className="breadcrumb-item"><a href="/" className='text-light hover:text-yellow-300'>Home</a></li>
                                <li className="breadcrumb-item text-white active" aria-current="page">About Us</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>

            {/* Brand Story Section */}
            <div className="brand-story-section py-16">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-6">
                            <div className="story-content">
                                <h2 className='text-4xl font-bold text-gray-800 mb-6'>Our Story</h2>
                                
                                <div className="story-text space-y-4 text-gray-600 text-lg leading-relaxed">
                                    <p>
                                        <strong className="text-yellow-600">Who we are:</strong> Autopulse Global Trading Company is a premier exporter of high-quality machinery, vehicles, and equipment with over 15 years of industry expertise. Based in China, we have built a reputation for reliability, quality, and exceptional customer service.
                                    </p>
                                    
                                    <p>
                                        <strong className="text-yellow-600">What we export:</strong> We specialize in both used and new machinery, including construction equipment, industrial machinery, commercial and passenger vehicles, and a diverse range of bikes. Every product undergoes rigorous inspection and quality assurance processes.
                                    </p>
                                    
                                    <p>
                                        <strong className="text-yellow-600">Where we serve:</strong> Our global reach extends across Africa, the Middle East, Guyana, South America, and beyond. We understand the unique needs of different markets and provide customized solutions for each region.
                                    </p>
                                    
                                    <p>
                                        <strong className="text-yellow-600">Why people trust us:</strong> Our commitment to honesty, transparency, and customization sets us apart. We don't just sell products – we build lasting relationships by understanding your specific needs and delivering solutions that exceed expectations.
                                    </p>
                                </div>

                                <div className="stats-row mt-8 grid grid-cols-3 gap-6">
                                    <div className="stat-item text-center">
                                        <div className="text-3xl font-bold text-yellow-600">15+</div>
                                        <div className="text-sm text-gray-600">Years Experience</div>
                                    </div>
                                    <div className="stat-item text-center">
                                        <div className="text-3xl font-bold text-blue-600">10,000+</div>
                                        <div className="text-sm text-gray-600">Happy Customers</div>
                                    </div>
                                    <div className="stat-item text-center">
                                        <div className="text-3xl font-bold text-green-600">50+</div>
                                        <div className="text-sm text-gray-600">Countries Served</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="story-visual">
                                <Slider videos={videos} slides={slides} link={false} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Timeline/Milestones Section */}
            <div className="milestones-section py-16 bg-gray-50">
                <div className="container">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Journey</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            From a small trading company to a global leader in machinery exports – here's our story of growth and excellence.
                        </p>
                    </div>

                    <div className="timeline-container">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {milestones.map((milestone, index) => (
                                <div key={index} className="milestone-card bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300">
                                    <div className="flex items-center mb-4">
                                        <div className="milestone-icon flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full mr-4">
                                            {milestone.icon}
                                        </div>
                                        <div className="milestone-year text-2xl font-bold text-yellow-600">
                                            {milestone.year}
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-3">{milestone.title}</h3>
                                    <p className="text-gray-600">{milestone.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Partner Brands Section */}
            <div className="partners-section py-16">
                <div className="container">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-800 mb-4">Trusted Brand Partners</h2>
                        <p className="text-xl text-gray-600">
                            We work with world-renowned brands to bring you the best machinery and equipment
                            </p>
                        </div>

                    <div className="partners-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
                        {partnerBrands.map((brand, index) => (
                            <div key={index} className="partner-logo-container bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-all duration-300 flex items-center justify-center h-24">
                                <div className="text-center">
                                    {/* For demo purposes, showing brand names. In production, you'd use actual logos */}
                                    <div className="text-gray-600 font-semibold text-lg">{brand.name}</div>
                                    <div className="text-xs text-gray-400">Partner</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-8">
                        <p className="text-gray-600">
                            <strong>Note:</strong> Partner logos and brand certifications available upon request. 
                            Contact us for detailed brand partnerships and certifications.
                        </p>
                    </div>
                </div>
            </div>

            {/* What is Autopulse - Legacy Section */}
            <div className="best-features about-features py-16 bg-white">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-6">
                            <div className="left-content">
                                <h2 className='text-3xl font-bold text-yellow-600 mb-4'>What is Autopulse</h2>
                                <p className='text-lg text-gray-600 leading-relaxed mb-6'>
                                    Autopulse Global Trading Company, with 15 years of experience, is your trusted partner in exporting high-quality used machinery, new and used vehicles, and new bikes from China. We pride ourselves on our fast shipping services and rigorous quality assurance processes, ensuring you receive top-notch products promptly and reliably. Our commitment to excellence and customer satisfaction sets us apart, making us a preferred choice for clients worldwide.
                                </p>
                                <ul className="social-icons flex gap-3">
                                    <li><a className='flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors' href="#"><FaFacebook size={20} /></a></li>
                                    <li><a className='flex items-center justify-center w-12 h-12 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors' href="#"><FaLinkedin size={20} /></a></li>
                                    <li><a className='flex items-center justify-center w-12 h-12 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors' href="#"><FaYoutube size={20} /></a></li>
                                    <li><a className='flex items-center justify-center w-12 h-12 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors' href="#"><FaWhatsapp size={20} /></a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="right-image">
                                <div className="relative">
                                    <img src="/images/machinery-showcase.jpg" alt="Autopulse Machinery" className="w-full rounded-lg shadow-lg" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Company Introduction */}
            <div className="company-intro py-12 bg-gray-50">
                <div className="container">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Company Introduction</h2>
                    <p className='text-lg text-gray-600 leading-relaxed'>
                        Welcome to Autopulse Global Trading Company! Established in 2009 and headquartered in China, we have over 15 years of experience as a leading exporter of high-quality used machinery, new and used vehicles, and new bikes from China. Our extensive range of products includes industrial and construction machinery, passenger and commercial vehicles, and a variety of bikes, including mountain, road, and electric models. We are committed to delivering exceptional products and services, backed by rigorous quality assurance and fast, reliable shipping to clients worldwide. Our team of experts ensures a seamless and efficient experience, making us a trusted partner for customers across the globe.
                    </p>
                </div>
            </div>

            {/* Mission */}
            <div className="mission py-12 bg-white">
                <div className="container">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Mission</h2>
                    <p className='text-lg text-gray-600 leading-relaxed'>
                        At Autopulse Global Trading Company, our mission is to connect global buyers with high-quality used machinery, vehicles, and bikes from China, providing reliable and cost-effective solutions. We are dedicated to fostering long-term relationships with our customers by consistently delivering exceptional products and outstanding service. Through our commitment to quality, innovation, and efficiency, we aim to be a trusted partner, supporting the growth and success of businesses and individuals worldwide.
                    </p>
                </div>
            </div>

            {/* Quality Assurance */}
            <div className="quality-assurance py-12 bg-gray-50">
                <div className="container">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Quality Assurance</h2>
                    <p className='text-lg text-gray-600 leading-relaxed mb-8'>
                        At Autopulse Global Trading Company, quality assurance is a cornerstone of our operations. We implement a comprehensive quality control process to ensure that every product we offer meets our high standards and exceeds customer expectations. Our quality assurance procedures include:
                    </p>

                    <div className="grid md:grid-cols-2 gap-8">
                        {data.map((service) => (
                            <div className="flex gap-4 items-start bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300" key={service.id}>
                                <span className={`bg-yellow-500/10 text-yellow-600 p-3 rounded-full flex-shrink-0`}>
                                {service.icon}
                            </span>
                            <div>
                                    <h3 className="font-semibold text-xl text-gray-800 mb-2">{service.title}</h3>
                                    <p className="text-gray-600 leading-relaxed">{service.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Call to Action */}
            <div className="cta-section py-16 bg-gradient-to-r from-yellow-600 to-yellow-700">
                <div className="container text-center">
                    <h2 className="text-4xl font-bold text-white mb-4">Let's Build Together – Get in Touch</h2>
                    <p className="text-xl text-yellow-100 mb-8 max-w-3xl mx-auto">
                        Ready to find the perfect machinery for your needs? Our team of experts is here to help you discover quality equipment that drives your success forward.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="/contact" className="bg-white text-yellow-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg">
                            Contact Us Today
                        </a>
                        <a href="/products" className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-yellow-600 transition-colors">
                            Browse Products
                        </a>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default AboutPage
