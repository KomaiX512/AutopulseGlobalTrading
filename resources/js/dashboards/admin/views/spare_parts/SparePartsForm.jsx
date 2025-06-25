import React, { useContext, useEffect, useState } from 'react';
import { Button, Checkbox, Flex, Skeleton, Spin, Tabs, Tooltip, Typography } from 'antd'; // Import Tabs from Ant Design
import { ProductContext } from './context/ProductContext';
import { useNavigate, useParams } from 'react-router-dom';
import BasicEditor from '../../../../Homepage/Components/BasicEditor';
import MyEditor from '@/Homepage/Components/DrafEditor';
import UploadImage from '@/Components/UploadImage';
import { CFormSelect } from '@coreui/react';
import MultiFileUploaders from '@/Components/MultiFileUploaders';
import LoadingSpinner from '../../components/LoadingSpinner';
import ProductReviews from './ProductReviews';
import Ck5Editor from '@/Homepage/Components/CK5Editor';

const { TabPanel } = Tabs;

function SparePartsForm() {

  const { id } = useParams();
  const context = useContext(ProductContext);
  const { state, dispatch, methods } = context;

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedCat, setSelectedCat] = useState(null);
  const [selectedBrand, setSlectedBrand] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [businessProd, setBusinessProd] = useState(false);
  const [prodTitle, setProdTitle] = useState('');
  const [price, setPrice] = useState('');
  const [model, setModel] = useState('');
  const [discount, setDiscount] = useState('');
  const [year, setYear] = useState('');
  const [weight, setWeight] = useState('');
  const [quantity, setQuantity] = useState('');

  const [selectedTab, setSelectedTab] = useState('basic-info');

  let navigate = useNavigate();

  async function fetchData() {

    await loadCategories();


    if (id) {
      await methods.loadProduct(id);
    }

    dispatch({ payload: { loading: false } })

  }

  useEffect(() => {

    dispatch({ payload: { loading: true } })
    fetchData();

  }, [id]);

  useEffect(() => {

    if (id) {

      setBusinessProd(state?.selectedProduct?.is_business_product == 1);
      setSelectedCat(state?.selectedProduct?.category_id);
      setSlectedBrand(state?.selectedProduct?.brand_id);
      setProdTitle(state?.selectedProduct?.name);
      setPrice(state?.selectedProduct?.price);
      setModel(state?.selectedProduct?.model);
      setWeight(state?.selectedProduct?.weight);
      setDiscount(state?.selectedProduct?.discount);
      setQuantity(state?.selectedProduct?.stock);
      setYear(state?.selectedProduct?.make);

    }

  }, [state?.selectedProduct]);

  async function loadCategories() {

    let response = await methods?.loadCategories();

    setCategories(response?.categories);
    setBrands(response?.brands);

  }

  async function submitForm(e) {

    dispatch({ payload: { loading: true } })

    e.preventDefault();

    let formValues = new FormData(e.target);

    if (selectedImage) {

      formValues.append('image', selectedImage?.originFileObj);

    }

    let res = await methods?.saveProduct({ id, formValues, navigate });

    if (res) {

      navigate('/spare-parts/list');

    }

    // e.target.reset();
  }

  const categoriesOptions = categories?.map((cat) => ({
    value: cat.id,
    label: cat.name,
  }));

  const brandsOptions = brands?.map((brand) => ({
    value: brand.id,
    label: brand.name,
  }));

  function handleCatSelect(value) {
    setSelectedCat(value);
  }

  function handleSelectBrand(value) {
    setSlectedBrand(value);
  }

  function handleBusinessCheckbox() {
    setBusinessProd(!businessProd);
  }

  const handleSave = async (files) => {

    // dispatch({ payload: { loading: true } })
    if (files.length > 0) {
      let unsavedFiles = files?.filter(file => !file.id);
      let resp = await methods?.uploadProductImages(unsavedFiles, state?.selectedProduct);
    }

  };

  const handleImageDelete = async (id) => {

    await methods.deleteProductImage(id);

  }

  return (
    <div className="h-full w-full" >
      {
        state?.loading &&
        <LoadingSpinner />

      }
      <form className="flex-column form bg-white  p-3" onSubmit={submitForm}>
        <Tabs defaultActiveKey="basic-info" onChange={setSelectedTab} centered>
          <TabPanel tab="Product Info" key="basic-info">
            <div className="product-image">
              <UploadImage
                defaultValue={id ? state?.selectedProduct?.image?.replace('public', '/storage') : ''}
                setSelectedFile={setSelectedImage} />

            </div>
            <Flex gap={10}>
              <label className="flex-column" htmlFor="">
                <span>Product Title</span>
                <input
                  type="text"
                  defaultValue={prodTitle}
                  name="name"
                  placeholder="Enter the product title here"
                  required
                />
              </label>
              <label className="flex-column" htmlFor="">
                <span>Category</span>
                <CFormSelect
                  name="category_id"
                  value={selectedCat}
                  options={categoriesOptions}
                  onChange={(e) => handleCatSelect(e.target.value)}
                  className="select-area"
                />
              </label>
              <label className="flex-column" htmlFor="">
                <span>Make</span>
                <CFormSelect
                  name="brand_id"
                  value={selectedBrand}
                  options={brandsOptions}
                  onChange={(e) => handleSelectBrand(e.target.value)}
                  className="select-area"
                />
              </label>
            </Flex>
            <Flex gap={10}>
              <label className="flex-column" htmlFor="">
                <span>Unit Price</span>
                <input
                  type="number"
                  name="price"
                  defaultValue={price}
                  placeholder="Enter the single product price"
                  required
                />
              </label>

              <label className="flex-column" htmlFor="">
                <span>Discount %</span>
                <input
                  type="number"
                  name="discount"
                  defaultValue={discount}
                  placeholder="Enter the product discount in percent."
                  required
                />
              </label>
              <label className="flex-column" htmlFor="">
                <span>Year</span>
                <input
                  type="number"
                  name="make"
                  defaultValue={year}
                  placeholder="Enter the product make value."
                  required
                />
              </label>

            </Flex>
            <Flex gap={10}>

              <label className="flex-column" htmlFor="">
                <span>Model</span>
                <input
                  type="text"
                  name="model"
                  defaultValue={model}
                  placeholder="Enter the product model"
                  required
                />
              </label>
              <label className="flex-column" htmlFor="">
                <span>Quantity</span>
                <input
                  type="number"
                  name="stock"
                  defaultValue={quantity}
                  placeholder="Enter the available stock/quantity"
                  required
                />
              </label>
              <label className="flex-column" htmlFor="">
                <span>Weight</span>
                <input
                  step={'any'}
                  type="number"
                  name="weight"
                  defaultValue={weight}
                  placeholder="Enter the product make value."
                  required
                />
              </label>
            </Flex>

            <div className="field-group">

              <label htmlFor="">
                Product Features
                <Ck5Editor onChange={() => { }} name={'features'} defaultValue={id ? state?.selectedProduct?.features ?? '' : ''} />
              </label>
            </div>
          </TabPanel>
          <TabPanel tab="Product Overview" key="product-description">
            <div className="field-group">
              <label htmlFor="">
                Product Overview
                <Ck5Editor onChange={() => { }} name={'description'} defaultValue={id ? state?.selectedProduct?.description ?? '' : ''} />
              </label>
            </div>
          </TabPanel>
          <TabPanel tab="Product Images" key="product-images">
            <div style={{ padding: '20px' }}>
              <h2>Upload Product Images</h2>
              <MultiFileUploaders
                defaultImages={state?.selectedProduct?.images}
                onSave={handleSave}
                onDelete={handleImageDelete}
              />
            </div>
          </TabPanel>
          <TabPanel tab="Product Reviews" key="product-reviews">
            <div style={{ padding: '20px' }}>
              <h2>Product Reviews</h2>
              <ProductReviews />
            </div>
          </TabPanel>
        </Tabs>
        <Button className=' ml-auto' style={{ width: 'fit-content' }} htmlType="submit">Save Product</Button>
      </form>
    </div>
  );
}

export default SparePartsForm;
