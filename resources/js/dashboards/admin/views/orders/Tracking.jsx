import React, { useState } from 'react';
import { Input, Steps, Card, Typography } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Step } = Steps;
const { Title, Text } = Typography;

const ordersData = [
  {
    id: '12345',
    status: 'shipped',
    steps: [
      { title: 'Pending', description: 'Order received', date: '2024-06-01', emoji: '🕐' },
      { title: 'Processing', description: 'Order is being processed', date: '2024-06-02', emoji: '🔄' },
      { title: 'Shipping', description: 'Order is on the way', date: '2024-06-03', emoji: '🚚' },
      { title: 'Shipped', description: 'Order has been shipped', date: '2024-06-04', emoji: '📦' },
      { title: 'Delivered', description: 'Order delivered to customer', date: '', emoji: '📬' },
    ],
  },
  // Add more orders as needed
];

const OrderTracking = () => {
  const [searchId, setSearchId] = useState('');
  const [order, setOrder] = useState(null);

  const handleSearch = () => {
    const foundOrder = ordersData.find((o) => o.id === searchId);
    setOrder(foundOrder);
  };

  return (
    <div style={{ padding: '20px' }}>
      <Input
        placeholder="Enter Tracking ID"
        value={searchId}
        onChange={(e) => setSearchId(e.target.value)}
        onPressEnter={handleSearch}
        suffix={<SearchOutlined onClick={handleSearch} />}
        style={{ marginBottom: '20px' }}
      />
      {order ? (
        <Card title={`Order ID: ${order.id}`} bordered>
          <Steps current={order.steps.findIndex(step => step.title.toLowerCase() === order.status)}>
            {order?.steps?.map((step, index) => (
              <Step
                key={index}
                title={
                  <div>
                    {step.emoji} {step.title}
                  </div>
                }
                description={
                  <div>
                    <Text>{step.description}</Text>
                    {step.date && <Text type="secondary"> ({step.date})</Text>}
                  </div>
                }
              />
            ))}
          </Steps>
        </Card>
      ) : (
        searchId && <Text type="danger">Order not found</Text>
      )}
    </div>
  );
};

export default OrderTracking;
