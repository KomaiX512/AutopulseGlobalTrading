import React from 'react';
import { Popconfirm } from 'antd';

const Confirm = ({ title = 'Delete Category', onConfirm, children, description }) => {

    return (
        <Popconfirm
            title={title}
            description={description}
            onConfirm={onConfirm}
            onOpenChange={() => console.log('open change')}
        >
            {children}
        </Popconfirm>
    );
};
export default Confirm;