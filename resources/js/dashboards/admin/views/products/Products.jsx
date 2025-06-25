import { useContext, useEffect, useState, useCallback } from "react";
import { ProductContext } from "./context/ProductContext";
import { MdDelete, MdInventory } from "react-icons/md";
import Confirm from "@/Components/Popover";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { Tooltip, Skeleton, Table, Avatar, Tag } from "antd";
import { debounce } from "lodash";
import ProductsHeader from "./ProductHeader";

export function Products() {

  const context = useContext(ProductContext);
  const { state, methods, dispatch } = context;

  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [categories, setCategories] = useState("");
  const [brands, setBrands] = useState("");
  const [sort, setSort] = useState("desc");
  const [page, setPage] = useState(1);

  const debouncedLoadProducts = useCallback(

    debounce(({ search, price, categories, brands, type, sort, page }) => {

      methods.loadProducts({ search, price, type, categories, brands, sort, page });

    }, 600),

    []
  );

  useEffect(() => {
    dispatch({ payload: { loading: true } });

    debouncedLoadProducts({ search, type, price, categories, brands, sort, page });
  }, [price, categories, brands, sort, page, type]);

  useEffect(() => {

    debouncedLoadProducts({ search, price, type, categories, brands, sort, page });

  }, [search]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handlePriceChange = (value) => {
    setPrice(value);
  };

  const handleCategoryChange = (value) => {
    setCategories(value.join(','));
  };

  const handleBrandChange = (value) => {
    setBrands(value.join(','));
  };

  const handleSortChange = (value) => {
    setSort(value);
  };

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handleTypeChange = (value) => {
    setType(value);
  };

  const isBusiness = location.pathname.split('/')[2] == 'business';


  const columns = [
    {
      title: <MdInventory />,
      dataIndex: 'image',
      key: 'image',
      render: (src) => <Avatar size="md" src={src.replace('public', '/storage')} />,
      responsive: ['xs', 'sm', 'md'],
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Link className="pointer" to={`/machinery-vehicles/form/${record.id}`}>
          <div className="pointer">{text}</div>
          <div className="small text-body-secondary text-nowrap">
            Created: {new Date(record.created_at).toLocaleDateString()}
          </div>
        </Link>
      ),
      responsive: ['xs', 'sm', 'md'],
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (category) => category?.name,
      responsive: ['xs', 'sm', 'md'],
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
      key: 'brand',
      render: (brand) => brand?.name,
      responsive: ['xs', 'sm', 'md'],
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      responsive: ['xs', 'sm', 'md'],
    },
    {
      title: 'Weight (Ton)',
      dataIndex: 'weight',
      key: 'weight',
      responsive: ['xs', 'sm', 'md'],
    },
    {
      title: 'Model',
      dataIndex: 'model',
      key: 'model',
      responsive: ['xs', 'sm', 'md'],
    },
    {
      title: 'Make',
      dataIndex: 'make',
      key: 'make',
      responsive: ['xs', 'sm', 'md'],
    },
    {
      title: 'Type',
      dataIndex: 'is_business_product',
      key: 'is_business_product',
      render: (record) => {
        return record == 1 ? <Tag color="purple">Business</Tag> : <Tag color="green">Customer</Tag>;
      },
      responsive: ['xs', 'sm', 'md'],
    },
    {
      title: 'Activity',
      dataIndex: 'activity',
      key: 'activity',
      render: (text, record) => {
        console.log('record', record)
        return <div className="action-column flex  gap-3">
          <Link to={`/machinery-vehicles/form/${record.id}`}>
            <Tooltip title="Edit Product">
              <FaEdit className="h-4 w-4" />
            </Tooltip>
          </Link>
          <Confirm onConfirm={() => methods.deleteProduct(record.id)} description={'Are you sure you want to delete?'}>
            <MdDelete className="h-4 w-4" />
          </Confirm>
        </div>
      },
      responsive: ['xs', 'sm', 'md'],
    },
  ];



  console.log('products', state?.products)

  const data = state?.products?.map((item, index) => ({
    ...item,
    key: index
  }));

  return (
    <>
      <ProductsHeader
        searchTerm={search}
        handleCategoryChange={handleCategoryChange}
        handleBrandChange={handleBrandChange}
        handlePriceChange={handlePriceChange}
        handleSortChange={handleSortChange}
        handleSearchChange={handleSearchChange}
        handleTypeChange={handleTypeChange}
        isBusiness={isBusiness}
      />

      {state.loading ? (
        <Skeleton active paragraph={{ rows: 5 }} />
      ) : (
        <Table
          columns={columns}
          dataSource={data}
          pagination={{
            current: state.currentPage,
            total: state.total,
            pageSize: 16,
            onChange: handlePageChange,
          }}
        />
      )}
    </>
  );
}
