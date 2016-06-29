declare namespace wuzhui {
}
declare namespace wuzhui {
    abstract class DataSource {
        inserting: Callback<DataSource, {
            item: any;
        }>;
        inserted: Callback<DataSource, {
            item: any;
        }>;
        deleting: Callback<DataSource, {
            item: any;
        }>;
        deleted: Callback<DataSource, {
            item: any;
        }>;
        updating: Callback<DataSource, {
            item: any;
        }>;
        updated: Callback<DataSource, {
            item: any;
        }>;
        selecting: Callback<DataSource, {
            selectArguments: DataSourceSelectArguments;
        }>;
        selected: Callback<DataSource, {
            selectArguments: DataSourceSelectArguments;
            items: any[];
        }>;
        constructor();
        protected executeInsert(item: any): JQueryPromise<any>;
        protected executeDelete(item: any): JQueryPromise<any>;
        protected executeUpdate(item: any): JQueryPromise<any>;
        protected executeSelect(args: any): JQueryPromise<any>;
        insert(item: any): JQueryPromise<any>;
        delete(item: any): JQueryPromise<any>;
        update(item: any): JQueryPromise<any>;
        select(args?: DataSourceSelectArguments): JQueryPromise<any>;
        canDelete: boolean;
        canInsert: boolean;
        canUpdate: boolean;
    }
    class DataSourceSelectArguments {
        private _startRowIndex;
        private _totalRowCount;
        private _maximumRows;
        private _sortExpression;
        constructor(params?: {
            startRowIndex?: number;
            maximumRows?: number;
        });
        startRowIndex: number;
        totalRowCount: number;
        maximumRows: number;
        sortExpression: string;
    }
    type WebDataSourceArguments = {
        selectUrl: string;
        insertUrl?: string;
        updateUrl?: string;
        deleteUrl?: string;
    };
    class WebDataSource extends DataSource {
        private args;
        constructor(args: WebDataSourceArguments);
        canDelete: boolean;
        canInsert: boolean;
        canUpdate: boolean;
        protected executeInsert(item: any): JQueryPromise<any>;
        protected executeDelete(item: any): JQueryPromise<any>;
        protected executeUpdate(item: any): JQueryPromise<any>;
        protected executeSelect(args: any): JQueryPromise<any>;
        private formatData(data);
    }
}
declare namespace wuzhui {
    class Errors {
        constructor(parameters: any);
        static notImplemented(message?: string): Error;
        static argumentNull(paramName: any): Error;
        static controllBelonsAnother(): Error;
    }
}
declare namespace wuzhui {
    interface DataControlFieldParams {
        footerText?: string;
        headerText?: string;
        nullText?: string;
        cellHtml?: (dataItem: any) => string;
        itemStyle?: string | CSSStyleDeclaration;
        headerStyle?: string | CSSStyleDeclaration;
        footerStyle?: string | CSSStyleDeclaration;
        visible?: boolean;
    }
    class DataControlField {
        private _footerText;
        private _headerText;
        private _nullText;
        private _cellHtml;
        private _itemStyle;
        private _headerStyle;
        private _footerStyle;
        private _visible;
        constructor(params?: DataControlFieldParams);
        footerText: string;
        headerText: string;
        nullText: string;
        cellHtml: (dataItem: any) => string;
        itemStyle: string | CSSStyleDeclaration;
        footerStyle: string | CSSStyleDeclaration;
        headerStyle: string | CSSStyleDeclaration;
        visible: boolean;
    }
    interface BoundFieldParams extends DataControlFieldParams {
        sortExpression?: string;
        dataField: string;
        dataFormatString?: string;
    }
    class BoundField extends DataControlField {
        private _dataField;
        private _sortExpression;
        private _dataFormatString;
        constructor(params: BoundFieldParams);
        private getCellHtml(dataItem);
        private formatValue(...args);
        private formatDate(value, format);
        private formatNumber(value, format);
        sortExpression: string;
        dataField: string;
        dataFormatString: string;
    }
}
declare namespace wuzhui {
    class WebControl {
        private _text;
        private _visible;
        private _element;
        private _parent;
        constructor(element: HTMLElement);
        html: string;
        visible: boolean;
        element: HTMLElement;
        parent: WebControl;
        appendChild(child: WebControl): void;
        style(value: CSSStyleDeclaration | string): void;
    }
}
declare namespace wuzhui {
    class GridView extends WebControl {
        private _pageSize;
        private _selectedRowStyle;
        private _showFooter;
        private _showHeader;
        private _columns;
        private dataSource;
        private _header;
        private _footer;
        private _body;
        private pagerSettings;
        headerStyle: string;
        footerStyle: string;
        rowStyle: string;
        alternatingRowStyle: string;
        emptyDataRowStyle: string;
        constructor(params: {
            dataSource: DataSource;
            columns: Array<DataControlField>;
            showHeader?: boolean;
            showFooter?: boolean;
            allowPaging?: boolean;
        });
        pageSize: number;
        columns: DataControlField[];
        private handleEdit(row);
        private handleInsert(row);
        private handlePage(pageIndex);
        private handleSelect(row);
        private handleSort(sortExpression, sortDirection);
        private handleUpdate(row);
        private createDataRow(dataItem);
        private appendHeaderRow();
        private appendFooterRow();
        private appendPagingBar();
        private createCell();
        private on_selectExecuted(items, args);
    }
}
declare namespace wuzhui {
    enum PagerPosition {
        Bottom = 0,
        Top = 1,
        TopAndBottom = 2,
    }
    enum PagerButtons {
        NextPrevious = 0,
        Numeric = 1,
        NextPreviousFirstLast = 2,
        NumericFirstLast = 3,
    }
    class PagerSettings {
        private _FirstPageText;
        private _LastPageText;
        private _Mode;
        private _NextPageText;
        private _pageButtonCount;
        private _position;
        private _PreviousPageText;
        private _Visible;
        constructor();
        firstPageText: string;
        lastPageText: string;
        mode: PagerButtons;
        nextPageText: string;
        pageButtonCount: number;
        position: PagerPosition;
        previousPageText: string;
        visible: boolean;
    }
    class PagingBar {
        private _pageIndex;
        private _dataSource;
        private _totalRowCount;
        private _pageSize;
        init(dataSource: DataSource): void;
        pageCount: number;
        pageSize: number;
        pageIndex: number;
        totalRowCount: number;
        render(): void;
    }
    class NumberPagingBar extends PagingBar {
        private dataSource;
        private pagerSettings;
        private element;
        private _buttons;
        private _selectArgument;
        private sortExpression;
        private cell;
        private totalElement;
        constructor(dataSource: DataSource, pagerSettings: PagerSettings, element: any, selectArgument?: DataSourceSelectArguments);
        init(dataSource: any): void;
        selectArgument(): DataSourceSelectArguments;
        render(): void;
    }
}
declare namespace wuzhui {
    interface Callback<S, A> {
        add(callbacks: (sender: S, args: A) => any): Callback<S, A>;
        disable(): Callback<S, A>;
        disabled(): boolean;
        empty(): Callback<S, A>;
        fire(sender: S, args: A): Callback<S, A>;
        fired(): boolean;
        fireWith(context: any, [S, A]: [any, any]): Callback<S, A>;
        has(callback: Function): boolean;
        lock(): Callback<S, A>;
        locked(): boolean;
        remove(callbacks: Function): Callback<S, A>;
        remove(callbacks: Function[]): Callback<S, A>;
    }
    function ajax(url: string, data: any): JQueryDeferred<{}>;
}
