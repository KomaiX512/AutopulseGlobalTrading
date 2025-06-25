import React, { useContext, useEffect, useState } from 'react';
import { Checkbox, Pagination, Radio, Select, Drawer, Button, Empty, Layout, Row, Col } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { HomeContext } from '../context/HomeContext';
import ProductListSkeleton from '../Components/ProductSkeleton';
import ProductComponent from '../Components/ProductComponent';
import { GrClose, GrFilter } from 'react-icons/gr';

const { Option } = Select;
const { Footer, Sider, Content, Header } = Layout;

const AllProducts = () => {
    const [open, setOpen] = useState(false);
    const showDrawer = () => setOpen(true);
    const onClose = () => setOpen(false);

    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);

    const parseParam = (param) => (param ? param.split(',') : []);

    let initialCategories = parseParam(queryParams.get('categories'));
    initialCategories = initialCategories?.map(cat => Number(cat));

    let initialBrands = parseParam(queryParams.get('brands'));

    initialBrands = initialBrands?.map(brand => Number(brand));

    const initialWeights = parseParam(queryParams.get('weights'));
    const initialYears = parseParam(queryParams.get('years'));

    const [selectedCategories, setSelectedCategories] = useState(initialCategories);
    const [selectedBrands, setSelectedBrands] = useState(initialBrands);
    const [selectedPrice, setSelectedPrice] = useState(queryParams.get('price') || '');
    const [page, setPage] = useState(parseInt(queryParams.get('page')) || 1);
    const [loading, setLoading] = useState(true);
    const [selectedWeights, setSelectedWeights] = useState(initialWeights);
    const [selectedYears, setSelectedYears] = useState(initialYears);

    const { state, methods } = useContext(HomeContext);
    const slug = location.pathname.split('/')[2];

    useEffect(() => {
        methods?.loadBrandsAndCats({ slug });
    }, [slug]);

    useEffect(() => {
        setLoading(false);
    }, [state.filterProducts]);

    useEffect(() => {

        setLoading(true);

        methods?.filterProducts({ prod_type: slug, selectedCategories, selectedBrands, selectedPrice, page, selectedWeights, selectedYears });

        const queryParams = new URLSearchParams({
            price: selectedPrice,
            page,
            type: slug,
            categories: selectedCategories.join(','),
            brands: selectedBrands.join(','),
            weights: selectedWeights.join(','),
            years: selectedYears.join(',')
        });

        navigate(`/products/${slug}/search?${queryParams.toString()}`);
    }, [selectedPrice, slug, selectedCategories, selectedBrands, page, selectedWeights, selectedYears]);


    const weightFilters = [
        { key: 'up_to_10', value: 'Up to 10 Ton' },
        { key: 'up_to_20', value: 'Up to 20 Ton' },
        { key: 'up_to_30', value: 'Up to 30 Ton' },
        { key: 'up_to_40', value: 'Up to 40 Ton' },
        { key: 'up_to_50', value: 'Up to 50 Ton' },
        { key: 'over_50', value: 'Over 50 Ton' },
    ];

    const yearFilters = Array.from({ length: 2024 - 2000 + 1 }, (_, i) => (2000 + i));


    const handleWeightChange = (checkedValues) => setSelectedWeights(checkedValues);
    const handleCategoryChange = (checkedValues) => {
        console.log('Category checked values:', checkedValues);
        setSelectedCategories(checkedValues);
    };
    const handleBrandChange = (checkedValues) => {
        console.log('Brand checked values:', checkedValues);
        setSelectedBrands(checkedValues);
    };
    const handleYearChange = (values) => {
        console.log('Year selected values:', values);
        setSelectedYears(values);
    };

    const RenderSider = () => (
        <Sider width={'100%'} style={{ backgroundColor: 'white', padding: '10px' }}>
            <h3 style={{ fontSize: '16px', borderBottom: '1px solid', padding: '10px', textAlign: 'left', fontWeight: 'bold' }}>Filters</h3>
            {slug != 'electric-bikes' && <div className='filter-item' style={{ marginTop: '20px', padding: '10px' }}>
                <strong className='text-dark heading'>Year</strong>
                <Select
                    mode="multiple"
                    className='item-group my-3'
                    placeholder="Select years"
                    onChange={handleYearChange}
                    style={{ width: '100%' }}
                    value={selectedYears}
                >
                    {yearFilters?.map(year => (
                        <Option key={year} value={year}>{year}</Option>
                    ))}
                </Select>
            </div>}

            {(slug != 'electric-bikes' && slug != 'electric-vehicles') && <div className='filter-item' style={{ marginTop: '20px', padding: '10px' }}>
                <strong className='text-dark heading'>Weight</strong>
                <Checkbox.Group
                    className='item-group flex flex-col gap-3 my-3'
                    options={weightFilters?.map(filter => ({ label: filter.value, value: filter.key }))}
                    onChange={handleWeightChange}
                    value={selectedWeights}
                />
            </div>}

            {<div className='filter-item' style={{ marginTop: '20px', padding: '10px' }}>
                <strong className='text-dark heading'>Brands</strong>
                <Checkbox.Group
                    className='item-group flex flex-col gap-3 my-3'
                    options={state?.brands?.map(brand => ({ label: brand.name, value: brand.id }))}
                    onChange={handleBrandChange}
                    value={selectedBrands}
                />
            </div>}

            {slug != 'electric-bikes' && <div className='filter-item' style={{ marginTop: '20px', padding: '10px' }}>
                <strong className='text-dark heading'>Categories</strong>
                <Checkbox.Group
                    className='item-group flex flex-col gap-3 my-3'
                    options={state?.categories?.map(cat => ({ label: cat.name, value: cat.id }))}
                    onChange={handleCategoryChange}
                    value={selectedCategories}
                />
            </div>}
        </Sider>
    );

    return (
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
                    <Content >
                        <div className="latest-products">
                            <div className="p-3 bg-white" style={{ minHeight: '70vh' }}>
                                {loading && <ProductListSkeleton />}
                                {!loading && state?.filterProducts?.products?.length > 0 ?
                                    <Row gutter={[10]}>
                                        {state?.filterProducts?.products?.map((item, index) => (
                                            <Col
                                                key={index}
                                                xs={12}
                                                sm={10}
                                                md={8}
                                                lg={8}
                                                xl={6}
                                                xxl={6}
                                                span={8} className='mb-4'>
                                                <ProductComponent prod={item} />
                                            </Col>
                                        ))}
                                    </Row>
                                    :
                                    <Empty />
                                }
                            </div>
                        </div>
                    </Content>
                    <Footer >
                        <Pagination current={page} onChange={(current) => setPage(current)} pageSize={16} total={state?.filterProducts?.total} />
                    </Footer>
                </Layout>
            </Layout>
        </div>
    );
};

export default AllProducts;
