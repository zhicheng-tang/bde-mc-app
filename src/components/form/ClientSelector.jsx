import React from 'react';
import {Select, Tag} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
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
    const userArr = useSelector((state) => state.userArr)||[];
    return (
        <Select allowClear={true} {...props}>
            {userArr.length>0&&userArr.map((item) => (
                <Option key={item.clientId} value={item.clientId}>
                    {item.name}
                </Option>
            ))}
        </Select>
    );
}

export function ClientRender(value) {
    const userArr = useSelector((state) => state.userArr)||[];
    const item = userArr.find((item) => item.clientId === value) || {};
    const {name, color} = item;
    return <Tag color={color}>{name}</Tag>;
}
