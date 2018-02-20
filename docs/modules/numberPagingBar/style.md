# 分页栏样式

## 示例

<table id="numberPagingBar_style_table1" class="table"></table>

## 源码

### CSS

```css
.pagingBar a {
    margin-right: 4px;
}
.pagingBar a.active {
    color: red;
}
.pagingBar .total {
    float: right;
}
```

### HTML

```html
<table id="numberPagingBar_style_table1" class="table"></table>
```

### JS

```js
let w = wuzhui;

const totalRowCount = 100;
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

let gridView = new w.GridView({
    dataSource,
    element: document.getElementById('numberPagingBar_style_table1'),
    columns: [
        new w.BoundField({ dataField: 'name' }),
        new w.BoundField({ dataField: 'value' })
    ],
    pageSize: 5,
    pagerSettings: {
        activeButtonClassName: 'active'
    }
})
```