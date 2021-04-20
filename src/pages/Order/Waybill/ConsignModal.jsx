import React from 'react';
import { Table, Modal, Form, Typography } from 'antd';
import {
  CarrierSelector, ClientRender,
  ScheduleStatusRender,
  TransportStatusRender,
} from 'components/form';
import { useSelector, useDispatch } from 'react-redux';
import { setState, consignExpress } from './actions';
import { getConsignModel } from './selectors';

const { Text } = Typography;

const columns = [
  {
    dataIndex: 'clientId',
    title: '客户',
    width: 100,
    fixed: 'left',
    render: ClientRender,
  },
  {
    dataIndex: 'waybillNumber',
    title: '运单号',
    width: 120,
  },
  {
    dataIndex: 'originNumber',
    title: '来源单号',
    width: 150,
  },
  {
    dataIndex: 'status',
    title: '运输状态',
    width: 80,
    render: TransportStatusRender,
  },
];

const formItemColProps = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

function ConsignModal() {
  const dispatch = useDispatch();

  const visible = useSelector((state) => state.consignModalVisible);
  const isConsigning = useSelector((state) => state.isConsigning);
  const model = useSelector(getConsignModel);

  const [form] = Form.useForm();
  const productArr = useSelector((state) => state.productArr);
  const handleConsigning = ({ carrierId }) => {
    let params;
    productArr.map(v=>{
      if (carrierId==v.productId){
        params = {
          logisticsId:v.logisticsId,
          productId:carrierId
        }
      }
    })
    params.waybillNumbers =  model.valid.map((item) => item.waybillNumber);
    dispatch(
      consignExpress({
        ...params
        // carrierId,
        // waybillNumbers: model.valid.map((item) => item.waybillNumber),
      })
    );
  };

  return (
    <Modal
      width={960}
      visible={visible}
      title="发运, 线上电子面单模式"
      onOk={form.submit}
      okButtonProps={{ type: 'primary', disabled: model.valid.length < 1 }}
      okText="发运, 获取电子面单"
      centered={true}
      confirmLoading={isConsigning}
      onCancel={() => dispatch(setState({ consignModalVisible: false }))}>
      <Form initialValues={model} form={form} onFinish={handleConsigning}>
        <div style={{ width: 600 }}>
          <Form.Item
            {...formItemColProps}
            name="carrierId"
            label="承运商产品"
            rules={[
              {
                required: true,
                message: '请选择承运商',
              },
            ]}
            extra="支持电子面单模式的承运商">
            <CarrierSelector isOnlineMode={true} />
          </Form.Item>
        </div>

        {model.invalid.length > 0 && (
          <Table
            title={() => (
              <Text strong={true}>不能发运的运单: {model.invalid.length}</Text>
            )}
            bordered
            style={{ marginBottom: '1em' }}
            rowKey="waybillNumber"
            size="small"
            tableLayout="fixed"
            scroll={{ y: 160 }}
            columns={[
              ...columns,
              {
                dataIndex: 'message',
                title: '消息',
                render: (text) => <Text type="danger">{text}</Text>,
              },
            ]}
            pagination={false}
            dataSource={model.invalid}
          />
        )}

        <Table
          title={() => (
            <Text strong={true}>待发运的运单: {model.valid.length}</Text>
          )}
          bordered
          rowKey="waybillNumber"
          size="small"
          tableLayout="fixed"
          columns={[
            ...columns,
            {
              dataIndex: 'message',
              title: '消息',
            },
          ]}
          pagination={false}
          scroll={{ y: 300 }}
          dataSource={model.valid}
        />
      </Form>
    </Modal>
  );
}

export default ConsignModal;
