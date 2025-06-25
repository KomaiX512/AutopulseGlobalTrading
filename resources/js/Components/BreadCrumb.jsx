import React from 'react';
import { Breadcrumb } from 'antd';
import { HomeOutlined } from '@ant-design/icons';

const CustomBreadcrumb = ({ items }) => {
  return (
    <Breadcrumb className="custom-breadcrumb">
      {items?.map((item, index) => (
        <Breadcrumb.Item key={index} href={item.href}>
          {item.icon && React.createElement(item.icon)}
          {item.href ? <a href={item.href}>{item.label}</a> : item.label}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};

export default CustomBreadcrumb;
