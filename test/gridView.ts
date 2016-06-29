//import w = require('wuzhui');
let w = wuzhui;
let dataSource = new wuzhui.WebDataSource({
    selectUrl: 'http://shop.alinq.cn/UserServices/Site/Home/GetHomeProducts?pageIndex=0'
});

let gridView = new wuzhui.GridView(dataSource, [
    new wuzhui.BoundField({ headerText: '名称', dataField: 'Name' }),
    new wuzhui.BoundField({ headerText: '价格', dataField: 'Price', dataFormatString: '￥{0:C2}' })
]);

document.body.appendChild(gridView.element);

dataSource.select();