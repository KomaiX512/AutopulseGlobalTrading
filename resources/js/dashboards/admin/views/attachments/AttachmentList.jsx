import React, { useState, useEffect } from 'react';
import { Table, Button, Input, Select, Tag, Space, Modal, message, Tooltip, Badge } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const { Search } = Input;
const { Option } = Select;

function AttachmentList() {
  const [attachments, setAttachments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    loadAttachments();
    loadCategories();
    loadBrands();
  }, []);

  const loadAttachments = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/get/attachments');
      setAttachments(response.data.attachments || []);
    } catch (error) {
      console.error('Error loading attachments:', error);
      message.error('Failed to load attachments');
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const response = await axios.get('/api/get/categories');
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

  const handleDelete = async (id) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this attachment?',
      content: 'This action cannot be undone.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        try {
          await axios.delete(`/api/delete/attachment/${id}`);
          message.success('Attachment deleted successfully');
          loadAttachments();
        } catch (error) {
          console.error('Error deleting attachment:', error);
          message.error('Failed to delete attachment');
        }
      },
    });
  };

  const handleToggleVisibility = async (id, currentStatus) => {
    try {
      await axios.put(`/api/update/attachment/${id}`, {
        is_viewable: !currentStatus
      });
      message.success(`Attachment ${!currentStatus ? 'made visible' : 'hidden'} successfully`);
      loadAttachments();
    } catch (error) {
      console.error('Error updating attachment:', error);
      message.error('Failed to update attachment');
    }
  };

  const filteredAttachments = attachments.filter(attachment => {
    const matchesSearch = attachment.name.toLowerCase().includes(searchText.toLowerCase()) ||
                         attachment.description?.toLowerCase().includes(searchText.toLowerCase());
    const matchesCategory = !selectedCategory || attachment.category_id == selectedCategory;
    const matchesBrand = !selectedBrand || attachment.brand_id == selectedBrand;
    const matchesType = !selectedType || attachment.type === selectedType;
    
    return matchesSearch && matchesCategory && matchesBrand && matchesType;
  });

  const columns = [
    {
      title: 'Image',
      dataIndex: 'primary_image',
      key: 'image',
      width: 80,
      render: (primaryImage) => (
        <img 
          src={primaryImage?.path?.replace('public', '/storage') || '/images/placeholder.png'} 
          alt="Attachment" 
          style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 4 }}
          onError={(e) => {
            e.target.src = '/images/placeholder.png';
          }}
        />
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <div>
          <div style={{ fontWeight: 'bold' }}>{text}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>
            {record.category?.name && `Category: ${record.category.name}`}
          </div>
        </div>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price) => price ? `$${parseFloat(price).toLocaleString()}` : 'N/A',
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
      render: (stock) => (
        <Badge 
          count={stock || 0} 
          style={{ 
            backgroundColor: (stock || 0) > 0 ? '#52c41a' : '#ff4d4f',
            color: 'white'
          }} 
        />
      ),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type) => (
        <Tag color={type === 'customer' ? 'blue' : 'green'}>
          {type === 'customer' ? 'Customer' : 'Business'}
        </Tag>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'is_viewable',
      key: 'is_viewable',
      render: (isViewable, record) => (
        <Tag 
          color={isViewable ? 'green' : 'red'}
          style={{ cursor: 'pointer' }}
          onClick={() => handleToggleVisibility(record.id, isViewable)}
        >
          {isViewable ? 'Visible' : 'Hidden'}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="View Details">
            <Button 
              type="text" 
              icon={<EyeOutlined />} 
              onClick={() => navigate(`/attachments/view/${record.id}`)}
            />
          </Tooltip>
          <Tooltip title="Edit Attachment">
            <Button 
              type="text" 
              icon={<EditOutlined />} 
              onClick={() => navigate(`/attachments/edit/${record.id}`)}
            />
          </Tooltip>
          <Tooltip title="Delete Attachment">
            <Button 
              type="text" 
              danger 
              icon={<DeleteOutlined />} 
              onClick={() => handleDelete(record.id)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0 }}>Attachments & Accessories Management</h2>
        <Button 
          type="primary" 
          icon={<PlusOutlined />}
          onClick={() => navigate('/attachments/add')}
        >
          Add New Attachment
        </Button>
      </div>

      <div style={{ marginBottom: '16px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <Search
          placeholder="Search attachments..."
          allowClear
          style={{ width: 300 }}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          prefix={<SearchOutlined />}
        />
        
        <Select
          placeholder="Filter by Category"
          allowClear
          style={{ width: 200 }}
          value={selectedCategory}
          onChange={setSelectedCategory}
        >
          {categories.map(category => (
            <Option key={category.id} value={category.id}>
              {category.name}
            </Option>
          ))}
        </Select>

        <Select
          placeholder="Filter by Brand"
          allowClear
          style={{ width: 200 }}
          value={selectedBrand}
          onChange={setSelectedBrand}
        >
          {brands.map(brand => (
            <Option key={brand.id} value={brand.id}>
              {brand.name}
            </Option>
          ))}
        </Select>

        <Select
          placeholder="Filter by Type"
          allowClear
          style={{ width: 150 }}
          value={selectedType}
          onChange={setSelectedType}
        >
          <Option value="customer">Customer</Option>
          <Option value="business">Business</Option>
        </Select>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <Tag color="blue">Total: {filteredAttachments.length} attachments</Tag>
        <Tag color="green">Visible: {filteredAttachments.filter(a => a.is_viewable).length}</Tag>
        <Tag color="red">Hidden: {filteredAttachments.filter(a => !a.is_viewable).length}</Tag>
      </div>

      <Table
        columns={columns}
        dataSource={filteredAttachments}
        loading={loading}
        rowKey="id"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} attachments`,
        }}
        scroll={{ x: 1200 }}
      />
    </div>
  );
}

export default AttachmentList; 