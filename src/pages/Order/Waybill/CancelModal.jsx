import React from 'react';
import { Modal, Table, Typography, Input, Form, Space, Button } from 'antd';
import {
  ScheduleStatusRender,
  TransportStatusRender,
} from '../../../components/form';
import { useSelector, useDispatch } from 'react-redux';
import { setState, cancel } from './actions';
import { getCancelModel } from './selectors';

const { Text } = Typography;
const { TextArea } = Input;

const columns = [
  {
    dataIndex: 'waybillNumber',
    title: '运单号',
    width: 120,
  },
  {
    dataIndex: 'sourceOrderNumber',
    title: '来源单号',
    width: 150,
  },
  {
    dataIndex: 'status',
    title: '运输状态',
    width: 80,
    render: TransportStatusRender,
  },
  {
    dataIndex: 'scheduleStatus',
    title: '调度状态',
    width: 80,
    render: ScheduleStatusRender,
  },
];

function CancelModal() {
  const dispatch = useDispatch();
  const model = useSelector(getCancelModel);

  const [form] = Form.useForm();

  const onFinish = ({ reason }) => {
    dispatch(
      cancel({
        reason,
        waybillNumbers: model.valid.map((item) => item.waybillNumber),
      })
    );
  };

  const visible = useSelector((state) => state.cancelModalVisible);
  const isCanceling = useSelector((state) => state.isCanceling);

  return (
    <Modal
      title="取消运单"
      visible={visible}
      width={960}
      okButtonProps={{ danger: true, disabled: model.valid.length < 1 }}
      okText="取消运单"
      cancelText="关闭窗口"
      centered={true}
      onOk={form.submit}
      confirmLoading={isCanceling}
      onCancel={() => dispatch(setState({ cancelModalVisible: false }))}
    >
      <Form form={form} onFinish={onFinish}>
        {model.invalid.length > 0 && (
          <Table
            title={() => (
              <Text strong={true}>不能取消的运单: {model.invalid.length}</Text>
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
            <Text strong={true}>待取消的运单: {model.valid.length}</Text>
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
        <Form.Item
          name="reason"
          label="取消原因"
          style={{ marginTop: '12px' }}
          rules={[
            {
              required: true,
              message: '请输入取消原因',
            },
            {
              max: 200,
              message: '最多只能输入200个字符',
            },
          ]}
          extra={
            <Space style={{ marginTop: '0.5em' }}>
              <Button
                htmlType="button"
                size="small"
                onClick={() => form.setFieldsValue({ reason: '客户通知取消' })}
              >
                客户通知取消
              </Button>
              <Button
                htmlType="button"
                size="small"
                onClick={() =>
                  form.setFieldsValue({ reason: '运单超出业务范围' })
                }
              >
                运单超出业务范围
              </Button>
              <Button
                htmlType="button"
                size="small"
                onClick={() => form.setFieldsValue({ reason: '运单录入错误' })}
              >
                运单录入错误
              </Button>
            </Space>
          }
        >
          <TextArea placeholder="请输入取消运单的原因" />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default CancelModal;
