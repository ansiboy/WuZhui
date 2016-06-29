
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
            headerStyle: <CSSStyleDeclaration>{ textAlign: 'center' },
            footerText: '合计', footerStyle: <CSSStyleDeclaration>{ textAlign: 'center' },
            itemStyle: 'width:200px;text-align:right;',
        })
    ],
    allowPaging: true,
    showFooter: true,
});

// gridView.rowCreated.add((sender, args) => {
//     switch (args.row.rowType) {
//         case wuzhui.GridViewRowType.Header:
//             headerCreated = true;
//             break;
//         case wuzhui.GridViewRowType.Footer:
//             footerCreated = true;
//             break;
//     }
// });

//let headerCreated = false;
//let footerCreated = false;

document.body.appendChild(gridView.element);
let headerCreated = $(gridView.element).find('theader > tr').length;
QUnit.test('', (assert) => {
    assert.equal(headerCreated, true);
})

dataSource.select(new wuzhui.DataSourceSelectArguments({ maximumRows: 10 }));
