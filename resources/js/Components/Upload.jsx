import React, { useState } from 'react';

const ImageUploader = ({ multiple, onUpload }) => {
  const [selectedImages, setSelectedImages] = useState([]);

  const handleImageChange = (e) => {
    const files = e.target.files;
    let uploadedImages = [];

    if (files && files.length > 0) {
      if (multiple) {
        uploadedImages = Array.from(files);
      } else {
        uploadedImages.push(files[0]);
      }
    }

    setSelectedImages(uploadedImages);

    // Callback to parent component with selected image(s)
    onUpload(uploadedImages);
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        multiple={multiple}
      />
      <div>
        {selectedImages?.map((image, index) => (
          <div key={index}>
            <img
              loading='lazy'
              src={URL.createObjectURL(image)}
              alt={`Image ${index + 1}`}
              style={{ maxWidth: '100px', maxHeight: '100px', margin: '5px' }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUploader;
