import React, { useEffect, useState, useCallback } from 'react';
import { Table, Tag, Skeleton, Pagination } from 'antd';
import { FaCcVisa, FaCcMastercard, FaCcAmex, FaCcDiscover, FaCcDinersClub, FaCcJcb } from 'react-icons/fa';
import { formatDate } from '@/utils/helpers';
import { loadTransactions } from './context/methods';
import TransactionHeader from './TransactionHeader';
import { debounce } from 'lodash';

const paymentMethods = {
  visa: { name: 'Visa', icon: <FaCcVisa size={35} color='#1A1F71' /> },
  mastercard: { name: 'Mastercard', icon: <FaCcMastercard size={35} color='orangered' /> },
  amex: { name: 'American Express', icon: <FaCcAmex /> },
  discover: { name: 'Discover', icon: <FaCcDiscover /> },
  dinersclub: { name: 'Diners Club', icon: <FaCcDinersClub /> },
  jcb: { name: 'JCB', icon: <FaCcJcb /> }
};

const Transactions = () => {
  const [transactions, setTransactions] = useState({ data: [], current_page: 1, last_page: 1 });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCardType, setSelectedCardType] = useState('');
  const [price, setPrice] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const debouncedLoadTransactions = useCallback(
    debounce((search, cardType, dates, price, sortOrder, page) => {
      setLoading(true);
      loadTransactions({ setTransactions, search, cardType, dates, price, sortOrder, page }).finally(() => setLoading(false));
    }, 600),
    []
  );

  useEffect(() => {
    setCurrentPage(1);
    debouncedLoadTransactions(searchTerm, selectedCardType, null, price, sortOrder, 1);
  }, [searchTerm, selectedCardType, price, sortOrder]);

  useEffect(() => {
    setCurrentPage(transactions.current_page);
    setTotalPages(transactions.last_page);
  }, [transactions]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCardTypeChange = (value) => {
    setSelectedCardType(value);
  };

  const handleSortChange = (value) => {
    if (value === 'lowToHigh' || value === 'highToLow') {
      setPrice(value);
    } else {
      setSortOrder(value);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    debouncedLoadTransactions(searchTerm, selectedCardType, null, price, sortOrder, newPage);
  };

  const columns = [

    { title: '#', dataIndex: 'index', key: 'index' },
    { title: 'Stripe ID', dataIndex: 'transaction_id', key: 'transaction_id' },
    {
      title: 'User', dataIndex: 'user', key: 'user', render: (text, record) => {
        console.log('record', record);
        return `${record.user}`
      }
    },
    { title: 'Card Holder', dataIndex: 'card_holder', key: 'card_holder', render: (text, record) => JSON.parse(record.description).card_holder },
    { title: 'Status', dataIndex: 'payment_status', key: 'payment_status', render: (status) => <Tag color={status === "completed" ? "green" : status === "pending" ? "orange" : "red"}>{status}</Tag> },
    {
      title: 'Payment Method', dataIndex: 'payment_method', key: 'payment_method', render: (text, record) => {
        const description = JSON.parse(record.description);
        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            {paymentMethods[description.brand]?.icon}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span>{record.last4}</span>
              <span>{record.exp_month}/{record.exp_year}</span>
            </div>
          </div>
        );
      }
    },
    { title: 'Amount', dataIndex: 'amount', key: 'amount', render: (amount) => `$${(amount / 100).toFixed(2)}` },
    { title: 'Date', dataIndex: 'created_at', key: 'created_at', render: (date) => formatDate(date) },
  ];

  const data = transactions?.data?.map((trans, index) => ({
    ...trans,
    index: index + 1,
    user: `${trans.user.first_name} ${trans.user.last_name}`,
    card_holder: JSON.parse(trans.description).card_holder,
    payment_method: JSON.parse(trans.description).brand,
  }));

  return (
    <>
      <TransactionHeader
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
        handleCardTypeChange={handleCardTypeChange}
        handleSortChange={handleSortChange}
      />
      {loading ? (
        <Skeleton active paragraph={{ rows: 5 }} />
      ) : (
        <Table
          columns={columns}
          dataSource={data}
          rowKey="transaction_id"
          pagination={{
            current: currentPage,
            total: totalPages * 10,
            onChange: handlePageChange,
          }}
        />
      )}
    </>
  );
};

export default Transactions;
