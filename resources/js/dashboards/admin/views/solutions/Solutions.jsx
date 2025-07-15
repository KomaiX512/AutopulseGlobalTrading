import React, { useContext, useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { SolutionsContext } from './context/SolutionsContext';
import { 
  Table, 
  Button, 
  Input, 
  Select, 
  Tag, 
  Avatar, 
  Space, 
  Tooltip, 
  Popconfirm,
  Card,
  Row,
  Col,
  Statistic,
  Progress,
  Badge,
  Divider,
  Typography,
  Alert
} from 'antd';
import { 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaCog, 
  FaEye, 
  FaEyeSlash, 
  FaSearch,
  FaFilter,
  FaChartBar,
  FaIndustry,
  FaEye as FaEyeIcon,
  FaEyeSlash as FaEyeSlashIcon,
  FaExclamationTriangle
} from 'react-icons/fa';

const { Search } = Input;
const { Option } = Select;
const { Title, Text } = Typography;

export function Solutions() {
  const { state, methods } = useContext(SolutionsContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewableFilter, setViewableFilter] = useState('');
  const searchTimeoutRef = useRef(null);

  // Load solutions on component mount only
  useEffect(() => {
    methods.loadSolutions({}, { current: 1, pageSize: 10 });
  }, []); // Empty dependency array - only run once

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  // Handle search with debouncing
  const handleSearch = (term, filter) => {
    // Clear existing timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // Set new timeout
    searchTimeoutRef.current = setTimeout(() => {
      const filters = { 
        search: term,
        is_viewable: filter
      };
      methods.setFilters(filters);
      methods.loadSolutions(filters, state.pagination);
    }, 500);
  };

  // Handle search term change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    handleSearch(value, viewableFilter);
  };

  // Handle filter change
  const handleFilterChange = (value) => {
    setViewableFilter(value);
    handleSearch(searchTerm, value);
  };

  // Handle pagination change
  const handleTableChange = (pagination) => {
    const newPagination = {
      current: pagination.current,
      pageSize: pagination.pageSize
    };
    methods.setPagination(newPagination);
    methods.loadSolutions(state.filters, newPagination);
  };

  // Handle delete solution
  const handleDelete = async (id) => {
    try {
      await methods.deleteSolution(id);
      // Reload current page or go to previous page if current page is empty
      const currentPage = state.pagination.current;
      const totalPages = Math.ceil((state.pagination.total - 1) / state.pagination.pageSize);
      const newPage = currentPage > totalPages ? Math.max(1, totalPages) : currentPage;
      
      methods.loadSolutions(state.filters, { 
        ...state.pagination, 
        current: newPage 
      });
    } catch (error) {
      console.error('Error deleting solution:', error);
    }
  };

  // Clear filters
  const clearFilters = () => {
    setSearchTerm('');
    setViewableFilter('');
    methods.setFilters({ search: '', is_viewable: '' });
    methods.loadSolutions({}, { current: 1, pageSize: 10 });
  };

  const columns = [
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      width: 80,
      render: (image, record) => {
        const imgSrc = typeof image === 'string' && image
          ? image.replace('public', '/storage')
          : null;
        return (
          <Avatar
            size={64}
            src={imgSrc}
            style={{ backgroundColor: '#f0f0f0' }}
          >
            {!imgSrc && record.name?.charAt(0)?.toUpperCase()}
          </Avatar>
        );
      },
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <div>
          <Link to={`/solutions/form/${record.id}`} className="font-semibold text-blue-600 hover:text-blue-800">
            {text}
          </Link>
          <div className="text-xs text-gray-500 mt-1">
            Slug: {record.slug}
          </div>
        </div>
      ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (text) => (
        <div className="max-w-xs">
          <p className="text-sm text-gray-600 line-clamp-2">
            {text ? (text.length > 100 ? `${text.substring(0, 100)}...` : text) : 'No description'}
          </p>
        </div>
      ),
    },
    {
      title: 'Products',
      dataIndex: 'products_count',
      key: 'products_count',
      width: 100,
      render: (count) => {
        const num = typeof count === 'number' ? count : parseInt(count || '0', 10);
        return (
          <div className="text-center">
            <Badge count={num} showZero style={{ backgroundColor: '#1890ff' }}>
              <div className="text-center p-2">
                <FaIndustry className="text-lg text-blue-500" />
              </div>
            </Badge>
            <div className="text-xs text-gray-500 mt-1">machines</div>
          </div>
        );
      },
    },
    {
      title: 'Status',
      dataIndex: 'is_active',
      key: 'is_active',
      width: 100,
      render: (isActive) => (
        <Badge 
          status={isActive ? 'success' : 'error'}
          text={
            <span className="flex items-center gap-1">
              {isActive ? <FaEyeIcon className="text-green-500" /> : <FaEyeSlashIcon className="text-red-500" />}
              {isActive ? 'Visible' : 'Hidden'}
            </span>
          }
        />
      ),
    },
    {
      title: 'Created',
      dataIndex: 'created_at',
      key: 'created_at',
      width: 120,
      render: (date) => (
        <div className="text-sm text-gray-600">
          {new Date(date).toLocaleDateString()}
        </div>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 150,
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="Edit Solution">
            <Link to={`/solutions/form/${record.id}`}>
              <Button 
                type="primary" 
                icon={<FaEdit />} 
                size="small"
                className="flex items-center"
              />
            </Link>
          </Tooltip>
          <Tooltip title="Manage Products">
            <Link to={`/solutions/products/${record.id}`}>
              <Button 
                type="default" 
                icon={<FaCog />} 
                size="small"
                className="flex items-center"
              />
            </Link>
          </Tooltip>
          <Tooltip title="Delete Solution">
            <Popconfirm
              title="Delete Solution"
              description="Are you sure you want to delete this solution? This action cannot be undone."
              onConfirm={() => handleDelete(record.id)}
              okText="Yes, Delete"
              cancelText="Cancel"
              okButtonProps={{ danger: true }}
            >
              <Button 
                danger 
                icon={<FaTrash />} 
                size="small"
                className="flex items-center"
              />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  // Calculate statistics
  const totalSolutions = state.pagination.total;
  const visibleSolutions = state.solutions.filter(s => s.is_active).length;
  const totalProducts = state.solutions.reduce((sum, s) => sum + (s.products_count || 0), 0);
  const avgProductsPerSolution = totalSolutions > 0 ? (totalProducts / totalSolutions).toFixed(1) : 0;
  const visibilityPercentage = totalSolutions > 0 ? ((visibleSolutions / totalSolutions) * 100).toFixed(1) : 0;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <Title level={2} className="mb-2">
              <FaIndustry className="inline mr-2 text-blue-600" />
              Solutions Management
            </Title>
            <Text type="secondary">
              Manage solution categories for heavy machinery and industrial equipment
            </Text>
          </div>
          <Link to="/solutions/form">
            <Button type="primary" icon={<FaPlus />} size="large" className="flex items-center">
              Add New Solution
            </Button>
          </Link>
        </div>
      </div>

      {/* Error Display */}
      {state.error && (
        <Alert
          message="Error"
          description={state.error}
          type="error"
          showIcon
          icon={<FaExclamationTriangle />}
          className="mb-6"
          action={
            <Button size="small" danger onClick={() => methods.loadSolutions({}, { current: 1, pageSize: 10 })}>
              Retry
            </Button>
          }
        />
      )}

      {/* Statistics Cards */}
      <Row gutter={16} className="mb-6">
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Solutions"
              value={totalSolutions}
              prefix={<FaIndustry className="text-blue-500" />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Visible Solutions"
              value={visibleSolutions}
              prefix={<FaEye className="text-green-500" />}
              valueStyle={{ color: '#52c41a' }}
            />
            <Progress percent={parseFloat(visibilityPercentage)} size="small" showInfo={false} />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Products"
              value={totalProducts}
              prefix={<FaCog className="text-orange-500" />}
              valueStyle={{ color: '#fa8c16' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Avg Products/Solution"
              value={avgProductsPerSolution}
              prefix={<FaChartBar className="text-purple-500" />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Filters */}
      <Card className="mb-6">
        <div className="flex items-center mb-4">
          <FaFilter className="mr-2 text-gray-500" />
          <Text strong>Filters & Search</Text>
        </div>
        <Row gutter={16}>
          <Col xs={24} md={8}>
            <div>
              <Text className="block mb-2">Search Solutions</Text>
              <Search
                placeholder="Search by name or description..."
                value={searchTerm}
                onChange={handleSearchChange}
                allowClear
                prefix={<FaSearch className="text-gray-400" />}
              />
            </div>
          </Col>
          <Col xs={24} md={8}>
            <div>
              <Text className="block mb-2">Visibility Status</Text>
              <Select
                placeholder="Filter by visibility"
                value={viewableFilter}
                onChange={handleFilterChange}
                style={{ width: '100%' }}
                allowClear
              >
                <Option value="1">
                  <span className="flex items-center">
                    <FaEye className="mr-2 text-green-500" />
                    Visible
                  </span>
                </Option>
                <Option value="0">
                  <span className="flex items-center">
                    <FaEyeSlash className="mr-2 text-red-500" />
                    Hidden
                  </span>
                </Option>
              </Select>
            </div>
          </Col>
          <Col xs={24} md={8} className="flex items-end">
            <Button 
              onClick={clearFilters}
              className="w-full"
            >
              Clear Filters
            </Button>
          </Col>
        </Row>
      </Card>

      {/* Solutions Table */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <Text strong>Solutions List</Text>
          <Text type="secondary">
            Showing {state.solutions.length} of {totalSolutions} solutions
          </Text>
        </div>
        <Table
          columns={columns}
          dataSource={state.solutions}
          loading={state.loading}
          pagination={{
            current: state.pagination.current,
            pageSize: state.pagination.pageSize,
            total: state.pagination.total,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => 
              `${range[0]}-${range[1]} of ${total} solutions`,
            pageSizeOptions: ['10', '20', '50', '100'],
          }}
          onChange={handleTableChange}
          rowKey="id"
          scroll={{ x: 1000 }}
          size="middle"
          className="custom-table"
        />
      </Card>
    </div>
  );
} 