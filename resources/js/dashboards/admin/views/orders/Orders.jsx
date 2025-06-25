import { loadOrders } from './context/methods';
import React, { useCallback, useEffect, useState } from 'react';
import { Table, Tag, Skeleton } from 'antd';
import { debounce } from 'lodash';
import OrdersHeader from './OrdesHeader';
import { Link } from 'react-router-dom';

const order_steps = {
  0: { value: "Pending", color: "orange" },
  1: { value: "Processing", color: "blue" },
  2: { value: "Shipping", color: "purple" },
  3: { value: "Shipped", color: "purple" },
  4: { value: "Delivered", color: "green" },
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [price, setPrice] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const handlePriceChange = (value) => {
    setPrice(value);
  };

  const debouncedLoadOrders = useCallback(
    debounce((search, selectedStatus, dates, price, sortOrder, page) => {
      setLoading(true);
      loadOrders({ setOrders, selectedStatus, search, dates, price, sortOrder, page }).finally(() => {
        setLoading(false);
      });
    }, 600),
    []
  );

  useEffect(() => {
    debouncedLoadOrders(searchTerm, selectedStatus, null, price, sortOrder, currentPage);
  }, [searchTerm, selectedStatus, price, sortOrder, currentPage]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusChange = (e) => {
    setSelectedStatus(e);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSortChange = (value) => {
    if (value === 'lowToHigh' || value === 'highToLow') {
      setPrice(value);
    } else {
      setSortOrder(value);
    }
  };

  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Total Amount',
      dataIndex: 'total_amount',
      key: 'total_amount',
    },
    {
      title: 'Products Ordered',
      dataIndex: 'order_details_count',
      key: 'order_details_count',
    },
    {
      title: 'Date',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (createdAt) => new Date(createdAt).toLocaleString(),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={order_steps[status].color}>{order_steps[Number(status)].value}</Tag>
      ),
    },
    {
      title: 'Action',
      dataIndex: 'id',
      key: 'id',
      render: (id) => (
        <Link to={`/customers/order/${id}`}>
          <Tag color='green'>View</Tag>
        </Link>
      ),
    },
  ];

  const expandedRowRender = (record) => (
    <table>
      <tbody>
        <tr>
          <th>User Name</th>
          <th>User Email</th>
          <th>User Phone</th>
          <th>User City</th>
          <th>User Country</th>
        </tr>
        <tr>
          <td>{record?.user?.user_details?.first_name}</td>
          <td>{record?.user?.email}</td>
          <td>{record?.user?.user_details?.phone}</td>
          <td>{record?.user?.user_details?.city}</td>
          <td>{record?.user?.user_details?.country}</td>
        </tr>
      </tbody>
    </table>
  );

  return (
    <>
      <OrdersHeader
        handlePriceChange={handlePriceChange}
        handleSortChange={handleSortChange}
        handleStatusChange={handleStatusChange}
        handleSearchChange={handleSearchChange}
      />
      {loading ? (
        <Skeleton active paragraph={{ rows: 5 }} />
      ) : (
        <Table
          dataSource={orders?.data}
          columns={columns}
          expandable={{ expandedRowRender }}
          rowKey="id"
          pagination={{
            pageSize: 10,
            total: orders?.total,
            current: currentPage,
            onChange: handlePageChange,
          }}
        />
      )}
    </>
  );
};

export default Orders;
