// import defaultsDeep from 'lodash/defaultsDeep';

const initialState = {
  filter: {
    orderNumber: { type: 'CONSIGNMENT_NUMBER' },
    keyword: { type: 'TO_CONTACT_MAN' },
  },
  page: 1,
  pageSize: 50,
  totalElements: 0,
  sortBy: 'createdTime DESC',
  isFetching: false,
  items: [],
  selectedKeys: [],
  consignModalVisible: false,
  isConsigning: false,
  cancelModalVisible: false,
  isCanceling: false,
  importModalVisible: false,
  isImporting: false,
  productArr:[],
};

export default function reducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case 'SET_STATE':
      return { ...state, ...payload };
    default:
      return state;
  }
}
