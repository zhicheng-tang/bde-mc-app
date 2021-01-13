import flattenDeep from 'lodash/flattenDeep';
import isArray from 'lodash/isArray';
import isNil from 'lodash/isNil';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AuthorizedRoute from './AuthorizedRoute';
import ComingSoon from './ComingSoon';
import NoMatch from './NoMatch';
import RouteIndex from './RouteIndex';

function mapConfigToRoutes(config) {
  const isGroup = isArray(config.children);
  const PageComponent = isNil(config.component)
    ? isGroup
      ? RouteIndex
      : ComingSoon
    : config.component;

  const routeComponent = (
    <AuthorizedRoute
      key={config.uniqueKey}
      name={config.name}
      path={config.path}
      exact={config.exact || isArray(config.children)}
      strict={config.strict}
      requiredRoles={config.requiredRoles}
      isPublic={config.isPublic}>
      <PageComponent route={config} />
    </AuthorizedRoute>
  );

  const childComponents = isGroup ? config.children.map(mapConfigToRoutes) : [];
  return [routeComponent, ...childComponents];
}

export function renderRouteConfig(config) {
  const routeComponents = mapConfigToRoutes(config);
  const flatRouteComponents = flattenDeep(routeComponents);
  return (
    <Switch>
      {flatRouteComponents}
      <Route path="*">
        <NoMatch />
      </Route>
    </Switch>
  );
}
