# 使用数据绑定列

## 示例

<table id="boundField_table" class="table"></table>

## 源码

### HTML

```html
<table id="boundField_table" class="table"></table>
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
new w.GridView({
    element: document.getElementById('boundField_table'),
    dataSource,
    columns: [
        new w.BoundField({ dataField: 'name', headerText: '姓名' }),
        new w.BoundField({ dataField: 'age', headerText: '年龄' })
    ]
})
```