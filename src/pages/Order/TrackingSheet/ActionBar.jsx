import { DownloadOutlined, UploadOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import Authorized from 'components/Authorized';
import React from 'react';
import { useDispatch } from 'react-redux';
import { exportData } from './actions';

function ActionBar() {
  const dispatch = useDispatch();

  return (
    <div className="actions">
      <Authorized requiredRoles={['DISPATCH', 'ORDER_EDIT']}>
        <Button htmlType="button">
          <UploadOutlined /> 导入
        </Button>
      </Authorized>
      <Button htmlType="button" onClick={() => dispatch(exportData())}>
        <DownloadOutlined />
        导出
      </Button>
    </div>
  );
}

export default ActionBar;
