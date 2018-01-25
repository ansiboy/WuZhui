## 数据的显示

<table id="data_read_1" class="table"></table>
```js
const w = wuzhui;
var dataSource = new w.DataSource({
    select: () => Promise.resolve([
        { name: 'tom', age: 8 },
        { name: 'may', age: 10 }
    ])
})
var gridView = new w.GridView({
    element: document.getElementById('data_read_1'),
    dataSource,
    columns: [
        new w.BoundField({ dataField: 'name' }),
        new w.BoundField({ dataField: 'age' })
    ]
})

```