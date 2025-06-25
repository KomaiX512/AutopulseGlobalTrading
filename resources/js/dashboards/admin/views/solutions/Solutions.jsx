import React, { useContext, useEffect, useState, useCallback } from 'react';
import { SolutionsContext } from './context/SolutionsContext';
import { Table, Button, Input, Select, Space, Tag, Avatar, Popconfirm, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import { 
  FaEdit, 
  FaTrash, 
  FaPlus, 
  FaEye, 
  FaEyeSlash, 
  FaCog,
  FaSearch
} from 'react-icons/fa';
import { debounce } from 'lodash';

const { Search } = Input;
const { Option } = Select;

export function Solutions() {
  const { state, methods } = useContext(SolutionsContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewableFilter, setViewableFilter] = useState('');

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((search, filters) => {
      methods.loadSolutions({ ...filters, search }, state.pagination);
    }, 500),
    [state.pagination]
  );

  // Load solutions on component mount
  useEffect(() => {
    methods.loadSolutions(state.filters, state.pagination);
  }, []);

  // Handle search change
  useEffect(() => {
    const filters = { 
      search: searchTerm,
      is_viewable: viewableFilter
    };
    methods.setFilters(filters);
    debouncedSearch(searchTerm, filters);
  }, [searchTerm, viewableFilter, debouncedSearch]);

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
            <Tag color="blue" className="mb-1">
              <FaCog className="inline mr-1" />
              {num}
            </Tag>
            <div className="text-xs text-gray-500">machines</div>
          </div>
        );
      },
    },
    {
      title: 'Status',
      dataIndex: 'is_viewable',
      key: 'is_viewable',
      width: 100,
      render: (isViewable) => (
        <Tag 
          color={isViewable ? 'green' : 'red'}
          icon={isViewable ? <FaEye /> : <FaEyeSlash />}
        >
          {isViewable ? 'Visible' : 'Hidden'}
        </Tag>
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
      width: 120,
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="Edit Solution">
            <Link to={`/solutions/form/${record.id}`}>
              <Button 
                type="primary" 
                icon={<FaEdit />} 
                size="small"
              />
            </Link>
          </Tooltip>
          <Tooltip title="Manage Products">
            <Link to={`/solutions/products/${record.id}`}>
              <Button 
                type="default" 
                icon={<FaCog />} 
                size="small"
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
              />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Solutions Management</h1>
          <p className="text-gray-600">Manage solution categories for heavy machinery</p>
        </div>
        <Link to="/solutions/form">
          <Button type="primary" icon={<FaPlus />} size="large">
            Add New Solution
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Solutions
            </label>
            <Search
              placeholder="Search by name or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '100%' }}
              allowClear
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Visibility Status
            </label>
            <Select
              placeholder="Filter by visibility"
              value={viewableFilter}
              onChange={setViewableFilter}
              style={{ width: '100%' }}
              allowClear
            >
              <Option value="1">Visible</Option>
              <Option value="0">Hidden</Option>
            </Select>
          </div>
          <div className="flex items-end">
            <Button 
              onClick={() => {
                setSearchTerm('');
                setViewableFilter('');
                methods.setFilters({ search: '', is_viewable: '' });
                methods.loadSolutions({}, state.pagination);
              }}
              className="h-8"
            >
              Clear Filters
            </Button>
          </div>
        </div>
      </div>

      {/* Solutions Table */}
      <div className="bg-white rounded-lg shadow-sm">
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
          scroll={{ x: 800 }}
          size="middle"
        />
      </div>

      {/* Stats */}
      {state.solutions.length > 0 && (
        <div className="mt-6 bg-white p-4 rounded-lg shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {state.pagination.total}
              </div>
              <div className="text-sm text-gray-600">Total Solutions</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">
                {state.solutions.filter(s => s.is_viewable).length}
              </div>
              <div className="text-sm text-gray-600">Visible Solutions</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">
                {state.solutions.reduce((sum, s) => sum + (s.products_count || 0), 0)}
              </div>
              <div className="text-sm text-gray-600">Total Products</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">
                {(state.solutions.reduce((sum, s) => sum + (s.products_count || 0), 0) / Math.max(state.solutions.length, 1)).toFixed(1)}
              </div>
              <div className="text-sm text-gray-600">Avg Products/Solution</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 