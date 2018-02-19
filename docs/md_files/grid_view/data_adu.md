## 数据的增删改
如果要对数据的进行增加，删除，修改的操作，必须为 DataSource 指定 primaryKeys

<table id="data_adu_1" class="table"></table>

## 源码
### HTML
```html
<table id="data_adu_1" class="table"></table>
```
### JS
```js
const w = wuzhui;
var items = [
    { id: 0, name: 'apple', price: 8, quantity: 3, total: 24 },
    { id: 1, name: 'orange', price: 10, quantity: 4, total: 40 },
    { id: 2, name: 'banana', price: 6.5, quantity: 3, total: 19.5 }
]
var dataSource = new w.DataSource({
    primaryKeys: ['id'],
    select() {
        return Promise.resolve(items);
    },
    insert(item) {
        item.id = items.length;
        items.push(item);
        return Promise.resolve({ total: item.price * item.quantity });
    },
    update(item) {
        return Promise.resolve({ total: item.price * item.quantity });
    },
    delete(item) {
        return Promise.resolve();
    }
})
var gridView = new w.GridView({
    element: document.getElementById('data_adu_1'),
    dataSource,
    columns: [
        new w.BoundField({ dataField: 'id', readOnly: true }),
        new w.BoundField({ dataField: 'name' }),
        new w.BoundField({ dataField: 'price' }),
        new w.BoundField({ dataField: 'quantity' }),
        new w.BoundField({ dataField: 'total', readOnly: true }),
        new w.CommandField({
            headerStyle: 'width:180px',
            showDeleteButton: true, showEditButton: true,
            showNewButton: true
        })
    ]
})
```

