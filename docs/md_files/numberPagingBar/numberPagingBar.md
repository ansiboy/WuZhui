## 分页栏

**示例一**

<table id="numberPagingBar_table1" class="table"></table>
<div id="numberPagingBar_1"></div>

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
                age: rowIndex + 1
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
// dataSource.select()

let gridView = new w.GridView({
    dataSource,
    element: document.getElementById('numberPagingBar_table1'),
    columns: [
        new w.BoundField({ dataField: 'name' }),
        new w.BoundField({ dataField: 'age' })
    ]
})


let pagingBar = new w.NumberPagingBar({
    dataSource,
    element: document.getElementById('numberPagingBar_1')
})
```

**示例二**

<table id="numberPagingBar_table2" class="table"></table>
<ul id="numberPagingBar_2" class="pagination"></ul>

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
                age: rowIndex + 1
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

let gridView = new w.GridView({
    dataSource,
    element: document.getElementById('numberPagingBar_table2'),
    columns: [
        new w.BoundField({ dataField: 'name' }),
        new w.BoundField({ dataField: 'age' })
    ]
})


let pagingBar = new w.NumberPagingBar({
    dataSource,
    element: document.getElementById('numberPagingBar_2'),
    // createTotal: () => ({}),
    pagerSettings: {
        buttonWrapper: 'li',
        activeButtonClassName: 'active'
    }
})
```