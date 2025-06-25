import React, { useState } from 'react';
import { CheckCircleOutlined } from '@ant-design/icons';
import HomePage from '@/Homepage/Pages/HomePage';
import { Modal } from 'antd';

const OrderSuccess = () => {

  const [popup, setPopup] = useState(true)
  return (

    <>
      <HomePage />

      <Modal
        title="Order Success"
        visible={popup}
        onCancel={() => { setPopup(false) }}
        footer={null}
      >
        <div className="flex  items-center justify-center bg-gray-100 " style={{ maxHeight: "550px" }}>
          <div className="order-successfull-container container p-3 bg-white text-center ">
            <div className="animate-bounce">
              <CheckCircleOutlined style={{ fontSize: '4rem', color: '#52c41a' }} />
            </div>
            <div className='order-success-msg p-3' style={{ borderRadius: '5px' }}>
              <h1 className="text-4xl font-semibold mt-4 text-gray">Order Successful Placed!</h1>
              <p className="text-lg mt-2">Thank you for your purchase.</p>
              <a href="/track">
                <button className='btn btn-primary btn-home-primary'>
                  Track Order
                </button>
              </a>
            </div>
          </div>
          <div className="fireworks-container"></div>
        </div>

      </Modal>

    </>

  );
};

export default OrderSuccess;
