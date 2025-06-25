import React from 'react'

function SectionHeading({ text, text_2 = text }) {
    return (
        // <div class="section-title" data-aos="fade-up">
        //     <p>{text}</p>
        // </div>
        <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h6 className="section-title text-center text-primary text-uppercase">{text}</h6>
            <h1 className="mb-5">Explore <span className="text-primary text-uppercase">{text_2}</span></h1>
        </div>
    )
}

export default SectionHeading
