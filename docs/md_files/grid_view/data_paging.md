## 数据的分页

<table id="data_paging_1" class="table"></table>

```js
const w = wuzhui;
const totalRowCount = 10;
var dataSource = new w.DataSource({
    select(args) {
        var dataItems = []

        let start = args.startRowIndex;
        for (let i = 0; i < args.maximumRows; i++) {
            var rowIndex = start + i;
            if (rowIndex > totalRowCount - 1)
                break;

            dataItems[i] = {
                name: `name ${rowIndex}`,
                age: rowIndex + 1
            }
        }

        var result = {
            totalRowCount,
            dataItems
        }
        return Promise.resolve(result);
    }
})
var gridView = new w.GridView({
    element: document.getElementById('data_paging_1'),
    dataSource,
    columns: [
        new w.BoundField({ dataField: 'name', headerText: '姓名' }),
        new w.BoundField({ dataField: 'age', headerText: '年龄' })
    ],
    pageSize: 3
})
```