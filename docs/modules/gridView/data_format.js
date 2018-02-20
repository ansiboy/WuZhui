action(function () {
    const w = wuzhui;
    var items = [
        { id: 0, name: 'apple', price: 8, date: new Date(Date.parse('2015-1-9')) },
        { id: 1, name: 'orange', price: 10, date: new Date(Date.parse('2015-2-8')) },
        { id: 2, name: 'banana', price: 6.5, date: new Date(Date.parse('2015-3-4')) }
    ]
    var dataSource = new w.DataSource({
        async select() {
            return items;
        }
    })

    var gridView = new w.GridView({
        element: document.getElementById('data_format_1'),
        dataSource,
        showHeader: false,
        columns: [
            new w.BoundField({ dataField: 'name', headerStyle: { textAlign: 'center' } }),
            new w.BoundField({ dataField: 'price', headerStyle: { textAlign: 'center' }, itemStyle: { textAlign: 'right' }, dataFormatString: '¥{C2}' }),
            new w.BoundField({ dataField: 'date', headerStyle: { textAlign: 'center' }, itemStyle: { textAlign: 'right' }, dataFormatString: '有效日期：{d}' })
        ]
    })
})