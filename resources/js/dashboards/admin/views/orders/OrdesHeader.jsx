import { Row, Col, Input, Select, Button, Space, Dropdown } from 'antd';
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import { useContext, useEffect, useState } from 'react';
import { FilterOutlined, SortAscendingOutlined, SortDescendingOutlined } from '@ant-design/icons';

const { Option } = Select;

const OrdersHeader = ({ searchTerm, handleSearchChange, handlePriceChange, handleStatusChange, handleSortChange }) => {


    const [categories, setCategories] = useState([]);
    const [filterMenuVisible, setFilterMenuVisible] = useState(false);
    const [sortMenuVisible, setSortMenuVisible] = useState(false);



    const filterMenu = (

        <Space direction="vertical" size={16}>
            <div>
                <strong>Price</strong>
                <Select placeholder="Select Price" style={{ width: '100%' }} onChange={handlePriceChange}>
                    <Option value="lowToHigh">
                        <FilterOutlined /> Price: Low to High
                    </Option>
                    <Option value="highToLow">
                        <FilterOutlined /> Price: High to Low
                    </Option>
                </Select>
            </div>

            <div>
                <strong>Order Status</strong>

                <Select placeholder="Select Type"

                    style={{ width: '100%' }}
                    onChange={handleStatusChange}>

                    <Option value="0">Pending</Option>
                    <Option value="1">Processing</Option>
                    <Option value="2">Shipping</Option>
                    <Option value="3">Shipped</Option>
                    <Option value="4">Delivered</Option>

                </Select>
            </div>
        </Space>
    );

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
                <Space style={{ width: "fit-content", gap: '20px', marginLeft: 'auto', display: 'flex' }} align="center" >
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

export default OrdersHeader;
