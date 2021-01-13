import { createSelector } from '@reduxjs/toolkit';

export const getSelectedKeys = (state) => state.selectedKeys;

export const getItems = (state) => state.items;

export const getSelectedItems = createSelector(
  [getSelectedKeys, getItems],
  (keys, items) => {
    return items.filter((item) => keys.includes(item.consignmentId));
  }
);

export function validateCancelable(items = []) {
  const result = { valid: [], invalid: [] };

  items.forEach((item) => {
    if (item.status === 99) {
      result.invalid.push({
        ...item,
        message: '托运单已经取消，不能再次取消',
      });
    } else if (item.status !== 0) {
      result.invalid.push({
        ...item,
        message: '托运单已经揽收或启运，不能取消',
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
