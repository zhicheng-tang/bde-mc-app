import { Select, Tag } from 'antd';
import React from 'react';

const { Option } = Select;

const orderTypeOptions = [
  {
    title: '线上订单',
    value: 'ONLINE',
    color: 'default',
  },
  {
    title: '线下订单',
    value: 'OFFLINE',
    color: 'processing',
  },
  {
    title: 'O2O',
    value: 'O2O',
    color: 'success',
  },
  {
    title: '其它',
    value: 'OTHER',
    color: 'default',
  },
];

export function OrderTypeSelector(props) {
  return (
    <Select allowClear={true} {...props}>
      {orderTypeOptions.map((item) => (
        <Option key={item.value} value={item.value}>
          {item.title}
        </Option>
      ))}
    </Select>
  );
}

export function OrderTypeRender(value) {
  const item = orderTypeOptions.find((item) => item.value === value) || {};
  const { title, color } = item;
  return <Tag color={color}>{title}</Tag>;
}
