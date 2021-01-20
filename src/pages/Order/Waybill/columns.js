import {
  OrderTypeRender,
  ScheduleStatusRender,
  TransportStatusRender,
  ClientRender
} from 'components/form';

export default [
  {
    dataIndex: 'clientId',
    title: '客户',
    width: 100,
    fixed: 'left',
    render: ClientRender,
  },
  {
    dataIndex: 'orderDate',
    title: '订单日期',
    width: 160,
    fixed: 'left',
  },
  {
    dataIndex: 'waybillNumber',
    title: '运单号',
    width: 120,
    fixed: 'left',
  },
  {
    dataIndex: 'originNumber',
    title: '来源单号',
    width: 150,
    ellipsis: true,
  },
  {
    dataIndex: 'status',
    title: '运输状态',
    width: 90,
    render: TransportStatusRender,
  },
  {
    dataIndex: 'orderType',
    title: '订单类型',
    width: 100,
    render: OrderTypeRender,
  },
  {
    dataIndex: 'itemQty',
    title: '商品数量',
    width: 90,
  },
  {
    dataIndex: 'itemDescription',
    title: '货物描述',
    width: 120,
    ellipsis: true,
  },
  {
    dataIndex: 'fromStoreName',
    title: '发货门店',
    width: 200,
    ellipsis: true,
  },
  {
    dataIndex: 'fromProvince',
    title: '发货省',
    width: 120,
    ellipsis: true,
  },
  {
    dataIndex: 'fromCity',
    title: '发货城市',
    width: 120,
    ellipsis: true,
  },
  {
    dataIndex: 'fromArea',
    title: '发货区县',
    width: 120,
    ellipsis: true,
  },
  {
    dataIndex: 'fromAddress',
    title: '发货地址',
    width: 300,
    ellipsis: true,
  },
  {
    dataIndex: 'fromContactMan',
    title: '发货人',
    width: 120,
    ellipsis: true,
  },
  {
    dataIndex: 'fromContactPhone',
    title: '发货人电话',
    width: 120,
    ellipsis: true,
  },
  {
    dataIndex: 'toStoreName',
    title: '收货门店',
    width: 200,
    ellipsis: true,
  },
  {
    dataIndex: 'toProvince',
    title: '收货省',
    width: 120,
    ellipsis: true,
  },
  {
    dataIndex: 'toCity',
    title: '收货城市',
    width: 120,
    ellipsis: true,
  },
  {
    dataIndex: 'toArea',
    title: '收货区县',
    width: 120,
    ellipsis: true,
  },
  {
    dataIndex: 'toAddress',
    title: '收货地址',
    width: 300,
    ellipsis: true,
  },
  {
    dataIndex: 'toContactMan',
    title: '收货人',
    width: 120,
  },
  {
    dataIndex: 'toContactPhone',
    title: '收货人电话',
    width: 120,
  },
  {
    dataIndex: 'createdBy',
    title: '创建人',
    width: 120,
  },
  {
    dataIndex: 'createdTime',
    title: '创建时间',
    width: 160,
    sorter: true,
  },
  {
    dataIndex: 'remark',
    title: '备注',
    width: 300,
    ellipsis: true,
  },
];
