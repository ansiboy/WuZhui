define(['exports'], function (exports) {
    exports.default = function () {
        const w = wuzhui;
        var dataSource = new w.DataSource({
            select: () => Promise.resolve([
                { name: 'tom', age: 8 },
                { name: 'may', age: 10 }
            ])
        })
        var gridView = new w.GridView({
            element: document.getElementById('data_read_1'),
            dataSource,
            columns: [
                new w.BoundField({ dataField: 'name', headerText: '姓名' }),
                new w.BoundField({ dataField: 'age', headerText: '年龄' })
            ]
        })
    }
})