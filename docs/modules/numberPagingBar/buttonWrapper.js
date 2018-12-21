requirejs(['css!modules/numberPagingBar/createPagingBar'])
action(function () {
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
            buttonContainerWraper: 'ul',
            buttonWrapper: 'li',
            buttonContainerClassName: 'pagination',
            showTotal: false
        }
    })
})