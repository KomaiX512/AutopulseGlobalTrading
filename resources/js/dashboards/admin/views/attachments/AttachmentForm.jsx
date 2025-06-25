import React, { useState } from 'react';
import UploadImage from '@/Components/UploadImage';
import { Checkbox, Tooltip, message } from 'antd';
import axios from 'axios';

function AttachmentForm() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isViewable, setIsViewable] = useState(true);
  const [loading, setLoading] = useState(false);

  function handleViewableCheckbox() {
    setIsViewable(!isViewable);
  }

  async function submitForm(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('is_viewable', isViewable ? 1 : 0);
      
      if (selectedImage) {
        formData.append('image', selectedImage.originFileObj);
      }

      const response = await axios.post('/api/save/attachment', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        message.success('Attachment created successfully!');
        // Reset form
        setName('');
        setDescription('');
        setSelectedImage(null);
        setIsViewable(true);
        e.target.reset();
      } else {
        message.error('Failed to create attachment');
      }
    } catch (error) {
      console.error('Error creating attachment:', error);
      message.error('Error creating attachment');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='form'>
      <h2 className="text-xl font-bold mb-4">Add New Attachment</h2>
      
      <form className="flex flex-col p-3 bg-white" style={{ gap: '10px' }} onSubmit={submitForm}>
        <label className='flex flex-col my-4' htmlFor="image">
          <span className="mb-2">Attachment Image</span>
          <div className="relative">
            <UploadImage
              setSelectedFile={setSelectedImage} 
            />
            <label className="flex-column py-3" style={{ width: "fit-content" }} htmlFor="">
              <Checkbox
                name="is_viewable"
                style={{ color: 'green', textDecoration: 'underline' }}
                onChange={handleViewableCheckbox}
                checked={isViewable}
              >
                <Tooltip title={'Check this box to make this attachment visible on homepage'}>
                  Make This Attachment Visible On Homepage?
                </Tooltip>
              </Checkbox>
            </label>
          </div>
        </label>

        <label className='flex flex-col' htmlFor="">
          <span>Attachment Name</span>
          <input
            type="text"
            name='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="p-2 border border-gray-300 rounded"
            placeholder="e.g., Hydraulic Hammer"
          />
        </label>

        <label className='flex flex-col' htmlFor="">
          <span>Description</span>
          <textarea
            name='description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={4}
            className="p-2 border border-gray-300 rounded"
            placeholder="Describe the attachment and its uses..."
          />
        </label>

        <button 
          type='submit' 
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create Attachment'}
        </button>
      </form>

      <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded">
        <h3 className="font-bold text-yellow-800">Real-time Testing Instructions:</h3>
        <ol className="list-decimal list-inside mt-2 text-yellow-700">
          <li>Fill out the form above with attachment details</li>
          <li>Upload an image for the attachment</li>
          <li>Click "Create Attachment"</li>
          <li>Go to the homepage (localhost:8000) and refresh</li>
          <li>Check if your new attachment appears in the "Attachments & Accessories" section</li>
        </ol>
      </div>
    </div>
  );
}

export default AttachmentForm; 