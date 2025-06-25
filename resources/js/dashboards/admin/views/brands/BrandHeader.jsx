import { Row, Col, Input, Select, Button, Space, Dropdown } from 'antd';
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import { useState } from 'react';
import { FilterOutlined, SortAscendingOutlined, SortDescendingOutlined } from '@ant-design/icons';

const { Option } = Select;

const BrandHeader = ({ searchTerm, handleSearchChange, handleSortChange }) => {


    const [sortMenuVisible, setSortMenuVisible] = useState(false);


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
                        visible={sortMenuVisible}
                        onVisibleChange={setSortMenuVisible}
                        overlay={sortMenu}
                        trigger={['click']}
                    >
                        <Button icon={<SortAscendingOutlined />} />

                    </Dropdown>
                    <Link style={{ textDecoration: "none" }} to={'/brands/form'}>
                        <Button icon={<FaPlus />} >
                            Add New
                        </Button>
                    </Link>
                </Space>
            </Col>
        </Row>
    );
};

export default BrandHeader;
