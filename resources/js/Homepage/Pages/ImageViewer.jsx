// ImageViewer.js
import React, { useState } from 'react';
import Slider from 'react-slick';
import { Modal, Image } from 'antd';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ImageViewer = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setIsModalVisible(true);
  };

  const settings = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="image-viewer">
      <div className="preview-container">
        <Image loading='lazy' src={selectedImage} alt="Selected" onClick={() => setIsModalVisible(true)} />
      </div>
      <Slider {...settings}>
        {images?.map((image, index) => (
          <div key={index} className="thumbnail-container" onClick={() => handleImageClick(image)}>
            <img
              loading='lazy'
              src={image} alt={`Thumbnail ${index}`} className="thumbnail" />
          </div>
        ))}
      </Slider>
      <Modal
        visible={isModalVisible}
        footer={null}
        onCancel={() => setIsModalVisible(false)}
        width="80%"
        style={{ top: 20 }}
      >
        <img
          loading='lazy'
          src={selectedImage} alt="Selected" style={{ width: '100%' }} />
      </Modal>
    </div>
  );
};

export default ImageViewer;
