import React from 'react';
import { Modal, Table, Typography, Button } from 'antd';
import xlsx from 'xlsx';
import { useSelector, useDispatch } from 'react-redux';

import { OrderTypeRender } from 'components/form';
import { setState, importWaybill } from './actions';

const { Text } = Typography;

const columns = [
    {
        dataIndex: 'consignorId',
        title: '*客户',
        width: 100,
    },
    {
        dataIndex: 'orderDate',
        title: '订单日期',
        width: 100,
    },
    {
        dataIndex: 'sourceOrderNumber',
        title: '*来源单号',
        width: 100,
    },
    {
        dataIndex: 'orderType',
        title: '*订单类型',
        width: 100,
        render: OrderTypeRender,
    },
    {
        dataIndex: 'fromWarehouseName',
        title: '发货仓',
        width: 120,
        ellipsis: true,
    },
    {
        dataIndex: 'fromProvince',
        title: '*发货省',
        width: 100,
        ellipsis: true,
    },
    {
        dataIndex: 'fromCity',
        title: '*发货城市',
        width: 100,
        ellipsis: true,
    },
    {
        dataIndex: 'fromArea',
        title: '*发货区/县',
        width: 100,
        ellipsis: true,
    },
    {
        dataIndex: 'fromAddress',
        title: '*发货地址',
        width: 150,
        ellipsis: true,
    },
    {
        dataIndex: 'fromContactMan',
        title: '*发货人',
        width: 100,
    },
    {
        dataIndex: 'fromContactPhone',
        title: '*发货人电话',
        width: 120,
        ellipsis: true,
    },
    {
        dataIndex: 'toWarehouseName',
        title: '收货仓',
        width: 120,
        ellipsis: true,
    },
    {
        dataIndex: 'toProvince',
        title: '*收货省',
        width: 100,
        ellipsis: true,
    },
    {
        dataIndex: 'toCity',
        title: '*收货城市',
        width: 100,
        ellipsis: true,
    },
    {
        dataIndex: 'toArea',
        title: '*收货区/县',
        width: 100,
        ellipsis: true,
    },
    {
        dataIndex: 'toAddress',
        title: '*收货地址',
        width: 150,
        ellipsis: true,
    },
    {
        dataIndex: 'toContactMan',
        title: '*收货人',
        width: 100,
    },
    {
        dataIndex: 'toContactPhone',
        title: '*收货人电话',
        width: 120,
        ellipsis: true,
    },
    {
        dataIndex: 'cargoDescription',
        title: '货物描述',
        width: 100,
        ellipsis: true,
    },
    {
        dataIndex: 'itemQuantity',
        title: '商品数量',
        width: 100,
    },
    {
        dataIndex: 'volume',
        title: '体积',
        width: 100,
    },
    {
        dataIndex: 'weight',
        title: '重量',
        width: 100,
    },
    {
        dataIndex: 'remark',
        title: '备注',
        width: 150,
        ellipsis: true,
    }
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
        dispatch(importWaybill(items));
    };

    return (
        <Modal
            title="导入运单"
            visible={visible}
            width={1200}
            okButtonProps={{
                type: 'primary',
                disabled: items.length < 1,
            }}
            okText="导入"
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
                                href="/assets/waybill_template.xlsx"
                                target="_blank">
                                下载导入模板
                            </Button>
                        </div>
                    </div>
                )}
                bordered
                rowKey="sourceOrderNumber"
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
