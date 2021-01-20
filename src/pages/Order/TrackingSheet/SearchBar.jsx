import {SearchOutlined} from '@ant-design/icons';
import {Button, Form} from 'antd';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
    CarrierSelector,
    ClientSelector,
    DateRangePicker,
    DistrictSelector,
    OrderTypeSelector,
    TransportStatusSelector,
    TypedInput,
} from '../../../components/form';
import {fetchData, setState} from './actions';

const formItemColProps = {
    labelCol: {span: 6},
    wrapperCol: {span: 18},
};

const orderNumberOptions = [
    {label: '运单号', value: 'waybillNumber'},
    {label: '来源单号', value: 'originNumber'},
    {label: '托运单号', value: 'consignmentNumber'},
];

const keywordOptions = [
    {label: '发货门店', value: 'fromStoreName'},
    {label: '发货人', value: 'fromContactMan'},
    {label: '发货地址', value: 'fromAddress'},
    {label: '发货人电话', value: 'fromContactPhone'},
    {label: '收货门店', value: 'toStoreName'},
    {label: '收货地址', value: 'toAddress'},
    {label: '收货人', value: 'toContactMan'},
    {label: '收货人电话', value: 'toContactPhone'},
];

function SearchBar() {
    const dispatch = useDispatch();
    const filter = useSelector((state) => state.filter);
    const isFetching = useSelector((state) => state.isFetching);

    const onFinish = (values) => {
        dispatch(setState({filter: values, page: 1}));
        dispatch(fetchData());
    };

    return (
        <Form
            className="search"
            initialValues={filter}
            size="small"
            onFinish={onFinish}>
            <Form.Item {...formItemColProps} name="clientId" label="客户">
                <ClientSelector/>
            </Form.Item>
            <Form.Item {...formItemColProps} name="orderType" label="订单类型">
                <OrderTypeSelector/>
            </Form.Item>
            <Form.Item {...formItemColProps} name="carrierId" label="承运商">
                <CarrierSelector/>
            </Form.Item>
            <Form.Item {...formItemColProps} name="fromDistrictCode" label="发货地">
                <DistrictSelector/>
            </Form.Item>
            <Form.Item {...formItemColProps} name="toDistrictCode" label="收货地">
                <DistrictSelector/>
            </Form.Item>
            <Form.Item {...formItemColProps} name="orderDate" label="订单日期">
                <DateRangePicker style={{width: '100%'}} format="YYYY-MM-DD"/>
            </Form.Item>
            <Form.Item {...formItemColProps} name="status" label="运输状态">
                <TransportStatusSelector
                    mode="multiple"
                    maxTagCount={2}
                    removeIcon={null}
                    maxTagPlaceholder={<span>...</span>}
                />
            </Form.Item>
            <Form.Item {...formItemColProps} name="orderNumber" label="单号">
                <TypedInput selectOptions={orderNumberOptions}/>
            </Form.Item>
            <Form.Item {...formItemColProps} name="keyword" label="关键字">
                <TypedInput
                    selectOptions={keywordOptions}
                    selectProps={{style: {minWidth: '8em'}}}
                />
            </Form.Item>
            <div className="form-actions">
                <Button
                    type="primary"
                    htmlType="submit"
                    loading={isFetching}
                    icon={<SearchOutlined/>}>
                    搜索
                </Button>
            </div>
        </Form>
    );
}

export default SearchBar;
