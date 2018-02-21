# 引发删除事件

## 示例

<table id="dataSource_fireDelete1" class="table"></table>

<form id="dataSource_fireDelete2" class="form-inline">
    <lable>编号</lable>
    <select name="id" class="form-control">
        <option value="0">0</option>
        <option value="1">1</option>
        <option value="2">2</option>
    </select>
    <button name="btn" type="button" class="btn btn-default">删除</button>
</form>

## 源码

### HTML

```html
<table id="dataSource_fireDelete1" class="table"></table>

<form id="dataSource_fireDelete2" class="form-inline">
    <lable>编号</lable>
    <select name="id" class="form-control">
        <option value="0">0</option>
        <option value="1">1</option>
        <option value="2">2</option>
    </select>
    <button name="btn" type="button" class="btn btn-default">删除</button>
</form>
```

### JS

```js
let w = wuzhui
let items = [
    { id: 0, name: 'name 1', value: 100 },
    { id: 1, name: 'name 2', value: 200 },
    { id: 2, name: 'name 3', value: 300 },
]

let dataSource = new w.DataSource({
    primaryKeys: ['id'],
    select() {
        return Promise.resolve(items)
    }
})

new w.GridView({
    dataSource,
    element: document.getElementById('dataSource_fireDelete1'),
    columns: [
        new w.BoundField({
            dataField: 'id'
        }),
        new w.BoundField({
            dataField: 'name'
        }),
        new w.BoundField({
            dataField: 'value'
        })
    ]
})

let form = document.getElementById('dataSource_fireDelete2')
let btn = form['btn']
btn.onclick = function () {
    let id = Number.parseInt(form['id'].value)
    dataSource.deleted.fire(dataSource, { id })
}
```
