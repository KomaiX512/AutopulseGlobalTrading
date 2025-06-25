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


  const navigate = useNavigate();


  useEffect(() => {
    if (id) {
      methods.loadCategory(id);
    } else {
      dispatch({ payload: { loading: false } })
    }
  }, [id]);

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


  function submitForm(e) {

    e.preventDefault();
    let formValues = new FormData(e.target);
    if (selectedImage) {

      formValues.append('image', selectedImage.originFileObj);

    }

    let res = methods.saveCategory(formValues, id);
    if (res) {

      navigate('/categories/list');
    }

    e.target.reset();
  }

  const product_types = [
    {
      id: 1,
      title: 'Machine'
    },
    {
      id: 2,
      title: 'Electric Bikes'
    },
    {
      id: 3,
      title: 'Vehicles'
    },
    {
      id: 4,
      title: 'Machine Part'
    },
    {
      id: 5,
      title: 'Vehicle Part'
    },
    {
      id: 6,
      title: 'Bike Part'
    },

  ]


  const productsOptions = product_types?.map((prod) => ({
    value: prod.id,
    label: prod.title,
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
