import {createAction} from '@reduxjs/toolkit';
import {message} from 'antd';
import axios from 'axios';
import get from 'lodash/get';
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
    const msg =
        get(error, 'response.data.message') ||
        get(error, 'message') ||
        error.toString();
    message.error(msg);
}

export function fetchData() {
    return async (dispatch, getState) => {
        const query = getQuery(getState());
        dispatch(setState({isFetching: true}));
        try {
            const {
                data: {totalElements, content},
            } = await axios.post('/api/consignment/query', query);
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
            const {data: {success, message, content}} = await axios.post('/api/consignment/cancel', requestData);
            if (success) {
                dispatch(setState({isCanceling: false, cancelModalVisible: false}));
                dispatch(fetchData());

                const cancelFail = [];
                content.forEach((item) => {
                    if (!item.success) {
                        cancelFail.push(item.consignmentNumber);
                    }
                });
                if (cancelFail != null && cancelFail.length > 0) {
                    showSuccess(cancelFail + '取消失败！');
                } else {
                    showSuccess('取消成功！');
                }
            } else {
                dispatch(setState({isCanceling: false}));
                showError(message);
            }
        } catch (ex) {
            dispatch(setState({isCanceling: false}));
            showError(ex);
        }
    };
}

function showSuccess(content) {
    message.success(content);
}

function mapToExportItem(item) {
    const dataItem = {};

    columns.forEach((column) => {
        dataItem[column.title] = item[column.dataIndex];
    });

    return dataItem;
}

export function exportData() {
    return async (dispatch, getState) => {
        dispatch(setState({isFetching: true}));

        const query = getQuery(getState());
        try {
            const {
                data: {content = []},
            } = await axios.post('/api/consignment/query', {
                ...query,
                page: 1,
                pageSize: 20000,
            });
            dispatch(setState({isFetching: false}));

            if (content && content.length > 0) {
                const exportData = content.map(mapToExportItem);
                const wb = xlsx.utils.book_new();
                const ws = xlsx.utils.json_to_sheet(exportData);
                xlsx.utils.book_append_sheet(wb, ws, 'consignments');
                return xlsx.writeFile(wb, 'consignment_export.xlsx');
            }
        } catch (ex) {
            dispatch(setState({isFetching: false}));
            showError(ex);
        }
    };
}

export function importConsignment(items) {
    return async (dispatch) => {
        dispatch(setState({isImporting: true}));

        try {
            await axios.post('/api/consignment/batchConsign', items);
            dispatch(setState({isImporting: false, importModalVisible: false}));
            dispatch(fetchData());
            message.success('导入托运单成功');
        } catch (ex) {
            dispatch(setState({isImporting: false}));
            showError(ex);
        }
    };
}
