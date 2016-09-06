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
        static dataSourceCanntInsert(): Error;
        static dataSourceCanntUpdate(): Error;
        static dataSourceCanntDelete(): Error;
    }
}
declare namespace wuzhui {
    class GridViewCell extends Control {
        private _field;
        constructor(field: DataControlField);
        field: DataControlField;
    }
    interface DataControlFieldParams {
        footerText?: string;
        headerText?: string;
        nullText?: string;
        itemStyle?: string | CSSStyleDeclaration;
        headerStyle?: string | CSSStyleDeclaration;
        footerStyle?: string | CSSStyleDeclaration;
        visible?: boolean;
    }
    class DataControlField {
        private _gridView;
        protected _params: DataControlFieldParams;
        constructor(params?: DataControlFieldParams);
        footerText: string;
        headerText: string;
        nullText: string;
        itemStyle: string | CSSStyleDeclaration;
        footerStyle: string | CSSStyleDeclaration;
        headerStyle: string | CSSStyleDeclaration;
        visible: boolean;
        gridView: GridView;
        createHeaderCell(): GridViewCell;
        createFooterCell(): GridViewCell;
        createItemCell(dataItem: any): GridViewCell;
    }
}
declare namespace wuzhui {
    class GridViewEditableCell extends GridViewCell {
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
        setControlValue(value: any): void;
        getControlValue(): any;
        private getCellHtml(value);
        private formatValue(...args);
        private formatDate(value, format);
        private formatNumber(value, format);
    }
    interface BoundFieldParams extends DataControlFieldParams {
        sortExpression?: string;
        dataField: string;
        dataFormatString?: string;
        controlStyle?: CSSStyleDeclaration | string;
        headerHTML?: (sortType?: 'asc' | 'desc') => string;
    }
    class BoundField extends DataControlField {
        private _sortType;
        private _valueElement;
        constructor(params: BoundFieldParams);
        private params();
        createHeaderCell(): any;
        private headerHTML(sortType);
        createItemCell(dataItem: any): GridViewCell;
        private handleSort();
        sortExpression: string;
        dataField: string;
        dataFormatString: string;
        controlStyle: CSSStyleDeclaration | string;
    }
}
declare namespace wuzhui {
    interface CommandFieldParams extends DataControlFieldParams {
        showEditButton?: boolean;
        showNewButton?: boolean;
        showDeleteButton?: boolean;
        cancelButtonHTML?: string;
        deleteButtonHTML?: string;
        editButtonHTML?: string;
        newButtonHTML?: string;
        updateButtonHTML?: string;
        insertButtonHTML?: string;
        cancelButtonClass?: string;
        deleteButtonClass?: string;
        editButtonClass?: string;
        newButtonClass?: string;
        updateButtonClass?: string;
        insertButtonClass?: string;
        handleUpdate?: () => JQueryPromise<any>;
    }
    class CommandField extends DataControlField {
        private _updating;
        private _deleting;
        constructor(params?: CommandFieldParams);
        private params();
        cancelButtonHTML: string;
        deleteButtonHTML: string;
        editButtonHTML: string;
        updateButtonHTML: string;
        newButtonHTML: string;
        insertButtonHTML: string;
        cancelButtonClass: string;
        deleteButtonClass: string;
        editButtonClass: string;
        newButtonClass: string;
        updateButtonClass: string;
        insertButtonClass: string;
        createItemCell(dataItem: any): GridViewCell;
        private createEditButton();
        private createDeleteButton();
        private createInsertButton();
        private createUpdateButton();
        private createCancelButton();
        private createNewButton();
        private on_editButtonClick(e);
        private on_cancelButtonClick(e);
        private on_updateButtonClick(e);
        private on_deleteButtonClick(e);
    }
}
declare namespace wuzhui {
    interface CustomFieldParams extends DataControlFieldParams {
        createHeaderCell?: () => GridViewCell;
        createFooterCell?: () => GridViewCell;
        createItemCell: (dataItem: any) => GridViewCell;
    }
    class CustomField extends DataControlField {
        constructor(params: CustomFieldParams);
        private params();
        createHeaderCell(): GridViewCell;
        createFooterCell(): GridViewCell;
        createItemCell(dataItem: any): GridViewCell;
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
        private _gridView;
        constructor(rowType: GridViewRowType);
        rowType: GridViewRowType;
        gridView: GridView;
    }
    class GridViewDataRow extends GridViewRow {
        private _dataItem;
        constructor(gridView: GridView, dataItem: any);
        dataItem: any;
    }
    interface GridViewArguments {
        dataSource: DataSource;
        columns: Array<DataControlField>;
        showHeader?: boolean;
        showFooter?: boolean;
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
        private _emptyRow;
        private _body;
        static emtpyRowClassName: string;
        static dataRowClassName: string;
        headerStyle: string;
        footerStyle: string;
        rowStyle: string;
        alternatingRowStyle: string;
        emptyDataRowStyle: string;
        rowCreated: Callback<GridView, {
            row: GridViewRow;
        }>;
        constructor(params: GridViewArguments);
        columns: DataControlField[];
        dataSource: DataSource;
        private appendEmtpyRow();
        private appendDataRow(dataItem);
        private appendHeaderRow();
        private appendFooterRow();
        private on_selectExecuted(items, args);
        private clearDataRows();
        private on_updateExecuted(items);
        private showEmptyRow();
        private hideEmtpyRow();
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
    interface PagerSettings {
        firstPageText?: string;
        lastPageText?: string;
        nextPageText?: string;
        pageButtonCount?: number;
        previousPageText?: string;
        mode?: PagerButtons;
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
    var ajaxTimeout: number;
    function ajax(url: string, data: any): JQueryPromise<any>;
    function applyStyle(element: HTMLElement, value: CSSStyleDeclaration | string): void;
    function callbacks<S, A>(): Callback<S, A>;
    function fireCallback<S, A>(callback: Callback<S, A>, sender: S, args: A): Callback<S, A>;
}
