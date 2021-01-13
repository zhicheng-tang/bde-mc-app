import React from 'react';
import { Layout } from 'antd';
import { CopyrightOutlined } from '@ant-design/icons';
import styles from './Footer.module.less';

const { Footer } = Layout;

const links = [
  {
    key: 'yulanginfo',
    title: '宇浪',
    href: 'http://www.yulanginfo.com',
    blankTarget: true,
  },
  {
    key: 'help',
    title: '帮助',
    href: '/help',
  },
  {
    key: 'privacy',
    title: '隐私协议',
    href: '/privacy',
  },
  {
    key: 'terms',
    title: '服务条款',
    href: '/terms',
  },
];

function FooterView() {
  return (
    <Footer style={{ padding: 0 }}>
      <footer className={styles.globalFooter}>
        {links && (
          <div className={styles.links}>
            {links.map((link) => (
              <a
                key={link.key}
                title={link.key}
                target={link.blankTarget ? '_blank' : '_self'}
                href={link.href}>
                {link.title}
              </a>
            ))}
          </div>
        )}
        <div className={styles.copyright}>
          <span>
            Copyright <CopyrightOutlined /> 2020 广州宇浪软件科技有限公司
          </span>
        </div>
      </footer>
    </Footer>
  );
}

export default FooterView;
