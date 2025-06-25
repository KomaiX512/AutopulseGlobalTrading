import React, { useContext, useEffect, useState } from 'react'
import Slider from '../Components/Slider'
import { HomeContext } from '../context/HomeContext';

function AboutUs() {

    const { state, dispatch, methods } = useContext(HomeContext);

    const [slides, setSlides] = useState([])

    async function fetchSlides() {
        let slides = await methods.loadSlides('about_slider');
        if (slides) {
            setSlides(slides);
        }
    }

    console.log('slides', slides)

    useEffect(() => {
        fetchSlides();
    }, []);


    const videos = [
        {
            src: '/images/WhatsApp Video 2024-08-21 at 11.48.14 PM.mp4'

        }
    ]

    return (
        <div className="container p-3" style={{ margin: "50px auto" }}>

            <div className="flex  g-5 align-items-center flex-wrap">
                <div className="col-lg-6 px-0 my-3 " style={{ alignSelf: "flex-start" }}>
                    <div className="text-center mb-3">
                        <h2 className="mt-1 text-gray-500 text-left text-2xl font-semibold">WHAT IS AUTOPULSE</h2>
                    </div>
                    <p className="mb-4">Autopulse Global Trading Company, with 15 years of experience, is your trusted partner in exporting high-quality used machinery, new and used vehicles, and new bikes from China. We pride ourselves on our fast shipping services and rigorous quality assurance processes, ensuring you receive top-notch products promptly and reliably. Our commitment to excellence and customer satisfaction sets us apart, making us a preferred choice for clients worldwide.</p>
                    <a className="btn btn-home-primary py-2 px-3 mt-2 " style={{ width: 'fit-content' }} href="/about">Explore More</a>
                </div>
                <div className="col-lg-6 pl-4 rm-pad-1000" style={{ overflow: 'hidden' }}>
                    <Slider videos={videos} slides={slides} link={false} />
                </div>
            </div>
        </div>
    )
}

export default AboutUs
