# 引发更新事件

## 示例

<table id="dataSource_fireUpdate1" class="table"></table>

<form id="dataSource_fireUpdate2" class="form-inline">
    <span>更新记录</span>
    <select name="id" class="form-control">
        <option value="0">0</option>
        <option value="1">1</option>
    </select>
    <input name="value" type="text" class="form-control"/>
    <button name="btn" type="button" class="btn btn-default">更新</button>
</form>

## 源码

### HTML

```html
<table id="dataSource_fireUpdate1" class="table"></table>

<form id="dataSource_fireUpdate2" class="form-inline">
    <span>更新记录</span>
    <select name="sel" class="form-control">
        <option value="0">0</option>
        <option value="1">1</option>
    </select>
    <input name="value" type="text" class="form-control"/>
    <button name="btn" type="button" class="btn btn-default">更新</button>
</form>
```

### JS

```js
const w = wuzhui
let items = [
    { id: 0, name: 'name 1', value: 100 },
    { id: 1, name: 'name 1', value: 200 }
]

let dataSource = new w.DataSource({
    primaryKeys: ['id'],
    select() {
        return Promise.resolve(items)
    }
})

new w.GridView({
    dataSource,
    element: document.getElementById('dataSource_fireUpdate1'),
    columns: [
        new w.BoundField({ dataField: 'name' }),
        new w.BoundField({ dataField: 'value' })
    ]
})

let form = document.getElementById('dataSource_fireUpdate2')
let btn = form['btn']
btn.onclick = function () {
    let id = Number.parseInt(form['sel'].value)
    let value = form['value'].value
    dataSource.updated.fire(dataSource, { id, value })
}
```