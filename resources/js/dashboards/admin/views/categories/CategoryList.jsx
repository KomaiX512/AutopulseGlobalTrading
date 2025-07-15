import React, { useState, useEffect } from 'react';
import { Table, Button, Input, Select, Tag, Space, Modal, message, Tooltip, Badge, Card, Row, Col } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined, PlusOutlined, SearchOutlined, FilterOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const { Search } = Input;
const { Option } = Select;

function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productTypes, setProductTypes] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedProductType, setSelectedProductType] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    loadCategories();
    loadProductTypes();
  }, []);

  const loadCategories = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/get/categories');
      setCategories(response.data.categories || []);
    } catch (error) {
      console.error('Error loading categories:', error);
      message.error('Failed to load categories');
    } finally {
      setLoading(false);
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

  const handleDelete = async (id) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this category?',
      content: 'This action cannot be undone. All products and attachments in this category will be affected.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        try {
          await axios.delete(`/api/delete/category/${id}`);
          message.success('Category deleted successfully');
          loadCategories();
        } catch (error) {
          console.error('Error deleting category:', error);
          message.error('Failed to delete category');
        }
      },
    });
  };

  const handleToggleVisibility = async (id, currentStatus) => {
    try {
      await axios.put(`/api/update/category/${id}`, {
        is_viewable: !currentStatus
      });
      message.success(`Category ${!currentStatus ? 'made visible' : 'hidden'} successfully`);
      loadCategories();
    } catch (error) {
      console.error('Error updating category:', error);
      message.error('Failed to update category');
    }
  };

  const filteredCategories = categories.filter(category => {
    const matchesSearch = category.name.toLowerCase().includes(searchText.toLowerCase()) ||
                         category.description?.toLowerCase().includes(searchText.toLowerCase());
    const matchesProductType = !selectedProductType || category.product_type_id == selectedProductType;
    const matchesType = !selectedType || category.type === selectedType;
    
    return matchesSearch && matchesProductType && matchesType;
  });

  const getProductTypeName = (productTypeId) => {
    const productType = productTypes.find(pt => pt.id === productTypeId);
    return productType ? productType.name : 'Unknown';
  };

  const columns = [
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      width: 80,
      render: (image) => (
        <img 
          src={image?.replace('public', '/storage')} 
          alt="Category" 
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
            {getProductTypeName(record.product_type_id)}
          </div>
        </div>
      ),
    },
    {
      title: 'Products Count',
      dataIndex: 'products_count',
      key: 'products_count',
      render: (count, record) => (
        <Badge 
          count={record.products?.length || 0} 
          style={{ 
            backgroundColor: (record.products?.length || 0) > 0 ? '#52c41a' : '#ff4d4f',
            color: 'white'
          }} 
        />
      ),
    },
    {
      title: 'Attachments Count',
      dataIndex: 'attachments_count',
      key: 'attachments_count',
      render: (count, record) => (
        <Badge 
          count={record.attachments?.length || 0} 
          style={{ 
            backgroundColor: (record.attachments?.length || 0) > 0 ? '#1890ff' : '#ff4d4f',
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
              onClick={() => navigate(`/categories/view/${record.id}`)}
            />
          </Tooltip>
          <Tooltip title="Edit Category">
            <Button 
              type="text" 
              icon={<EditOutlined />} 
              onClick={() => navigate(`/categories/edit/${record.id}`)}
            />
          </Tooltip>
          <Tooltip title="Delete Category">
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

  const stats = {
    total: categories.length,
    visible: categories.filter(c => c.is_viewable).length,
    hidden: categories.filter(c => !c.is_viewable).length,
    withProducts: categories.filter(c => (c.products?.length || 0) > 0).length,
    withAttachments: categories.filter(c => (c.attachments?.length || 0) > 0).length,
  };

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0 }}>Category Management</h2>
        <Button 
          type="primary" 
          icon={<PlusOutlined />}
          onClick={() => navigate('/categories/add')}
        >
          Add New Category
        </Button>
      </div>

      {/* Statistics Cards */}
      <Row gutter={16} style={{ marginBottom: '24px' }}>
        <Col xs={12} sm={6} md={4} lg={2}>
          <Card size="small">
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1890ff' }}>{stats.total}</div>
              <div style={{ fontSize: '12px', color: '#666' }}>Total Categories</div>
            </div>
          </Card>
        </Col>
        <Col xs={12} sm={6} md={4} lg={2}>
          <Card size="small">
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#52c41a' }}>{stats.visible}</div>
              <div style={{ fontSize: '12px', color: '#666' }}>Visible</div>
            </div>
          </Card>
        </Col>
        <Col xs={12} sm={6} md={4} lg={2}>
          <Card size="small">
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#ff4d4f' }}>{stats.hidden}</div>
              <div style={{ fontSize: '12px', color: '#666' }}>Hidden</div>
            </div>
          </Card>
        </Col>
        <Col xs={12} sm={6} md={4} lg={2}>
          <Card size="small">
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#722ed1' }}>{stats.withProducts}</div>
              <div style={{ fontSize: '12px', color: '#666' }}>With Products</div>
            </div>
          </Card>
        </Col>
        <Col xs={12} sm={6} md={4} lg={2}>
          <Card size="small">
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#fa8c16' }}>{stats.withAttachments}</div>
              <div style={{ fontSize: '12px', color: '#666' }}>With Attachments</div>
            </div>
          </Card>
        </Col>
      </Row>

      <div style={{ marginBottom: '16px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <Search
          placeholder="Search categories..."
          allowClear
          style={{ width: 300 }}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          prefix={<SearchOutlined />}
        />
        
        <Select
          placeholder="Filter by Product Type"
          allowClear
          style={{ width: 200 }}
          value={selectedProductType}
          onChange={setSelectedProductType}
        >
          {productTypes.map(productType => (
            <Option key={productType.id} value={productType.id}>
              {productType.name}
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

      <Table
        columns={columns}
        dataSource={filteredCategories}
        loading={loading}
        rowKey="id"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} categories`,
        }}
        scroll={{ x: 1200 }}
      />
    </div>
  );
}

export default CategoryList; 