import React, { useContext, useEffect, useState } from 'react';
import { Collapse, Input, Button, Rate, DatePicker, Select, Form, Row, Col, Flex } from 'antd';
import { PlusOutlined, SaveOutlined, DeleteOutlined } from '@ant-design/icons';
import moment from 'moment';
import MyEditor from '@/Homepage/Components/DrafEditor';
import { ProductContext } from './context/ProductContext';
import Confirm from '@/Components/Popover';
import { GrTrash } from 'react-icons/gr';

const { Panel } = Collapse;

const ProductReviews = () => {

  const { state, methods, dispatch } = useContext(ProductContext);
  const [reviews, setReviews] = useState([]);

  const [saving, setSaving] = useState(false)


  async function fetchReviews() {

    setSaving(true);
    let reviews = await methods.loadReviews();
    if (reviews) { setReviews(reviews); }
    setSaving(false);


  }


  useEffect(() => {

    fetchReviews();

  }, [])


  const addReview = () => {

    setReviews([...reviews, {
      product_id: state?.selectedProduct?.id,
      review_text: '', rating: 0, user_name: '',
      user_email: '', review_date: '', country: ''
    }]);

  };

  const handleInputChange = (index, field, value) => {
    const newReviews = [...reviews];
    newReviews[index][field] = value;
    setReviews(newReviews);
  };

  const saveReviews = () => {

    methods.saveReviews(reviews);
    dispatch({ payload: { loading: false } })
    fetchReviews()

  };

  const deleteReview = (index) => {
    const newReviews = reviews.filter((_, i) => i !== index);
    setReviews(newReviews);
  };

  const genExtra = (index, review) => (
    <div>
      <Confirm onConfirm={(e) => {
        console.log('Delete confirmed for review ID:', review.id);
        methods.deleteReview(review.id)
          .then(() => {
            console.log('Review deleted from server');
            deleteReview(index);
          })
          .catch((error) => {
            console.error('Error deleting review:', error);
          });
      }} description={'Are you sure you want to delete?'}>
        <GrTrash className="h-4 w-4" />
      </Confirm>
    </div>
  );


  return (
    <div>
      <Collapse accordion>
        {reviews?.map((review, index) => (
          <Panel header={`Review ${index + 1}`} key={index} extra={genExtra(index, review)}>
            <Form layout="vertical">
              <Flex gap={10} align='center w-full'>
                <Form.Item className='w-1/2' label="Reviewer Name">
                  <Input
                    value={review.user_name}
                    onChange={(e) => handleInputChange(index, 'user_name', e.target.value)}
                  />
                </Form.Item>
                <Form.Item className='w-1/2' label="Reviewer Email">
                  <Input
                    value={review.user_email}
                    onChange={(e) => handleInputChange(index, 'user_email', e.target.value)}
                  />
                </Form.Item>
              </Flex>

              <Flex gap={10} align='center'>
                <Form.Item className='w-1/3' label="Reviewing Country">
                  <Input
                    value={review.country}
                    onChange={(e) => handleInputChange(index, 'country', e.target.value)}
                  />
                </Form.Item>
                <Form.Item className='w-1/3' label="Reviewing Rating">
                  <Input
                    value={review.rating}
                    onChange={(e) => handleInputChange(index, 'rating', e.target.value)}
                  />
                </Form.Item>
                <Form.Item className='w-1/3' label="Reviewing Date">
                  <DatePicker
                    className='w-full'
                    value={review.date ? moment(review.review_date) : null}
                    onChange={(date, dateString) => handleInputChange(index, 'review_date', dateString)}
                  />
                </Form.Item>
              </Flex>
              <MyEditor defaultValue={review?.review_text} onChange={(value) => handleInputChange(index, 'review_text', value)} />
            </Form>
          </Panel>
        ))}
      </Collapse>
      <Row gutter={16} style={{ marginTop: '20px' }}>
        <Col>
          <Button type="dashed" icon={<PlusOutlined />} onClick={addReview}>
            Add New
          </Button>
        </Col>
        <Col>
          <Button disabled={saving} type="primary" icon={<SaveOutlined />} onClick={saveReviews}>
            {saving ? 'Saving Reviews...' : 'Save All Reviews'}
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default ProductReviews;
