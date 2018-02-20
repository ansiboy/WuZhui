action(function () {
    const w = wuzhui
    var items = [
        { id: 0, name: 'apple', price: 8, quantity: 3, total: 24 },
        { id: 1, name: 'orange', price: 10, quantity: 4, total: 40 },
        { id: 2, name: 'banana', price: 6.5, quantity: 3, total: 19.5 }
    ]

    let dataSource = new w.DataSource({
        select(args) {
            if (!args.sortExpression)
                return Promise.resolve(items)

            switch (args.sortExpression) {
                case 'id asc':
                    items.sort((a, b) => a.id < b.id ? -1 : 1)
                    break
                case 'id desc':
                    items.sort((a, b) => a.id < b.id ? 1 : -1)
                    break
                case 'name asc':
                    items.sort((a, b) => a.name < b.name ? -1 : 1)
                    break
                case 'name desc':
                    items.sort((a, b) => a.name < b.name ? 1 : -1)
                    break
                case 'price asc':
                    items.sort((a, b) => a.price < b.price ? -1 : 1)
                    break
                case 'price desc':
                    items.sort((a, b) => a.price < b.price ? 1 : -1)
                    break
            }
            return Promise.resolve(items)
        }
    })

    new w.GridView({
        dataSource,
        element: document.getElementById('gridView_sort_table'),
        columns: [
            new w.BoundField({ dataField: 'id', sortExpression: 'id' }),
            new w.BoundField({ dataField: 'name', sortExpression: 'name' }),
            new w.BoundField({ dataField: 'price', sortExpression: 'price' })
        ]
    })
})