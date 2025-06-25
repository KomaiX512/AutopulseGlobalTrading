import React from 'react';
import { Flex, Rate } from 'antd';
const Ratings = ({ value }) => (
    <Flex gap="middle" vertical>
        <Flex gap="middle">
            <Rate onChange={() => { }} value={value ?? 0} />
            <span>(10)</span>
        </Flex>
    </Flex>
);
export default Ratings;




