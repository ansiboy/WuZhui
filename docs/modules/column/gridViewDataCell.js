action(function () {
    let w = wuzhui

    let items = [
        { id: 0, status: 1, enable: true },
        { id: 1, status: 0, enable: false },
        { id: 2, status: 0, enable: true },
    ]

    let dataSource = new w.DataSource({
        primaryKeys: ['id'],
        select: () => Promise.resolve(items),
        update: () => Promise.resolve({})
    })

    new w.GridView({
        dataSource,
        element: document.getElementById('gridViewDataCell1'),
        columns: [
            new w.BoundField({ dataField: 'id' }),
            new w.CustomField({
                headerText: '是否启用',
                createItemCell(dataItem) {
                    let button = document.createElement('button')
                    button.className = 'btn btn-default'

                    let cell = new w.GridViewDataCell()

                    cell.dataField = 'enable'
                    cell.render = function (value) {
                        button.innerHTML = value ? '已启用' : '已禁用'
                    }
                    cell.element.appendChild(button)
                    button.onclick = function () {
                        let id = dataItem.id
                        let enable = !dataItem.enable
                        dataSource.update({ id, enable })
                    }

                    return cell
                }
            }),

        ]
    })
})