import { Select } from 'antd';
import React from 'react';

const { Option } = Select;

const carrierOptions = [
  {
    title: '德邦',
    value: 'DOP',
    color: 'default',
    isSupportOnline: true,
  },
  {
    title: '韵达',
    value: 'YUNDA',
    color: 'default',
    isSupportOnline: true,
  },
  {
    title: '圆通',
    value: 'YTO',
    color: 'default',
    isSupportOnline: false,
  },
  {
    title: '百世快递',
    value: 'BS',
    color: 'default',
    isSupportOnline: false,
  },
  {
    title: '运到',
    value: 'YD',
    color: 'default',
    isSupportOnline: true,
  },
  {
    title: '跨越',
    value: 'KY',
    color: 'default',
    isSupportOnline: false,
  },
  {
    title: '中通',
    value: 'ZTO',
    color: 'default',
    isSupportOnline: false,
  }
];

export function CarrierSelector({ isOnlineMode, ...props }) {
  const carriers = isOnlineMode
    ? carrierOptions.filter((item) => item.isSupportOnline)
    : carrierOptions;
  return (
    <Select allowClear={true} {...props}>
      {carriers.map((item) => (
        <Option key={item.value} value={item.value}>
          {item.title}
        </Option>
      ))}
    </Select>
  );
}

CarrierSelector.defaultProps = {
  isOnlineMode: false,
};

export function CarrierRender(value) {
  const item = carrierOptions.find((item) => item.value === value) || {};
  const { title } = item;
  return title;
}
