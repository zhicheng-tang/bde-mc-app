import {Select, Tag} from 'antd';
import React from 'react';

const {Option} = Select;

const transportationType = [
    {
        title: '寄快递',
        value: 'EXPRESS',
        color: 'default',
    },
    {
        title: '寄重货',
        value: 'BULKY_ITEM',
        color: 'default',
    },
    {
        title: '发物流',
        value: 'LTL',
        color: 'default',
    },
    {
        title: '发专车',
        value: 'FTL',
        color: 'default',
    },
    {
        title: '未指定',
        value: 'UNSPECIFIED',
        color: 'default',
    },
];

export function TransportationTypeSelector(props) {
    return (
        <Select allowClear={true} {...props}>
            {transportationType.map((item) => (
                <Option key={item.value} value={item.value}>
                    {item.title}
                </Option>
            ))}
        </Select>
    );
}

export function TransportationTypeRender(value) {
    const item = transportationType.find((item) => item.value === value) || {};
    const {title, color} = item;
    return <Tag color={color}>{title}</Tag>;
}
