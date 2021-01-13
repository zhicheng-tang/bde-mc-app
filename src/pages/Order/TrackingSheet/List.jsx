import React from 'react';
import { Table } from 'antd';
import { useWindowSize } from 'react-use';
import columns from './columns';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { setState, fetchData, showDetail } from './actions';

function List() {
  const { height } = useWindowSize();
  const tableHeight = Math.max(300, height - 370);

  const dispatch = useDispatch();

  const selectedRowKeys = useSelector((state) => state.selectedKeys);

  const isFetching = useSelector((state) => state.isFetching);
  const items = useSelector((state) => state.items);
  const pagination = useSelector(
    (state) => ({
      current: state.page,
      pageSize: state.pageSize,
      total: state.totalElements,
    }),
    shallowEqual
  );

  const changePageSize = (page, pageSize) => {
    dispatch(setState({ page, pageSize }));
    dispatch(fetchData());
  };

  const finalColumns = columns.map((column) =>
    column.dataIndex === 'waybillNumber'
      ? {
          ...column,
          render: (text) => (
            <a
              href={`#${text}`}
              onClick={(e) => {
                e.preventDefault();
                dispatch(showDetail(text));
              }}>
              {text}
            </a>
          ),
        }
      : column
  );

  return (
    <Table
      tableLayout="fixed"
      rowKey="waybillNumber"
      rowSelection={{
        type: 'checkbox',
        selectedRowKeys,
        onChange: (keys) => dispatch(setState({ selectedKeys: keys })),
      }}
      columns={finalColumns}
      dataSource={items}
      loading={isFetching}
      size="middle"
      pagination={{
        ...pagination,
        position: ['bottomLeft'],
        size: 'default',
        showTotal: (n) => `总计${n}条数据`,
        onShowSizeChange: changePageSize,
        onChange: changePageSize,
        pageSizeOptions: ['50', '100', '200', '500'],
      }}
      scroll={{ x: 'max-content', y: tableHeight }}
    />
  );
}

export default List;
