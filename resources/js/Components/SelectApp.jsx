import React from 'react';
import { Select, Space } from 'antd';

const SelectApp = ({ handleChange, options, defaultValue }) => (
    <Space wrap>
        <Select
            defaultValue={defaultValue}
            style={{
                width: '100',
            }}
            onChange={handleChange}
            options={options}
        />
    </Space>
);
export default SelectApp;