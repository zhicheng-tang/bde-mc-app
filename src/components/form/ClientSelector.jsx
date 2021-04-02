import React from 'react';
import {Select, Tag} from 'antd';

const {Option} = Select;

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
    {
        title: '雄飞物流',
        value: 'XFL',
        color: 'default',
    },
    {
        title: '云彩纺织品',
        value: 'YUNCAI',
        color: 'default',
    },
    {
        title: '严选上品',
        value: 'YXSP',
        color: 'default',
    },
    {
        title: '三浦焊接',
        value: 'SPHJ',
        color: 'default',
    },
    {
        title: '景欣',
        value: 'JX',
        color: 'default',
    },
    {
        title: '胡轩',
        value: 'HX',
        color: 'default',
    },
    {
        title: '广州网商',
        value: 'GZWS',
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
    const {title, color} = item;
    return <Tag color={color}>{title}</Tag>;
}
