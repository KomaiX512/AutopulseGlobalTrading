import React, { useContext, useEffect, useState } from 'react';
import { CategoriesContext } from './context/CategoriesContext';
import MyEditor from '@/Homepage/Components/DrafEditor';
import UploadImage from '@/Components/UploadImage';
import { useNavigate, useParams } from 'react-router-dom';
import { Checkbox, Flex, Tooltip } from 'antd';
import AppLoader from '../../components/AppLoader';
import { CFormSelect } from '@coreui/react';
import Ck5Editor from '@/Homepage/Components/CK5Editor';

function CategoriesForm() {

  let context = useContext(CategoriesContext);
  const { state, dispatch, methods } = context;

  const { id } = useParams();

  const [selectedImage, setSelectedImage] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isViewable, setIsViewable] = useState(false);
  const [selectedProd, setSelectedProd] = useState(null);
  const [productTypes, setProductTypes] = useState([]);


  const navigate = useNavigate();


  useEffect(() => {
    if (id) {
      methods.loadCategory(id);
    } else {
      dispatch({ payload: { loading: false } })
    }
    loadProductTypes();
  }, [id]);

  const loadProductTypes = async () => {
    try {
      const response = await fetch('/api/get/product-types');
      const data = await response.json();
      if (data.success) {
        setProductTypes(data.productTypes || []);
      } else {
        // Fallback to hardcoded list if API fails
        setProductTypes([
          { id: 1, name: 'Machine' },
          { id: 2, name: 'Electric Bikes' },
          { id: 3, name: 'Electric Vehicles' },
          { id: 4, name: 'Heavy Machinery' },
          { id: 5, name: 'Vehicle Part' },
          { id: 6, name: 'Bike Part' },
          { id: 7, name: 'Attachments & Accessories' }
        ]);
      }
    } catch (error) {
      console.error('Error loading product types:', error);
      // Fallback to hardcoded list
      setProductTypes([
        { id: 1, name: 'Machine' },
        { id: 2, name: 'Electric Bikes' },
        { id: 3, name: 'Electric Vehicles' },
        { id: 4, name: 'Heavy Machinery' },
        { id: 5, name: 'Vehicle Part' },
        { id: 6, name: 'Bike Part' },
        { id: 7, name: 'Attachments & Accessories' }
      ]);
    }
  };

  useEffect(() => {

    if (state?.selectedCategory) {
      setName(state.selectedCategory.name || '');
      setDescription(state.selectedCategory?.description || '');
      setIsViewable(state.selectedCategory?.is_viewable)
      setSelectedProd(state.selectedCategory?.product_type_id)
    }

  }, [state?.selectedCategory]);

  function handleBusinessCheckbox() {

    setIsViewable(!isViewable);

  }


  async function submitForm(e) {

    e.preventDefault();
    
    // Prevent double submission
    if (state?.loading) {
      return;
    }
    
    // Validate required fields
    if (!name.trim()) {
      alert('Please enter a category name');
      return;
    }
    
    if (!selectedProd) {
      alert('Please select a product type');
      return;
    }
    
    if (!selectedImage && !id) {
      alert('Please select a category image');
      return;
    }
    
    let formValues = new FormData(e.target);
    
    // Add controlled component values that aren't automatically captured
    formValues.append('description', description || '');
    formValues.append('product_type_id', selectedProd);
    formValues.append('is_viewable', isViewable ? '1' : '0');
    
    if (selectedImage) {
      formValues.append('image', selectedImage.originFileObj);
    }

    try {
      const res = await methods.saveCategory(formValues, id);
    if (res) {
      navigate('/categories/list');
    }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  }

  const productsOptions = productTypes?.map((prod) => ({
    value: prod.id,
    label: prod.name,
  }));

  return (
    <div className='form'>
      {
        state?.loading ?

          <AppLoader />

          : ''
      }
      <form className="flex  flex-col p-3 bg-white" style={{ gap: '10px' }} onSubmit={submitForm}>
        <label className='flex  flex-col my-4' htmlFor="image">
          <span className="mb-2">Category Image</span>
          <div className="relative">
            <UploadImage
              defaultValue={id ? state?.selectedCategory?.image?.replace('public', '/storage') : ''}
              setSelectedFile={setSelectedImage} />
            <label className="flex-column py-3" style={{ width: "fit-content" }} htmlFor="">
              <Checkbox
                name="is_viewable"
                style={{ color: 'green', textDecoration: 'underline' }}
                onChange={handleBusinessCheckbox}
                checked={isViewable}
              >
                <Tooltip title={'Check this box, to make this category visisble on homepage'}>
                  Make This Category Visible On Homepage?
                </Tooltip>
              </Checkbox>
            </label>
          </div>
        </label>
        <Flex gap={10}>
          <label className='flex  flex-col' htmlFor="">
            <span>Title</span>
            <input
              type="text"
              name='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="p-2 border border-gray-300 rounded"
            />
          </label>

          <label className="flex-column" htmlFor="">
            <span>Product Type</span>
            <CFormSelect
              name="product_type_id"
              value={selectedProd}
              options={productsOptions}
              onChange={(e) => setSelectedProd(e.target.value)}
              className="select-area"
              required
            />
          </label>
        </Flex>
        <strong >Overview</strong>
        <Ck5Editor
          name={'description'}
          defaultValue={description}
          onChange={(value) => setDescription(value)}
        />
        <button type='submit' className="mt-4">
          Save
        </button>
      </form>
    </div>
  );
}

export default CategoriesForm;
