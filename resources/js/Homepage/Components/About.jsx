import React from 'react'
import { FaCertificate, FaCheck, FaComment, FaEye, FaTools } from 'react-icons/fa'

function About() {
    return (
        <div>
            <section id="about" className="about py-4" style={{background:"transparent"}}>
                <div className="container flex flex-col gap-4">
                    <div className="flex flex-col lg:flex-row lg:justify-between">
                        {/* <div className="lg:w-1/3 flex items-center justify-center lg:justify-start lg:pr-8">
                            <img loading='lazy'
                                src="https://img.freepik.com/free-vector/man-selling-idea-startup-shining-lightbulb-partners-finding-investors-cartoon-illustration_74855-14448.jpg?w=900&t=st=1723484112~exp=1723484712~hmac=b45fece6513306c550a7fe32324842d188531c5661103396cb624d7374fb8753" className="w-full rounded-lg shadow-lg" alt="" data-aos="zoom-in" />
                        </div> */}
                        <div className=" pt-5 lg:pt-0 ">
                            <h3 data-aos="fade-up">Company Introduction</h3>
                            <p className='py-1' data-aos="fade-up" data-aos-delay="100">
                                Welcome to Autopulse Global Trading Company! Established in 2009 and headquartered in [City, China], we have over 15 years of experience as a leading exporter of high-quality used machinery, new and used vehicles, and new bikes from China. Our extensive range of products includes industrial and construction machinery, passenger and commercial vehicles, and a variety of bikes, including mountain, road, and electric models. We are committed to delivering exceptional products and services, backed by rigorous quality assurance and fast, reliable shipping to clients worldwide. Our team of experts ensures a seamless and efficient experience, making us a trusted partner for customers across the globe.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row lg:justify-between gap-4">
                        <div className=" pt-5 lg:pt-0 ">
                            <h3 data-aos="fade-up">Our Mission</h3>
                            <p className='py-2' data-aos="fade-up" data-aos-delay="100">
                                At Autopulse Global Trading Company, our mission is to connect global buyers with high-quality used machinery, vehicles, and bikes from China, providing reliable and cost-effective solutions. We are dedicated to fostering long-term relationships with our customers by consistently delivering exceptional products and outstanding service. Through our commitment to quality, innovation, and efficiency, we aim to be a trusted partner, supporting the growth and success of businesses and individuals worldwide.
                            </p>
                        </div>
                        {/* <div className="lg:w-1/3 flex items-center justify-center lg:justify-start lg:pr-8">
                            <img loading='lazy'
                                src="https://img.freepik.com/free-vector/happy-people-watching-rocket-launch_74855-15449.jpg?w=996&t=st=1723484002~exp=1723484602~hmac=d9825ceba56d9f2df3f3ec22dac895fc54d59a53ecafb8e6901a38364618d7f5" className="w-full rounded-lg shadow-lg" alt="" data-aos="zoom-in" />
                        </div> */}
                    </div>

                    <div className="flex flex-col w-full lg:flex-row lg:justify-between">
                        <div className="w-full pt-5 lg:pt-0 lg:pr-4">
                            <h3 data-aos="fade-up">Quality Assurance</h3>
                            <p className='py-2' data-aos="fade-up" data-aos-delay="100">
                                At Autopulse Global Trading Company, quality assurance is a cornerstone of our operations. We implement a comprehensive quality control process to ensure that every product we offer meets our high standards and exceeds customer expectations. Our quality assurance procedures include:
                            </p>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr)', justifyContent: 'center' }} className="flex flex-col sm:flex-row sm:flex-wrap gap-4 py-4">
                                <div className="card flex-1 p-4  rounded-md shadow-md" data-aos="fade-up" data-aos-delay="100">
                                    <FaCheck size={24} className="text-green-500 mb-2" />
                                    <h4 className="text-xl font-semibold">Thorough Inspection</h4>
                                    <p>Every product, whether used machinery, vehicles, or bikes, undergoes a meticulous inspection process. Our team of experts evaluates each item for functionality, durability, and safety, identifying any defects or issues that may affect performance.</p>
                                </div>
                                <div className="card flex-1 p-4  rounded-md shadow-md" data-aos="fade-up" data-aos-delay="100">
                                    <FaTools size={24} className="text-blue-500 mb-2" />
                                    <h4 className="text-xl font-semibold">Refurbishment and Testing</h4>
                                    <p>For used machinery and vehicles, we conduct thorough refurbishment and testing. This process includes replacing worn-out parts, repairing any damage, and performing rigorous operational tests to ensure optimal functionality.</p>
                                </div>
                                <div className="card flex-1 p-4  rounded-md shadow-md" data-aos="fade-up" data-aos-delay="100">
                                    <FaCertificate size={24} className="text-yellow-500 mb-2" />
                                    <h4 className="text-xl font-semibold">Certified Standards</h4>
                                    <p>We adhere to international quality standards and certifications. Our products are inspected and certified to meet industry-specific requirements, providing our customers with the assurance that they are receiving reliable and safe products.</p>
                                </div>
                                <div className="card flex-1 p-4  rounded-md shadow-md" data-aos="fade-up" data-aos-delay="100">
                                    <FaEye size={24} className="text-purple-500 mb-2" />
                                    <h4 className="text-xl font-semibold">Continuous Monitoring</h4>
                                    <p>Quality assurance doesn't end with inspection and testing. We continuously monitor the performance and quality of our products, making adjustments and improvements as needed to maintain the highest levels of satisfaction.</p>
                                </div>
                                <div className="card flex-1 p-4  rounded-md shadow-md" data-aos="fade-up" data-aos-delay="100">
                                    <FaComment size={24} className="text-red-500 mb-2" />
                                    <h4 className="text-xl font-semibold">Customer Feedback</h4>
                                    <p>We value our customers' input and use their feedback to enhance our products and services. By listening to our clients, we can address any concerns and improve our quality control processes.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    )
}

export default About
