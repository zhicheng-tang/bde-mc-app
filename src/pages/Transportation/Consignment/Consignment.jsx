import React from 'react';
import { Card } from 'antd';
import SearchBar from './SearchBar';
import List from './List.jsx';
import ActionBar from './ActionBar';
import CancelModal from './CancelModal';
import ImportModal from './ImportModal';

import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import reducer from './reducer';
import { fetchData } from './actions';

function Consignment() {
  const store = configureStore({ reducer });

  React.useEffect(() => {
    store.dispatch(fetchData());
  });

  return (
    <Provider store={store}>
      <Card size="small" bordered={false}>
        <SearchBar />
      </Card>
      <Card size="small" bordered={false}>
        <ActionBar />
        <List />
      </Card>
      <CancelModal />
      <ImportModal />
    </Provider>
  );
}

export default Consignment;
