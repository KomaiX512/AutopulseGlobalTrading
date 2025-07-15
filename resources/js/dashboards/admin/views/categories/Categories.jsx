import { useContext, useEffect, useState, useCallback } from "react";
import { CategoriesContext } from "./context/CategoriesContext";
import { formatDate } from "@/utils/helpers";
import { MdDelete, MdInventory } from "react-icons/md";
import Confirm from "@/Components/Popover";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { Tooltip, Skeleton, Table, Avatar } from "antd";
import { debounce } from "lodash";
import CategoryHeader from "./CategoryHeader";

export function Categories() {
  const context = useContext(CategoriesContext);
  
  // Defensive: ensure context and state exist
  if (!context) {
    return <div style={{ color: 'red', textAlign: 'center', margin: '2rem 0' }}>
      Failed to load categories context.
    </div>;
  }
  
  const { state, dispatch, methods } = context;

  // Defensive: ensure state exists
  if (!state) {
    return <div style={{ color: 'red', textAlign: 'center', margin: '2rem 0' }}>
      Failed to load categories state.
    </div>;
  }

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");

  const debouncedLoadCategories = useCallback(
    debounce((search, sort) => {
      if (methods && methods.loadCategories) {
        methods.loadCategories(search, sort);
      }
    }, 500),
    [methods]
  );

  useEffect(() => {
    if (dispatch) {
      dispatch({ payload: { loading: true } });
    }
    debouncedLoadCategories(searchTerm, sortOrder);
  }, [sortOrder]);

  useEffect(() => {
    debouncedLoadCategories(searchTerm, sortOrder);
  }, [searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (value) => {
    setSortOrder(value);
  };

  const isBusiness = location?.pathname?.split('/')[2] ?? '';

  const columns = [
    { title: <MdInventory />, dataIndex: 'image', key: 'image', render: (src) => <Avatar size="large" src={src?.replace('public', '/storage') || ''} /> },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Created At', dataIndex: 'created_at', key: 'created_at', render: (date) => formatDate(date) },
    { title: 'Last Updated', dataIndex: 'updated_at', key: 'updated_at', render: (date) => formatDate(date) },
    {
      title: 'Activity', dataIndex: 'activity', key: 'activity', render: (text, record) => (
        <div className="action-column flex  gap-3">
          <Link to={isBusiness == 'business' ? `/business/categories/form/${record?.id}` : `/categories/form/${record?.id}`}>
            <Tooltip title="Edit Category">
              <FaEdit className="h-4 w-4" />
            </Tooltip>
          </Link>
          <Confirm onConfirm={() => methods?.deleteCategory?.(record?.id)} description={'Are you sure you want to delete?'}>
            <MdDelete className="h-4 w-4" />
          </Confirm>
        </div>
      )
    }
  ];

  // Defensive: ensure categories is always an array
  const data = Array.isArray(state?.categories) ? state.categories.map((item, index) => ({
    ...item,
    key: index
  })) : [];

  // Defensive: handle error or empty state
  const isLoading = Boolean(state?.loading);
  const isEmpty = !isLoading && (!data || data.length === 0);
  const isError = !isLoading && !Array.isArray(state?.categories);

  return (
    <>
      <CategoryHeader
        isBusiness={isBusiness}
        handleSearchChange={handleSearchChange}
        handleSortChange={handleSortChange}
        searchTerm={searchTerm}
      />

      {isLoading ? (
        <Skeleton active paragraph={{ rows: 5 }} />
      ) : isError ? (
        <div style={{ color: 'red', textAlign: 'center', margin: '2rem 0' }}>
          Failed to load categories. Please try again later.
        </div>
      ) : isEmpty ? (
        <div style={{ textAlign: 'center', margin: '2rem 0', color: '#888' }}>
          No categories found.
        </div>
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
