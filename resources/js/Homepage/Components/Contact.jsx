import React, { useState } from 'react';
import axios from 'axios';
import { ShowToast } from '@/utils/helpers';
import { FaCheck, FaEnvelope, FaMailBulk, FaWhatsapp, FaPhone, FaClock, FaFacebook, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';
import { Form, Input, Button, Spin, Alert } from 'antd';
import { FaAddressBook, FaAddressCard, FaLocationDot, FaLocationPin } from 'react-icons/fa6';

function Contact() {
    const [formData, setFormData] = useState({
        user_name: '',
        user_email: '',
        subject: '',
        message: ''
    });

    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [sentMessage, setSentMessage] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (values) => {
        setLoading(true);
        setErrorMessage('');
        setSentMessage('');

        try {
            const response = await axios.post('/api/queries', values);
            ShowToast({ message: `Your message has been sent. Thank you!`, icon: <FaCheck color='green' /> });
            setFormData({ user_name: '', user_email: '', subject: '', message: '' });
        } catch (error) {
            setErrorMessage('There was an error sending your message. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container !m-auto newsletter mt-3 bg-white wow fadeIn bg-white p-3 container py-5 my-5  !sm:p-0" style={{ width: "100%" }}>
            <div className="text-center mb-8 pb-5">
                <span className="text-yellow-600 text-lg font-semibold">Contact</span>
                <h2 className="text-gray-700 text-3xl font-bold mt-2">Submit Your Queries</h2>
            </div>
            
            <div className="flex justify-content-center">
                <section className="contact p-0">
                    <div className="container">
                        <div className="row">
                            {/* Contact Information - Left Column */}
                            <div className="col-lg-5 d-flex align-items-stretch aos-init aos-animate" data-aos="fade-up" data-aos-delay="100">
                                <div className="info flex flex-col justify-center gap-6 p-4">
                                    <div className="contact-info-item phone flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                                        <FaLocationDot className='text-yellow-600' size={24} />
                                        <div className='p-0 m-0'>
                                            <h4 className='p-0 m-0 font-semibold text-gray-800'>Location:</h4>
                                            <p className='p-0 m-0 text-gray-600'>Autopulse Trading Center<br/>Hong Kong</p>
                                        </div>
                                    </div>

                                    <div className="contact-info-item phone flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                                        <FaEnvelope className='text-blue-600' size={24} />
                                        <div className='p-0 m-0'>
                                            <h4 className='p-0 m-0 font-semibold text-gray-800'>Email:</h4>
                                            <p className='p-0 m-0 text-gray-600'>info@autopulsetrading.com</p>
                                        </div>
                                    </div>

                                    <div className="contact-info-item phone flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                                        <FaWhatsapp className='text-green-600' size={24} />
                                        <div className='p-0 m-0'>
                                            <h4 className='p-0 m-0 font-semibold text-gray-800'>WhatsApp:</h4>
                                            <p className='p-0 m-0 text-gray-600'>+1307 2950382</p>
                                        </div>
                                    </div>

                                    <div className="contact-info-item phone flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                                        <FaPhone className='text-purple-600' size={24} />
                                        <div className='p-0 m-0'>
                                            <h4 className='p-0 m-0 font-semibold text-gray-800'>Phone:</h4>
                                            <p className='p-0 m-0 text-gray-600'>+1307 2950382</p>
                                        </div>
                                    </div>

                                    {/* Working Hours */}
                                    <div className="contact-info-item phone flex items-center gap-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                                        <FaClock className='text-yellow-600' size={24} />
                                        <div className='p-0 m-0'>
                                            <h4 className='p-0 m-0 font-semibold text-gray-800'>Working Hours:</h4>
                                            <p className='p-0 m-0 text-gray-600'>Mon - Fri: 9:00 AM - 6:00 PM<br/>Saturday: 9:00 AM - 2:00 PM</p>
                                        </div>
                                    </div>

                                    {/* Social Media Icons */}
                                    <div className="social-media mt-4">
                                        <h4 className='font-semibold text-gray-800 mb-3'>Follow Us:</h4>
                                        <div className="flex gap-3">
                                            <a href="#" className="flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
                                                <FaFacebook size={18} />
                                            </a>
                                            <a href="#" className="flex items-center justify-center w-10 h-10 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors">
                                                <FaWhatsapp size={18} />
                                            </a>
                                            <a href="#" className="flex items-center justify-center w-10 h-10 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors">
                                                <FaLinkedin size={18} />
                                            </a>
                                            <a href="#" className="flex items-center justify-center w-10 h-10 bg-blue-400 text-white rounded-full hover:bg-blue-500 transition-colors">
                                                <FaTwitter size={18} />
                                            </a>
                                        </div>
                                    </div>

                                    {/* Google Map */}
                                    <div className="map-container mt-4">
                                    <iframe
                                            style={{ width: '100%', height: '250px', borderRadius: '8px' }}
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3689.648827808653!2d114.15107011496368!3d22.28549898533414!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3404007ebc7c76f7%3A0x1c5e67434c66f174!2sThe%20L.%20Plaza%2C%20367-375%20Queen&#39;s%20Road%20Central%2C%20Sheung%20Wan%2C%20Hong%20Kong!5e0!3m2!1sen!2s!4v1721902999999!5m2!1sen!2s"
                                        allowFullScreen=""
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade">
                                    </iframe>
                                </div>
                                </div>
                            </div>

                            {/* Contact Form - Right Column */}
                            <div className="col-lg-7 mt-5 mt-lg-0 d-flex align-items-stretch" data-aos="fade-up" data-aos-delay="100">
                                <Form
                                    style={{ width: '100%', padding: '30px', boxShadow: '0 0 20px rgba(0,0,0,0.1)', borderRadius: '10px', background: 'white' }}
                                    onFinish={handleSubmit}
                                    initialValues={formData}
                                    layout="vertical"
                                    className='php-email-form bg-white border'
                                >
                                    <div className="form-header mb-4">
                                        <h3 className="text-2xl font-bold text-gray-800 mb-2">Send us a Message</h3>
                                        <p className="text-gray-600">Fill out the form below and we'll get back to you as soon as possible.</p>
                                    </div>

                                    <div className="form-row flex gap-4">
                                        <Form.Item
                                            name="user_name"
                                            label={<span className="font-semibold text-gray-700">Your Name</span>}
                                            className="form-group flex-1"
                                            rules={[{ required: true, message: 'Please enter your name' }]}
                                        >
                                            <Input
                                                size="large"
                                                placeholder="Enter your full name"
                                                value={formData.user_name}
                                                onChange={handleChange}
                                                className="rounded-lg"
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            name="user_email"
                                            label={<span className="font-semibold text-gray-700">Your Email</span>}
                                            className="form-group flex-1"
                                            rules={[
                                                { required: true, message: 'Please enter your email' },
                                                { type: 'email', message: 'Please enter a valid email' }
                                            ]}
                                        >
                                            <Input
                                                type="email"
                                                size="large"
                                                placeholder="Enter your email address"
                                                value={formData.user_email}
                                                onChange={handleChange}
                                                className="rounded-lg"
                                            />
                                        </Form.Item>
                                    </div>
                                    
                                    <Form.Item
                                        name="subject"
                                        label={<span className="font-semibold text-gray-700">Subject</span>}
                                        rules={[{ required: true, message: 'Please enter a subject' }]}
                                    >
                                        <Input
                                            size="large"
                                            placeholder="What is this about?"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            className="rounded-lg"
                                        />
                                    </Form.Item>
                                    
                                    <Form.Item
                                        name="message"
                                        label={<span className="font-semibold text-gray-700">Message</span>}
                                        rules={[{ required: true, message: 'Please enter your message' }]}
                                    >
                                        <Input.TextArea
                                            rows={6}
                                            placeholder="Tell us more about your inquiry..."
                                            value={formData.message}
                                            onChange={handleChange}
                                            className="rounded-lg"
                                        />
                                    </Form.Item>
                                    
                                    <div className="mb-3">
                                        {loading && <Spin tip="Sending message..." />}
                                        {errorMessage && <Alert message={errorMessage} type="error" className="mb-3" />}
                                        {sentMessage && <Alert message={sentMessage} type="success" className="mb-3" />}
                                    </div>
                                    
                                    <div className="text-center">
                                        <button 
                                            className='primary-btn text-lg px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300' 
                                            type="submit" 
                                            disabled={loading}
                                        >
                                            {loading ? 'Sending...' : 'Send Message'}
                                        </button>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Contact;
