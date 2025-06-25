import React, { useContext, useEffect, useState } from 'react'
import { Input, Steps, Card, Typography, Flex, Empty, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { HomeContext } from '../context/HomeContext';
import { CiShoppingCart } from 'react-icons/ci';
import { MdCheckCircleOutline } from 'react-icons/md';
const { Step } = Steps;
const { Title, Text } = Typography;


const steps = [
    { title: 'Pending', description: 'Order received', date: '2024-06-01', emoji: '🕐' },
    { title: 'Processing', description: 'Order is being processed', date: '2024-06-02', emoji: '🔄' },
    { title: 'Shipping', description: 'Order is on the way', date: '2024-06-03', emoji: '🚚' },
    { title: 'Shipped', description: 'Order has been shipped', date: '2024-06-04', emoji: '📦' },
    { title: 'Delivered', description: 'Order delivered to customer', date: '', emoji: '📬' },
];

function Track() {


    const { state, dispatch, methods } = useContext(HomeContext);

    useEffect(() => {

        if (state?.auth)
            methods?.loadUserOrders();

    }, [state?.auth]);


    return (

        <div className='bg-whtite p-3 container'>
            <div class="container-fluid page-header m-0 p-0" style={{ height: "100%", background: `url(https://img.freepik.com/free-vector/tiny-man-ordering-products-online-via-smartphone_74855-15542.jpg?w=1380&t=st=1718950111~exp=1718950711~hmac=7b69e587a309e610e48395c3c73deca1d1c46ad7a25ef71b)center center/cover` }}>
                <div class="container-fluid page-header-inner py-5">
                    <div class="container text-center">
                        <h1 class="display-3 text-white mb-3 animated slideInDown">Track</h1>
                        <nav aria-label="breadcrumb" style={{ background: "transparent" }}>
                            <ol class="breadcrumb justify-content-center text-uppercase" style={{ background: "transparent" }}>
                                <li class="breadcrumb-item"><a href="/">Home</a></li>
                                <li class="breadcrumb-item text-white active" aria-current="page">Track</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>

            <div className="container order-tracking-container container bg-white p-3">
                {
                    state?.auth ?
                        <div style={{ padding: '20px' }}>

                            {
                                !state?.orders?.lenght < 1 ?
                                    <Empty
                                        className='pt-5'
                                        imageStyle={{
                                            height: '100%',
                                            width: '300px'
                                        }}
                                        image={'/images/emtycart.png'}
                                        description={
                                            <Flex align='center' className='flex-col'>
                                                <h1 className="text-4xl font-semibold mt-4 text-gray">Oops! No pending order found</h1>
                                                <a href="/products">
                                                    <button className='btn btn-primary btn-home-primary'>
                                                        View Products
                                                    </button>
                                                </a>
                                            </Flex>
                                        }
                                    >
                                    </Empty>
                                    : ''
                            }
                            {
                                (state?.orders && state?.orders[0])?.orders?.map((o, index) => {

                                    return <Card key={index} title={`Order ID: ${o?.id}`} bordered>
                                        <>
                                            {
                                                o?.order_details?.map((prod, index) => {
                                                    return <div>

                                                    </div>
                                                })
                                            }
                                        </>
                                        <Steps current={Number(o?.status)}>
                                            {steps?.map((step, index) => (
                                                <Step
                                                    key={index}
                                                    title={
                                                        <div>
                                                            {step.emoji} {step.title}
                                                        </div>
                                                    }
                                                    description={
                                                        <div>
                                                            <Text>{step.description}</Text>
                                                            {step.date && <Text type="secondary"> ({step.date})</Text>}
                                                        </div>
                                                    }
                                                />
                                            ))}
                                        </Steps>
                                    </Card>
                                })
                            }

                        </div>
                        :
                        <div
                            className='not-login-user-container'
                            style={{ background: "url('/images/not-login.png') center center/cover" }}
                        >

                            <Flex className='py-20' justify='center' align='center'>
                                <a href="/login">
                                    <button className='btn btn-primary btn-home-primary'>
                                        Login
                                    </button>
                                </a>
                            </Flex>

                        </div>
                }
            </div>

        </div>

    )
}

export default Track