import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Result, Button } from 'antd';

export default function NoMatch() {
  const location = useLocation();
  const history = useHistory();
  return (
    <Result
      status="404"
      title="404"
      subTitle={
        <p>
          您请求的页面<code>{location.pathname}</code> 不存在
        </p>
      }
      extra={
        <Button type="primary" onClick={() => history.push('/')}>
          返回首页
        </Button>
      }
    />
  );
}
