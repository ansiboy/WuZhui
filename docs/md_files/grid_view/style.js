define(['exports'], function (exports) {
    exports.default = function () {
        const w = wuzhui;
        var dataSource = new w.DataSource({
            select: () => Promise.resolve([
                { name: 'apple', price: 3.8 },
                { name: 'orange', price: 4.2 }
            ])
        })
        var gridView = new w.GridView({
            element: document.getElementById('style_1'),
            dataSource,
            columns: [
                new w.BoundField({
                    dataField: 'name', headerText: 'Product Name',
                    headerStyle: 'text-align:center',
                }),
                new w.BoundField({
                    dataField: 'price', headerText: 'Price',
                    headerStyle: {textAlign:'center'},
                    itemStyle: {textAlign:'right'},
                })
            ]
        })
    }
})