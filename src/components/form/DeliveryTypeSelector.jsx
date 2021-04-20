import {Select, Tag} from 'antd';
import React from 'react';

const {Option} = Select;

const deliveryTypeOptions = [
    {
        title: '送货上门',
        value: 'TO_DOORSTEP',
        color: 'default',
    },
    {
        title: '送货上楼',
        value: 'TO_UPSTAIRS',
        color: 'default',
    },
];

export function DeliveryTypeSelector(props) {
    return (
        <Select allowClear={true} {...props}>
            {deliveryTypeOptions.map((item) => (
                <Option key={item.value} value={item.value}>
                    {item.title}
                </Option>
            ))}
        </Select>
    );
}

export function DeliveryTypeRender(value) {
    const item = deliveryTypeOptions.find((item) => item.value === value) || {};
    const {title, color} = item;
    return <Tag color={color}>{title}</Tag>;
}
