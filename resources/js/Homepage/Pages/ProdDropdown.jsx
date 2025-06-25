import React from 'react';
import { Dropdown, Space } from 'antd';
import { GrServices } from 'react-icons/gr';
import { MdConstruction } from 'react-icons/md';

const items = [
    {
        key: 1,
        label: (
            <a className='flex items-center gap-2' rel="noopener noreferrer" href={`${location.pathname.split('/')[1]=='parts' ? '/parts':''}/products/machine`}>
                <GrServices />   Heavy Machinery
            </a>
        ),
    },
    {
        key: 2,
        label: (
            <a className='flex items-center gap-2' rel="noopener noreferrer" href={`${location.pathname.split('/')[1]=='parts' ? '/parts':''}/products/attachments`}>
                <MdConstruction /> Attachments & Accessories
            </a>
        ),
    },
];

const ProdDropdown = () => (
    <Dropdown
        menu={{
            items,
        }}

    >
        <a onClick={(e) => e.preventDefault()}>
            <Space className='text-light' style={{ color: 'white', cursor: 'pointer', fontWeight: '500' }}>
                Products
            </Space>
        </a>
    </Dropdown>
);
export default ProdDropdown;