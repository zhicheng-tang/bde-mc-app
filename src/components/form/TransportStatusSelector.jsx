import {Select, Tag} from 'antd';
import React from 'react';

const {Option} = Select;

const transportStatus = [
    {
        title: '已接单',
        value: 0,
        color: 'default',
    },
    {
        title: '待揽收',
        value: 10,
        color: 'processing',
    },
    {
        title: '已揽收',
        value: 20,
        color: 'processing',
    },
    {
        title: '在途',
        value: 21,
        color: 'processing',
    },
    {
        title: '派件中',
        value: 70,
        color: 'processing',
    },
    {
        title: '拒收',
        value: 79,
        color: 'warning',
    },
    {
        title: '已签收',
        value: 80,
        color: 'success',
    },
    {
        title: '退件签收',
        value: 81,
        color: 'success',
    },
    {
        title: 'ERP已入库',
        value: 90,
        color: 'success',
    },
    {
        title: '已取消',
        value: 99,
        color: '#999',
    },
];

export function TransportStatusSelector(props) {
    return (
        <Select allowClear={true} {...props}>
            {transportStatus.map((item) => (
                <Option key={item.value} value={item.value}>
                    {item.title}
                </Option>
            ))}
        </Select>
    );
}

export function TransportStatusRender(value) {
    const item = transportStatus.find((item) => item.value === value) || {};
    const {title, color} = item;
    return <Tag color={color}>{title}</Tag>;
}
