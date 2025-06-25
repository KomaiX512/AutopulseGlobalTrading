import React, { useContext, useEffect, useState } from 'react';
import './faqstyle.css';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { HomeContext } from '../context/HomeContext';
import { Parser } from 'html-to-react';

const FAQ = () => {

    const { state, methods } = useContext(HomeContext);

    const [faqs, setFaqs] = useState([]);

    const [activeIndex, setActiveIndex] = useState(null);
    const toggleCollapse = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    async function fetchFAqs() {


        let faqs = await methods.loadFaqs();

        setFaqs(faqs)
    }

    useEffect(() => {

        fetchFAqs();

    }, []);


    return (
        <section id='faq-container' className="bg-white p-3 container py-5 my-5 " data-wow-delay={0.5}>
            <div className="container mx-auto p-0 faq-container">
                <div className="text-center mb-8 pb-5">
                    <span className="text-primary text-lg font-semibold">FAQ's</span>
                    <h2 className="text-secondary text-2xl font-semibold">Frequently Asked Questions</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 sm-gird-cols-1 gap-4">
                    {faqs && faqs?.map(faq => (
                        <div style={{ height: 'fit-content' }}
                            key={faq.id} className="border border-gray-200 bg-white  overflow-hidden">
                            <button
                                style={{ height: '55px', fontWeight: "500x", border: 'none' }}
                                className="faq-item w-full border-none px-4 py-2 text-left bg-white-100 hover:bg-white-200 focus:outline-none focus:ring-2 focus:ring-primary flex items-center justify-between"
                                onClick={() => toggleCollapse(faq?.id)}
                            >
                                <span className='faq-title' style={{ fontWeight: "500", fontSize: '18px' }}
                                >
                                    {faq?.question}

                                </span>

                                <span className="text-gray-600">
                                    {activeIndex === faq.id ? <FaMinus size={16} color='#c29d3d' /> : <FaPlus size={16} color='#c29d3d' />}
                                </span>
                            </button>
                            <div
                                className={`transition-all  duration-300 overflow-hidden ${activeIndex === faq?.id ? 'max-h-screen' : 'max-h-0'}`}
                            >
                                <div className="px-4 py-2 bg-light-50" style={{ letterSpacing: '1.1px' }}>
                                    {Parser().parse(faq?.answer)}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
