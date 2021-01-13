import React from 'react';
import Footer from './Footer';
import styles from './BlankLayout.module.less';

function BlankLayout({ children }) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>{children}</div>
      <Footer />
    </div>
  );
}

export default BlankLayout;
