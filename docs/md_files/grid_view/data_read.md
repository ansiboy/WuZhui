# 数据的显示

## 示例
<table id="data_read_1" class="table"></table>

## 源码

### HTML
```html
<table id="data_read_1" class="table"></table>
```

### JS
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