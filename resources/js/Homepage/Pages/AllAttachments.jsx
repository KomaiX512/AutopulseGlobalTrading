import React, { useContext, useEffect, useState } from 'react';
import { Input, Checkbox, Pagination, Card, Typography, Flex, Radio, Empty, Drawer, Button } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { HomeContext } from '../context/HomeContext';
import { Layout, Space } from 'antd';
import { Col, Image, Row, Tag } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { MdWhatsapp } from 'react-icons/md';
import { GrClose, GrFilter } from 'react-icons/gr';
import ProductListSkeleton from '../Components/ProductSkeleton';
import AttachmentComponent from '../Components/AttachmentComponent';

const { Footer, Sider, Content, Header } = Layout;

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

function AllAttachments() {
    const [open, setOpen] = useState(false);
    const showDrawer = () => setOpen(true);
    const onClose = () => setOpen(false);

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
        methods?.loadAttachmentCategories();
    }, []);

    useEffect(() => {
        setLoading(false);
    }, [state.filterAttachments]);

    useEffect(() => {
        setLoading(true);
        methods?.filterAttachments({ selectedPrice, sort, type, selectedCategories, page });

        const newSearchParams = new URLSearchParams({
            price: selectedPrice,
            categories: selectedCategories.join(','),
            page: page.toString(),
            type,
            sort,
        });

        navigate(`/products/attachments?${newSearchParams.toString()}`);
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

    const RenderSider = () => (
        <Sider width={'100%'} style={{ backgroundColor: 'white', padding: '10px' }}>
            <h3 style={{ fontSize: '16px', borderBottom: '1px solid', padding: '10px', textAlign: 'left', fontWeight: 'bold' }}>Filters</h3>
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
                <strong className='text-dark heading'>Categories</strong>
                <Checkbox.Group
                    className='item-group flex flex-col gap-3 my-3'
                    onChange={handleCategoryChange}
                    value={selectedCategories}
                >
                    {
                        Array.isArray(state?.attachmentCategories) && state?.attachmentCategories?.map((cat, index) => {
                            return <Checkbox key={cat?.id} className='montserrat-500' value={cat?.id}>
                                {cat?.name}
                            </Checkbox>
                        })
                    }
                </Checkbox.Group>
            </div>
        </Sider>
    );

    return (
        <>
            {/* Products List & Filters */}
            <div className="pt-3 mb-20 all-products-container mx-auto" style={{ width: "100%", maxWidth: '1500px' }}>
                <Layout style={{ overflow: 'hidden' }}>
                    <Drawer
                        title={
                            <div style={{ display: 'flex !important' }} className='mobile-all-prod-filters hidden flex justify-between w-full '>
                                <h4>Menu</h4>
                                <GrClose onClick={onClose} />
                            </div>
                        }
                        placement={'left'}
                        closable={false}
                        onClose={onClose}
                        open={open}
                        width={250}
                    >
                        <RenderSider />
                    </Drawer>

                    <div className="desktop-all-prod-filters p-0" style={{ width: "250px", marginRight: "10px" }}>
                        <RenderSider />
                    </div>

                    <Layout>
                        <Header className='z-[1] bg-white p-3 hidden mobile-all-prod-filters'>
                            <Button className='p-3 border text-dark' onClick={showDrawer} icon={<GrFilter size={20} color='black' />}>
                                Filter
                            </Button>
                        </Header>
                        <Content style={contentStyle}>
                            <div className="latest-products">
                                <div className=" p-3 bg-white" style={{ minHeight: '70vh' }}>
                                    {loading && <ProductListSkeleton />}
                                    {!loading && Array.isArray(state?.filterAttachments?.attachments) && state?.filterAttachments?.attachments?.length > 0 ?
                                        <Row gutter={[]}>
                                            {state?.filterAttachments?.attachments?.map((attachment, index) => (
                                                <Col
                                                    key={index}
                                                    xs={12}
                                                    sm={10}
                                                    md={8}
                                                    lg={8}
                                                    xl={6}
                                                    xxl={4}
                                                >
                                                    <AttachmentComponent attachment={attachment} index={index} />
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
                                            description={<h1 style={{ fontSize: "20px" }}>No attachments found</h1>}
                                        >

                                        </Empty>
                                    }
                                </div>

                            </div >
                        </Content>
                        <Footer style={footerStyle}>
                            <Pagination onChange={(current_page) => { setPage(current_page) }} defaultCurrent={state?.filterAttachments?.current_page} pageSize={15} total={state?.filterAttachments?.total} />
                        </Footer>
                    </Layout>
                </Layout>
            </div>
        </>
    );
}

export default AllAttachments; 