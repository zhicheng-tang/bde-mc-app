import React from 'react';
import { Select, Tag } from 'antd';

const { Option } = Select;

const clientOptions = [
  {
    title: 'Nomex',
    value: 'Nomex',
    color: 'default',
  },
  {
    title: 'UR',
    value: 'UR',
    color: 'default',
  },
  {
    title: 'KM',
    value: 'KM',
    color: 'default',
  },
  {
    title: '翔赫',
    value: 'XH',
    color: 'default',
  },
  {
    title: '新亦源',
    value: '56XYY',
    color: 'default',
  },
];

export function ClientSelector(props) {
  return (
    <Select allowClear={true} {...props}>
      {clientOptions.map((item) => (
        <Option key={item.value} value={item.value}>
          {item.title}
        </Option>
      ))}
    </Select>
  );
}

export function ClientRender(value) {
  const item = clientOptions.find((item) => item.value === value) || {};
  const { title, color } = item;
  return <Tag color={color}>{title}</Tag>;
}
