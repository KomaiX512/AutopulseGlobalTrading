import React from 'react';
import { Carousel } from 'antd';
import VideoPlayer from './VideoPlayer';

const contentStyle = {
  color: '#fff',
  textAlign: 'center',
  height: '100%',
  width: '100%',
};

const videoStyle = {
  width: '100%',
  height: '100%',
  border: 'none',
};

const videoContainerStyle = {
  position: 'relative',
  paddingBottom: '56.25%', // 16:9 aspect ratio (can adjust based on your needs)
  height: 0,
  overflow: 'hidden',
};

const iframeStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  border: 'none',
};

const Slider = ({ slides, videos = [], link = true }) => {
  return (
    <Carousel autoplay  dots={false} id='slider-component'>
      {videos.map((slide, index) => (
        <div key={index} className="video-container" style={videoContainerStyle}>
          <VideoPlayer url={slide.src} />
        </div>
      ))}
      {slides.map((slide, index) => (
        <div key={index}>
          <a href={link ? slide?.url : '#'}>
            <h3 style={contentStyle}>
              <img
                style={{ height: 'auto', objectFit: 'cover', width: '100%' }}
                src={typeof slide?.image === 'string' ? slide?.image?.replace('public', '/storage') : ''}
                alt=""
              />
            </h3>
          </a>
        </div>
      ))}
    </Carousel>
  );
};

export default Slider;
