action(function () {
    const w = wuzhui;
    var dataSource = new w.DataSource({
        select: () => Promise.resolve([
            { name: 'tom', age: 8 },
            { name: 'may', age: 10 }
        ])
    })
    new w.GridView({
        element: document.getElementById('boundField_table'),
        dataSource,
        columns: [
            new w.BoundField({ dataField: 'name', headerText: '姓名' }),
            new w.BoundField({ dataField: 'age', headerText: '年龄' })
        ]
    })
})