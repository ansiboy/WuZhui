# 包装按钮

使用 pagerSettings 的 buttonWrapper 属性，可以为按钮包裹在一个 HTML 元素里

## 示例

<table id="buttonWrapper_table" class="table"></table>
<ul id="buttonWrapper_bar" class="pagination"></ul>

## 源码

### HTML

```html
<ul id="buttonWrapper_bar" class="pagination"></ul>
```

### JS

```js
new w.NumberPagingBar({
    dataSource,
    element: document.getElementById('buttonWrapper_bar'),
    pagerSettings: {
        activeButtonClassName: 'active',
        buttonWrapper: 'li',
        showTotal: false
    }
})
```