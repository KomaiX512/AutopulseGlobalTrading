import { Input, List, Typography, Empty, Skeleton } from 'antd';
import React, { useState, useEffect, useCallback } from 'react';
import debounce from 'lodash.debounce';
import axios from 'axios';
import { SearchOutlined } from '@ant-design/icons';

const { Text } = Typography;

function ProductSearch() {
    const [searchValue, setSearchValue] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchPerformed, setSearchPerformed] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [isMobile, setIsMobile] = useState(window.matchMedia('(max-width: 500px)').matches);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.matchMedia('(max-width: 500px)').matches);
        };
        
        window.addEventListener('resize', handleResize);
        
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const performSearch = async (value) => {
        setLoading(true);
        try {
            const response = await axios.get(`/search-products`, { params: { search_term: value } });
            setFilteredProducts(response.data);
        } catch (error) {
            console.error('Error searching products:', error);
        }
        setLoading(false);
        setSearchPerformed(true);
    };

    const debouncedSearch = useCallback(
        debounce((value) => performSearch(value), 300),
        []
    );

    useEffect(() => {
        if (searchValue) {
            debouncedSearch(searchValue);
        } else {
            setFilteredProducts([]);
            setSearchPerformed(false);
        }
    }, [searchValue, debouncedSearch]);

    const handleIconClick = () => {
        if (searchValue) {
            performSearch(searchValue);
        }
    };

    return (
        <div className="container m-auto above-search-container d-block m-0 p-0 ml-auto" style={{ marginLeft: "auto", position: 'relative', maxWidth: "700px", width: "100%" }}>
            <div className="p-0">
                <Input
                    style={{
                        height: '40px',
                        borderRadius: "30px",
                        border: '1.2px solid black',
                        width: isFocused && isMobile ? '98vw' : '100%',
                        zIndex: isFocused && isMobile ? 1000 : 'auto',
                        position: isFocused && isMobile ? 'relative' : 'static',
                        transition: 'all 0.3s ease'
                    }}
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder="Search products"
                    suffix={<SearchOutlined onClick={handleIconClick} style={{ cursor: 'pointer' }} />}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                />
            </div>

            {loading ? (
                <div className='filtered-product-list' style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
                    <Skeleton className='bg-white p-3' style={{ position: 'absolute', top: '10px', background: "white", zIndex: '100000' }} active size="large" />
                </div>
            ) : (
                searchPerformed && (
                    filteredProducts.length > 0 ? (
                        <List
                            className='filtered-product-list'
                            bordered
                            dataSource={filteredProducts}
                            renderItem={item => (
                                <a href={`${location.pathname.split('/')[1]=='parts' ? '/parts':''}/product/${item?.slug}`}>
                                    <List.Item>
                                        <List.Item.Meta
                                            avatar={
                                                <img
                                                    loading='lazy'
                                                    height={40} width={40} src={`${item?.image.replace('public', '/storage')}`} style={{ width: 50, height: 50, objectFit: 'cover' }} />
                                            }
                                            title={<a style={{ fontSize: '16px', fontWeight: '500' }} href={`/product/${item?.slug}`}>{item?.name}</a>}
                                        />
                                    </List.Item>
                                </a>
                            )}
                        />
                    ) : (
                        <Empty className='empty-product-container' description="No Products Found" style={{ marginTop: '10px' }} />
                    )
                )
            )}
        </div>
    );
}

export default ProductSearch;
