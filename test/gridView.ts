//import w = require('wuzhui');
let w = wuzhui;
let dataSource = new wuzhui.WebDataSource({
    selectUrl: 'http://shop.alinq.cn/UserServices/Site/Home/GetHomeProducts?pageIndex=0'
});

var col_name = <wuzhui.BoundField>{ headerText: '名称', dataField: 'Name' }
let gridView = new wuzhui.GridView(dataSource, [
    <wuzhui.BoundField>{ headerText: '名称', dataField: 'Name' },
    <wuzhui.BoundField>{ headerText: '价格', dataField: 'Price' }
]);

document.body.appendChild(gridView.element);

dataSource.select();