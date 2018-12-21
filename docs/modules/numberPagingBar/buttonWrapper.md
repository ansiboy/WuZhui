# 包装按钮

使用 pagerSettings 的 buttonWrapper 属性，可以为按钮包裹在一个 HTML 元素里

## 示例

<table id="buttonWrapper_table" class="table"></table>
<div id="buttonWrapper_bar" class="pagination"></div>

## 源码

### HTML

```html
<div id="buttonWrapper_bar" class="pagination"></div>
```

### JS

```js
let w = wuzhui;

const totalRowCount = 670;
let dataSource = new w.DataSource({
    select(args) {
        let dataItems = []
        let start = args.startRowIndex;
        for (let i = 0; i < args.maximumRows; i++) {
            let rowIndex = start + i;
            if (rowIndex > totalRowCount - 1)
                break;

            dataItems[i] = {
                name: `name ${rowIndex}`,
                value: rowIndex + 1
            }
        }

        let result = {
            totalRowCount,
            dataItems
        }
        return Promise.resolve(result);
    }
})

dataSource.selectArguments.maximumRows = 8;
let table = document.getElementById('buttonWrapper_table');
let tbody = document.createElement('tbody');
table.appendChild(tbody);

for (let i = 0; i < dataSource.selectArguments.maximumRows; i++) {
    let row = document.createElement('tr');
    let nameCell = document.createElement('td');
    let valueCell = document.createElement('td');
    row.appendChild(nameCell);
    row.appendChild(valueCell);
    tbody.appendChild(row);
}

dataSource.selected.add((sender, args) => {
    for (let i = 0; i < dataSource.selectArguments.maximumRows; i++) {
        let dataItem = args.dataItems[i];
        let cells = tbody.rows.item(i).cells;
        cells.item(0).innerHTML = dataItem ? dataItem.name : '&nbsp;';
        cells.item(1).innerHTML = dataItem ? dataItem.value : '&nbsp;';
    }
})

dataSource.select();

new w.NumberPagingBar({
    dataSource,
    element: document.getElementById('buttonWrapper_bar'),
    pagerSettings: {
        activeButtonClassName: 'active',
        buttonWrapper: 'li',
        showTotal: false
    }
})
```