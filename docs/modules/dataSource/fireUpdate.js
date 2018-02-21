action(function () {
    const w = wuzhui
    let items = [
        { id: 0, name: 'name 1', value: 100 },
        { id: 1, name: 'name 2', value: 200 }
    ]

    let dataSource = new w.DataSource({
        primaryKeys: ['id'],
        select() {
            return Promise.resolve(items)
        }
    })

    new w.GridView({
        dataSource,
        element: document.getElementById('dataSource_fireUpdate1'),
        columns: [
            new w.BoundField({ dataField: 'id' }),
            new w.BoundField({ dataField: 'name' }),
            new w.BoundField({ dataField: 'value' })
        ]
    })

    let form = document.getElementById('dataSource_fireUpdate2')
    let btn = form['btn']
    btn.onclick = function () {
        let id = Number.parseInt(form['id'].value)
        let value = form['value'].value
        dataSource.updated.fire(dataSource, { id, value })
    }
})