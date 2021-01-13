import React from 'react';
import { Result } from 'antd';
import { SmileOutlined } from '@ant-design/icons';

function Dashboard() {
  const title = '欢迎使用' + process.env.REACT_APP_TITLE + '系统';
  return <Result icon={<SmileOutlined />} title={title} />;
}

export default Dashboard;
