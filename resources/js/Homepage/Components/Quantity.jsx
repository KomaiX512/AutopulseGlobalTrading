import React from 'react';
import { InputNumber, Button } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';

const QuantityInput = ({ value, onChange, min = 1, max = 100 }) => {
    const handleIncrement = () => {
        if (value < max) {
            onChange(value + 1);
        }
    };

    const handleDecrement = () => {
        if (value > min) {
            onChange(value - 1);
        }
    };

    return (
        <div className="quantity-input">
            <Button
                icon={<MinusOutlined />}
                onClick={handleDecrement}
                disabled={value <= min}
            />
            <InputNumber
                min={min}
                max={max}
                value={value}
                onChange={onChange}
                className="quantity-number"
            />
            <Button
                icon={<PlusOutlined />}
                onClick={handleIncrement}
                disabled={value >= max}
            />
        </div>
    );
};

export default QuantityInput;
