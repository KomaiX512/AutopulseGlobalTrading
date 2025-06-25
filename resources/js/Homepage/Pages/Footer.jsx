import React from 'react'

function Footer() {
    return (
        <div className="container-fluid bg-gray-800 text-light footer wow fadeIn" data-wow-delay="0.1s" style={{ position: 'static', marginTop: '0' }}>
            <div className="container pb-5">
                <div className="row g-5">
                    <div className="col-md-6 col-lg-4">
                        <div className="bg-yellow-600 rounded p-4">
                            <a href="index.html"><h1 className="text-white text-uppercase mb-3">Autopulse</h1></a>
                            <p className="mb-0 text-white">Welcome to our business! We offer a comprehensive marketplace for heavy machinery including rollers, cranes, and bulldozers. Explore our extensive range of spare parts and products tailored for businesses in the heavy equipment industry. Enjoy a seamless and efficient purchasing experience with us.</p>

                        </div>
                    </div>
                    <div className="col-md-6 col-lg-3">
                        <h6 className="section-title text-start text-primary text-uppercase mb-4">Contact</h6>

                        <h3>China Address</h3>
                        <p className="mb-2 text-gray-100"><i className="fa fa-map-marker-alt me-3"></i>Unit 1603, 16th Floor, The L. Plaza, 367
                            - 375 Queen's Road Central, Sheung
                            Wan, Hong Kong</p>

                        <h3>USA Address</h3>
                        <p className="mb-2 text-gray-100"><i className="fa fa-map-marker-alt me-3"></i>312 W 2ND ST PMB 5596
                            CASPER WY 82601-2412
                            UNITED STATES</p>


                        <p className="mb-2 text-gray-100"><i className="fa fa-phone-alt me-3"></i>
                            <a href={`https://wa.me/13072950382?`} style={{ fontWeight: '500' }}>
                                +1307 2950382                        </a></p>
                        <p className="mb-2 text-gray-100"><i className="fa fa-envelope me-3"></i>
                            <a style={{ fontWeight: '500' }} href="mailto:autopulsetrading@gmail.com">
                                info@autopulsetrading.com
                            </a></p>
                      
                    </div>
                    <div className="col-lg-5 col-md-12">
                        <div className="row gy-5 g-4">
                            <div className="col-md-6">
                                <h6 className="section-title text-start text-primary text-uppercase mb-4">Company</h6>
                                <a className="btn btn-link" href="/about">About Us</a>
                                <a className="btn btn-link" href="/contact">Contact Us</a>
                                <a className="btn btn-link" href="/privacy-policy">Privacy Policy</a>
                                {/* <a className="btn btn-link" href="">Terms & Condition</a> */}
                                {/* <a className="btn btn-link" href="">Support</a> */}
                            </div>
                            <div className="col-md-6">
                                <h6 className="section-title text-start text-primary text-uppercase mb-4">Services</h6>
                                <a className="btn btn-link" href="">Blogs</a>
                                <a className="btn btn-link" href="#products-container">Products</a>
                                <a className="btn btn-link" href="">Track</a>
                                <a className="btn btn-link" href="">Contact</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="copyright">
                    <div className="row">
                        <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
                            &copy; <a className="border-bottom" href="/">Autopulse</a>, All Right Reserved by Autopulse                        </div>
                        <div className="col-md-6 text-center text-md-end">
                            <div className="footer-menu">
                                <a href="/">Home</a>
                                <a href="/contact">Help</a>
                                <a href="#faq-container">FQAs</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
