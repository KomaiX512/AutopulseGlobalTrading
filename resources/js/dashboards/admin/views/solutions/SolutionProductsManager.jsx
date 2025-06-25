import React, { useContext, useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SolutionsContext } from './context/SolutionsContext';
import { Card, Spin, Transfer, Button, Input, message, Space } from 'antd';
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

  // Load solution details and available products
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        // Load current solution details (with products)
        const solution = await methods.loadSolution(id);
        // Set target keys to currently assigned product IDs
        setTargetKeys(solution.products?.map(p => p.id.toString()) || []);
        // Load available products (not limited to unassigned – we will filter later)
        const products = await methods.getAvailableProducts({ search });
        setAvailableProducts(products);
      } catch (error) {
        message.error(error.message || 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [id, search]);

  // Build dataSource for Transfer component
  const transferData = useMemo(() => {
    return availableProducts.map(prod => ({
      key: prod.id.toString(),
      title: prod.name,
      description: prod.category?.name || '',
    }));
  }, [availableProducts]);

  // Handle transfer change
  const handleChange = async (nextTargetKeys, direction, moveKeys) => {
    setTargetKeys(nextTargetKeys);
    try {
      if (direction === 'right') {
        await methods.assignProducts(id, moveKeys.map(k => parseInt(k)));
      } else {
        await methods.removeProducts(id, moveKeys.map(k => parseInt(k)));
      }
    } catch (error) {
      // Revert state on error
      setTargetKeys(prev => prev);
    }
  };

  return (
    <div className="p-6">
      <Space className="mb-4">
        <Button icon={<FaArrowLeft />} onClick={() => navigate('/solutions/list')}>Back to Solutions</Button>
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
              onSearch={value => setSearch(value)}
            />
          </div>
          <Transfer
            dataSource={transferData}
            titles={[`Available (${transferData.length})`, `Assigned (${targetKeys.length})`]}
            listStyle={{ width: 350, height: 400 }}
            targetKeys={targetKeys}
            onChange={handleChange}
            render={item => `${item.title} (${item.description})`}
          />
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