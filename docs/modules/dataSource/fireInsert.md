# 引发插入事件

## 示例

<table id="dataSource_fireInsert1" class="table"></table>

<form id="dataSource_fireInsert2" class="form-inline">
    <lable>编号</lable>
    <input name="id" type="text" class="form-control"/>
    <lable>名称</lable>
    <input name="name" type="text" class="form-control"/>
    <lable>值</lable>
    <input name="value" type="text" class="form-control"/>
    <button name="btn" type="button" class="btn btn-default">插入</button>
</form>

## 源码

### HTML

```html
<table id="dataSource_fireInsert1" class="table"></table>

<form id="dataSource_fireInsert2" class="form-inline">
    <lable>编号</lable>
    <input name="id" type="text" class="form-control"/>
    <lable>名称</lable>
    <input name="name" type="text" class="form-control"/>
    <lable>值</lable>
    <input name="value" type="text" class="form-control"/>
    <button name="btn" type="button" class="btn btn-default">插入</button>
</form>
```

### JS

```js
const w = wuzhui
let items = [{
        id: 0,
        name: 'name 1',
        value: 100
    },
    {
        id: 1,
        name: 'name 2',
        value: 200
    }
]

let dataSource = new w.DataSource({
    primaryKeys: ['id'],
    select() {
        return Promise.resolve(items)
    }
})

new w.GridView({
    dataSource,
    element: document.getElementById('dataSource_fireInsert1'),
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

let form = document.getElementById('dataSource_fireInsert2')
let btn = form['btn']
btn.onclick = function () {
    let id = Number.parseInt(form['id'].value)
    let value = form['value'].value
    let name = form['name'].value
    dataSource.inserted.fire(dataSource, {
        id,
        name,
        value
    })
}
```