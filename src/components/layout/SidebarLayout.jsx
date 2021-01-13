import React from 'react';
import { Layout } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useLocalStorage } from 'react-use';
import styles from './SidebarLayout.module.less';
import HeaderMenu from './HeaderMenu';
import SideMenu from './SideMenu';
import logo from '../../assets/logo.svg';

const { Header, Content, Sider } = Layout;

function SidebarLayout({ children }) {
  const [collapsed, setCollapsed] = useLocalStorage('sidebar_collapsed', false);
  const toogle = () => setCollapsed(!collapsed);
  return (
    <Layout className={styles.root}>
      <Sider
        collapsible
        collapsed={collapsed}
        trigger={null}
        width={250}
        style={{ height: '100vh' }}>
        <div className={styles.logo} id="logo">
          <Link to="/">
            <img src={logo} alt="logo" />
            <h1>{process.env.REACT_APP_TITLE}</h1>
          </Link>
        </div>
        <SideMenu />
      </Sider>
      <Layout>
        <Header className={styles.header}>
          <div className={styles.trigger} onClick={toogle}>
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </div>
          <HeaderMenu />
        </Header>
        <Content className={styles.content}>{children}</Content>
      </Layout>
    </Layout>
  );
}

export default SidebarLayout;
