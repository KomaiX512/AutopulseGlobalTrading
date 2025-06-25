import { Row, Col, Input, Select, Button, Space, Dropdown } from 'antd';
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import { useContext, useEffect, useState } from 'react';
import { ProductContext } from './context/ProductContext';
import { FilterOutlined, SortAscendingOutlined, SortDescendingOutlined } from '@ant-design/icons';

const { Option } = Select;

const ProductsHeader = ({ isBusiness, searchTerm, handleSearchChange, handlePriceChange, handleBrandChange, handleCategoryChange, handleSortChange, handleTypeChange }) => {
    const { state, dispatch, methods } = useContext(ProductContext);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [filterMenuVisible, setFilterMenuVisible] = useState(false);
    const [sortMenuVisible, setSortMenuVisible] = useState(false);

    async function fetchCategories() {
        let res = await methods.loadCategories();

        console.log('respo', res)
        if (res.categories) {
            console.log('cats', res)
            setCategories(res?.categories);
        }
        if (res.brands) {
            console.log('cats', res)
            setBrands(res?.brands);
        }
    }

    useEffect(() => {
        fetchCategories();
    }, []);

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
                <strong>Categories</strong>
                <Select
                    mode="multiple"
                    placeholder="Select Categories"
                    style={{ width: '100%' }}
                    onChange={handleCategoryChange}
                >
                    {categories?.map((cat, index) => (
                        <Option key={index} value={cat.id}>
                            {cat.name}
                        </Option>
                    ))}
                </Select>
            </div>
            <div>
                <strong>Brands</strong>
                <Select
                    mode="multiple"
                    placeholder="Select Categories"
                    style={{ width: '100%' }}
                    onChange={handleBrandChange}
                >
                    {brands?.map((brand, index) => (
                        <Option key={index} value={brand.id}>
                            {brand.name}
                        </Option>
                    ))}
                </Select>
            </div>
            <div>
                <strong>Product Type</strong>
                <Select placeholder="Select Type" style={{ width: '100%' }} onChange={handleTypeChange}>
                    <Option value="business">Business Products</Option>
                    <Option value="customer">Customer Products</Option>
                    <Option value="">Both</Option>
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

                    <Link style={{ textDecoration: "none" }} to={'/spare-parts/form'}>
                        <Button icon={<FaPlus />} >
                            Add New
                        </Button>
                    </Link>
                </Space>
            </Col>
        </Row>
    );
};

export default ProductsHeader;
