import React from 'react';
import { useAuthentication } from '../authentication';
import SidebarLayout from './SidebarLayout';
import BlankLayout from './BlankLayout';

export function AutoSwitchLayout({ children }) {
  const { isAuthenticated } = useAuthentication();
  const Layout = isAuthenticated ? SidebarLayout : BlankLayout;

  return <Layout>{children}</Layout>;
}
