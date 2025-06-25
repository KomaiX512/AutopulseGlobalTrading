import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SolutionsContext } from './context/SolutionsContext';
import { 
  Form, 
  Input, 
  Button, 
  Switch, 
  Upload, 
  Card, 
  Divider, 
  Row, 
  Col,
  Spin,
  Space,
  Alert
} from 'antd';
import { FaUpload, FaSave, FaArrowLeft } from 'react-icons/fa';

const { TextArea } = Input;

const SolutionForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, methods } = useContext(SolutionsContext);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  const isEditing = Boolean(id);

  // Load solution data if editing
  useEffect(() => {
    if (isEditing) {
      loadSolutionData();
    } else {
      methods.clearCurrentSolution();
      form.resetFields();
    }
  }, [id]);

  // Load solution data for editing
  const loadSolutionData = async () => {
    try {
      setLoading(true);
      const solution = await methods.loadSolution(id);
      
      // Populate form with solution data
      form.setFieldsValue({
        name: solution.name,
        description: solution.description,
        is_viewable: solution.is_viewable
      });
      
      setImageUrl(solution.image || '');
    } catch (error) {
      console.error('Error loading solution:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      
      const solutionData = {
        ...values,
        image: imageUrl
      };

      if (isEditing) {
        await methods.updateSolution(id, solutionData);
      } else {
        await methods.createSolution(solutionData);
      }
      
      navigate('/solutions/list');
    } catch (error) {
      console.error('Error saving solution:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle image upload
  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    
    try {
      // You would implement actual image upload here
      // For now, we'll use a placeholder
      const fakeImageUrl = `/images/solutions/${file.name}`;
      setImageUrl(fakeImageUrl);
      return false; // Prevent default upload
    } catch (error) {
      console.error('Error uploading image:', error);
      return false;
    }
  };

  const uploadProps = {
    name: 'image',
    listType: 'picture-card',
    className: 'solution-uploader',
    showUploadList: false,
    beforeUpload: handleImageUpload,
    accept: 'image/*',
  };

  if (loading && isEditing) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <Space className="mb-4">
          <Button 
            icon={<FaArrowLeft />} 
            onClick={() => navigate('/solutions/list')}
          >
            Back to Solutions
          </Button>
        </Space>
        <h1 className="text-2xl font-bold text-gray-800">
          {isEditing ? 'Edit Solution' : 'Create New Solution'}
        </h1>
        <p className="text-gray-600">
          {isEditing 
            ? 'Update solution information and manage associated products' 
            : 'Create a new solution category for heavy machinery'
          }
        </p>
      </div>

      {/* Form */}
      <Card>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            is_viewable: true
          }}
        >
          <Row gutter={24}>
            <Col md={16} xs={24}>
              {/* Basic Information */}
              <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
              
              <Form.Item
                label="Solution Name"
                name="name"
                rules={[
                  { required: true, message: 'Please enter solution name' },
                  { min: 3, message: 'Name must be at least 3 characters' },
                  { max: 255, message: 'Name must not exceed 255 characters' }
                ]}
              >
                <Input 
                  placeholder="e.g., Material Handling Machines"
                  size="large"
                />
              </Form.Item>

              <Form.Item
                label="Description"
                name="description"
                rules={[
                  { required: true, message: 'Please enter solution description' },
                  { min: 10, message: 'Description must be at least 10 characters' }
                ]}
              >
                <TextArea
                  placeholder="Describe the types of machines and use cases for this solution..."
                  rows={4}
                  size="large"
                />
              </Form.Item>

              <Form.Item
                label="Visibility"
                name="is_viewable"
                valuePropName="checked"
                extra="When enabled, this solution will be visible on the website"
              >
                <Switch 
                  checkedChildren="Visible" 
                  unCheckedChildren="Hidden"
                />
              </Form.Item>
            </Col>

            <Col md={8} xs={24}>
              {/* Image Upload */}
              <h3 className="text-lg font-semibold mb-4">Solution Image</h3>
              
              <div className="text-center">
                <Upload {...uploadProps}>
                  {imageUrl ? (
                    <img 
                      src={imageUrl.replace('public', '/storage')} 
                      alt="Solution" 
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  ) : (
                    <div className="w-full h-48 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-500 hover:border-blue-400 transition-colors">
                      <FaUpload size={32} className="mb-2" />
                      <p>Click to upload image</p>
                      <p className="text-sm">JPG, PNG up to 2MB</p>
                    </div>
                  )}
                </Upload>
                
                {imageUrl && (
                  <Button 
                    type="link" 
                    danger 
                    onClick={() => setImageUrl('')}
                    className="mt-2"
                  >
                    Remove Image
                  </Button>
                )}
              </div>
            </Col>
          </Row>

          <Divider />

          {/* Info Box */}
          <Alert
            message="Solution Management Tips"
            description={
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li>Choose a clear, descriptive name that reflects the solution's purpose</li>
                <li>Write a detailed description explaining what types of projects this solution serves</li>
                <li>Upload a relevant image that represents the solution category</li>
                <li>After creating the solution, you can assign specific machines to it</li>
              </ul>
            }
            type="info"
            showIcon
            className="mb-6"
          />

          {/* Form Actions */}
          <div className="flex justify-end space-x-4">
            <Button 
              size="large"
              onClick={() => navigate('/solutions/list')}
            >
              Cancel
            </Button>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={loading}
              icon={<FaSave />}
              size="large"
            >
              {isEditing ? 'Update Solution' : 'Create Solution'}
            </Button>
          </div>
        </Form>
      </Card>

      {/* Product Management Section for Existing Solutions */}
      {isEditing && state.currentSolution && (
        <Card className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Product Management</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600">
                  This solution currently has <strong>{state.currentSolution.products?.length || 0}</strong> assigned products
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Use the product management page to add or remove machines from this solution
                </p>
              </div>
              <Button 
                type="primary"
                onClick={() => navigate(`/solutions/products/${id}`)}
              >
                Manage Products
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default SolutionForm; 