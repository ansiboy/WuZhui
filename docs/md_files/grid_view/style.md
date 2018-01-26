## 设置样式

通过 DataControlField 的 headerStyle，itemStyle，可以对列的头，项设置样式。可以使用字符串或者对象。

**示例**

<table id="style_1" class="table"></table>

```js
const w = wuzhui;
var dataSource = new w.DataSource({
    select: () => Promise.resolve([
        { name: 'apple', price: 3.8 },
        { name: 'orange', price: 4.2 }
    ])
})
var gridView = new w.GridView({
    element: document.getElementById('style_1'),
    dataSource,
    columns: [
        new w.BoundField({
            dataField: 'name', headerText: 'Product Name',
            headerStyle: 'text-align:center',
        }),
        new w.BoundField({
            dataField: 'price', headerText: 'Price',
            headerStyle: {textAlign:'center'},
            itemStyle: {textAlign:'right'},
        })
    ]
})
```