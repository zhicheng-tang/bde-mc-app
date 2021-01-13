# 待思考问题

## 组件复用

- 展示组件
- Container

## 逻辑复用

- hooks
- 处理逻辑

# 待优化

## 使用 useDataTable

```javascript
function useDataTable(requestConfig, TableOptions) {
  return {
    component,
    loading,
    refetch,
    error,
  };
}
```

## 使用 Fields 定义数据信息

```javascript
const fields = {
  id: {
    showInList: false,
    showInDetails: false,
    render: (id) => id,
  },
  orderDate: {
    name: '订单日期',
    showinList: true,
    render: null,
  },
};


const overrides={
    id:{
        render:xxx=> xxx;
        width:
    }
}

function mapToColumns(fields, overrides){

}

const columns = fields.map(field)
```
