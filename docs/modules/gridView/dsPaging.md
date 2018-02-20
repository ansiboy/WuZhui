# 使用数据源分页数据

## 示例

<table id="dsPaging_table" class="table"></table>

<form id="dsPaging_form" class="form-inline">
    <span>第</span>
    <select name="number" class="form-control">
        <option value="0">1</option>
        <option value="1">2</option>
        <option value="2">3</option>
        <option value="3">4</option>
        <option value="4">5</option>
    </select>
    <span>页</span>
    <button id="dsPaging_btn" type="button" class="btn btn-default">确定</button>
</form>

## 源码

### HTML

```html
<table id="dsPaging_table" class="table"></table>

<form id="dsPaging_form" class="form-inline">
    <span>第</span>
    <select name="number" class="form-control">
        <option value="0">1</option>
        <option value="1">2</option>
        <option value="2">3</option>
        <option value="3">4</option>
        <option value="4">5</option>
    </select>
    <span>页</span>
    <button id="dsPaging_btn" type="button" class="btn btn-default">确定</button>
</form>
```

### JS

```js
const w = wuzhui
const totalRowCount = 67
let dataItems = [];
for (let i = 0; i < totalRowCount; i++) {
    let id = i;
    let name = `name ${i}`
    let value = `value ${i}`
    dataItems.push({ id, name, value })
}

let dataSource = new w.DataSource({
    select(args) {
        let startIndex = args.startRowIndex;
        let count = args.maximumRows;
        let items = dataItems.filter((o, i) => i >= startIndex && i < startIndex + count)
        let result = {
            dataItems: items,
            totalRowCount
        }
        return Promise.resolve(result)
    }
})

// 设置最多返回的记录数量
dataSource.selectArguments.maximumRows = 5;

new w.GridView({
    dataSource,
    element: document.getElementById('dsPaging_table'),
    columns: [
        new w.BoundField({ dataField: 'name' }),
        new w.BoundField({ dataField: 'value' })
    ]
})

let form = document.getElementById('dsPaging_form')
let btn = document.getElementById('dsPaging_btn')
btn.onclick = function () {
    let paging_number = Number.parseInt(form['number'].value)
    dataSource.selectArguments.startRowIndex = dataSource.selectArguments.maximumRows * paging_number
    dataSource.select()
}
```