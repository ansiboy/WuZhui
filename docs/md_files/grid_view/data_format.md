## 数据格式化

使用 dataFormatString 字段可以设置数据的格式，支持数字和日期的格式化。dataFormatString 字符串由花括号和格式组成，即：{格式}，通过不同在格式，输出相应在字符串。 

**数字的格式化**

* {C数字}， 表示保留小数在位数，其中的数字表示小数位数。例如：{C2} 表示保留两位小数。

**日期的格式化**

* {d}，表示输出日期 年-月-日，例如：2015-1-1
* {g}，表示输出日期 年-月-日 时:分，例如：2015-1-1 2:5
* {G}，表示输出日期 年-月-日 时:分:秒，例如：2015-1-1 2:5:12
* {t}，表示输出日期 时:分，例如：2:5
* {T}，表示输出日期 时:分:秒，例如：2:5:12


**示例**

<table id="data_format_1" class="table"></table>

```js
const w = wuzhui;
var items = [
    { id: 0, name: 'apple', price: 8, date: new Date(Date.parse('2015-1-9')) },
    { id: 1, name: 'orange', price: 10, date: new Date(Date.parse('2015-2-8')) },
    { id: 2, name: 'banana', price: 6.5, date: new Date(Date.parse('2015-3-4')) }
]
var dataSource = new w.DataSource({
    select() {
        return new Promise((resolve, reject) => {
            resolve(items);
        })
    }
})

var gridView = new w.GridView({
    element: document.getElementById('data_format_1'),
    dataSource,
    showHeader: false,
    columns: [
        new w.BoundField({ dataField: 'name', headerStyle: { textAlign: 'center' } }),
        new w.BoundField({ dataField: 'price', headerStyle: { textAlign: 'center' }, 
                           itemStyle: { textAlign: 'right' }, dataFormatString: '¥{C2}' }),
        new w.BoundField({ dataField: 'date', headerStyle: { textAlign: 'center' }, 
                           itemStyle: { textAlign: 'right' }, dataFormatString: '有效日期：{d}' })
    ]
})
```
