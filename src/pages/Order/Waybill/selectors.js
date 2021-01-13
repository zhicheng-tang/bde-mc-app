import { createSelector } from '@reduxjs/toolkit';

export const getSelectedKeys = (state) => state.selectedKeys;

export const getItems = (state) => state.items;

export const getSelectedItems = createSelector(
  [getSelectedKeys, getItems],
  (keys, items) => {
    return items.filter((item) => keys.includes(item.waybillNumber));
  }
);

export function validateCancelable(items = []) {
  const result = { valid: [], invalid: [] };

  items.forEach((item) => {
    if (item.status === 'CANCELED') {
      result.invalid.push({
        ...item,
        message: '运单已经取消，不能再次取消',
      });
    } else if (item.status !== 'CREATED') {
      result.invalid.push({
        ...item,
        message: '运单已经揽收或启运，不能取消',
      });
    } else if (item.scheduleStatus !== 'UN_SCHEDULED') {
      result.invalid.push({
        ...item,
        message: '运单已经发运，先取消相关的托运单再取消运单',
      });
    } else {
      result.valid.push({ ...item, message: '可以取消' });
    }
  });

  return result;
}

export const getCancelModel = createSelector([getSelectedItems], (items) =>
  validateCancelable(items)
);

export function validateConsignable(items = []) {
  const result = { valid: [], invalid: [] };

  items.forEach((item) => {
    if (item.status === 'CANCELED') {
      result.invalid.push({
        ...item,
        message: '运单已经取消，不能发运',
      });
    } else if (
      item.status === 'SIGNED' ||
      item.status === 'ABNORMALLY_SIGNED'
    ) {
      result.invalid.push({
        ...item,
        message: '运单已经签收，不能发运',
      });
    } else if (item.scheduleStatus === 'FULL_SCHEDULED') {
      result.invalid.push({
        ...item,
        message: '运单已经完成调度，不能发运',
      });
    } else {
      result.valid.push({ ...item, message: '可以发运' });
    }
  });

  return result;
}

export const getConsignModel = createSelector([getSelectedItems], (items) =>
  validateConsignable(items)
);

export const getDetailId = (state) => state.detailId;

export const getDetail = createSelector(
  [getItems, getDetailId],
  (items, id) => {
    return items.find((item) => item.waybillNumber === id);
  }
);
