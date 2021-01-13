import { Alert } from 'antd';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useTitle } from 'react-use';
import { checkIsAuthorized, useAuthentication } from '../authentication';

const { ErrorBoundary } = Alert;

export default function AuthorizedRoute({
  id,
  path,
  exact,
  strict,
  requiredRoles,
  isPublic,
  name,
  children,
  ...rest
}) {
  const authentication = useAuthentication();
  const authorized =
    isPublic === true || checkIsAuthorized(authentication, requiredRoles);
  return (
    <Route
      {...rest}
      key={id}
      path={path}
      exact={exact}
      strict={strict}
      render={({ location }) =>
        authorized ? (
          <PageWrapper name={name}>{children}</PageWrapper>
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

function PageWrapper({ name, children }) {
  const title = name
    ? name + ' - ' + process.env.REACT_APP_TITLE
    : process.env.REACT_APP_TITLE;
  useTitle(title);
  return <ErrorBoundary>{children}</ErrorBoundary>;
}
