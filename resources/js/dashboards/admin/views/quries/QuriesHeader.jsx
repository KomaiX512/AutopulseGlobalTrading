import { Row, Col, Input, Select, Button, Space, Dropdown } from 'antd';
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import { useState } from 'react';
import { FilterOutlined, SortAscendingOutlined, SortDescendingOutlined } from '@ant-design/icons';

const { Option } = Select;

const QueryHeader = ({ searchTerm, handleSearchChange, handleSortChange, handleStatusChange }) => {
    const [sortMenuVisible, setSortMenuVisible] = useState(false);
    // const [sortMenuVisible, setSortMenuVisible] = useState(false);

    const sortMenu = (
        <Space direction="vertical" size={16}>
            <Select defaultValue="desc" style={{ width: '100%' }} onChange={handleSortChange}>
                <Option value="desc">
                    <SortDescendingOutlined /> Sort Desc
                </Option>
                <Option value="asc">
                    <SortAscendingOutlined /> Sort Asc
                </Option>
            </Select>
        </Space>
    );

    return (
        <Row style={{ justifyContent: 'space-between' }} gutter={[16, 16]} justify="space-between" align="middle" className="mb-4 table-header">
            <Col xs={24} sm={24} md={12}>
                <Input
                    placeholder="Search products"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="w-full"
                />
            </Col>
            <Col xs={24} sm={24} md={12}>
                <Space style={{ width: "fit-content", gap: '20px', marginLeft: 'auto', display: 'flex' }} align="center">

                    <Select
                        placeholder="Select Status"
                        onChange={handleStatusChange}
                        style={{ width: 120 }}
                    >
                        <Option value="0">Pending</Option>
                        <Option value="1">Read</Option>
                        <Option value="2">Replied</Option>
                    </Select>

                    <Dropdown
                        visible={sortMenuVisible}
                        onVisibleChange={setSortMenuVisible}
                        overlay={sortMenu}
                        trigger={['click']}
                    >
                        <Button icon={<SortAscendingOutlined />} />
                    </Dropdown>
                </Space>
            </Col>
        </Row>
    );
};

export default QueryHeader;
