import React from 'react';
import {Button, Form, Input} from 'antd';
import {SearchOutlined} from '@ant-design/icons';
import {CarrierSelector, DateRangePicker, TransportStatusSelector, TypedInput,} from '../../../components/form';
import {useDispatch, useSelector} from 'react-redux';
import {fetchData, setState} from './actions';

const formItemColProps = {
    labelCol: {span: 6},
    wrapperCol: {span: 18},
};

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
            {/*<Form.Item {...formItemColProps} name="carrierId" label="承运商">*/}
            {/*    <CarrierSelector/>*/}
            {/*</Form.Item>*/}
            <Form.Item {...formItemColProps} name="carrierId" label="发运产品">
                <CarrierSelector/>
            </Form.Item>
            <Form.Item  name="consignmentNumber" label="托运单号">
                <Input/>
            </Form.Item>
            <Form.Item {...formItemColProps} name="createdDate" label="发运日期">
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
