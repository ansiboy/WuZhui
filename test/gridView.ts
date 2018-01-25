
let w = wuzhui;
let baseUrl = 'http://shop.alinq.cn/AdminServices/Shop/Product/';
let dataSource = new wuzhui.WebDataSource({
    primaryKeys: ['Id'],
    select: () => Promise.resolve([])
    // select: baseUrl + 'GetProducts',
    // update: baseUrl + 'SaveProduct',
    // insert: baseUrl + 'SaveProduct',
    // delete: baseUrl + 'DeleteProduct'
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

let headerElement = gridView.element.tHead.rows[0] as HTMLElement;
let footerElement = gridView.element.tFoot.rows[0] as HTMLElement; 
QUnit.test('gridView header and footer', (assert) => {
    assert.notEqual(headerElement, null);
    assert.notEqual(footerElement, null);

    let headerRow = wuzhui.Control.getControlByElement(headerElement);
    let footerRow = wuzhui.Control.getControlByElement(footerElement);
    assert.equal(headerRow instanceof wuzhui.GridViewRow, true);
    assert.equal(footerRow instanceof wuzhui.GridViewRow, true);
})

var pagingBarElement = document.createElement('div');
pagingBarElement.className = 'pagingBar';
new wuzhui.NumberPagingBar({ dataSource, element: pagingBarElement });
document.body.appendChild(pagingBarElement);
dataSource.selectArguments.maximumRows = 10;
dataSource.select();
