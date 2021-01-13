import React from 'react';
import { checkIsAuthorized, useAuthentication } from './authentication';

function Authorized({ requiredRoles = [], children }) {
  const authentication = useAuthentication();
  const isAuthorized = checkIsAuthorized(authentication, requiredRoles);
  return isAuthorized ? <React.Fragment>{children}</React.Fragment> : null;
}

export default Authorized;
