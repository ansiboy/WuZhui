# 使用数据源添加数据

## 示例

<table id="dsInsert_table" class="table"></table>

<form id="dsInsert_form" class="form-inline">
    <span>名称</span>
    <input type="text" name="name" class="form-control">
    <span>价格</span>
    <input type="text" name="price" class="form-control">
    <span>数量</span>
    <input type="text" name="quantity" class="form-control" value="3">
    <button id="dsInsert_btn" type="button" class="btn btn-default">插入</button>
</form>

## 源码

### HTML

```html
<table id="dsInsert_table" class="table"></table>

<form id="dsInsert_form" class="form-inline">
    <span>名称</span>
    <input type="text" name="name" class="form-control">
    <span>价格</span>
    <input type="text" name="price" class="form-control">
    <span>数量</span>
    <input type="text" name="quantity" class="form-control" value="3">
    <button id="dsInsert_btn" type="button" class="btn btn-default">插入</button>
</form>
```

### JS

```js
 const w = wuzhui
let items = [
    { id: 0, name: 'apple', price: 8, quantity: 3, total: 24 },
    { id: 1, name: 'orange', price: 10, quantity: 4, total: 40 },
    { id: 2, name: 'banana', price: 6.5, quantity: 3, total: 19.5 }
]
let dataSource = new w.DataSource({
    primaryKeys: ['id'],
    select() {
        return Promise.resolve(items);
    },
    insert(value) {
        //TODO: 插入数据
        items.push(value)
        let total = value.quantity * value.price;
        let id = items.length;
        return Promise.resolve({ id, total });
    }
})
new w.GridView({
    dataSource,
    element: document.getElementById('dsInsert_table'),
    columns: [
        new w.BoundField({ dataField: 'id' }),
        new w.BoundField({ dataField: 'name' }),
        new w.BoundField({ dataField: 'price' }),
        new w.BoundField({ dataField: 'quantity' }),
        new w.BoundField({ dataField: 'total' })
    ]
})
let btn = document.getElementById('dsInsert_btn')
let form = document.getElementById('dsInsert_form')
btn.onclick = function () {
    let id = Number.parseInt(form['id'].value)
    let name = form['name'].value
    let price = Number.parseFloat(form['price'].value)
    let quantity = Number.parseInt(form['quantity'].value)
    dataSource.insert({ id, name, price, quantity });
}
```