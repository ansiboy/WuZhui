
let dataSource = new wuzhui.WebDataSource({
    selectUrl: 'http://shop.alinq.cn/UserServices/Site/Home/GetHomeProducts?pageIndex=0'
});

let select_arguments = new wuzhui.DataSourceSelectArguments();
let selecting_event_fired = false;
let selected_event_fired = false;

dataSource.selecting.add((sender, args) => {
    selecting_event_fired = true;
});
dataSource.selected.add((sender, args) => {
    QUnit.test("", (assert) => {
        assert.notEqual(args, null);
    })
    selected_event_fired = true;
})

QUnit.asyncTest('Select 事件测试', (assert) => {
    dataSource.select(select_arguments).done(() => {
        assert.equal(selecting_event_fired, true, 'selecting 事件触发');
        assert.equal(selected_event_fired, true, 'selected 事件触发');
        QUnit.start();
    });
});


export = dataSource;