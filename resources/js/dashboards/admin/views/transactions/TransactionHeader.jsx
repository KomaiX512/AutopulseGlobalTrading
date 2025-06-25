import React, { useEffect, useState, useContext } from 'react';
import { Row, Col, Input, Select, Button, Space, Dropdown } from 'antd';
import { FilterOutlined, SortAscendingOutlined, SortDescendingOutlined } from '@ant-design/icons';

const { Option } = Select;

const TransactionHeader = ({ searchTerm, handleSearchChange, handleCardTypeChange, handleSortChange }) => {

    const [filterMenuVisible, setFilterMenuVisible] = useState(false);
    const [sortMenuVisible, setSortMenuVisible] = useState(false);


    console.log('search term',searchTerm)

    const filterMenu = (
        <Space direction="vertical" size={16}>
            <div>
                <strong>Card Type</strong>
                <Select placeholder="Select Card Type" style={{ width: '100%' }} onChange={handleCardTypeChange}>
                    <Option value="visa">Visa</Option>
                    <Option value="mastercard">Mastercard</Option>
                    <Option value="amex">American Express</Option>
                    <Option value="discover">Discover</Option>
                    <Option value="dinersclub">Diners Club</Option>
                    <Option value="jcb">JCB</Option>
                </Select>
            </div>
        </Space>
    );

    const sortMenu = (
        <Space direction="vertical" size={16}>
            <div>
                <strong>Price</strong>
                <Select placeholder="Select Price" style={{ width: '100%' }} onChange={handleSortChange}>
                    <Option value="lowToHigh">
                        <FilterOutlined /> Price: Low to High
                    </Option>
                    <Option value="highToLow">
                        <FilterOutlined /> Price: High to Low
                    </Option>
                </Select>
            </div>
            <div>
                <strong>Sort Order</strong>
                <Select defaultValue="desc" style={{ width: '100%' }} onChange={handleSortChange}>
                    <Option value="desc">
                        <SortDescendingOutlined /> Sort Desc
                    </Option>
                    <Option value="asc">
                        <SortAscendingOutlined /> Sort Asc
                    </Option>
                </Select>
            </div>
        </Space>
    );

    return (
        <Row style={{ justifyContent: 'space-between' }} gutter={[16, 16]} justify="space-between" align="middle" className="mb-4 table-header">
            <Col xs={24} sm={24} md={12}>
                <Input
                    placeholder="Search by user or card holder name"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="w-full"
                />
            </Col>
            <Col xs={24} sm={24} md={12}>
                <Space style={{ width: "fit-content", gap: '20px', marginLeft: 'auto', display: 'flex' }} align="center">
                    <Dropdown
                        visible={filterMenuVisible}
                        onVisibleChange={setFilterMenuVisible}
                        overlay={filterMenu}
                        trigger={['click']}
                    >
                        <Button icon={<FilterOutlined />} />
                    </Dropdown>
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

export default TransactionHeader;
