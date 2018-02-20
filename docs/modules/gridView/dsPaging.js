define([
    'require',
    'exports'
], function (require, exports) {
    'use strict';
    exports.default = function () {

        const w = wuzhui
        const totalRowCount = 67
        let dataItems = [];
        for (let i = 0; i < totalRowCount; i++) {
            let id = i;
            let name = `name ${i}`
            let value = `value ${i}`
            dataItems.push({ id, name, value })
        }

        let dataSource = new w.DataSource({
            select(args) {
                let startIndex = args.startRowIndex;
                let count = args.maximumRows;
                let items = dataItems.filter((o, i) => i >= startIndex && i < startIndex + count)
                let result = {
                    dataItems: items,
                    totalRowCount
                }
                return Promise.resolve(result)
            }
        })

        // 设置最多返回的记录数量
        dataSource.selectArguments.maximumRows = 5;

        new w.GridView({
            dataSource,
            element: document.getElementById('dsPaging_table'),
            columns: [
                new w.BoundField({ dataField: 'name' }),
                new w.BoundField({ dataField: 'value' })
            ]
        })

        let form = document.getElementById('dsPaging_form')
        let btn = document.getElementById('dsPaging_btn')
        btn.onclick = function () {
            let paging_number = Number.parseInt(form['number'].value)
            dataSource.selectArguments.startRowIndex = dataSource.selectArguments.maximumRows * paging_number
            dataSource.select()
        }

    }
});