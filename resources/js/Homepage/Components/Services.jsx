import React from 'react';
import { MdDirectionsCar, MdHighQuality, MdLanguage, MdPriceChange } from "react-icons/md";
import { FaRegHandshake, FaGlobe } from "react-icons/fa";

const servicesData = [
    {
        id: 1,
        icon: <MdDirectionsCar size={25} />,
        title: 'WHAT IS AUTOPULSE',
        description: "Autopulse Global Trading Company is a leader in exporting top-quality used machinery, vehicles, and bikes from China. Our mission is to provide affordable solutions without compromising on quality. We cater to a wide range of industries and individuals across the globe, ensuring that every product meets the highest standards of excellence.",
        delay: '0.1s',
        bgColor: 'bg-blue-500',
        textColor: 'text-blue-600'
    },
    {
        id: 2,
        icon: <MdHighQuality size={25} />,
        title: 'QUALITY CONTROL',
        description: "Quality control is a cornerstone of our operations at Autopulse. We conduct thorough inspections at every stage of the sourcing and delivery process. Our commitment to quality ensures that every product we export meets stringent international standards, giving our clients peace of mind and confidence in their purchases.",
        delay: '0.2s',
        bgColor: 'bg-green-500',
        textColor: 'text-green-600'
    },
    {
        id: 3,
        icon: <FaRegHandshake size={25} />,
        title: 'MARKET EXPERTISE',
        description: "With over two decades of experience in the export industry, Autopulse has built a reputation for reliability and expertise. Our team of professionals brings deep industry knowledge and a commitment to excellence, ensuring that our clients receive expert advice and support throughout their business journey with us.",
        delay: '0.3s',
        bgColor: 'bg-yellow-500',
        textColor: 'text-yellow-600'
    },
    {
        id: 4,
        icon: <MdLanguage size={25} />,
        title: 'CLIENT SATISFACTION',
        description: "At Autopulse, client satisfaction is our ultimate goal. We measure our success by the positive feedback and ongoing partnerships we have with our clients. We go the extra mile to ensure that every client is satisfied with our products and services, building trust and long-term relationships along the way.",
        delay: '0.4s',
        bgColor: 'bg-purple-500',
        textColor: 'text-purple-600'
    },
    {
        id: 5,
        icon: <FaGlobe size={25} />,
        title: 'GLOBAL REACH',
        description: "Autopulse operates on a global scale, serving clients in over 50 countries. Our extensive network allows us to manage logistics efficiently and ensure timely delivery, no matter where our clients are located. Our global presence and experience make us a preferred partner for businesses around the world.",
        delay: '0.5s',
        bgColor: 'bg-red-500',
        textColor: 'text-red-500'
    },
    {
        id: 6,
        icon: <MdPriceChange size={25} />,
        title: 'COMPETITIVE PRICING',
        description: "We understand that pricing is a crucial factor for our clients. At Autopulse, we offer competitive pricing without sacrificing quality. Our flexible financing options and bulk purchase discounts make it possible for businesses of all sizes to access high-quality machinery and vehicles, enhancing their operations and profitability.",
        delay: '0.6s',
        bgColor: 'bg-teal-500',
        textColor: 'text-teal-600'
    },
];

function Services() {
    return (
        <section className="bg-white p-3 py-5 my-5 container" id="services">
            <div className="mx-auto mt-16">
                <div className="text-center mb-8 pb-5">
                    <span className="text-primary text-lg font-semibold">Why Us</span>
                    <h3 className="text-secondary text-2xl font-semibold">Explore Our Services</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-10 mt-10">
                    {servicesData?.map((service) => (
                        <div className="flex gap-4 items-start" key={service.id}>
                            <span className={`bg-yellow-500/10  text-yellow-600 p-3 rounded-full`} >
                                {service.icon}
                            </span>
                            <div>
                                <h3 className="font-semibold text-lg text-gray-700">{service.title}</h3>
                                <p className="mt-1 text-gray-500">{service.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Services;
