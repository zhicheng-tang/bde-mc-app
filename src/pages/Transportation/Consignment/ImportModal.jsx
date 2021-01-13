import React from 'react';
import { Modal, Table, Typography, Button } from 'antd';
import xlsx from 'xlsx';
import { useSelector, useDispatch } from 'react-redux';

import { CarrierRender } from 'components/form';
import { setState, importConsignment } from './actions';

const { Text } = Typography;

const columns = [
  {
    dataIndex: 'waybillNumber',
    title: '运单号',
    width: 120,
  },
  {
    dataIndex: 'carrierId',
    title: '承运商',
    width: 120,
    render: CarrierRender,
  },
  {
    dataIndex: 'consignmentNumber',
    title: '托运单号',
    width: 150,
  },
  {
    dataIndex: 'shippingRemark',
    title: '发运备注',
    width: 300,
    ellipsis: true,
  },
];

function mapRowToItem(row) {
  if (row) {
    const item = {};
    columns.forEach((column) => {
      item[column.dataIndex] = row[column.title];
      item.thoroughly = true;
    });

    return item;
  }
  return null;
}

function ImportModal() {
  const dispatch = useDispatch();

  const visible = useSelector((state) => state.importModalVisible);
  const isImporting = useSelector((state) => state.isImporting);

  const [items, setItems] = React.useState([]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const workbook = xlsx.read(e.target.result, { type: 'binary' });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const rows = xlsx.utils.sheet_to_json(sheet, { header: 0 });
        if (rows && rows.length > 0) {
          const newItems = rows
            .map(mapRowToItem)
            .filter((item) => item !== null && item !== undefined);
          setItems(newItems);
        }
      };

      reader.readAsBinaryString(file);
    }
  };

  const handleSubmit = () => {
    dispatch(importConsignment(items));
  };

  return (
    <Modal
      title="导入托运单"
      visible={visible}
      width={1200}
      okButtonProps={{
        type: 'primary',
        disabled: items.length < 1,
      }}
      okText="发运"
      centered={true}
      confirmLoading={isImporting}
      onOk={handleSubmit}
      onCancel={() => dispatch(setState({ importModalVisible: false }))}>
      <Table
        title={() => (
          <div
            style={{
              display: 'flex',
              justifyContent: 'flexStart',
              alignItems: 'center',
            }}>
            <Text strong={true}>
              待导入的数据：
              <input
                type="file"
                multiple={false}
                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                onChange={handleFileChange}
              />
            </Text>
            <div
              style={{
                alignSelf: 'flex-end',
                flexGrow: 1,
                textAlign: 'right',
              }}>
              <Button
                size="small"
                type="primary"
                href="/assets/consignment_template.xlsx"
                target="_blank">
                下载发运模板
              </Button>
            </div>
          </div>
        )}
        bordered
        rowKey="waybillNumber"
        size="small"
        tableLayout="fixed"
        columns={columns}
        pagination={false}
        scroll={{ y: 500 }}
        dataSource={items}
      />
    </Modal>
  );
}

export default ImportModal;
