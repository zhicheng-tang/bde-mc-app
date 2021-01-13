import {createAction} from '@reduxjs/toolkit';
import {message} from 'antd';
import axios from 'axios';
import xlsx from 'xlsx';
import columns from './columns';

export const setState = createAction('SET_STATE');

const getQuery = ({page, pageSize, filter, sortBy} = {}) => ({
    page,
    pageSize,
    filter,
    sortBy,
});

function showError(error) {
    message.error(error.message || error.toString());
}

export function fetchData() {
    return async (dispatch, getState) => {
        const query = getQuery(getState());
        // console.log(query);
        dispatch(setState({isFetching: true}));
        try {
            const {
                data: {totalElements, content},
            } = await axios.post('/api/waybill/query', query);
            dispatch(
                setState({
                    totalElements,
                    items: content,
                    isFetching: false,
                    selectedKeys: [],
                })
            );
        } catch (ex) {
            dispatch(setState({isFetching: false}));
            showError(ex);
        }
    };
}

export function cancel(requestData) {
    return async (dispatch) => {
        dispatch(setState({isCanceling: true}));

        try {
            await axios.post('/api/waybill/cancel', requestData);
            dispatch(setState({isCanceling: false, cancelModalVisible: false}));
            dispatch(fetchData());
            message.success('取消运单成功！');
        } catch (ex) {
            dispatch(setState({isCanceling: false}));
            showError(ex);
        }
    };
}

export function consignExpress(requestData) {
    return async (dispatch) => {
        dispatch(setState({isConsigning: true}));

        try {
            const {data: {success, message}} = await axios.post('/api/waybill/consignExpress', requestData);
            if (success) {
                dispatch(setState({isConsigning: false, consignModalVisible: false}));
                dispatch(fetchData());
                showSuccess('发运成功！');
            } else {
                dispatch(setState({isConsigning: false}));
                showError(message);
            }
        } catch (ex) {
            dispatch(setState({isConsigning: false}));
            showError(ex);
        }
    };
}

function mapToExportItem(item) {
    const dataItem = {};

    columns.forEach((column) => {
        dataItem[column.title] = item[column.dataIndex];
    });

    delete dataItem['发运重量'];
    return dataItem;
}

export function exportData() {
    return async (dispatch, getState) => {
        dispatch(setState({isFetching: true}));

        const query = getQuery(getState());
        try {
            const {
                data: {content = []},
            } = await axios.post('/api/waybill/query', {
                ...query,
                page: 1,
                pageSize: 20000,
            });
            dispatch(setState({isFetching: false}));

            if (content && content.length > 0) {
                const exportData = content.map(mapToExportItem);
                const wb = xlsx.utils.book_new();
                const ws = xlsx.utils.json_to_sheet(exportData);
                xlsx.utils.book_append_sheet(wb, ws, 'waybills');
                return xlsx.writeFile(wb, 'waybill_export.xlsx');
            }
        } catch (ex) {
            dispatch(setState({isFetching: false}));
            showError(ex);
        }
    };
}

export function showDetail(detailId) {
    return (dispatch) => {
        dispatch(setState({detailModalVisible: true, detailId: detailId}));
    };
}

export function importWaybill(items) {
    return async (dispatch) => {
        dispatch(setState({isImporting: true}));
        try {
            const {data: {success, message},} = await axios.post('/api/waybill/importWaybill', items);
            if (success) {
                dispatch(setState({isImporting: false, importModalVisible: false}));
                dispatch(fetchData());
                showSuccess('导入成功！');
            } else {
                dispatch(setState({isImporting: false}));
                showError(message);
            }
        } catch (ex) {
            dispatch(setState({isImporting: false}));
            showError(ex);
        }
    };
}

function showSuccess(content) {
    message.success(content);
}