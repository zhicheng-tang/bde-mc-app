import React from 'react';
import { Select, Tag } from 'antd';

const { Option } = Select;

const scheduleStatus = [
  {
    title: '未调度',
    value: 'UN_SCHEDULED',
    color: 'default',
  },
  {
    title: '部份调度',
    value: 'PARTIAL_SCHEDULED',
    color: 'processing',
  },
  {
    title: '已调度',
    value: 'FULL_SCHEDULED',
    color: 'success',
  },
];

export function ScheduleStatusSelector(props) {
  return (
    <Select allowClear={true} {...props}>
      {scheduleStatus.map((item) => (
        <Option key={item.value} value={item.value}>
          {item.title}
        </Option>
      ))}
    </Select>
  );
}

export function ScheduleStatusRender(value) {
  const item = scheduleStatus.find((item) => item.value === value) || {};
  const { title, color } = item;
  return <Tag color={color}>{title}</Tag>;
}
