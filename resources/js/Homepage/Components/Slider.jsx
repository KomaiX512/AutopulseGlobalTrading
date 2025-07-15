import React from 'react';
import { Carousel } from 'antd';
import VideoPlayer from './VideoPlayer';
import { motion } from 'framer-motion';

const contentStyle = {
  color: '#fff',
  textAlign: 'center',
  height: '100%',
  width: '100%',
  position: 'relative',
};

const videoStyle = {
  width: '100%',
  height: '100%',
  border: 'none',
};

const videoContainerStyle = {
  position: 'relative',
  paddingBottom: '56.25%', // 16:9 aspect ratio
  height: 0,
  overflow: 'hidden',
};

const overlayStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  background: 'rgba(0, 0, 0, 0.5)',
  padding: '2rem',
  color: '#fff',
  textAlign: 'center',
};

const Slider = ({ slides, videos = [], link = true }) => {
  const settings = {
    autoplay: true,
    dots: true,
    effect: 'fade',
    autoplaySpeed: 5000,
    pauseOnHover: true,
    arrows: false, // Hide arrows on mobile
    beforeChange: (current, next) => {
      // Animation will be handled by framer-motion
    },
  };

  return (
    <div className="hero-slider-container">
      <Carousel {...settings} id='slider-component'>
        {videos.map((slide, index) => (
          <div key={index} className="video-container" style={videoContainerStyle}>
            <VideoPlayer url={slide.src} />
          </div>
        ))}
        {slides.map((slide, index) => (
          <div key={index} style={contentStyle}>
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: 1.1 }}
              transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
              style={{ height: '100%', overflow: 'hidden' }}
            >
              <a href={link ? slide?.url : '#'} style={{ display: 'block', height: '100%' }}>
                <img
                  style={{ height: '100%', objectFit: 'cover', width: '100%' }}
                  src={typeof slide?.image === 'string' ? slide?.image?.replace('public', '/storage') : ''}
                  alt={slide?.title || ''}
                />
                <div style={overlayStyle}>
                  <motion.h2
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-2xl md:text-4xl font-bold mb-4"
                  >
                    {slide?.title}
                  </motion.h2>
                  {slide?.subtitle && (
                    <motion.h3
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      className="text-lg md:text-2xl mb-4"
                    >
                      {slide?.subtitle}
                    </motion.h3>
                  )}
                  {slide?.description && (
                    <motion.p
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                      className="text-sm md:text-lg max-w-2xl px-4"
                    >
                      {slide?.description}
                    </motion.p>
                  )}
                </div>
              </a>
            </motion.div>
          </div>
        ))}
      </Carousel>
      
      <style jsx>{`
        .hero-slider-container .ant-carousel .ant-carousel-dots {
          bottom: 20px;
        }
        
        .hero-slider-container .ant-carousel .ant-carousel-dots li {
          margin: 0 4px;
        }
        
        .hero-slider-container .ant-carousel .ant-carousel-dots li button {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.5);
        }
        
        .hero-slider-container .ant-carousel .ant-carousel-dots li.ant-carousel-dots-active button {
          background: #fff;
        }
        
        @media (max-width: 768px) {
          .hero-slider-container .ant-carousel .ant-carousel-dots {
            bottom: 15px;
          }
          
          .hero-slider-container .ant-carousel .ant-carousel-dots li button {
            width: 8px;
            height: 8px;
          }
        }
      `}</style>
    </div>
  );
};

export default Slider;
