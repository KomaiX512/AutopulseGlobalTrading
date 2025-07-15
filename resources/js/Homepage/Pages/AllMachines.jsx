import React, { useContext, useEffect, useState } from 'react';
import { Input, Checkbox, Pagination, Card, Typography, Flex, Radio, Empty } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { HomeContext } from '../context/HomeContext';
import { Layout, Space } from 'antd';
import { Button, Col, Image, Row, Tag } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { MdWhatsapp } from 'react-icons/md';
import ProductListSkeleton from '../Components/ProductSkeleton';

const { Footer, Sider, Content } = Layout;

const contentStyle = {
    textAlign: 'center',
    lineHeight: '120px',
    color: '#fff',
};

const siderStyle = {
    textAlign: 'center',
    lineHeight: '120px',
    color: '#fff',
    padding: '10px',
    backgroundColor: 'white',
    marginRight: '15px'
};

const footerStyle = {
    textAlign: 'center',
    color: '#fff',
    backgroundColor: "white"
};

const layoutStyle = {
    overflow: 'hidden',
};

function AllMachines() {

    const navigate = useNavigate();
    const location = useLocation();
    const { state, dispatch, methods } = useContext(HomeContext);

    const queryParams = new URLSearchParams(location.search);
    const initialPrice = queryParams.get('price') || '';
    const initialCategories = (queryParams.get('categories') || '').split(',');
    const initialType = queryParams.get('type') || '';
    const initialSort = queryParams.get('sort') || 'desc';
    const initialPage = parseInt(queryParams.get('page')) || 1;

    const [selectedCategories, setSelectedCategories] = useState(initialCategories);
    const [selectedPrice, setSelectedPrice] = useState(initialPrice);
    const [type, setType] = useState(initialType);
    const [sort, setSort] = useState(initialSort);
    const [page, setPage] = useState(initialPage);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        methods?.loadCategories();
    }, []);

    useEffect(() => {
        setLoading(false);
    }, [state.filterProducts]);

    useEffect(() => {
        setLoading(true);
        methods?.filterProducts({ selectedPrice, sort, type, selectedCategories, page });

        const newSearchParams = new URLSearchParams({
            price: selectedPrice,
            categories: selectedCategories.join(','),
            page: page.toString(),
            type,
            sort,
        });

        navigate(`/products?${newSearchParams.toString()}`);
    }, [selectedPrice, selectedCategories, sort, type, page]);

    const handlePriceChange = (e) => {
        setSelectedPrice(e.target.value);
    };

    const handleSortChange = (e) => {
        setSort(e.target.value);
    };

    const handleCategoryChange = (checkedValues) => {
        setSelectedCategories(checkedValues);
    };

    const handleTypeChange = (e) => {
        setType(e.target.value);
    };

    const handleAddToCart = (id) => {
        methods.addToCart(id);
    };

    return (
        <>
            <Flex className="px-20 pt-3 mb-20 all-products-container px-20" style={{ width: "100%" }}>
                <Layout style={layoutStyle}>
                    <Sider width="  15%" style={siderStyle}>
                        <h3 style={{ fontSize: '16px', borderBottom: '1px solid' }} className='p-2 text-left font-weight-bold'>Filters</h3>
                        <div className='filter-item py-10 pl-3 pb-3' style={{ fontWeight: '500' }}>
                            <strong className='text-dark heading'>Sort Product</strong>
                            <Radio.Group className='item-group' onChange={handleSortChange}>
                                <Radio className='' value="asc"><span style={{ fontWeight: '500' }}>New First</span></Radio>
                                <Radio value="desc"><span style={{ fontWeight: '500' }}>Old First</span></Radio>
                            </Radio.Group>
                        </div>
                        <div className='filter-item py-10 pl-3 pb-3' style={{ fontWeight: '500' }}>
                            <strong className='text-dark heading'>Product Type</strong>
                            <Radio.Group className='item-group' onChange={handleTypeChange}>
                                <Radio className='' value="business"><span style={{ fontWeight: '500' }}>Business Products</span></Radio>
                                <Radio value="customer"><span style={{ fontWeight: '500' }}>Non Business</span></Radio>
                                <Radio value=""><span style={{ fontWeight: '500' }}>Both</span></Radio>
                            </Radio.Group>
                        </div>
                        <div className='filter-item py-10 pl-3' style={{ fontWeight: '500' }}>
                            <strong className='text-dark heading'>Price</strong>
                            <Radio.Group className='item-group' onChange={handlePriceChange}>
                                <Radio className='' value="lowToHigh"><span style={{ fontWeight: '500' }}>Low to High</span></Radio>
                                <Radio value="highToLow"><span style={{ fontWeight: '500' }}>High to Low</span></Radio>
                            </Radio.Group>
                        </div>

                        <div className='filter-item pl-3' style={{ marginTop: '20px' }}>
                            <strong className='text-dark heading'>Brands</strong>
                            <Checkbox.Group
                                className='item-group '
                                onChange={handleCategoryChange}>
                                {
                                    state?.categories?.map((cat, index) => {
                                        return <Checkbox className='montserrat-500' value={cat?.id}>
                                            {cat?.name}
                                        </Checkbox>
                                    })
                                }
                            </Checkbox.Group>
                        </div>
                    </Sider>
                    <Layout>
                        <Content style={contentStyle}>
                            <div className="latest-products">
                                <div className=" p-3 bg-white" style={{ minHeight: '70vh' }}>
                                    {loading && <ProductListSkeleton />}
                                    {!loading && state?.filterProducts?.products?.length > 0 ?
                                        <Row gutter={[]}>
                                            {state?.filterProducts?.products?.map((prod, index) => (
                                                <Col
                                                    key={index}
                                                    xs={12}
                                                    sm={10}
                                                    md={8}
                                                    lg={8}
                                                    xl={6}
                                                    xxl={4}
                                                >
                                                    <div className="product-card group" style={{ height: '100%' }} data-aos="zoom-in" data-aos-delay="100">
                                                        <div className="product-item relative w-full flex flex-col gap-1 bg-white border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden" >
                                                            <div className="relative w-full overflow-hidden" style={{ height: '280px', flex: '0 0 280px' }}>
                                                                <Image
                                                                    loading='lazy'
                                                                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                                                                    src={`${prod?.image.replace('public', '/storage')}`}
                                                                    alt={prod?.name}
                                                                />
                                                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                                                            </div>
                                                            {prod?.is_business_product == 1 &&
                                                                <Tag style={{ width: 'fit-content', position: 'absolute', top: "0px" }} color='purple'>
                                                                    Business
                                                                </Tag>

                                                            }
                                                            <div className="product-details p-4 flex-1 flex flex-col justify-between">
                                                                <div className="down-content">
                                                                    <a title='View Product Details' href={`/product/${prod.slug}`}> 
                                                                        <h4 className='text-lg font-bold text-gray-800 text-center group-hover:text-gray-600 transition-colors duration-300'>{prod.name}</h4>
                                                                    </a>
                                                                    <Flex className='py-2' align='center' gap={15}><small><del>${prod.stock_price}</del></small><strong>${prod.price}</strong></Flex>
                                                                </div>
                                                                {prod?.is_business_product == 0 ? <Flex align='center' wrap justify='space-between' className="card-footers py-2">
                                                                    {prod.stock > 1 ? <>

                                                                        <div className="icon-rount-container p-1">
                                                                            <Button
                                                                                type="link"
                                                                                icon={<ShoppingCartOutlined style={{ fontSize: '20px' }} />}
                                                                                onClick={() => handleAddToCart(prod.id)}
                                                                            />

                                                                        </div>
                                                                        <Tag color={prod.stock > 10 ? 'blue' : 'orange'} className=' mt-2'>
                                                                            Availability: {prod?.stock}
                                                                        </Tag>
                                                                    </>
                                                                        :
                                                                        <Tag color="error">OUT OF STOCK</Tag>
                                                                    }
                                                                </Flex>
                                                                    :
                                                                    <Flex align='center' wrap justify='space-between' className="card-footers py-2">

                                                                        <a href={`https://wa.me/13072950382?text=${encodeURIComponent('Check out this product: ' + location.origin + '/product/' + prod.slug)}`} className="card-footers py-2">

                                                                            <button
                                                                                style={{ width: '100%', background: "#6B7280" }}
                                                                                className='btn btn-primary btn-home-primary'
                                                                                href=''
                                                                            >
                                                                                <MdWhatsapp size={20} stroke='3' />
                                                                                Send Message

                                                                            </button>

                                                                        </a>

                                                                    </Flex>
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Col>
                                            ))}
                                        </Row>
                                        :
                                        !loading && <Empty
                                            image={'/images/no_data.png'}
                                            imageStyle={{
                                                height: '100%',
                                                width: "500px"
                                            }}
                                            description={<h1 style={{ fontSize: "20px" }}>No products found</h1>}
                                        >

                                        </Empty>
                                    }
                                </div>

                            </div >
                        </Content>
                        <Footer style={footerStyle}>
                            <Pagination onChange={(current_page) => { setPage(current_page) }} defaultCurrent={state?.filterProducts?.current_page} pageSize={15} total={state?.filterProducts?.total} />
                        </Footer>
                    </Layout>
                </Layout>
            </Flex>
        </>
    );
}

export default AllMachines;