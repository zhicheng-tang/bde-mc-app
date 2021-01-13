import { createSelector } from '@reduxjs/toolkit';

export const getSelectedKeys = (state) => state.selectedKeys;

export const getItems = (state) => state.items;

export const getSelectedItems = createSelector(
  [getSelectedKeys, getItems],
  (keys, items) => {
    return items.filter((item) => keys.includes(item.waybillNumber));
  }
);

export const getDetailId = (state) => state.detailId;

export const getDetail = createSelector(
  [getItems, getDetailId],
  (items, id) => {
    return items.find((item) => item.waybillNumber === id);
  }
);
