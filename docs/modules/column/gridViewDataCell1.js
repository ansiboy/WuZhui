action(function () {
    let w = wuzhui

    let items = [
        { id: 0, status: 1, enable: true },
        { id: 1, status: 0, enable: false },
        { id: 2, status: 0, enable: true },
    ]

    let dataSource = Object.assign(
        new w.DataSource({
            primaryKeys: ['id'],
            select: () => Promise.resolve(items),
            update: () => Promise.resolve({})
        }), {
            updateAll(item) {
                //TODO: Update All items in the database
                for (let i = 0; i < items.length; i++) {
                    item.id = items[i].id
                    dataSource.updated.fire(dataSource, item)
                }
            }
        })

    let gridView = new w.GridView({
        dataSource,
        element: document.getElementById('gridViewDataCell11'),
        columns: [
            new w.BoundField({ dataField: 'id' }),
            new w.CustomField({
                createHeaderCell() {

                    let cell = new w.GridViewCell()

                    cell.element.innerHTML = `
                        <div class="checkbox" style="margin:0">
                            <label>
                                <input type="checkbox"> 
                                <span>合部启用</span>
                            </label>
                        </div>
                    `

                    let text = cell.element.querySelector('span')
                    let input = cell.element.querySelector('input')
                    input.onchange = function () {
                        dataSource.updateAll({ enable: this.checked })
                        text.innerHTML = '合部'
                    }

                    return cell
                },
                createItemCell(dataItem) {
                    let cell = new w.GridViewDataCell()

                    cell.element.innerHTML = `
                    <div class="checkbox" style="margin:0">
                        <label>
                            <input type="checkbox"> 
                            <span>${dataItem.enable ? '已禁用' : '已启用'}</span>
                        </label>
                    </div>
                    `

                    cell.dataField = 'enable'
                    cell.render = function (value) {
                        cell.element.querySelector('input').checked = value ? true : false
                        cell.element.querySelector('span').innerHTML = value ? '已启用' : '已禁用'
                    }



                    cell.element.querySelector('input').onchange = function () {
                        dataSource.update({ id: dataItem.id, enable: this.checked })
                    }

                    return cell
                }
            }),

        ]
    })


})