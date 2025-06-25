import React, { useEffect, useState } from 'react';
import { loadOrders, updateOrderStatus } from './context/methods';
import { Link, useParams } from 'react-router-dom';
import { formatDate } from '@/utils/helpers';
import { CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react';
import { Flex, Image, Modal, Steps, Tag, Tooltip } from 'antd';
import { FaChevronCircleLeft, FaChevronCircleRight, FaEdit, FaImage } from 'react-icons/fa';

import './style.scss';
import Confirm from '@/Components/Popover';

let order_steps = {
    0: "Pending",
    1: "Processing",
    2: "Shipping",
    3: "Shipped",
    4: "Delivered",
}

function OrderDetailsPage() {

    const { id } = useParams();

    const [order, setOrders] = useState(null);
    const [statusModal, setStatusModal] = useState(false);

    useEffect(() => {

        loadOrders({ setOrders, id });

    }, [])

    let current_order = order?.data;
    console.log('currunt order', current_order)
    let orderStatus = Number(current_order?.status?.status);


    async function updateStatus(status) {

        let newStatus = Number(orderStatus);

        if (status === 'next') {
            newStatus += 1;
        }
        else {
            newStatus -= 1
        }


        let res = await updateOrderStatus({ order_id: current_order?.id, status: newStatus })
        if (res?.success)
            loadOrders({ setOrders, id });
    }


    return (
        <div className='order-informations'>

            <div className="order-details">
                <h3 className='m-0 py-2'>Basic Order Details</h3>
                <p>This is the basic order details</p>

                <div className="curstomer-information">
                    <div className="item">
                        <h4 className="name">Product Count</h4>
                        <div className="value">{current_order?.order_details?.length}</div>
                    </div>
                    <div className="item">
                        <h4 className="name">Subtotal Amount</h4>
                        <div className="value">${current_order?.total_amount} </div>
                    </div>
                    <div className="item">
                        <h4 className="name">Discount</h4>
                        <div className="value">0</div>
                    </div>
                    <div className="item">
                        <h4 className="name">Order Status</h4>
                        <div className="value">
                            <Flex gap={5} style={{ flexDirection: 'column' }}>
                                <Tag color='blue' style={{ width: "fit-content" }}>
                                    {order_steps[Number(current_order?.status?.status)]}
                                </Tag>
                                {formatDate(current_order?.status?.created_at)}
                            </Flex>
                        </div>
                    </div>
                    <div className="item">
                        <h4 className="name">Order Date</h4>
                        <div className="value">{formatDate(current_order?.created_at)}</div>
                    </div>

                </div>
            </div>
            <div className="order-container">
                <h3 className='m-0 py-2'>Billing Address</h3>
                <p>This is the billing information of customer, Entered while checkout</p>
                <div className="curstomer-information">
                    <div className="item">
                        <h4 className="name">Name</h4>
                        <div className="value">{current_order?.user?.first_name} {current_order?.user?.last_name}</div>
                    </div>
                    <div className="item" title='Contact'>
                        <h4 className="name">Email</h4>
                        <div className="value"><a href={`mailto:${current_order?.user?.email}`}>{current_order?.user?.email}</a></div>
                    </div>
                    <div className="item">
                        <h4 className="name">Phone</h4>
                        <div className="value">{current_order?.user?.phone}</div>
                    </div>
                    <div className="item">
                        <h4 className="name">Address Line 1</h4>
                        <div className="value">{current_order?.user?.address_line1}</div>
                    </div>
                    <div className="item">
                        <h4 className="name">Address Line 2</h4>
                        <div className="value">{current_order?.user?.address_line2 ?? 'N/A'}</div>
                    </div>
                    <div className="item">
                        <h4 className="name">City</h4>
                        <div className="value">{current_order?.user?.city}</div>
                    </div>
                    <div className="item">
                        <h4 className="name">State</h4>
                        <div className="value">{current_order?.user?.state}</div>
                    </div>
                    <div className="item">
                        <h4 className="name">Country</h4>
                        <div className="value">{current_order?.user?.country}</div>
                    </div>
                    <div className="item">
                        <h4 className="name">Postal Code</h4>
                        <div className="value">{current_order?.user?.postal_code}</div>
                    </div>

                </div>
            </div>
            <div className="order-container">
                <h3 className='m-0 py-2'>Shipping Address</h3>
                <p>This is the shipping address of customer, Entered while checkout</p>
                <div className="curstomer-information">
                    <div className="item">
                        <h4 className="name">Name</h4>
                        <div className="value">{current_order?.shipping_address?.first_name} {current_order?.shipping_address?.last_name}</div>
                    </div>
                    <div className="item" title='Contact'>
                        <h4 className="name">Email</h4>
                        <div className="value"><a href={`mailto:${current_order?.user?.email}`}>{current_order?.user?.email}</a></div>
                    </div>
                    <div className="item">
                        <h4 className="name">Phone</h4>
                        <div className="value">{current_order?.shipping_address?.phone}</div>
                    </div>
                    <div className="item">
                        <h4 className="name">Address Line 1</h4>
                        <div className="value">{current_order?.shipping_address?.address_line1}</div>
                    </div>
                    <div className="item">
                        <h4 className="name">Address Line 2</h4>
                        <div className="value">{current_order?.shipping_address?.address_line2 ?? 'N/A'}</div>
                    </div>
                    <div className="item">
                        <h4 className="name">City</h4>
                        <div className="value">{current_order?.shipping_address?.city}</div>
                    </div>
                    <div className="item">
                        <h4 className="name">State</h4>
                        <div className="value">{current_order?.shipping_address?.state}</div>
                    </div>
                    <div className="item">
                        <h4 className="name">Country</h4>
                        <div className="value">{current_order?.shipping_address?.country}</div>
                    </div>
                    <div className="item">
                        <h4 className="name">Postal Code</h4>
                        <div className="value">{current_order?.shipping_address?.zipcode}</div>
                    </div>

                </div>
            </div>

            <div className="order-container">
                <h3 className='m-0 py-2'>Transaction Details</h3>
                <p>This is the transaction details of customer, Entered while checkout</p>
                <div className="curstomer-information">
                    <div className="item">
                        <h4 className="name">Card Holder Name </h4>
                        <div className="value">${current_order?.transaction?.card_holder} </div>
                    </div>
                    <div className="item">
                        <h4 className="name">Card Holder Name </h4>
                        <div className="value">{current_order?.transaction?.card_holder} </div>
                    </div>
                    <div className="item">
                        <h4 className="name">Card Expiry Date </h4>
                        <div className="value">{current_order?.transaction?.exp_month}/{current_order?.transaction?.exp_year} </div>
                    </div>
                    <div className="item">
                        <h4 className="name">Card Last4 </h4>
                        <div className="value">{current_order?.transaction?.last4} </div>
                    </div>
                    <div className="item">
                        <h4 className="name">Card Brand </h4>
                        <div className="value">{current_order?.transaction?.brand} </div>
                    </div>
                    <div className="item">
                        <h4 className="name">Country</h4>
                        <div className="value">{current_order?.transaction?.country} </div>
                    </div>

                    <div className="item">
                        <h4 className="name">Amount Paid</h4>
                        <div className="value">${current_order?.transaction?.amount} </div>
                    </div>


                    <div className="item">
                        <h4 className="name">Payment Status </h4>
                        <Tag style={{width:'fit-content'}} color="green">Completed</Tag>
                    </div>

                </div>
            </div>

            <div className="product-information">
                <h3 className='py-2 m-0'>Prodcut Information</h3>
                <p>This is the information for the prodcuts ordered by the customer</p>
                <CTable align="middle" className="mb-0 border" hover responsive>
                    <CTableHead className="text-nowrap">
                        <CTableRow>
                            <CTableHeaderCell className="bg-body-tertiary text-bold">
                                #
                            </CTableHeaderCell>
                            <CTableHeaderCell className="bg-body-tertiary text-bold">
                                <FaImage />
                            </CTableHeaderCell>
                            <CTableHeaderCell className="bg-body-tertiary">Name</CTableHeaderCell>
                            <CTableHeaderCell className="bg-body-tertiary">
                                Unit Price
                            </CTableHeaderCell>
                            <CTableHeaderCell className="bg-body-tertiary">
                                Discount
                            </CTableHeaderCell>
                            <CTableHeaderCell className="bg-body-tertiary">
                                Quantity
                            </CTableHeaderCell>
                            <CTableHeaderCell className="bg-body-tertiary ">
                                Available Stock
                            </CTableHeaderCell>
                            <CTableHeaderCell className="bg-body-tertiary ">
                                Total Price
                            </CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        {current_order?.order_details && current_order?.order_details?.map((item, index) => (
                            item?.product && <CTableRow v-for="item in tableItems" key={index}>
                                <CTableDataCell className="">
                                    {index + 1}
                                </CTableDataCell>
                                <CTableDataCell className="">
                                    <Image width={90} src={`/${item?.product?.image.replace('public', '/storage')}`} />
                                </CTableDataCell>
                                <CTableDataCell>
                                    <div>{item.product?.name}</div>
                                    <div className="small text-body-secondary text-nowrap">
                                        {formatDate(item?.created_at)}
                                    </div>
                                </CTableDataCell>
                                <CTableDataCell className="">
                                    $ {item.product?.price}
                                </CTableDataCell>
                                <CTableDataCell className="">
                                    0
                                </CTableDataCell>
                                <CTableDataCell>
                                    {item?.quantity}
                                </CTableDataCell>
                                <CTableDataCell>
                                    {item?.product?.stock}
                                </CTableDataCell>
                                <CTableDataCell>
                                    ${Number(item?.price) * Number(item?.quantity)}
                                </CTableDataCell>
                            </CTableRow>
                        ))}
                    </CTableBody>
                </CTable>
            </div>

            <div className="order-status">
                <div className="header">
                    <div>
                        <h3 className='m-0 py-2'>Order Status</h3>
                        <p>This is the order status for the customer, indicating the steps to deliver order</p>
                    </div>
                    <div className="header gap-3">
                        <Confirm
                            title='Update Status'
                            onConfirm={e => updateStatus('prev')}
                            description={'Are you sure you want to update status ?'}>
                            <button
                                className=' header btn-primary btn-home-primary'
                            >
                                <FaChevronCircleLeft /> <span> Update  Previous</span>
                            </button>
                        </Confirm>

                        <Confirm
                            onConfirm={e => updateStatus('next')}
                            title='Update Status'
                            description={'Are you sure you want to update status ?'}>
                            <button
                                className=' header btn-primary btn-home-primary'
                            >
                                <span> Update  Next</span><FaChevronCircleRight />
                            </button>
                        </Confirm>
                    </div>
                </div>
                <div className="steps-container p-5">
                    <Steps
                        className='step-container'
                        current={orderStatus}
                        items={[
                            {
                                title: 'Pending',
                                description: 'The product payment is done, order is pending',
                            },
                            {
                                title: 'Processing',
                                description: 'complete form with billing address',
                            },
                            {
                                title: 'Shipping',
                                description: 'process payment through cards',
                            },
                            {
                                title: 'Shipped',
                                description: 'process payment through cards',
                            },
                            {
                                title: 'Delivered',
                                description: 'process payment through cards',
                            },
                        ]}
                    />
                </div>

            </div>
            <Modal
                title="Vertically centered modal dialog"
                centered
                open={statusModal}
                onOk={() => setStatusModal(false)}
                onCancel={() => setStatusModal(false)}
            >
                <input type="text" name='description' />

            </Modal>
        </div>
    )
}

export default OrderDetailsPage


