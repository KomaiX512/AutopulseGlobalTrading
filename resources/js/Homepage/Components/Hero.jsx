import React from 'react'

function Hero() {
    return (
        <div>
            <section id="hero" class="d-flex  align-items-center">

                <div class="container">
                    <div class="row">
                        <div class="col-lg-6 pt-5 pt-lg-0 order-2 order-lg-1">
                            <h1>Bettter digital experience with Ninestars</h1>
                            <h2>We are team of talanted designers making websites with Bootstrap</h2>
                            <a href="#about" class="btn-get-started scrollto">Get Started</a>
                        </div>
                        <div class="col-lg-6 order-1 order-lg-2 hero-img">
                            <img loading='lazy'
                                src="assets/img/hero-img.svg" class="img-fluid animated" alt="" />
                        </div>
                    </div>
                </div>

            </section>
        </div>
    )
}

export default Hero
