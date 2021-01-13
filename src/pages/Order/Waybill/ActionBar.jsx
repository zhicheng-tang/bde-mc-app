import {
  DeleteOutlined,
  DownloadOutlined,
  DownOutlined,
  ExportOutlined,
  PlusOutlined,
  PrinterOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { Button, Dropdown, Menu } from 'antd';
import Authorized from 'components/Authorized';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { exportData, setState } from './actions';

function ActionBar() {
  const dispatch = useDispatch();
  const selectedItemsCount = useSelector((state) => state.selectedKeys.length);
  const consignMenu = (
    <Menu>
      <Menu.Item
        disabled={selectedItemsCount < 1}
        onClick={() => dispatch(setState({ consignModalVisible: true }))}>
        发运: 电子面单模式
      </Menu.Item>
      <Menu.Item disabled>发运: 线下模式</Menu.Item>
    </Menu>
  );

  return (
    <div className="actions">
      <Authorized requiredRoles={['ORDER_EDIT']}>
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
      <Authorized requiredRoles={['ORDER_EDIT']}>
        <Button
          htmlType="button"
          type="danger"
          onClick={() => dispatch(setState({ cancelModalVisible: true }))}
          disabled={selectedItemsCount < 1}>
          <DeleteOutlined />
          取消
        </Button>
      </Authorized>
      <Authorized requiredRoles={['DISPATCH']}>
        <Dropdown overlay={consignMenu} trigger={['click']}>
          <Button htmlType="button" type="primary">
            <ExportOutlined /> 发运 <DownOutlined />
          </Button>
        </Dropdown>
      </Authorized>
    </div>
  );
}

export default ActionBar;
