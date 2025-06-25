import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Checkbox, Col, Drawer, Empty, Flex, Form, Input, Radio, Row, Select, Space, Steps, Table, Tooltip, Typography } from 'antd';
import { HomeContext } from '../context/HomeContext';
import { formatDate } from '@/utils/helpers';
import { MdDelete } from 'react-icons/md';
import CheckoutForm from './services/CheckoutForm';
import { Avatar, Popconfirm } from 'antd';
import { CiShoppingCart } from 'react-icons/ci';

const { Option } = Select;

const Cart = ({ open, onClose, auth }) => {

    const context = useContext(HomeContext);
    const { state, dispatch, methods } = context;


    let total_price = state?.cart?.cartItems?.reduce((prev, curr) => {
        const itemTotal = parseFloat(curr?.product?.price) * curr?.quantity;
        return prev + itemTotal;
    }, 0);


    let cart_items_ids = state?.cart?.cartItems?.map(cart => cart.id);

    const onFinish = async (values) => {

        if (!values?.is_shipping_same && !values?.shipping_first_name) {
            return alert('Shippng address is required.');
        }

        try {

            let formValues = new FormData();
            formValues.append('cart_items_ids', cart_items_ids);
            formValues.append('total_amount', total_price);


            for (const i in values) {
                formValues.append(i, values[i]);
            }

            const response = await axios.post('/checkout/product', formValues);

            if (response.data.success) {
                window.location.href = response.data.url;
            }
            else {
                alert('Payment failed')
            }


        } catch (error) {
            console.error('Error creating Stripe session:', error);
        }


    };

    const changeCheckoutStep = (step) => {

        if (step <= 2)
            methods?.proceedCart(step);
    }

    return (
        <>
            <Drawer
                title={`Product Cart`}
                width={1200}
                onClose={onClose}
                open={open}
                styles={{
                    body: {
                        paddingBottom: 80,
                        background: 'rgb(254, 248, 245)'
                    },

                }}

                extra={

                    <Space>
                        {state?.cart?.checkout_step > 0 &&
                            <Button onClick={() => { changeCheckoutStep(state?.cart?.checkout_step - 1) }}>Previous</Button>}
                        {state?.cart?.checkout_step < 1 && cart_items_ids?.length > 0 &&
                            <Button className='btn btn-primary btn-home-primary' onClick={() => { changeCheckoutStep(state?.cart?.checkout_step + 1) }} type="primary">
                                Proceed
                            </Button>}
                    </Space>
                }
            >

                <div className="container bg-white p-3" style={{ minHeight: '100%' }}>
                    <Steps
                        className='step-container'
                        current={state?.cart?.checkout_step}
                        items={[
                            {
                                title: 'Cart',
                                description: 'Fil the cart with the selected products'
                            },
                            {
                                title: 'Billing Address',
                                description: 'complete form with billing address',
                            },
                            {
                                title: 'Payment',
                                description: 'process payment through cards',
                            },
                        ]}
                    />

                    <Form className='p-3 bg-white' style={{ width: '100%', background: 'rgb(254, 248, 245)' }} onFinish={onFinish} initialValues={auth.user} layout="vertical" >

                        <RenderCheckoutStep
                            auth={auth}
                            state={state}
                            methods={methods}
                            current_step={state?.cart?.checkout_step}
                            cart_items_ids={cart_items_ids}
                            total_price={total_price}
                            dispatch={dispatch}

                        />
                    </Form>

                </div>

            </Drawer>
        </>
    );
};

export default Cart;




