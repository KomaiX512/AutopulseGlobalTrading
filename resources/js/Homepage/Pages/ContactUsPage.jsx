import React from 'react'
import { FaCertificate, FaCheck, FaComment, FaEye, FaTools } from 'react-icons/fa'
import Contact from '../Components/Contact'

function ContactPage() {
    return (
        <div id='about' className='about  '>
            <div class="container-fluid page-header m-0 p-0" style={{ height: "100%", background: `url(/images/about-banner.jpg) center center/cover` }}>
                <div class="container-fluid page-header-inner py-5">
                    <div class="container text-center">
                        <h1 class="display-3 text-white mb-3 animated slideInDown">Contact Us</h1>
                        <nav aria-label="breadcrumb" style={{ background: "transparent" }}>
                            <ol class="breadcrumb justify-content-center text-uppercase" style={{ background: "transparent" }}>
                                <li class="breadcrumb-item"><a href="/" className='text-light'>Home</a></li>
                                <li class="breadcrumb-item text-white active" aria-current="page">Contact</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>

            <div className="container flex flex-col gap-4 ">
                <div className="flex flex-col lg:flex-row lg:justify-between gap-4">
                    <div className="container newsletter mt-3  wow fadeIn  lg:pt-0 lg:pr-4 ">
                        <h1 className="text-4xl font-bold text-gray-800 mb-4" data-aos="fade-up">Let's Connect</h1>
                        <p className='py-2 text-lg text-gray-600' data-aos="fade-up" data-aos-delay="100">
                            We would love to hear from you! Whether you have questions about our products, need support, or want to provide feedback, our team is here to assist you. Reach out to us through the contact form or by the information provided below. We are committed to providing you with prompt and helpful responses.
                        </p>
                    </div>
                    {/* <div className="lg:w-1/3 flex items-center justify-center lg:justify-end lg:pl-4">
                        <img  src="/images/customer-support-illustration.png" className="img-fluid" alt="" data-aos="zoom-in" />
                    </div> */}
                </div>

                {/* <div className="flex flex-col w-full lg:flex-row lg:justify-between"> */}
                {/* </div> */}

            </div>
            {/* </section> */}
            {/* </div> */}
            <Contact />

        </div>

    )
}

export default ContactPage
