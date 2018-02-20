action(function () {
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
        primaryKeys: ['id'],
        select(args) {
            let startIndex = args.startRowIndex;
            let count = args.maximumRows;
            let items = dataItems.filter((o, i) => i >= startIndex && i < startIndex + count)
            let result = {
                dataItems: items,
                totalRowCount
            }
            return Promise.resolve(result)
        },
        update(value) {
            return Promise.resolve({})
        },
        delete(value) {
            return Promise.resolve({})
        }
    })

    new w.GridView({
        dataSource,
        element: document.getElementById('dataSource_multiView1'),
        columns: [
            new w.BoundField({ dataField: 'name' }),
            new w.BoundField({ dataField: 'value' }),
            new w.CommandField({ showEditButton: true, showDeleteButton: true })
        ],
        pageSize: 5
    })

    new w.GridView({
        dataSource,
        element: document.getElementById('dataSource_multiView2'),
        columns: [
            new w.BoundField({ dataField: 'name' }),
            new w.BoundField({ dataField: 'value' })
        ],
        pageSize: 5
    })
})