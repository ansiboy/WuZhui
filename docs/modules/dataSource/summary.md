# DataSource 概述

1. [了解数据源](#!createDataSourceObject)
1. [创建数据源对象](#!createDataSourceObject)
1. [数据源方法与事件](#!eventsAndMethods)
1. [事件的使用](#!eventsUsage)

<h2 id="!underStandDataSource">了解数据源</h2>

数据源是用于抽象对数据进行查询，添加，修改，删除的操作。

<h2 id="!createDataSourceObject">创建数据源对象</h2>

数据源的构造函数如下：

```js
class DataSource<T> {
    constructor(args: {
        primaryKeys?: string[];
        select: ((args: DataSourceSelectArguments) => Promise<SelectResult<T>>);
        insert?: ((item: T) => Promise<any>);
        update?: ((item: T) => Promise<any>);
        delete?: ((item: T) => Promise<any>);
    })
}
```

args 参数各个字段如下：

1. primaryKeys 表示数据源对象的主键，由于主键有可能是多个字段，因此它是一个数组。它是一个可选字段，只有提供 insert，update，delete 字段时才需要。即：如果只有 select 字段是不需要的。

1. select 字段是函数类型，用来获取数据。这个字段是必须的。这个函数需要一个 DataSourceSelectArguments 类型的参数，这个参数仅在需要分页或者排序的时候，需要用到，否则无需理会。一般情况下，这个参数可以直接发送到服务端，让服务端来处理。

    定义如下：

    ```js
    class DataSourceSelectArguments {
        startRowIndex?: number;
        maximumRows?: number;
        sortExpression?: string;
        filter?: string;
        constructor();
    }
    ```

    各字段如下：

    1. startRowIndex 数据开始的索引位置
    1. maximumRows 表示最大获取的记录数量
    1. sortExpression 表示排序的表达式
    1. filter 表示用来过滤的字符串

<h2 id="!eventsAndMethods">数据源方法与事件</h2>

数据源进行数据处理的方法与事件：

```js
class DataSource<T> {
    select(): Promise<void | DataSourceSelectResult<T> | T[]>;
    insert(item: T, index?: number): Promise<any>;
    delete(item: T): Promise<any>;
    update(item: T): Promise<any>;

    inserting: Callback2<DataSource<T>, T, number>;
    inserted: Callback2<DataSource<T>, T, number>;
    deleting: Callback1<DataSource<T>, T>;
    deleted: Callback1<DataSource<T>, T>;
    updating: Callback1<DataSource<T>, T>;
    updated: Callback1<DataSource<T>, T>;
    selecting: Callback1<DataSource<T>, DataSourceSelectArguments>;
    selected: Callback1<DataSource<T>, DataSourceSelectResult<T>>;
}
```

**注意**：以上定义非完整的数据源定义

### Select 方法

select 方法用来获取数据。select 方法的工作流程：

1. 引发 selecting 事件
1. 调用从构造函数传入的 select 方法
1. 成功执行传入的 select 方法后，引发 selected 事件

#### 源码

```js
select() {
    let args = this.selectArguments;
    console.assert(args != null);

    fireCallback(this.selecting, this, args);
    return this.args.select(args).then((data) => {
        let dataItems: Array<T>;
        let totalRowCount: number
        if (Array.isArray(data)) {
            totalRowCount = data.length;
        }
        else if (data.dataItems !== undefined && data.totalRowCount !== undefined) {
            dataItems = (<DataSourceSelectResult<T>>data).dataItems;
            totalRowCount = (<DataSourceSelectResult<T>>data).totalRowCount;
        }
        else {
            throw Errors.queryResultTypeError();
        }
        this.selected.fire(this, { totalRowCount, dataItems });
        return data;
    }).catch(exc => {
        this.processError(exc, 'select');
        throw exc;
    });
}
```

### Update 方法

update 方法用来更新数据源里的数据。update 方法的工作流程：

1. 引发 updating 事件
1. 调用从构造函数传入的 update 方法
1. 成功执行传入的 update 方法后，引发 updated 事件

### Insert 方法

insert 方法用来更新数据源里的数据。insert 方法的工作流程：

1. 引发 inserting 事件
1. 调用从构造函数传入的 insert 方法
1. 成功执行传入的 insert 方法后，引发 inserted 事件

### Delete 方法

delete 方法用来更新数据源里的数据。delete 方法的工作流程：

1. 引发 deleting 事件
1. 调用从构造函数传入的 delete 方法
1. 成功执行传入的 delete 方法后，引发 deleted 事件

<h2 id="!eventsUsage">事件的使用</h2>

1. selected 事件的使用
1. updated 事件的使用
1. insert 事件的使用
1. delete 事件的使用