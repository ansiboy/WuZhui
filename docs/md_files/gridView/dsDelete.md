# 通过数据源删除数据

## 示例

<table id="dsDelete_table" class="table"></table>

<form id="dsDelete_form" class="form-inline">
    <span>编号</span>
    <select name="id" class="form-control">
        <option value="0">0<option>
        <option value="1">1<option>
        <option value="2">2<option>
    </select>
    <button id="dsDelete_btn" type="button" class="btn btn-default">删除</button>
</form>

## 源码

### HTML

```html
<table id="dsDelete_table" class="table"></table>

<form id="dsDelete_form" class="form-inline">
    <span>编号</span>
    <select name="id" class="form-control">
        <option value="0">0<option>
        <option value="1">1<option>
        <option value="2">2<option>
    </select>
    <button id="dsDelete_btn" type="button" class="btn btn-default">删除</button>
</form>
```
### JS

```js
const w = wuzhui;

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
    delete(value) {
        //TODO: 删除数据
        return Promise.resolve({});
    }
})
new w.GridView({
    dataSource,
    element: document.getElementById('dsDelete_table'),
    columns: [
        new w.BoundField({ dataField: 'id' }),
        new w.BoundField({ dataField: 'name' }),
        new w.BoundField({ dataField: 'price' }),
        new w.BoundField({ dataField: 'quantity' }),
        new w.BoundField({ dataField: 'total' })
    ]
})
let btn = document.getElementById('dsDelete_btn')
let form = document.getElementById('dsDelete_form')
btn.onclick = function () {
    let id = Number.parseInt(form['id'].value)
    dataSource.delete({ id });
}
```