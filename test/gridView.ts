
let w = wuzhui;
let dataSource = new wuzhui.WebDataSource({
    selectUrl: 'http://shop.alinq.cn/AdminServices/Shop/Product/GetProducts'
});

let gridView = new wuzhui.GridView({
    dataSource,
    columns: [
        new wuzhui.BoundField({ headerText: '名称', dataField: 'Name' }),
        new wuzhui.BoundField({
            headerText: '价格', dataField: 'Price', dataFormatString: '￥{0:C2}',
            itemStyle: 'width:200px;text-align:right;',
            headerStyle: <CSSStyleDeclaration>{ textAlign: 'center' }
        })
    ],
    allowPaging: true
});

document.body.appendChild(gridView.element);

dataSource.select(new wuzhui.DataSourceSelectArguments({ maximumRows: 10 }));