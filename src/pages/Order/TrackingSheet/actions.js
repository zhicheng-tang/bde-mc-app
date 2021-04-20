import { createAction } from '@reduxjs/toolkit';
import { message } from 'antd';
import axios from 'axios';
import xlsx from 'xlsx';
import columns from './columns';

export const setState = createAction('SET_STATE');

const getQuery = ({ page, pageSize, filter, sortBy } = {}) => ({
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
    dispatch(setState({ isFetching: true }));
    const query = getQuery(getState());

    try {
      const {data:userArr} = await axios.post('/api/client/getAll');
      const {data:productArr} = await axios.post('/api/logistics/product/getAll');
      const {
        data: { totalElements, content },
      } = await axios.post('/api/waybill/tracking/query', query);
      dispatch(
        setState({
          totalElements,
          items: content,
          isFetching: false,
          selectedKeys: [],
          userArr,
          productArr,
        })
      );
    } catch (ex) {
      dispatch(setState({ isFetching: false }));
      showError(ex);
    }
  };
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
    dispatch(setState({ isFetching: true }));

    const query = getQuery(getState());
    try {
      const {
        data: { content = [] },
      } = await axios.post('/api/waybill/tracking/query', {
        ...query,
        page: 1,
        pageSize: 20000,
      });
      dispatch(setState({ isFetching: false }));

      if (content && content.length > 0) {
        const exportData = content.map(mapToExportItem);
        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(exportData);
        xlsx.utils.book_append_sheet(wb, ws, 'tracking_sheet');
        return xlsx.writeFile(wb, 'tracking_sheet_export.xlsx');
      }
    } catch (ex) {
      dispatch(setState({ isFetching: false }));
      showError(ex);
    }
  };
}

export function showDetail(detailId) {
  return (dispatch) => {
    dispatch(setState({ detailModalVisible: true, detailId: detailId }));
  };
}
