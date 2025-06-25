import React, { useContext, useEffect, useState } from 'react';
import { BrandsContext } from './context/BrandContext';
import MyEditor from '@/Homepage/Components/DrafEditor';
import UploadImage from '@/Components/UploadImage';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Checkbox, Flex, Space, Spin, Tooltip } from 'antd';
import AppLoader from '../../components/AppLoader';
// import { CFormSelect } from '@coreui/react';
// import CKEditorComponent from '@/Homepage/Components/CK5Editor';
import Ck5Editor from '@/Homepage/Components/CK5Editor';

function BrandForm() {

  let context = useContext(BrandsContext);
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

      methods.loadBrand(id);

    } else {

      dispatch({ payload: { loading: false } })

    }
  }, [id]);

  useEffect(() => {

    if (state?.selectedBrand) {
      setName(state.selectedBrand.name || '');
      setDescription(state.selectedBrand?.description || '');
    }

  }, [state?.selectedBrand]);


  console.log('brand', state)


  function submitForm(e) {

    e.preventDefault();
    let formValues = new FormData(e.target);
    if (selectedImage) {

      formValues.append('logo', selectedImage.originFileObj);

    }

    let res = methods.saveBrand(formValues, id);
    if (res) {

      navigate('/brands/list');
    }

    e.target.reset();
  }


  return (
    <div className='form'>
      {
        state?.loading ?

          <AppLoader />

          : ''
      }
      <form className="flex  flex-col p-3 bg-white" style={{ gap: '10px' }} onSubmit={submitForm}>
        <label className='flex  flex-col my-4' htmlFor="image">
          <span className="mb-2">Brand Logo</span>
          <div className="relative">
            <UploadImage
              defaultValue={id ? state?.selectedBrand?.logo?.replace('public', '/storage') : ''}
              setSelectedFile={setSelectedImage} />

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

        </Flex>
        <strong >Overview</strong>
        {/* <MyEditor
          name={'description'}
          defaultValue={description}
          onChange={(value) => setDescription(value)}
        /> */}
        {/* <CKEditorComponent /> */}
        <Ck5Editor name={'overview'} defaultValue={description} />

        <button type='submit' className="mt-4">
          Save
        </button>
      </form>
    </div>
  );
}

export default BrandForm;
