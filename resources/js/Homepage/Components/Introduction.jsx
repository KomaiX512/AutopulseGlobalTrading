import React from 'react';
import VideoPlayer from './VideoPlayer';

function Introduction() {
    return (
        <section className="introduction-section py-16 bg-white">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="text-content">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">WHAT IS AUTOPULSE</h2>
                        <p className="text-gray-600 leading-relaxed">
                            Autopulse Global Trading Company, with 15 years of experience, is your trusted partner in exporting high-quality used machinery, new and used vehicles, and new bikes from China. We pride ourselves on our fast shipping services and rigorous quality assurance processes, ensuring you receive top-notch products promptly and reliably. Our commitment to excellence and customer satisfaction sets us apart, making us a preferred choice for clients worldwide.
                        </p>
                    </div>
                    <div className="video-content">
                        <VideoPlayer url="/images/WhatsApp Video 2024-08-21 at 11.48.14 PM.mp4" />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Introduction; 