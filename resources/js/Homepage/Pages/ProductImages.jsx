import React, { useState } from 'react';
import { Modal, Image } from 'antd';
import Slider from 'react-slick/lib/slider';

const ImageViewer = ({ images }) => {
  const [nav1, setNav1] = useState(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className='image-previewer relative'>
      <Slider ref={slider => setNav1(slider)} {...settings}>
        {images?.map((image, index) => (
          <div key={index}>
            <Image
              loading='lazy'
              alt={`Product ${index}`}
              src={`${image?.image_path?.replace('public', '/storage')}`}
              className='w-full object-cover h-full w-full'
            />
          </div>
        ))}
      </Slider>
      <div className='absolute top-1/2 left-0 transform -translate-y-1/2 flex justify-between w-full px-4'>
        <button
          className='bg-gray-200 hover:bg-gray-300 text-white font-bold p-1 rounded-full'
          onClick={() => nav1?.slickPrev()}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='white'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M15 19l-7-7 7-7'
            />
          </svg>
        </button>
        <button
          className='bg-gray-200 hover:bg-gray-300 text-white font-bold p-1 rounded-full'
          onClick={() => nav1?.slickNext()}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='white'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M9 5l7 7-7 7'
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ImageViewer;