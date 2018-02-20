# 数据的分页

## 示例

<table id="data_paging_1" class="table"></table>

## 源码

### HTML

```html
<table id="data_paging_1" class="table"></table>
```

### JS

```js
const w = wuzhui
const totalRowCount = 67
let dataItems = [];
for (let i = 0; i < totalRowCount; i++) {
    let id = i;
    let name = `name ${i}`
    let value = `value ${i}`
    dataItems.push({ id, name, value })
}

let dataSource = new w.DataSource({
    select(args) {
        let startIndex = args.startRowIndex;
        let count = args.maximumRows;
        let items = dataItems.filter((o, i) => i >= startIndex && i < startIndex + count)
        let result = {
            dataItems: items,
            totalRowCount
        }
        return Promise.resolve(result)
    }
})

var gridView = new w.GridView({
    element: document.getElementById('data_paging_1'),
    dataSource,
    columns: [
        new w.BoundField({ dataField: 'name', headerText: '名称' }),
        new w.BoundField({ dataField: 'value', headerText: '值' })
    ],
    pageSize: 3,
})
```