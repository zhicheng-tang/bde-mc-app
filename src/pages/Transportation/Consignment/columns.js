import {CarrierRender, TransportStatusRender} from '../../../components/form';

export default [
    {
        dataIndex: 'carrierId',
        title: '承运商',
        width: 100,
        fixed: true,
        render: CarrierRender,
    },
    {
        dataIndex: 'consignmentNumber',
        title: '托运单号',
        width: 150,
        fixed: true,
    },
    {
        dataIndex: 'logisticsProductName',
        title: '运输方式',
        width: 120,
        fixed: true,
    },
    {
        dataIndex: 'logisticsAccount',
        title: '月结账号',
        width: 120,
        fixed: true,
    },
    {
        dataIndex: 'status',
        title: '运输状态',
        width: 90,
        render: TransportStatusRender,
        fixed: true,
    },
    {
        dataIndex: 'createdTime',
        title: '发运时间',
        width: 160,
    },
    {
        dataIndex: 'createdBy',
        title: '发运人',
        width: 90,
        ellipsis: true,
    },
    {
        dataIndex: 'lastTrackTime',
        title: '最后跟踪操作时间',
        width: 160,
        ellipsis: true,
    },
    {
        dataIndex: 'lastTrackMessage',
        title: '最后跟踪信息',
        width: 300,
        ellipsis: true,
    },
    {
        dataIndex: 'collectedTime',
        title: '揽收时间',
        width: 160,
    },
    {
        dataIndex: 'packageQty',
        title: '揽收件数',
        width: 90,
    },
    {
        dataIndex: 'collectedBy',
        title: '揽收人',
        width: 90,
        ellipsis: true,
    },
    {
        dataIndex: 'deliveryTime',
        title: '派送时间',
        width: 160,
        ellipsis: true,
    },
    {
        dataIndex: 'deliveryMan',
        title: '派送人',
        width: 90,
        ellipsis: true,
    },
    {
        dataIndex: 'signedTime',
        title: '签收时间',
        width: 160,
        ellipsis: true,
    },
    {
        dataIndex: 'signedBy',
        title: '签收人',
        width: 90,
        ellipsis: true,
    },
];
