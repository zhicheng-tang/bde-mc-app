import React from 'react';
import {Button, Form, Input, Modal, Space, Table, Typography} from 'antd';
import {CarrierRender, TransportStatusRender} from '../../../components/form';
import {useDispatch, useSelector} from 'react-redux';
import {cancel, setState} from './actions';
import {getCancelModel} from './selectors';

const {Text} = Typography;
const {TextArea} = Input;

const columns = [
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
        dataIndex: 'status',
        title: '运输状态',
        width: 120,
        render: TransportStatusRender,
    },
];

function CancelModal() {
    const dispatch = useDispatch();
    const model = useSelector(getCancelModel);

    const [form] = Form.useForm();

    const onFinish = ({reason}) => {
        dispatch(
            cancel({
                reason,
                consignmentIds: model.valid.map((item) => item.consignmentId),
            })
        );
    };

    const visible = useSelector((state) => state.cancelModalVisible);
    const isCanceling = useSelector((state) => state.isCanceling);

    return (
        <Modal
            title="取消发运"
            visible={visible}
            width={960}
            okButtonProps={{danger: true, disabled: model.valid.length < 1}}
            okText="取消发运"
            cancelText="关闭窗口"
            centered={true}
            onOk={form.submit}
            confirmLoading={isCanceling}
            onCancel={() => dispatch(setState({cancelModalVisible: false}))}>
            <Form form={form} onFinish={onFinish}>
                {model.invalid.length > 0 && (
                    <Table
                        title={() => (
                            <Text strong={true}>
                                不能取消的托运单: {model.invalid.length}
                            </Text>
                        )}
                        bordered
                        style={{marginBottom: '1em'}}
                        rowKey="consignmentId"
                        size="small"
                        tableLayout="fixed"
                        scroll={{y: 160}}
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
                        <Text strong={true}>待取消的托运单: {model.valid.length}</Text>
                    )}
                    bordered
                    rowKey="consignmentId"
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
                    scroll={{y: 300}}
                    dataSource={model.valid}
                />
                <Form.Item
                    name="reason"
                    label="取消原因"
                    style={{marginTop: '12px'}}
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
                        <Space style={{marginTop: '0.5em'}}>
                            <Button
                                htmlType="button"
                                size="small"
                                onClick={() => form.setFieldsValue({reason: '发运操作错误'})}>
                                发运操作错误
                            </Button>
                            <Button
                                htmlType="button"
                                size="small"
                                onClick={() =>
                                    form.setFieldsValue({
                                        reason: '托运单超出业务范围，无法运输',
                                    })
                                }>
                                托运单超出业务范围
                            </Button>
                        </Space>
                    }>
                    <TextArea placeholder="请输入取消运单的原因"/>
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default CancelModal;