function RenderCheckoutStep({ auth, state, methods, dispatch, current_step, total_price, cart_items_ids }) {

    const [displayShippingFrom, setDisplayShippingForm] = useState(false);

    const handleChangeQuantity = (e, id) => {

        if (e.target.value < 1) {
            return
        }

        methods?.changeCartQuantity(e.target.value, id);

    }

    switch (current_step) {

        case 0: {
            return <CartComponent state={state} handleChangeQuantity={handleChangeQuantity} dispatch={dispatch} removeFromCart={methods.removeFromCart} />
        }
        case 1: {


            return <Flex align='top' gap={30}>
                <div className='flex' style={{ flexDirection: 'column', width: '70%' }}>
                    <h5 className='py-2 text-left'>Billing Address</h5>
                    <hr />

                    <Row className='pt-4' gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="billing_first_name"
                                label="First Name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter your first name',
                                    },
                                ]}
                            >
                                <Input value={auth?.user?.name} placeholder="Please enter your first name" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="billing_last_name"
                                label="Last Name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter your last name',
                                    },
                                ]}
                            >
                                <Input placeholder="Please enter your last name" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="billing_phone"
                                label="Phone"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter your phone number',
                                    },
                                    {
                                        pattern: /^[0-9]{10}$/,
                                        message: 'Please enter a valid 10-digit phone number',
                                    },
                                ]}
                            >
                                <Input placeholder="Please enter your phone number" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="billing_email"
                                label="Email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter your email address',
                                    },
                                    {
                                        type: 'email',
                                        message: 'Please enter a valid email address',
                                    },
                                ]}
                            >
                                <Input placeholder="Please enter your email address" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="billing_address_line1"
                                label="Address Line 1"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter your address',
                                    },
                                ]}
                            >
                                <Input placeholder="Please enter your address" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="billing_address_line2"
                                label="Address Line 2"
                            >
                                <Input placeholder="Please enter your address (optional)" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="billing_city"
                                label="City"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter your city',
                                    },
                                ]}
                            >
                                <Input placeholder="Please enter your city" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="billing_state"
                                label="State"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter your state',
                                    },
                                ]}
                            >
                                <Input placeholder="Please enter your state" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="billing_postal_code"
                                label="Zip Code"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter your zip code',
                                    },
                                    {
                                        pattern: /^[0-9]{5}$/,
                                        message: 'Please enter a valid 5-digit zip code',
                                    },
                                ]}
                            >
                                <Input placeholder="Please enter your zip code" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="billing_country"
                                label="Country"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please select your country',
                                    },
                                ]}
                            >
                                <Select placeholder="Please select your country">
                                    <Option value="usa">United States</Option>
                                    <Option value="canada">Canada</Option>
                                    <Option value="other">Other</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <hr />

                    <h5 className='py-2 text-left'>Shipping Address</h5>

                    <Form.Item
                        name="is_shipping_same"
                        valuePropName="checked"
                    >
                        <Checkbox
                            onChange={e => setDisplayShippingForm(!e.target.checked)}
                            className="py-2"
                        >
                            <Tooltip title="Check this box, to make this product a business product">
                                Same As Billing Address?
                            </Tooltip>
                        </Checkbox>
                    </Form.Item>


                    {displayShippingFrom && <>
                        <Row className='pt-4' gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="shipping_first_name"
                                    label="First Name"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please enter your first name',
                                        },
                                    ]}
                                >
                                    <Input value={auth?.user?.name} placeholder="Please enter your first name" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="shipping_last_name"
                                    label="Last Name"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please enter your last name',
                                        },
                                    ]}
                                >
                                    <Input placeholder="Please enter your last name" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="shipping_phone"
                                    label="Phone"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please enter your phone number',
                                        },
                                        {
                                            pattern: /^[0-9]{10}$/,
                                            message: 'Please enter a valid 10-digit phone number',
                                        },
                                    ]}
                                >
                                    <Input placeholder="Please enter your phone number" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="shipping_email"
                                    label="Email"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please enter your email address',
                                        },
                                        {
                                            type: 'email',
                                            message: 'Please enter a valid email address',
                                        },
                                    ]}
                                >
                                    <Input placeholder="Please enter your email address" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item
                                    name="shipping_address_line1"
                                    label="Address Line 1"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please enter your address',
                                        },
                                    ]}
                                >
                                    <Input placeholder="Please enter your address" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item
                                    name="shipping_address_line2"
                                    label="Address Line 2"
                                >
                                    <Input placeholder="Please enter your address (optional)" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="shipping_city"
                                    label="City"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please enter your city',
                                        },
                                    ]}
                                >
                                    <Input placeholder="Please enter your city" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="shipping_state"
                                    label="State"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please enter your state',
                                        },
                                    ]}
                                >
                                    <Input placeholder="Please enter your state" />
                                </Form.Item>
                            </Col>
                        </Row>
                        {<Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="shipping_postal_code"
                                    label="Zip Code"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please enter your zip code',
                                        },
                                        {
                                            pattern: /^[0-9]{5}$/,
                                            message: 'Please enter a valid 5-digit zip code',
                                        },
                                    ]}
                                >
                                    <Input placeholder="Please enter your zip code" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="shipping_country"
                                    label="Country"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please select your country',
                                        },
                                    ]}
                                >
                                    <Select placeholder="Please select your country">
                                        <Option value="usa">United States</Option>
                                        <Option value="canada">Canada</Option>
                                        <Option value="other">Other</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>}
                    </>}
                </div>

                {renderOrderSummary(
                    {
                        cart: state?.cart?.cartItems,
                        total: total_price,
                        cart_items_ids: cart_items_ids,
                    })}
            </Flex>
        }
        case 2: {
            return <div>
                <h2>Cart</h2>
                <CheckoutForm amount={total_price} cart_items_ids={cart_items_ids} />
            </div>
        }

        default:
            return <CartComponent state={state} handleChangeQuantity={handleChangeQuantity} dispatch={dispatch} removeFromCart={methods.removeFromCart} />

    }

}


