import React, { useState, useEffect } from 'react';
import UploadImage from '@/Components/UploadImage';
import { Checkbox, Tooltip, message, Form, Input, Select, InputNumber, Button, Card, Row, Col, Divider, Upload, Image } from 'antd';
import { SaveOutlined, ArrowLeftOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Ck5Editor from '@/Homepage/Components/CK5Editor';
import { ajaxRequest } from '@/utils/helpers';

const { Option } = Select;
const { TextArea } = Input;

function AttachmentForm() {
  const [form] = Form.useForm();
  const [selectedImages, setSelectedImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [productTypes, setProductTypes] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [attachmentData, setAttachmentData] = useState(null);
  
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    loadCategories();
    loadBrands();
    loadProductTypes();
    
    if (id) {
      setIsEdit(true);
      loadAttachment(id);
    }
  }, [id]);

  const loadCategories = async () => {
    try {
      // Load only "Attachments & Accessories" categories (product_type_id = 7)
      const response = await axios.get('/api/get/categories?product_type_id=7');
      setCategories(response.data.categories || []);
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  const loadBrands = async () => {
    try {
      const response = await axios.get('/api/get/brands');
      setBrands(response.data.brands || []);
    } catch (error) {
      console.error('Error loading brands:', error);
    }
  };

  const loadProductTypes = async () => {
    try {
      const response = await axios.get('/api/get/product-types');
      setProductTypes(response.data.productTypes || []);
    } catch (error) {
      console.error('Error loading product types:', error);
    }
  };

  const loadAttachment = async (attachmentId) => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/get/attachment/${attachmentId}`);
      const attachment = response.data.attachment;
      setAttachmentData(attachment);
      
      // Load existing images if editing
      if (attachment.images && attachment.images.length > 0) {
        setSelectedImages(attachment.images.map(img => ({
          uid: img.id,
          name: img.filename || 'image',
          status: 'done',
          url: img.path?.replace('public', '/storage')
        })));
      }
      
      form.setFieldsValue({
        name: attachment.name,
        description: attachment.description,
        features: attachment.features,
        category_id: attachment.category_id,
        brand_id: attachment.brand_id,
        price: attachment.price,
        stock: attachment.stock,
        type: attachment.type || 'customer',
        is_viewable: attachment.is_viewable
      });
    } catch (error) {
      console.error('Error loading attachment:', error);
      message.error('Failed to load attachment data');
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (info) => {
    setSelectedImages(info.fileList);
  };

  const onFinish = async (values) => {
    setLoading(true);

    try {
      const formData = new FormData();
      
      // Get current form values including CK5Editor content
      const currentValues = form.getFieldsValue();
      
      // Add all form values, ensuring correct types
      Object.keys(currentValues).forEach(key => {
        let value = currentValues[key];
        if (value === undefined || value === null || value === '') return;
        if (key === 'is_viewable') value = value ? 1 : 0;
        if (key === 'price' || key === 'stock') value = Number(value);
        formData.append(key, value);
      });
      
      // Also add values from the onFinish parameter as backup
      Object.keys(values).forEach(key => {
        let value = values[key];
        if (value === undefined || value === null || value === '') return;
        if (key === 'is_viewable') value = value ? 1 : 0;
        if (key === 'price' || key === 'stock') value = Number(value);
        // Only append if not already added
        if (!formData.has(key)) {
          formData.append(key, value);
        }
      });
      
      // Add multiple images
      selectedImages.forEach((file, index) => {
        if (file.originFileObj) {
          formData.append(`images[${index}]`, file.originFileObj);
        }
      });

      // Debug: Log what's being sent
      console.log('Form values being sent:', values);
      console.log('Current form values:', currentValues);
      console.log('Selected images:', selectedImages);
      
      // Debug: Log FormData contents
      for (let [key, value] of formData.entries()) {
        console.log(`FormData ${key}:`, value);
      }
      
      // Debug: Log update data if editing
      if (isEdit) {
        const updateData = {
          name: currentValues.name,
          description: currentValues.description,
          features: currentValues.features,
          category_id: currentValues.category_id,
          brand_id: currentValues.brand_id,
          price: Number(currentValues.price),
          stock: Number(currentValues.stock),
          type: currentValues.type,
          is_viewable: currentValues.is_viewable ? 1 : 0
        };
        console.log('Update data being sent:', updateData);
      }

      let response;
      if (isEdit) {
        // For updates, send as JSON (no file uploads in updates)
        const updateData = {
          name: currentValues.name,
          description: currentValues.description,
          features: currentValues.features,
          category_id: currentValues.category_id,
          brand_id: currentValues.brand_id,
          price: Number(currentValues.price),
          stock: Number(currentValues.stock),
          type: currentValues.type,
          is_viewable: currentValues.is_viewable ? 1 : 0
        };
        
        response = await axios.post(`/api/update/attachment/${id}`, updateData, {
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content'),
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
          },
          withCredentials: true
        });
      } else {
        response = await axios.post('/api/save/attachment', formData, {
          headers: {
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content'),
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
          },
          withCredentials: true
        });
      }

      if (response.data.success) {
        message.success(`Attachment ${isEdit ? 'updated' : 'created'} successfully!`);
        navigate('/attachments/list');
      } else {
        message.error(response.data.message || `Failed to ${isEdit ? 'update' : 'create'} attachment`);
      }
    } catch (error) {
      console.error('Error saving attachment:', error);
      
      // Show backend validation errors if present
      if (error.response && error.response.data && error.response.data.errors) {
        const errors = error.response.data.errors;
        Object.keys(errors).forEach(key => {
          message.error(`${key}: ${errors[key].join(', ')}`);
        });
      } else if (error.response && error.response.data && error.response.data.message) {
        message.error(error.response.data.message);
      } else if (error.message) {
        message.error(error.message);
      } else {
        message.error(`Error ${isEdit ? 'updating' : 'creating'} attachment`);
      }
    } finally {
      setLoading(false);
    }
  };

  const uploadProps = {
    listType: 'picture-card',
    fileList: selectedImages,
    onChange: handleImageChange,
    beforeUpload: () => false, // Prevent auto upload
    multiple: true,
    accept: 'image/*'
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Button 
          icon={<ArrowLeftOutlined />} 
          onClick={() => navigate('/attachments/list')}
        >
          Back to List
        </Button>
        <h2 style={{ margin: 0 }}>
          {isEdit ? 'Edit Attachment' : 'Add New Attachment'}
        </h2>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          type: 'customer',
          is_viewable: true,
          stock: 1
        }}
      >
        <Row gutter={24}>
          <Col xs={24} lg={16}>
            <Card title="Basic Information" style={{ marginBottom: '24px' }}>
              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="name"
                    label="Attachment Name"
                    rules={[{ required: true, message: 'Please enter attachment name' }]}
                  >
                    <Input placeholder="e.g., Hydraulic Hammer" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="type"
                    label="Type"
                    rules={[{ required: true, message: 'Please select type' }]}
                  >
                    <Select placeholder="Select type">
                      <Option value="customer">Customer</Option>
                      <Option value="business">Business</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="category_id"
                    label="Category"
                    rules={[{ required: true, message: 'Please select category' }]}
                  >
                    <Select placeholder="Select category" showSearch>
                      {categories.map(category => (
                        <Option key={category.id} value={category.id}>
                          {category.name} {category.productType ? `(${category.productType.name})` : ''}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="brand_id"
                    label="Brand"
                  >
                    <Select placeholder="Select brand" allowClear showSearch>
                      {brands.map(brand => (
                        <Option key={brand.id} value={brand.id}>
                          {brand.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="price"
                    label="Price ($)"
                    rules={[{ required: true, message: 'Please enter price' }]}
                  >
                    <InputNumber
                      style={{ width: '100%' }}
                      placeholder="0.00"
                      min={0}
                      precision={2}
                      formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      parser={value => value.replace(/\$\s?|(,*)/g, '')}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="stock"
                    label="Stock Quantity"
                    rules={[{ required: true, message: 'Please enter stock quantity' }]}
                  >
                    <InputNumber
                      style={{ width: '100%' }}
                      placeholder="0"
                      min={0}
                      precision={0}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Card>

            <Card title="Description & Features" style={{ marginBottom: '24px' }}>
              <Form.Item
                name="description"
                label="Description"
                rules={[{ required: true, message: 'Please enter description' }]}
              >
                <div>
                  <Ck5Editor
                    name="description"
                    defaultValue=""
                    onChange={(value) => {
                      console.log('Description changed:', value);
                      form.setFieldsValue({ description: value });
                    }}
                  />
                </div>
              </Form.Item>

              <Form.Item
                name="features"
                label="Features"
              >
                <div>
                  <Ck5Editor
                    name="features"
                    defaultValue=""
                    onChange={(value) => {
                      console.log('Features changed:', value);
                      form.setFieldsValue({ features: value });
                    }}
                  />
                </div>
              </Form.Item>
            </Card>
          </Col>

          <Col xs={24} lg={8}>
            <Card title="Images & Settings">
              <Form.Item label="Attachment Images">
                <Upload {...uploadProps}>
                  {selectedImages.length < 8 && (
                    <div>
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                  )}
                </Upload>
                <div style={{ fontSize: '12px', color: '#666', marginTop: '8px' }}>
                  You can upload up to 8 images. First image will be the main image.
                </div>
              </Form.Item>

              <Divider />

              <Form.Item
                name="is_viewable"
                valuePropName="checked"
              >
                <Checkbox>
                  <Tooltip title="Check this box to make this attachment visible on homepage">
                    Make This Attachment Visible On Homepage
                  </Tooltip>
                </Checkbox>
              </Form.Item>

              <Divider />

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  icon={<SaveOutlined />}
                  loading={loading}
                  size="large"
                  style={{ width: '100%' }}
                >
                  {loading ? 'Saving...' : (isEdit ? 'Update Attachment' : 'Create Attachment')}
                </Button>
              </Form.Item>
            </Card>
          </Col>
        </Row>
      </Form>

      {!isEdit && (
        <Card style={{ marginTop: '24px', backgroundColor: '#f6ffed', borderColor: '#b7eb8f' }}>
          <h3 style={{ color: '#52c41a', marginBottom: '12px' }}>Quick Tips:</h3>
          <ul style={{ color: '#52c41a', margin: 0, paddingLeft: '20px' }}>
            <li>Upload multiple high-quality images for better presentation</li>
            <li>First image will be used as the main display image</li>
            <li>Provide detailed description and features for better customer understanding</li>
            <li>Set appropriate pricing and stock levels</li>
            <li>Choose the right category for better organization</li>
            <li>Make attachments visible to show them on the homepage</li>
          </ul>
        </Card>
      )}
    </div>
  );
}

export default AttachmentForm; 