import React from 'react';
import { Spin, Menu, Avatar, Tooltip, Dropdown } from 'antd';
import {
  UserOutlined,
  LogoutOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import styles from './HeaderMenu.module.less';
import { useAuthentication } from '../authentication';

function HeaderMenu() {
  const { isAuthenticated, principal, logout } = useAuthentication();

  const menu = (
    <Menu className={styles.menu} selectedKeys={[]}>
      <Menu.Item key="profile">
        <Link to="/profile">
          <UserOutlined />
          <span>用户</span>
        </Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" onClick={logout}>
        <LogoutOutlined />
        <span>退出</span>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className={styles.right}>
      <Tooltip title="帮助">
        <Link to="/help" className={styles.action}>
          <QuestionCircleOutlined />
        </Link>
      </Tooltip>

      {isAuthenticated ? (
        <Dropdown overlay={menu}>
          <span className={`${styles.action} ${styles.account}`}>
            <Avatar
              size="small"
              className={styles.avatar}
              icon={<UserOutlined />}
              alt="avatar"
            />
            <span className={styles.name}>{principal.username}</span>
          </span>
        </Dropdown>
      ) : (
        <Spin size="small" style={{ marginLeft: 8, marginRight: 8 }} />
      )}
    </div>
  );
}

export default HeaderMenu;
