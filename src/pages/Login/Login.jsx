import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Alert, Button, Form, Input } from 'antd';
import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import { useAuthentication } from '../../components/authentication';
import styles from './Login.module.less';

const demoUsers = [
  {
    username: 'admin',
    password: 'admin',
    roles: ['ADMIN'],
  },
  {
    username: 'xyykf1',
    password: '123456',
    roles: [
      'ORDER_VIEW',
      'ORDER_EDIT',
      'TRACK_VIEW',
      'DISPATCH',
      'CONSIGNMENT_VIEW',
    ],
  },
  {
    username: 'dispatcher',
    password: '123456',
    roles: ['DISPATCH'],
  },
  {
    username: 'nomex',
    password: 'nomex123456',
    roles: ['ORDER_VIEW'],
  },
];

function remoteAuthService({ username, password }) {
  const found = demoUsers.find(
    (user) => username.toLocaleLowerCase() === user.username
  );

  if (found && found.password === password) {
    return Promise.resolve({
      username: found.username,
      token: username + '_' + Math.random(),
      displayName: found.displayName,
      roles: found.roles,
    });
  } else {
    return Promise.reject('错误的用户名或密码');
  }
}

function Login() {
  const [error, setError] = React.useState();
  const { login } = useAuthentication();
  const history = useHistory();
  const location = useLocation();

  const { from } = location.state || { from: { pathname: '/' } };

  const onFinish = (values) => {
    setError(null);
    remoteAuthService(values)
      .then((identity) => {
        login(identity);
        history.replace(from);
      })
      .catch(setError);
  };

  return (
    <div className={styles.formWrapper}>
      <div className={styles.header}>
        <img alt="logo" className={styles.logo} src={logo} />
        <span className={styles.title}>{process.env.REACT_APP_TITLE}</span>
      </div>

      <Form onFinish={onFinish} name="login" size="large">
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: '请输入用户名',
            },
          ]}>
          <Input
            prefix={<UserOutlined className={styles.prefixIcon} />}
            placeholder="用户名"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: '请输入密码',
            },
          ]}>
          <Input
            prefix={<LockOutlined className={styles.prefixIcon} />}
            type="password"
            placeholder="密码"
          />
        </Form.Item>
        <Form.Item className={styles.additional}>
          <Button className={styles.submit} type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
      {error && <Alert message={error} type="error" />}
    </div>
  );
}

export default Login;
