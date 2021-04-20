import { Select } from 'antd';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
    isSupportOnline: true,
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
    value: 'KYE',
    color: 'default',
    isSupportOnline: true,
  },
  {
    title: '中通',
    value: 'ZTO',
    color: 'default',
    isSupportOnline: false,
  }
];
export function CarrierSelector({ isOnlineMode, ...props }) {
  const productArr = useSelector((state) => state.productArr);
  const carriers = isOnlineMode ? productArr.filter((item) => item.supportMultiPackage)
    : productArr;
  return (
      <Select allowClear={true} {...props}>
        {carriers.map((item) => (
            <Option key={item.productId} value={item.productId}>
              {item.productName}
            </Option>
        ))}
      </Select>
  );
}

CarrierSelector.defaultProps = {
  isOnlineMode: false,
};

export function CarrierRender(value) {
  const productArr = useSelector((state) => state.productArr)||[];
  const item = carrierOptions.find((item) => item.value === value) || '';
  const { title } = item;
  return title;
}
