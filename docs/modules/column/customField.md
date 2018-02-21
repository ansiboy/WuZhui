# 使用自定义列

## 示例

<table id="column_customField1" class="table"></table>

## 源码

### HTML

```html
<table id="column_customField1" class="table"></table>
```

### JS

```js
const w = wuzhui
let items = [
    { id: 0, status: 1, paid: true },
    { id: 1, status: 0, paid: false },
    { id: 2, status: 0, paid: true },
]

let dataSource = new w.DataSource({
    primaryKeys: ['id'],
    select: () => Promise.resolve(items),
    delete: () => Promise.resolve({})
})

new w.GridView({
    dataSource,
    showHeader: true,
    element: document.getElementById('column_customField1'),
    columns: [
        new w.BoundField({ dataField: 'id' }),
        new w.CustomField({
            headerText: '状态',
            createItemCell(dataItem) {
                let cell = new w.GridViewCell()
                let text
                switch (dataItem.status) {
                    case 0:
                        text = '未发货'
                        break
                    case 1:
                        text = '已发货'
                        break
                }
                cell.element.innerHTML = text
                return cell
            }
        }),
        new w.CustomField({
            headerText: '已付款',
            createItemCell(dataItem) {
                let cell = new w.GridViewCell()
                cell.element.innerHTML = dataItem.paid == true ? '是' : '否'
                return cell
            }
        }),
        new w.CustomField({
            headerText: '操作',
            createItemCell(dataItem) {
                let cell = new w.GridViewCell()
                let btn = document.createElement('button')
                cell.element.appendChild(btn)
                btn.className = 'btn btn-default'
                btn.innerHTML = '删除'
                btn.onclick = function () {
                    dataSource.delete(dataItem)
                }

                return cell
            }
        })
    ]
})
```