declare namespace wuzhui {
    class Control {
        private _text;
        private _visible;
        private _element;
        constructor(element: HTMLElement);
        html: string;
        visible: boolean;
        element: HTMLElement;
        appendChild(child: Control | HTMLElement): void;
        style(value: CSSStyleDeclaration | string): void;
        static getControlByElement(element: HTMLElement): Control;
    }
}
declare namespace wuzhui {
    abstract class DataSource {
        private _currentSelectArguments;
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
        currentSelectArguments: DataSourceSelectArguments;
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
        static columnsCanntEmpty(): Error;
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
        private _gridView;
        constructor(params?: DataControlFieldParams);
        protected footerText: string;
        protected headerText: string;
        nullText: string;
        protected itemStyle: string | CSSStyleDeclaration;
        protected footerStyle: string | CSSStyleDeclaration;
        protected headerStyle: string | CSSStyleDeclaration;
        visible: boolean;
        gridView: GridView;
        createHeaderCell(): GridViewCell;
        createFooterCell(): GridViewCell;
        createDataCell(dataItem: any): GridViewCell;
    }
    interface CommandFieldParams extends DataControlFieldParams {
        showEditButton?: boolean;
        showInsertButton?: boolean;
        showDeleteButton?: boolean;
        showUpdateButton?: boolean;
    }
    class CommandField extends DataControlField {
        private params;
        constructor(params?: CommandFieldParams);
        createDataCell(dataItem: any): GridViewCell;
        createEditButton(): HTMLElement;
        createDeleteButton(): HTMLElement;
        createInsertButton(): HTMLElement;
        createUpdateButton(): HTMLElement;
        createCancelButton(): HTMLElement;
        private on_editButtonClick(e);
        private on_cancelButtonClick(e);
        private on_updateButtonClick(e);
    }
    interface BoundFieldParams extends DataControlFieldParams {
        sortExpression?: string;
        dataField: string;
        dataFormatString?: string;
        controlStyle?: CSSStyleDeclaration | string;
        headerHTML?: (sortType?: 'asc' | 'desc') => string;
    }
    class GridViewCell extends Control {
        constructor();
    }
    class GridViewEditableCell extends GridViewCell {
        private _field;
        private _dataItem;
        private _valueElement;
        private _editorElement;
        private _value;
        private _valueType;
        constructor(field: BoundField, dataItem: any);
        beginEdit(): void;
        endEdit(): void;
        cancelEdit(): void;
        value: any;
        createControl(): HTMLElement;
        setControlValue(control: HTMLElement, value: any): void;
        getControlValue(control: HTMLElement): any;
        private getCellHtml(value);
        private formatValue(...args);
        private formatDate(value, format);
        private formatNumber(value, format);
    }
    class BoundField extends DataControlField {
        private _sortType;
        private _valueElement;
        private _params;
        constructor(params: BoundFieldParams);
        createHeaderCell(): GridViewCell;
        private headerHTML(sortType);
        createDataCell(dataItem: any): GridViewEditableCell;
        private handleSort();
        sortExpression: string;
        dataField: string;
        dataFormatString: string;
        controlStyle: CSSStyleDeclaration | string;
    }
    class TextBoxField extends BoundField {
        beginEdit(cell: GridViewCell, value: any): void;
        endEdit(): void;
    }
}
declare namespace wuzhui {
    enum GridViewRowType {
        Header = 0,
        Footer = 1,
        Data = 2,
        Paging = 3,
        Empty = 4,
    }
    class GridViewRow extends Control {
        private _rowType;
        constructor(rowType: GridViewRowType);
        rowType: GridViewRowType;
    }
    class GridViewDataRow extends GridViewRow {
        private _dataItem;
        constructor(gridView: GridView, dataItem: any);
        dataItem: any;
    }
    class GridView extends Control {
        private _pageSize;
        private _selectedRowStyle;
        private _showFooter;
        private _showHeader;
        private _columns;
        private _dataSource;
        private _header;
        private _footer;
        private _body;
        headerStyle: string;
        footerStyle: string;
        rowStyle: string;
        alternatingRowStyle: string;
        emptyDataRowStyle: string;
        rowCreated: Callback<GridView, {
            row: GridViewRow;
        }>;
        constructor(params: {
            dataSource: DataSource;
            columns: Array<DataControlField>;
            showHeader?: boolean;
            showFooter?: boolean;
        });
        columns: DataControlField[];
        dataSource: DataSource;
        private handleEdit(row);
        private handleInsert(row);
        private handlePage(pageIndex);
        private handleSelect(row);
        private handleSort(sortExpression, sortDirection);
        private handleUpdate(row);
        private appendDataRow(dataItem);
        private appendHeaderRow();
        private appendFooterRow();
        private on_selectExecuted(items, args);
        private on_updateExecuted(items);
        private showEmptyRow();
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
        private sortExpression;
        private cell;
        private totalElement;
        constructor(dataSource: DataSource, pagerSettings: PagerSettings, element: any);
        init(dataSource: any): void;
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
    function applyStyle(element: HTMLElement, value: CSSStyleDeclaration | string): void;
    function callbacks<S, A>(): Callback<S, A>;
    function fireCallback<S, A>(callback: Callback<S, A>, sender: S, args: A): Callback<S, A>;
}