function renderOrderSummary({ cart, total, cart_items_ids }) {
    const columns = [
        {
            title: 'Product',
            dataIndex: 'product',
            key: 'product',
            render: (text, record) => <span>{record?.product?.name}</span>,
            align: 'left',
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
            render: (text, record) => <span>X{record?.quantity}</span>,
            align: 'left',
        },
        {
            title: 'Total',
            dataIndex: 'total',
            key: 'total',
            render: (text, record) => <span>{Number(record.quantity) * Number(record?.product?.price)}</span>,
            align: 'right',
        },
    ];

    const data = (cart ?? [])?.map((item, index) => ({
        key: index,
        product: item.product,
        quantity: item.quantity,
        total: Number(item.quantity) * Number(item?.product?.price),
    }));

    return <div style={{ width: "30%" }} className="order-summay p-3 bg-white ">

        <h5 className='text-left py-2'>Order Summary</h5>
        <hr />
        <div className="heading mt-4">
            <Flex align='center' justify='space-between' className="header py-3">
                <h6>PRODUCT</h6>
                <h6>TOTAL</h6>
            </Flex>
            <Table
                className='cart-table'
                columns={columns}
                dataSource={data}
                pagination={false}
                rowClassName={(record, index) => (index % 2 === 0 ? 'even-row' : 'odd-row')}
            />

            <Flex align='center' justify='space-between' className="header py-3">
                <strong>SUBTOTAL</strong>
                <strong>{total}</strong>
            </Flex>
            <hr />
            <Flex align='center' justify='space-between' className="header py-3">
                <strong>SHIPPING</strong>
                <strong>$0</strong>
            </Flex>
            <hr />
            <Flex align='center' justify='space-between' className="header py-3">
                <strong>DISCOUNT</strong>
                <strong>$0</strong>
            </Flex>
            <hr />
            <Flex align='center' justify='space-between' className="header py-3">
                <h6>TOTAL</h6>
                <h6>{total}</h6>
            </Flex>

            <div className="py-3 bg-white">
                <Radio checked value="highToLow"><span style={{ fontWeight: '500' }}>Credit / Debit Card</span></Radio>
            </div>

            <Tooltip title={'Proceed to payment'}>
                {<button type='submit' className='btn btn-primary btn-home-primary'>
                    Proceed Checkout
                </button>}
            </Tooltip>

        </div>
    </div>
}


const CartComponent = ({ state, dispatch, handleChangeQuantity, removeFromCart }) => {
    const cartItems = state?.cart?.cartItems || [];
  
    if (cartItems.length < 1) {
      return (
        <div className='flex flex-col items-center pt-5'>
          <img
            src='/images/emtycart.png'
            alt='Empty Cart'
            className='h-60 w-auto'
          />
          <Typography.Text className='mt-4'>
            Oops, You have no product in your cart!
          </Typography.Text>
          <Button
            href='/products'
            className='mt-4'
            type='primary'
            icon={<CiShoppingCart size={20} color='white' stroke='2' />}
          >
            View Products
          </Button>
        </div>
      );
    }
  
    return (
      <div className='space-y-4'>
        {cartItems.map((item, index) => (
          <div key={item.id} className='flex justify-between items-center p-4 border rounded-lg shadow-md'>
            {/* Product Info */}
            <div className='flex items-center space-x-4'>
              <Avatar size='large' src={item?.product?.image?.replace('public', '/storage')} />
              <div className='flex flex-col'>
                <span className='text-lg font-semibold text-gray-800'>{item?.product?.name}</span>
                <span className='text-sm text-gray-500'>Added: {formatDate(item?.product?.created_at)}</span>
                <span className='text-lg font-semibold text-gray-800'>${item?.product?.price}</span>
              </div>
            </div>
  
            {/* Quantity and Actions */}
            <div className='flex items-center space-x-4'>
              <Input
                type='number'
                defaultValue={item?.quantity}
                min={1}
                max={Number(item?.product?.stock)}
                onChange={(e) => handleChangeQuantity(e, item?.id)}
                className='w-20'
              />
              <Popconfirm
                title='Remove Item'
                onConfirm={() => removeFromCart.call(dispatch, item?.product?.id)}
                okText='Yes'
                cancelText='No'
                placement='topRight'
              >
                <MdDelete title='Remove Item' className='text-red-500 cursor-pointer' size={20} />
              </Popconfirm>
            </div>
          </div>
        ))}
      </div>
    );
  };

