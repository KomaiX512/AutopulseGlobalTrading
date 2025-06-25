import React, { useState } from 'react';
import { Button, Modal } from 'antd';
const AntModal = ({ title, open, onClose, onSubmit, width = 700, children }) => {
    return (
        <>
            <Modal
                title={title}
                centered
                open={open}
                onOk={onSubmit}
                onCancel={onClose}
                width={width}
            >
                {children}
            </Modal>
        </>
    );
};
export default AntModal;