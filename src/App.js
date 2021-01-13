import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AutoSwitchLayout } from './components/layout';
import { renderRouteConfig } from './components/route';
import { Spin, ConfigProvider, message } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import routeConfig from './routeConfig';

message.config({
  top: 200,
  duration: 5,
});

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <Router>
        <AutoSwitchLayout>
          <Suspense fallback={<Spin />}>
            {renderRouteConfig(routeConfig)}
          </Suspense>
        </AutoSwitchLayout>
      </Router>
    </ConfigProvider>
  );
}

export default App;
