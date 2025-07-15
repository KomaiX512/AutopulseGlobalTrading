import React, { useContext, useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SolutionsContext } from './context/SolutionsContext';
import { Card, Spin, Transfer, Button, Input, message, Space, Alert } from 'antd';
import { FaArrowLeft } from 'react-icons/fa';
import { SolutionsProvider } from './context/SolutionsContext';

const ManagerInner = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, methods } = useContext(SolutionsContext);
  const [loading, setLoading] = useState(true);
  const [availableProducts, setAvailableProducts] = useState([]);
  const [targetKeys, setTargetKeys] = useState([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState(null);

  // Load solution details and available products
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('Loading data for solution ID:', id);
        
        // Load current solution details (with products)
        const solution = await methods.loadSolution(id);
        console.log('Solution loaded:', solution);
        
        // Ensure solution.products is an array and set target keys
        const assignedProductIds = Array.isArray(solution.products) 
          ? solution.products.map(p => p.id.toString()) 
          : [];
        console.log('Assigned product IDs:', assignedProductIds);
        setTargetKeys(assignedProductIds);
        
        // Load available products
        const products = await methods.getAvailableProducts({ search });
        console.log('Available products loaded:', products);
        
        // Ensure products is an array
        if (Array.isArray(products)) {
          setAvailableProducts(products);
        } else {
          console.error('Invalid products data:', products);
          setAvailableProducts([]);
        }
      } catch (error) {
        console.error('Error loading data:', error);
        setError(error.message || 'Failed to load data');
        message.error(error.message || 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [id, search]);

  // Build dataSource for Transfer component
  const transferData = useMemo(() => {
    if (!Array.isArray(availableProducts)) {
      console.error('availableProducts is not an array:', availableProducts);
      return [];
    }
    
    return availableProducts.map(prod => ({
      key: prod.id.toString(),
      title: prod.name || 'Unnamed Product',
      description: prod.category?.name || 'No Category',
    }));
  }, [availableProducts]);

  // Handle transfer change
  const handleChange = async (nextTargetKeys, direction, moveKeys) => {
    try {
      setTargetKeys(nextTargetKeys);
      
      if (direction === 'right') {
        await methods.assignProducts(id, moveKeys.map(k => parseInt(k)));
      } else {
        await methods.removeProducts(id, moveKeys.map(k => parseInt(k)));
      }
    } catch (error) {
      console.error('Error updating products:', error);
      message.error(error.message || 'Failed to update products');
      // Revert state on error
      setTargetKeys(prev => prev);
    }
  };

  // Handle search
  const handleSearch = (value) => {
    setSearch(value);
  };

  if (error) {
    return (
      <div className="p-6">
        <Space className="mb-4">
          <Button icon={<FaArrowLeft />} onClick={() => navigate('/solutions/list')}>
            Back to Solutions
          </Button>
        </Space>
        <Alert
          message="Error"
          description={error}
          type="error"
          showIcon
          action={
            <Button size="small" onClick={() => window.location.reload()}>
              Retry
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div className="p-6">
      <Space className="mb-4">
        <Button icon={<FaArrowLeft />} onClick={() => navigate('/solutions/list')}>
          Back to Solutions
        </Button>
      </Space>
      
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <Spin size="large" />
        </div>
      ) : (
        <Card title="Manage Products for Solution">
          <div className="mb-4 max-w-sm">
            <Input.Search
              placeholder="Search products..."
              allowClear
              onSearch={handleSearch}
              loading={loading}
            />
          </div>
          
          {transferData.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No products available
            </div>
          ) : (
            <Transfer
              dataSource={transferData}
              titles={[`Available (${transferData.length})`, `Assigned (${targetKeys.length})`]}
              listStyle={{ width: 350, height: 400 }}
              targetKeys={targetKeys}
              onChange={handleChange}
              render={item => `${item.title} (${item.description})`}
              showSearch
              filterOption={(inputValue, item) =>
                item.title.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1 ||
                item.description.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1
              }
            />
          )}
        </Card>
      )}
    </div>
  );
};

export default function SolutionProductsManagerWrapper(){
  return (
    <SolutionsProvider>
      <ManagerInner />
    </SolutionsProvider>
  );
} 