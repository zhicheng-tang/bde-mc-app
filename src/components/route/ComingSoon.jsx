import React from 'react';
import { useLocation } from 'react-router-dom';
import { Result } from 'antd';

export default function ComingSoon() {
  const location = useLocation();
  return (
    <Result
      title="即将到来"
      subTitle={
        <p>
          您访问的页面<code>{location.pathname}</code> 还在开发中，即将到来...
        </p>
      }
    />
  );
}
