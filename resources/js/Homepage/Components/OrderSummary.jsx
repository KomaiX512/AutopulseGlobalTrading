import React from 'react';
import { Card, Typography, Button } from 'antd';

const { Title, Text } = Typography;

const OrderSummary = ({ description, date, total, quantity, onCheckout }) => {
  return (
    <Card title="Order Summary" bordered={false} style={{ width: 300 }}>
      <div style={{ marginBottom: 16 }}>
        <Text strong>Description: </Text>
        <Text>{description}</Text>
      </div>
      <div style={{ marginBottom: 16 }}>
        <Text strong>Date: </Text>
        <Text>{date}</Text>
      </div>
      <div style={{ marginBottom: 16 }}>
        <Text strong>Quantity: </Text>
        <Text>{quantity}</Text>
      </div>
      <div style={{ marginBottom: 16 }}>
        <Title level={4}>Total: ${total.toFixed(2)}</Title>
      </div>
      <Button type="primary" block onClick={onCheckout}>
        Proceed to Checkout
      </Button>
    </Card>
  );
};

export default OrderSummary;
