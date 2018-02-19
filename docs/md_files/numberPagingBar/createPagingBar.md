# 创建分页栏

典型的使用步骤

1. 创建数据源
2. 创建分页栏
3. 通过数据源获取数据

**注意** 第 2, 3 步不分次序，即：第 3 步也可以是第 2 步。

## 示例

<table id="numberPagingBar_createPagingBar_table" class="table"></table>
<div id="numberPagingBar_createPagingBar_bar"></div>

## 源码

### HTML

```html
<table id="numberPagingBar_createPagingBar_table" class="table"></table>
<div id="numberPagingBar_createPagingBar_bar"></div>
```

### JS

1. 创建数据源
    ```js
    let w = wuzhui;

    const totalRowCount = 67;
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
    let table = document.getElementById('numberPagingBar_createPagingBar_table');
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
    ```
1. 通过数据源获取数据
    ```js
    dataSource.select();
    ```

1. 创建分页栏
    ```js
    new w.NumberPagingBar({
        dataSource,
        element:document.getElementById('numberPagingBar_createPagingBar_bar')
    })
    ```
