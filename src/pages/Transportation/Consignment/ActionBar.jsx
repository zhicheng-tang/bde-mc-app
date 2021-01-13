import {
  DeleteOutlined,
  DownloadOutlined,
  PlusOutlined,
  PrinterOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { Button } from 'antd';
import Authorized from 'components/Authorized';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { exportData, setState } from './actions';

function ActionBar() {
  const dispatch = useDispatch();
  const selectedItemsCount = useSelector((state) => state.selectedKeys.length);

  return (
    <div className="actions">
      <Authorized requiredRoles={['DISPATCH']}>
        <Button htmlType="button">
          <PlusOutlined />
          新增
        </Button>
        <Button
          htmlType="button"
          onClick={() => dispatch(setState({ importModalVisible: true }))}>
          <UploadOutlined />
          导入
        </Button>
      </Authorized>
      <Button htmlType="button" onClick={() => dispatch(exportData())}>
        <DownloadOutlined />
        导出
      </Button>
      <Button htmlType="button" disabled={selectedItemsCount < 1}>
        <PrinterOutlined />
        打印
      </Button>
      <Authorized requiredRoles={['DISPATCH']}>
        <Button
          htmlType="button"
          type="danger"
          onClick={() => dispatch(setState({ cancelModalVisible: true }))}
          disabled={selectedItemsCount < 1}>
          <DeleteOutlined />
          取消
        </Button>
      </Authorized>
    </div>
  );
}

export default ActionBar;
