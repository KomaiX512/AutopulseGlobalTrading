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
  Alert,
  Typography,
  Steps,
  message,
  Descriptions,
  Tag
} from 'antd';
import { 
  FaUpload, 
  FaSave, 
  FaArrowLeft, 
  FaEye, 
  FaEyeSlash,
  FaIndustry,
  FaInfoCircle,
  FaCheckCircle,
  FaExclamationTriangle
} from 'react-icons/fa';

const { TextArea } = Input;
const { Title, Text } = Typography;
const { Step } = Steps;

const SolutionForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { state, methods } = useContext(SolutionsContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (id) {
      loadSolution();
    }
  }, [id]);

  const loadSolution = async () => {
    try {
      setLoading(true);
      const solution = await methods.loadSolution(id);
      form.setFieldsValue({
        name: solution.name,
        description: solution.description,
        is_active: solution.is_active,
      });
    } catch (err) {
      message.error('Failed to load solution. Please try again.');
      console.error('Error loading solution:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values) => {
    if (isSubmitting) return; // Prevent multiple submissions
    
    try {
      setIsSubmitting(true);
      setLoading(true);
      setError(null);

      // Get current form values - this should get ALL form values regardless of current step
      const formValues = form.getFieldsValue(true); // true means include undefined fields
      
      // Validate required fields
      if (!formValues.name || !formValues.name.trim()) {
        throw new Error('Solution name is required');
      }
      if (!formValues.description || !formValues.description.trim()) {
        throw new Error('Solution description is required');
      }

      const formData = new FormData();
      formData.append('name', formValues.name.trim());
      formData.append('description', formValues.description.trim());
      formData.append('is_active', formValues.is_active ? '1' : '0');

      // Handle image upload - only append if there's actually a file
      if (formValues.image && formValues.image.length > 0) {
        const imageFile = formValues.image[0];
        
        if (imageFile.originFileObj) {
          formData.append('image', imageFile.originFileObj);
        }
      }

      let response;
      if (id) {
        formData.append('_method', 'PUT');
        response = await methods.updateSolution(id, formData);
      } else {
        response = await methods.createSolution(formData);
      }

      message.success(`Solution ${id ? 'updated' : 'created'} successfully!`);
      navigate('/dashboard/solutions');
    } catch (err) {
      console.error('Error saving solution:', err);
      
      if (err.response?.status === 422) {
        const validationErrors = err.response.data.errors;
        const errorMessage = Object.values(validationErrors).flat().join('\n');
        setError(errorMessage || 'Validation failed. Please check your input.');
        message.error(errorMessage || 'Validation failed. Please check your input.');
      } else if (err.message?.includes('CSRF') || err.response?.status === 419) {
        message.error('Session expired. Please refresh the page and try again.');
        window.location.reload();
      } else {
        setError(err.message || 'Failed to save solution. Please try again.');
        message.error(err.message || 'Failed to save solution. Please try again.');
      }
    } finally {
      setLoading(false);
      setIsSubmitting(false);
    }
  };

  const handleNext = async () => {
    try {
      // Validate current step fields before proceeding
      if (currentStep === 0) {
        await form.validateFields(['name', 'description']);
      }
      setCurrentStep(current => current + 1);
    } catch (err) {
      message.error('Please fill in all required fields before proceeding');
    }
  };

  const steps = [
    {
      title: 'Basic Info',
      content: (
        <Card title="Basic Information" className="mb-4">
          <Form.Item
            name="name"
            label="Solution Name"
            rules={[
              { required: true, message: 'Please enter the solution name' },
              { whitespace: true, message: 'Name cannot be empty' }
            ]}
          >
            <Input placeholder="Enter solution name" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              { required: true, message: 'Please enter the description' },
              { whitespace: true, message: 'Description cannot be empty' }
            ]}
          >
            <TextArea rows={4} placeholder="Enter solution description" />
          </Form.Item>
        </Card>
      ),
    },
    {
      title: 'Media',
      content: (
        <Card title="Media" className="mb-4">
          <Form.Item
            name="image"
            label="Solution Image"
            valuePropName="fileList"
            getValueFromEvent={e => Array.isArray(e) ? e : e?.fileList}
          >
            <Upload
              accept="image/*"
              listType="picture-card"
              maxCount={1}
              beforeUpload={() => false}
            >
              <div>
                <FaUpload />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>
        </Card>
      ),
    },
    {
      title: 'Settings',
      content: (
        <Card title="Settings" className="mb-4">
          <Form.Item
            name="is_active"
            label="Active Status"
            valuePropName="checked"
            initialValue={true}
          >
            <Switch />
          </Form.Item>
        </Card>
      ),
    },
  ];

  return (
    <div className="p-6">
      <Card>
        <div className="mb-4 flex justify-between items-center">
          <Space>
            <Button 
              icon={<FaArrowLeft />} 
              onClick={() => navigate('/dashboard/solutions')}
            >
              Back
            </Button>
            <Title level={4} style={{ margin: 0 }}>
              {id ? 'Edit Solution' : 'Create New Solution'}
            </Title>
          </Space>
        </div>

        {error && (
          <Alert
            message="Error"
            description={error}
            type="error"
            showIcon
            className="mb-4"
          />
        )}

        <Steps current={currentStep} className="mb-8">
          {steps.map(item => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            is_active: true,
          }}
          validateTrigger={['onBlur', 'onChange']}
          preserve={true} // Preserve form values when fields are unmounted
        >
          <div className="steps-content">
            {steps[currentStep].content}
          </div>

          <div className="steps-action mt-4 flex justify-between">
            {currentStep > 0 && (
              <Button onClick={() => setCurrentStep(current => current - 1)}>
                Previous
              </Button>
            )}
            <div>
              {currentStep < steps.length - 1 && (
                <Button type="primary" onClick={handleNext}>
                  Next
                </Button>
              )}
              {currentStep === steps.length - 1 && (
                <Button 
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  disabled={isSubmitting}
                  icon={<FaSave />}
                >
                  {id ? 'Update' : 'Create'} Solution
                </Button>
              )}
            </div>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default SolutionForm; 