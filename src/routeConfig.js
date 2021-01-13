import {
  CarOutlined,
  CopyOutlined,
  HomeOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import get from 'lodash/get';
import paths from 'path';
import React from 'react';
import { hierarchize } from './library/hierarchical';

const keyName = 'key';
const pathName = 'path';
const uniqueKeyName = 'uniqueKey';

function pathGenerator(node, parent) {
  const parentUniqueKey = get(parent, uniqueKeyName);
  const uniqueKey = parentUniqueKey
    ? parentUniqueKey + '.' + node[keyName]
    : node[keyName];

  const parentPath = get(parent, pathName, '');
  const path = get(node, pathName, paths.join(parentPath, node[keyName]));
  node[uniqueKeyName] = uniqueKey;
  node[pathName] = path;
}

const routeConfig = hierarchize(
  {
    key: 'home',
    name: '主页',
    icon: <HomeOutlined />,
    path: '/',
    component: React.lazy(() => import('./pages/Dashboard')),
    children: [
      {
        key: 'login',
        name: 'Login',
        isPublic: true,
        isHidden: true,
        component: React.lazy(() => import('./pages/Login')),
      },
      {
        key: 'profile',
        name: '个人信息',
        isHidden: true,
      },
      {
        key: 'order',
        name: '订单',
        icon: <CopyOutlined />,
        requiredRoles: ['DISPATCH', 'ORDER_VIEW', 'ORDER_EDIT', 'ADMIN'],
        children: [
          {
            key: 'waybill',
            name: '运单',
            component: React.lazy(() => import('./pages/Order/Waybill')),
            requiredRoles: ['DISPATCH', 'ORDER_VIEW', 'ORDER_EDIT', 'ADMIN'],
          },
          {
            key: 'tracking',
            name: '跟踪表',
            component: React.lazy(() => import('./pages/Order/TrackingSheet')),
            requiredRoles: ['DISPATCH', 'TRACK_VIEW', 'ADMIN'],
          },
        ],
      },
      {
        key: 'transportation',
        name: '运输',
        icon: <CarOutlined />,
        requiredRoles: ['DISPATCH', 'CONSIGNMENT_VIEW', 'ADMIN'],
        children: [
          {
            key: 'consignment',
            name: '托运单',
            component: React.lazy(() =>
              import('./pages/Transportation/Consignment')
            ),
            requiredRoles: ['DISPATCH', 'CONSIGNMENT_VIEW', 'ADMIN'],
          },
          {
            key: 'autoConsigning',
            name: '自动发运',
            requiredRoles: ['DISPATCH', 'ADMIN'],
          },
        ],
      },
      {
        key: 'mangement',
        name: '系统管理',
        icon: <SettingOutlined />,
        requiredRoles: ['ADMIN'],
        children: [
          {
            key: 'client',
            name: '客户',
            component: React.lazy(() => import('./pages/Client')),
            requiredRoles: ['ADMIN'],
          },
          {
            key: 'supplier',
            name: '供应商',
            requiredRoles: ['ADMIN'],
          },
          {
            key: 'user',
            name: '用户',
            requiredRoles: ['ADMIN'],
          },
          {
            key: 'authority',
            name: '权限',
            requiredRoles: ['ADMIN'],
          },
        ],
      },
    ],
  },
  null,
  pathGenerator
);

export default routeConfig;
