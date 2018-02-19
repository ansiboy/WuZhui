define(['exports'], function (exports) {
    exports.default = function () {
        const w = wuzhui;

        let items = [
            { id: 0, name: 'apple', price: 8, quantity: 3, total: 24 },
            { id: 1, name: 'orange', price: 10, quantity: 4, total: 40 },
            { id: 2, name: 'banana', price: 6.5, quantity: 3, total: 19.5 }
        ]
        let dataSource = new w.DataSource({
            primaryKeys: ['id'],
            select() {
                return Promise.resolve(items);
            },
            delete(value) {
                //TODO: 删除数据
                return Promise.resolve({});
            }
        })
        new w.GridView({
            dataSource,
            element: document.getElementById('dsDelete_table'),
            columns: [
                new w.BoundField({ dataField: 'id' }),
                new w.BoundField({ dataField: 'name' }),
                new w.BoundField({ dataField: 'price' }),
                new w.BoundField({ dataField: 'quantity' }),
                new w.BoundField({ dataField: 'total' })
            ]
        })
        let btn = document.getElementById('dsDelete_btn')
        let form = document.getElementById('dsDelete_form')
        btn.onclick = function () {
            let id = Number.parseInt(form['id'].value)
            dataSource.delete({ id });
        }
    }
})