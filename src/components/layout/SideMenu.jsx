import { FolderOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import isArray from 'lodash/isArray';
import memoize from 'lodash/memoize';
import React from 'react';
import { Link, matchPath, useLocation } from 'react-router-dom';
import { findNode, getParents } from '../../library/hierarchical';
import routeConfig from '../../routeConfig';
import { checkIsAuthorized, useAuthentication } from '../authentication';

function isVisible(route, authentication) {
  return (
    route.isHidden !== true &&
    checkIsAuthorized(authentication, route.requiredRoles)
  );
}

function hasVisibleChildren(route, authentication) {
  return (
    isArray(route.children) &&
    route.children.filter((it) => isVisible(it, authentication)).length > 0
  );
}

function findRoute(pathname) {
  const matcher = (route) => {
    const match = matchPath(pathname, route);
    return match && match.isExact;
  };
  const current = findNode(routeConfig, matcher);
  const paths = current ? getParents(current) : [];
  return {
    current,
    paths,
  };
}

function renderRoutes(routes, authentication) {
  return routes
    .filter((it) => isVisible(it, authentication))
    .map((route) => {
      if (isArray(route.children)) {
        if (hasVisibleChildren(route, authentication)) {
          return (
            <Menu.SubMenu
              key={route.uniqueKey}
              title={
                <span>
                  {route.icon ? route.icon : <FolderOutlined />}
                  <span>{route.name}</span>
                </span>
              }>
              {renderRoutes(route.children, authentication)}
            </Menu.SubMenu>
          );
        } else return null;
      } else {
        return (
          <Menu.Item key={route.key}>
            <Link to={route.path}>
              <span>{route.name}</span>
            </Link>
          </Menu.Item>
        );
      }
    });
}

const memoFindRoute = memoize(findRoute);

export default function SideMenu() {
  const location = useLocation();
  const { current, paths } = memoFindRoute(location.pathname);
  const defaultOpenKeys =
    paths.length > 0 ? paths.slice(0, -1).map((item) => item.uniqueKey) : [];
  const defaultSelectedKeys = current ? current.uniqueKey : undefined;

  const authentication = useAuthentication();
  const memoRender = React.useCallback(
    (routes) => renderRoutes(routes, authentication),
    [authentication]
  );

  return (
    <Menu
      key="Menu"
      mode="inline"
      theme="dark"
      defaultOpenKeys={defaultOpenKeys}
      defaultSelectedKeys={defaultSelectedKeys}>
      {memoRender(routeConfig.children)}
    </Menu>
  );
}
