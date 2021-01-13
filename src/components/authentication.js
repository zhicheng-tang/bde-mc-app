import isArray from 'lodash/isArray';
import isEmpty from 'lodash/isEmpty';
import React from 'react';
import { useSessionStorage } from 'react-use';

const defaultValues = Object.freeze({
  isAuthenticated: false,
  principal: { username: 'anonymous', roles: [] },
  login: () => {},
  logout: () => {},
});

const AUTH_STOREGE_KEY = 'authentication';

export const AuthenticationContext = React.createContext(defaultValues);

export function AuthenticationProvider({ children }) {
  const [authentication, setAuthentication] = useSessionStorage(
    AUTH_STOREGE_KEY,
    defaultValues
  );

  const login = (principal) =>
    setAuthentication({ isAuthenticated: true, principal });

  const logout = () => setAuthentication(defaultValues);

  const values = { ...authentication, login, logout };

  return (
    <AuthenticationContext.Provider value={values}>
      {children}
    </AuthenticationContext.Provider>
  );
}

export function useAuthentication() {
  return React.useContext(AuthenticationContext);
}

export function checkIsAuthorized(
  authentication = defaultValues,
  requiredRoles = []
) {
  if (authentication.isAuthenticated !== true) return false;
  if (isEmpty(requiredRoles)) return true;

  return (
    isArray(authentication.principal.roles) &&
    requiredRoles.some((item) => authentication.principal.roles.includes(item))
  );
}
