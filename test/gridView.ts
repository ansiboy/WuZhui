
let w = wuzhui;
let dataSource = new wuzhui.WebDataSource({
    selectUrl: 'http://shop.alinq.cn/AdminServices/Shop/Product/GetProducts'
});



let gridView = new wuzhui.GridView({
    dataSource,
    columns: [
        new wuzhui.BoundField({ dataField: 'Id', visible: false }),
        new wuzhui.BoundField({
            headerText: '名称', dataField: 'Name',
            sortExpression: 'Name'
        }),
        new wuzhui.BoundField({
            headerText: '价格', dataField: 'Price', dataFormatString: '￥{0:C2}',
            headerStyle: <CSSStyleDeclaration>{ textAlign: 'center' },
            footerText: '合计', footerStyle: <CSSStyleDeclaration>{ textAlign: 'center' },
            itemStyle: 'width:140px;text-align:right;',
            sortExpression: 'Price'
        }),
        new wuzhui.CommandField({
            showEditButton: true, showDeleteButton: true,
            itemStyle: 'width:120px;text-align:center'
        })
    ],
    showFooter: true,
});

gridView.element.style.width = '100%';
document.body.appendChild(gridView.element);

let headerElement = $(gridView.element).find('thead > tr')[0];
let footerElement = $(gridView.element).find('tfoot > tr')[0];
QUnit.test('gridView header and footer', (assert) => {
    assert.notEqual(headerElement, null);
    assert.notEqual(footerElement, null);

    let headerRow = wuzhui.Control.getControlByElement(headerElement); //$(headerElement).data('Control');
    let footerRow = wuzhui.Control.getControlByElement(footerElement); //$(footerElement).data('Control');
    assert.equal(headerRow instanceof wuzhui.GridViewRow, true);
    assert.equal(footerRow instanceof wuzhui.GridViewRow, true);
})

var pagingBarElement = document.createElement('div');
new wuzhui.NumberPagingBar(dataSource, new wuzhui.PagerSettings(), pagingBarElement);
document.body.appendChild(pagingBarElement);

dataSource.select(new wuzhui.DataSourceSelectArguments({ maximumRows: 10 }));
