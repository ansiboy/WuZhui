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
            arguments: DataSourceSelectArguments;
        }>;
        selected: Callback<DataSource, {
            arguments: DataSourceSelectArguments;
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
        private _retrieveTotalRowCount;
        private _sortExpression;
        constructor();
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
        static notImplemented(): Error;
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
    }
    class DataControlField {
        private _footerText;
        private _headerText;
        private _nullText;
        private _cellHtml;
        constructor(params?: DataControlFieldParams);
        footerText: string;
        headerText: string;
        nullText: string;
        cellHtml: (dataItem: any) => string;
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
        headerStyle: string;
        footerStyle: string;
        rowStyle: string;
        alternatingRowStyle: string;
        emptyDataRowStyle: string;
        constructor(dataSource: DataSource, columns: Array<DataControlField>);
        pageSize: number;
        selectedRowStyle: string;
        showFooter: boolean;
        showHeader: boolean;
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
        private createCell();
        private on_select_executed(items, args);
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
