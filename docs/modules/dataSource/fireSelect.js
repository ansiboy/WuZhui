action(function () {
    const w = wuzhui
    let items = [
    ]

    let dataSource = new w.DataSource({
        primaryKeys: ['id'],
        select() {
            return Promise.resolve(items)
        }
    })

    new w.GridView({
        dataSource,
        element: document.getElementById('dataSource_fireSelect1'),
        columns: [
            new w.BoundField({ dataField: 'name' }),
            new w.BoundField({ dataField: 'value' })
        ]
    })

    let form = document.getElementById('dataSource_fireSelect2')
    let btn = form['btn']
    btn.onclick = function () {
        let dataItems = [
            { name: 'name 0', value: 100 },
            { name: 'name 1', value: 200 },
            { name: 'name 2', value: 300 },
        ]
        dataSource.selected.fire(dataSource, { dataItems })
    }
})