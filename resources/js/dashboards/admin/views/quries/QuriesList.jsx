import React, { useContext, useEffect, useState, useCallback } from 'react';
import { MdDelete, MdOutlineReply } from "react-icons/md";
import Confirm from "@/Components/Popover";
import { Tooltip, Skeleton, Table, Avatar, Tag, Modal, Form, Input, Button } from "antd";
import { debounce } from "lodash";
import { QuriesContext } from './context/QuriesContext';
import { formatDate } from '@/utils/helpers';
import QueryHeader from './QuriesHeader';
import { IoIosMailOpen } from "react-icons/io";

export default function QuriesList() {
  const context = useContext(QuriesContext);
  const { state, methods, dispatch } = context;
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("desc");
  const [status, setStatus] = useState(0);
  const [page, setPage] = useState(1);
  const [isReplyModalVisible, setIsReplyModalVisible] = useState(false);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [form] = Form.useForm();

  const debouncedLoadQuries = useCallback(
    debounce(({ search, sort, page }) => {
      methods.loadQuries({ search, sort, status, page });
    }, 600),
    []
  );

  useEffect(() => {
    dispatch({ payload: { loading: true } });
    debouncedLoadQuries({ search, status, sort, page });
  }, [sort, page, status]);

  useEffect(() => {
    debouncedLoadQuries({ search, status, sort, page });
  }, [search]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSortChange = (value) => {
    setSort(value);
  };

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handleStatusChange = (e) => {

    console.log('status', e)
    setStatus(e);

  };

  const handleReplyClick = (record) => {

    if (record.status == 2) return
    setCurrentRecord(record);
    setIsReplyModalVisible(true);
    form.setFieldsValue({
      subject: record.subject,
      reply: ''
    });
  };

  const handleViewClick = (record) => {

    if (record.status == 0) methods.updateQuery({ status: 1, id: record.id })
    setCurrentRecord(record);
    setIsViewModalVisible(true);
  };

  const handleReplyModalCancel = () => {
    setIsReplyModalVisible(false);
    setCurrentRecord(null);
  };

  const handleViewModalCancel = () => {
    setIsViewModalVisible(false);
    setCurrentRecord(null);
  };

  const handleFormSubmit = () => {
    form.validateFields().then(values => {
      methods.sendReply(currentRecord.id, values);
      setIsReplyModalVisible(false);
      setCurrentRecord(null);
      form.resetFields();
    });
  };

  const columns = [
    {
      title: 'User Name',
      dataIndex: 'user_name',
      key: 'user_name',
      responsive: ['sm', 'md'],
    },
    {
      title: 'User Email',
      dataIndex: 'user_email',
      key: 'user_email',
      responsive: ['md'],
    },
    {
      title: 'Subject',
      dataIndex: 'subject',
      key: 'subject',
      responsive: ['md'],
    },
    {
      title: 'Date',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (text, record) => (
        <>
          {formatDate(record.created_at)}
        </>
      ),
      responsive: ['md'],
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => {
        if (record.status == 0) {
          return <Tag color='orange'>Pending</Tag>;
        }
        if (record.status == 1) {
          return <Tag color='green'>Read</Tag>;
        }
        if (record.status == 2) {
          return <Tag color='purple'>Replied</Tag>;
        }
      },
      responsive: ['md'],
    },
    {
      title: 'Activity',
      dataIndex: 'activity',
      key: 'activity',
      render: (text, record) => (
        <div className="action-column flex  gap-3">
          {<Tooltip title={record.status == 2 ? 'Already Replied' : 'Send Reply'}>
            <MdOutlineReply aria-disabled={record?.status == 2} className="h-4 w-4 cursor-pointer" onClick={() => handleReplyClick(record)} />
          </Tooltip>}
          <Tooltip title="View Query">
            <IoIosMailOpen className="h-4 w-4 cursor-pointer" onClick={() => handleViewClick(record)} />
          </Tooltip>
          <Confirm title='Deleted Query' onConfirm={() => methods.deleteQuery(record.id)} description={'Are you sure you want to delete?'}>
            <MdDelete className="h-4 w-4" />
          </Confirm>
        </div>
      ),
      responsive: ['xs', 'sm', 'md'],
    },
  ];

  const data = state?.queries?.map((item, index) => ({
    ...item,
    key: index
  }));

  return (
    <>
      <QueryHeader
        searchTerm={search}
        handleSortChange={handleSortChange}
        handleSearchChange={handleSearchChange}
        handleStatusChange={handleStatusChange}
      />
      {
        state.loading ? (
          <Skeleton active paragraph={{ rows: 5 }} />
        ) : (
          <Table
            columns={columns}
            dataSource={data}
            pagination={{
              current: state.currentPage,
              total: state.total,
              pageSize: 15,
              onChange: handlePageChange,
            }}
          />
        )
      }
      <Modal
        title="Send Reply"
        visible={isReplyModalVisible}
        onCancel={handleReplyModalCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
          <Form.Item
            label="Subject"
            name="subject"
            rules={[{ required: true, message: 'Please enter a subject' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Message"
            name="reply"
            rules={[{ required: true, message: 'Please enter a message' }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Send Reply
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Query Details"
        visible={isViewModalVisible}
        onCancel={handleViewModalCancel}
        footer={null}
      >
        {currentRecord && (
          <div>
            <p><strong>User Name:</strong> {currentRecord.user_name}</p>
            <p><strong>User Email:</strong> {currentRecord.user_email}</p>
            <p><strong>Subject:</strong> {currentRecord.subject}</p>
            <p><strong>Date:</strong> {formatDate(currentRecord.created_at)}</p>
            <p><strong>Status:</strong> {currentRecord.status === 0 ? 'Pending' : currentRecord.status === 1 ? 'Read' : 'Replied'}</p>
            <p><strong>Message:</strong> {currentRecord.message}</p>
            {currentRecord?.reply && <p><strong>Replied:</strong> {currentRecord.reply}</p>}
          </div>
        )}
      </Modal>
    </>
  );
}
