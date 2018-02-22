# 实现勾选框列

## 示例

<table id="checkboxField1" class="table"></table>

## 源码

### HTML

```html
<table id="checkboxField1" class="table"></table>
```

### JS

```js
const w = wuzhui

class GridViewCheckboxCell extends w.GridViewEditableCell {
    constructor(field, dataItem) {
        super(field, dataItem)
    }
    render(value) {

        if (this.mode == 'read') {
            this.element.innerHTML = value ? '是' : '否'
            return
        }

        this.element.innerHTML = `<input type="checkbox"/>`
        let input = this.element.querySelector('input')
        input.checked = value
    }
    get controlValue() {
        let input = this.element.querySelector('input')
        return input.checked
    }
}

class CheckboxField extends w.BoundField {
    createItemCell(dataItem) {
        return new GridViewCheckboxCell(this, dataItem)
    }
}

let items = [
    { id: 0, status: 1, enable: true },
    { id: 1, status: 0, enable: false },
    { id: 2, status: 0, enable: true },
]

let dataSource = new w.DataSource({
    primaryKeys: ['id'],
    select: () => Promise.resolve(items),
    update: () => Promise.resolve({})
})

new w.GridView({
    dataSource,
    element: document.getElementById('checkboxField1'),
    columns: [
        new w.BoundField({ dataField: 'id' }),
        new CheckboxField({ dataField: 'enable' }),
        new w.CommandField({ headerText: '操作', showEditButton: true })
    ]
})
```