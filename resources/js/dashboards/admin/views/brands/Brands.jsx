import { useContext, useEffect, useState, useCallback } from "react";
import { BrandsContext } from "./context/BrandContext";
import { formatDate } from "@/utils/helpers";
import { MdDelete, MdInventory } from "react-icons/md";
import Confirm from "@/Components/Popover";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { Tooltip, Skeleton, Table, Avatar } from "antd";
import { debounce } from "lodash";
import BrandHeader from "./BrandHeader";

export function Brands() {

  const context = useContext(BrandsContext);

  const { state, dispatch, methods } = context;

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");

  const debouncedLoadBrands = useCallback(

    debounce((search, sort) => {
      methods.loadBrands(search, sort);
    }, 500),
    []
  );

  useEffect(() => {
    dispatch({ payload: { loading: true } });
    debouncedLoadBrands(searchTerm, sortOrder);
  }, [sortOrder]);

  useEffect(() => {
    debouncedLoadBrands(searchTerm, sortOrder);
  }, [searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (value) => {
    setSortOrder(value);
  };

  const isBusiness = location?.pathname?.split('/')[2] ?? '';

  const columns = [
    { title: <MdInventory />, dataIndex: 'logo', key: 'logo', render: (src) => { console.log('src', src); return <Avatar size="large" src={src?.replace('public', '/storage')} /> } },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Created At', dataIndex: 'created_at', key: 'created_at', render: (date) => formatDate(date) },
    { title: 'Last Updated', dataIndex: 'updated_at', key: 'updated_at', render: (date) => formatDate(date) },
    {
      title: 'Activity', dataIndex: 'activity', key: 'activity', render: (text, record) => (
        <div className="action-column flex  gap-3">
          <Link to={`/brands/form/${record.id}`}>
            <Tooltip title="Edit Brand">
              <FaEdit className="h-4 w-4" />
            </Tooltip>
          </Link>
          <Confirm title="Delete Brand" onConfirm={() => methods.deleteBrand(record.id)} description={'Are you sure you want to delete?'}>
            <MdDelete className="h-4 w-4" />
          </Confirm>
        </div>
      )
    }
  ];

  const data = state?.brands?.map((item, index) => ({
    ...item,
    key: index
  }));


  return (
    <>
      <BrandHeader
        handleSearchChange={handleSearchChange}
        handleSortChange={handleSortChange}
        searchTerm={searchTerm}
      />

      {state.loading ? (
        <Skeleton active paragraph={{ rows: 5 }} />
      ) : (
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          rowKey="id"
        />
      )}
    </>
  );
}
