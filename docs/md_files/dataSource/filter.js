define(['exports'], function (exports) {
    exports.default = function () {
        const w = wuzhui;
        let dataSource = new w.DataSource({
            select(args) {

            }
        });

        dataSource.selectArguments.maximumRows = 8;
        dataSource.selectArguments.startRowIndex = 8;
    }
})