import React from 'react';
import { Modal } from 'antd';
import WaybillDetail from '../Waybill/WaybillDetail';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { setState } from './actions';
import { getDetail } from './selectors';

function WaybillDetailModal() {
  const dispatch = useDispatch();
  const visible = useSelector((state) => state.detailModalVisible);
  const waybill = useSelector(getDetail, shallowEqual);
  return (
    <Modal
      width={1200}
      destroyOnClose
      visible={visible}
      title="运单明细"
      footer={null}
      onCancel={() =>
        dispatch(setState({ detailModalVisible: false, detailId: null }))
      }>
      <WaybillDetail waybill={waybill} />
    </Modal>
  );
}

export default WaybillDetailModal;
