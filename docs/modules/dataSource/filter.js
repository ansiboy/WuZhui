action(function () {
    const w = wuzhui;

    var items = [
        { id: 0, name: 'apple', price: 8, quantity: 3, total: 24 },
        { id: 1, name: 'orange', price: 10, quantity: 4, total: 40 },
        { id: 2, name: 'banana', price: 6.5, quantity: 3, total: 19.5 }
    ]

    let dataSource = new w.DataSource({
        select(args) {
            if (!args.filter)
                return Promise.resolve(items)

            var q = items.filter(o => o.name == args.filter)
            return Promise.resolve(q)
        }
    })

    new w.GridView({
        dataSource,
        element: document.getElementById('dataSource_filter_table'),
        columns: [
            new w.BoundField({ dataField: 'id' }),
            new w.BoundField({ dataField: 'name' }),
            new w.BoundField({ dataField: 'price' })
        ]
    })

    let form = document.getElementById('dataSource_filter_form')
    form['btn'].onclick = function () {
        dataSource.selectArguments.filter = form['search_text'].value
        dataSource.select()
    }

})