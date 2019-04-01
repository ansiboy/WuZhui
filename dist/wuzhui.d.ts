declare namespace wuzhui {
    class Control<T extends HTMLElement> {
        private _text;
        private _visible;
        private _element;
        constructor(element: T);
        visible: boolean;
        readonly element: T;
        appendChild(child: Control<any> | HTMLElement, index?: number): void;
        style(value: Partial<CSSStyleDeclaration> | string): void;
        static getControlByElement(element: HTMLElement): Control<any>;
    }
}
declare namespace wuzhui {
    interface DataSourceSelectResult<T> {
        totalRowCount: number;
        dataItems: Array<T>;
    }
    interface DataSourceError extends Error {
        handled: boolean;
        method: DataMethod;
    }
    type DataMethod = 'select' | 'update' | 'delete' | 'insert';
    class DataSource<T> {
        private args;
        private primaryKeys;
        inserting: Callback2<DataSource<T>, T, number>;
        inserted: Callback2<DataSource<T>, T, number>;
        deleting: Callback1<DataSource<T>, T>;
        deleted: Callback1<DataSource<T>, T>;
        updating: Callback1<DataSource<T>, T>;
        updated: Callback1<DataSource<T>, T>;
        selecting: Callback1<DataSource<T>, DataSourceSelectArguments>;
        selected: Callback1<DataSource<T>, DataSourceSelectResult<T>>;
        error: Callback1<this, DataSourceError>;
        constructor(args: DataSourceArguments<T>);
        readonly canDelete: boolean;
        readonly canInsert: boolean;
        readonly canUpdate: boolean;
        executeInsert(item: T, args?: any): Promise<any>;
        executeDelete(item: T, args?: any): Promise<any>;
        executeUpdate(item: T, args?: any): Promise<any>;
        executeSelect(args: DataSourceSelectArguments): Promise<DataSourceSelectResult<T>>;
        insert(item: T): any;
        insert(item: T, index?: number): any;
        delete(item: T, args?: any): Promise<any>;
        update(item: T, args?: any): Promise<any>;
        isSameItem(theItem: T, otherItem: Partial<T>): boolean;
        private checkPrimaryKeys;
        select(args: DataSourceSelectArguments): Promise<DataSourceSelectResult<T>>;
        private processError;
    }
    class DataSourceSelectArguments {
        startRowIndex?: number;
        maximumRows?: number;
        sortExpression?: string;
        filter?: string;
        constructor();
    }
    type DataSourceArguments<T> = {
        primaryKeys?: (keyof T)[];
        select: ((args: DataSourceSelectArguments) => Promise<DataSourceSelectResult<T>>);
        insert?: ((item: Partial<T>, args?: any) => Promise<any>);
        update?: ((item: Partial<T>, args?: any) => Promise<any>);
        delete?: ((item: Partial<T>, args?: any) => Promise<any>);
    };
    class ArrayDataSource<T> extends DataSource<T> {
        constructor(items: T[]);
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
        static primaryKeyNull(key: string): Error;
        static queryResultTypeError(): Error;
    }
}
declare namespace wuzhui {
    enum GridViewRowType {
        Header = 0,
        Footer = 1,
        Data = 2,
        Paging = 3,
        Empty = 4
    }
    class GridViewRow extends Control<HTMLTableRowElement> {
        private _rowType;
        private _gridView;
        constructor(rowType: GridViewRowType);
        readonly rowType: GridViewRowType;
        readonly gridView: GridView<any>;
        readonly cells: GridViewCell[];
    }
    class GridViewDataRow extends GridViewRow {
        private _dataItem;
        constructor(gridView: GridView<any>, dataItem: any);
        readonly dataItem: any;
    }
    interface GridViewArguments<T> {
        dataSource: DataSource<T>;
        columns: Array<DataControlField<T>>;
        showHeader?: boolean;
        showFooter?: boolean;
        element?: HTMLTableElement;
        emptyDataRowStyle?: string;
        pageSize?: number;
        pagerSettings?: PagerSettings;
        emptyDataHTML?: string;
        initDataHTML?: string;
    }
    class GridView<T> extends Control<HTMLTableElement> {
        private _columns;
        private _dataSource;
        private _header;
        private _footer;
        private _body;
        private _emtpyRow;
        private _currentSortCell;
        private _params;
        static emptyRowClassName: string;
        static dataRowClassName: string;
        static pagingBarClassName: string;
        private emptyDataHTML;
        private initDataHTML;
        private loadFailHTML;
        rowCreated: Callback1<GridView<T>, {
            row: GridViewRow;
        }>;
        private pagingBar;
        readonly selectArguments: DataSourceSelectArguments;
        constructor(params: GridViewArguments<T>);
        private createPagingBar;
        readonly columns: DataControlField<T>[];
        readonly dataSource: DataSource<T>;
        private appendEmptyRow;
        appendDataRow(dataItem: any, index?: number): GridViewDataRow;
        private on_sort;
        private appendHeaderRow;
        private appendFooterRow;
        private on_selectExecuted;
        private on_updateExecuted;
        private on_insertExecuted;
        private on_deleteExecuted;
        private showEmptyRow;
        private hideEmptyRow;
    }
}
declare namespace wuzhui {
    enum PagerPosition {
        Bottom = 0,
        Top = 1,
        TopAndBottom = 2
    }
    interface PagerSettings {
        /** The text to display for the first-page button. */
        firstPageText?: string;
        /** The text to display for the last-page button. */
        lastPageText?: string;
        /** The text to display for the last-page button. */
        nextPageText?: string;
        /** The number of page buttons to display in the pager when the Mode property is set to the Numeric or NumericFirstLast value. */
        pageButtonCount?: number;
        /** The text to display for the previous-page button. */
        previousPageText?: string;
        /** Class name of the number buttons. */
        buttonClassName?: string;
        /** Class name of the active number button. */
        activeButtonClassName?: string;
        buttonContainerWraper?: string;
        buttonContainerClassName?: string;
        buttonWrapper?: string;
        showTotal?: boolean;
    }
    abstract class PagingBar {
        private _pageIndex;
        private _totalRowCount;
        private _pageSize;
        private _selectArguments;
        init(dataSource?: DataSource<any>, selectArguments?: DataSourceSelectArguments): void;
        readonly selectArguments: DataSourceSelectArguments;
        readonly pageCount: number;
        pageSize: number;
        pageIndex: number;
        totalRowCount: number;
        render(): void;
    }
    interface NumberPagingButton<T extends PagingBar> {
        visible: boolean;
        pageIndex: number;
        text: string;
        active: boolean;
        onclick: NumberPagingButtonClickEvent<T>;
    }
    interface PagingTotalLabel {
        text: string;
        visible: boolean;
    }
    type NumberPagingButtonClickEvent<T extends PagingBar> = (sender: NumberPagingButton<T>, pagingBar: T) => void;
    type PagingBarElementType = 'firstButton' | 'lastButton' | 'previousButton' | 'nextButton' | 'numberButton' | 'totalLabel';
    class NumberPagingBar extends PagingBar {
        private dataSource;
        private pagerSettings;
        private element;
        private totalElement;
        private numberButtons;
        private firstPageButton;
        private previousPageButton;
        private nextPageButton;
        private lastPageButton;
        private createLabel;
        private createButton;
        constructor(params: {
            dataSource?: DataSource<any>;
            element: HTMLElement;
            pagerSettings?: PagerSettings;
            selectArguments?: DataSourceSelectArguments;
        });
        private createPagingButton;
        private createTotalLabel;
        private createPreviousButtons;
        private createNextButtons;
        private createNumberButtons;
        private static on_buttonClick;
        render(): void;
    }
    class StaticNumberPagingBar extends PagingBar {
        private pagerSettings;
        private element;
        private totalElement;
        private numberButtons;
        private firstPageButton;
        private previousPageButton;
        private nextPageButton;
        private lastPageButton;
        private createLabel;
        private createButton;
        private loadData;
        constructor(params: {
            loadData: (pageIndex: number) => void;
            element: HTMLElement;
            pagerSettings?: PagerSettings;
            selectArguments?: DataSourceSelectArguments;
        });
        private createPagingButton;
        private createTotalLabel;
        private createPreviousButtons;
        private createNextButtons;
        private createNumberButtons;
        private static on_buttonClick;
        render(): void;
    }
}
declare namespace wuzhui {
    class ElementHelper {
        static showElement(element: HTMLElement): void;
        static hideElement(element: HTMLElement): void;
        static isVisible(element: HTMLElement): boolean;
        static data(element: HTMLElement, name: string, value?: any): any;
        static findFirstParentByTagName(element: Element, tagName: string): HTMLElement;
    }
    function applyStyle(element: HTMLElement, value: Partial<CSSStyleDeclaration> | string): void;
    class Callback {
        private funcs;
        constructor();
        add(func: (...args: Array<any>) => any): void;
        remove(func: (...args: Array<any>) => any): void;
        fire(...args: Array<any>): void;
    }
    interface Callback1<S, A> extends Callback {
        add(func: (sender: S, arg: A) => any): any;
        remove(func: (sender: S, arg: A) => any): any;
        fire(sender: S, arg: A): any;
    }
    interface Callback2<S, A, A1> extends Callback {
        add(func: (sender: S, arg: A, arg1: A1) => any): any;
        remove(func: (sender: S, arg: A, arg1: A1) => any): any;
        fire(sender: S, arg: A, arg1: A1): any;
    }
    function callbacks<S, A>(): Callback1<S, A>;
    function callbacks1<S, A, A1>(): Callback2<S, A, A1>;
    function fireCallback<S, A, B>(callback: Callback2<S, A, B>, sender: S, arg1: A, arg2: B): any;
    function fireCallback<S, A>(callback: Callback1<S, A>, sender: S, args: A): any;
}
declare namespace wuzhui {
    class GridViewCell extends Control<HTMLTableCellElement> {
        constructor();
    }
    type GridViewDataCellArgument1<T> = {
        dataField: keyof T;
        nullText?: string;
        dataFormatString?: string;
    };
    type GridViewDataCellArgument2<T> = {
        render: (dataItem: Partial<T>, element: HTMLElement) => void;
    };
    class GridViewDataCell<T> extends GridViewCell {
        private nullText;
        private dataFormatString;
        dataField: keyof T;
        constructor(params: GridViewDataCellArgument1<T> | GridViewDataCellArgument2<T>);
        render(dataItem: Partial<T>): void;
        private formatValue;
        private formatDate;
        private formatNumber;
    }
    interface DataControlFieldParams {
        footerText?: string;
        headerText?: string;
        itemStyle?: string | Partial<CSSStyleDeclaration>;
        headerStyle?: string | Partial<CSSStyleDeclaration>;
        footerStyle?: string | Partial<CSSStyleDeclaration>;
        visible?: boolean;
        sortExpression?: string;
    }
    class GridViewHeaderCell<T> extends Control<HTMLTableHeaderCellElement> {
        private _sortType;
        private _iconElement;
        private field;
        ascHTML: string;
        descHTML: string;
        sortingHTML: string;
        toSortHTML: string;
        sorting: Callback1<GridViewHeaderCell<T>, {
            sortType: string;
        }>;
        sorted: Callback1<GridViewHeaderCell<T>, {
            sortType: string;
        }>;
        constructor(field: DataControlField<T>);
        handleSort(): Promise<void>;
        private defaultHeaderText;
        sortType: "desc" | "asc";
        clearSortIcon(): void;
        private updateSortIcon;
    }
    class DataControlField<T> {
        private _gridView;
        protected _params: DataControlFieldParams;
        constructor(params?: DataControlFieldParams);
        /**
         * Gets the text that is displayed in the footer item of a data control field.
         */
        /**
        * Sets the text that is displayed in the footer item of a data control field.
        */
        footerText: string;
        /**
         * Gets the text that is displayed in the header item of a data control field.
         */
        /**
        * Sets the text that is displayed in the header item of a data control field.
        */
        headerText: string;
        itemStyle: string | Partial<CSSStyleDeclaration>;
        footerStyle: string | Partial<CSSStyleDeclaration>;
        headerStyle: string | Partial<CSSStyleDeclaration>;
        readonly visible: boolean;
        gridView: GridView<any>;
        /**
         * Gets a sort expression that is used by a data source control to sort data.
         */
        /**
        * Sets a sort expression that is used by a data source control to sort data.
        */
        sortExpression: string;
        createHeaderCell(): GridViewCell;
        createFooterCell(): GridViewCell;
        createItemCell(dataItem: any): GridViewCell;
    }
}
declare namespace wuzhui {
    type ValueType = 'number' | 'date' | 'string' | 'boolean';
    class GridViewEditableCell<T> extends GridViewDataCell<T> {
        private _dataItem;
        private _valueType;
        private _field;
        private _mode;
        constructor(field: BoundField<T>, dataItem: any, valueType?: ValueType);
        readonly field: BoundField<T>;
        readonly mode: "read" | "edit";
        beginEdit(): void;
        endEdit(): void;
        cancelEdit(): void;
        render(dataItem: T): void;
        readonly controlValue: string | number | Date;
    }
    interface BoundFieldParams<T> extends DataControlFieldParams {
        dataField: keyof T;
        dataFormatString?: string;
        controlStyle?: CSSStyleDeclaration | string;
        nullText?: string;
        readOnly?: boolean;
    }
    class BoundField<T> extends DataControlField<T> {
        private _valueElement;
        constructor(params: BoundFieldParams<T>);
        private params;
        /**
         * Gets the caption displayed for a field when the field's value is null.
         */
        readonly nullText: string;
        createItemCell(dataItem: T): GridViewCell;
        /**
         * Gets the field for the value.
         */
        readonly dataField: keyof T;
        /**
         * Gets the string that specifies the display format for the value of the field.
         */
        readonly dataFormatString: string;
        readonly controlStyle: string | CSSStyleDeclaration;
        readonly readOnly: boolean;
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
    }
    class CommandField<T> extends DataControlField<T> {
        constructor(params?: CommandFieldParams);
        private params;
        readonly cancelButtonHTML: string;
        readonly deleteButtonHTML: string;
        readonly editButtonHTML: string;
        readonly updateButtonHTML: string;
        readonly newButtonHTML: string;
        readonly insertButtonHTML: string;
        readonly cancelButtonClass: string;
        readonly deleteButtonClass: string;
        readonly editButtonClass: string;
        readonly newButtonClass: string;
        readonly updateButtonClass: string;
        readonly insertButtonClass: string;
        createItemCell(dataItem: any): GridViewCell;
        private showReadStatusButtons;
        private createEditButton;
        private createDeleteButton;
        private createInsertButton;
        private createUpdateButton;
        private createCancelButton;
        private createNewButton;
        private hideButton;
        private showButton;
        private findParentCell;
        private on_editButtonClick;
        private on_cancelButtonClick;
        private on_insertOrUpdateButtonClick;
        private on_deleteButtonClick;
        private on_newButtonClick;
    }
}
declare namespace wuzhui {
    interface CustomFieldParams extends DataControlFieldParams {
        createHeaderCell?: () => GridViewCell;
        createFooterCell?: () => GridViewCell;
        createItemCell: (dataItem: any) => GridViewCell;
    }
    class CustomField<T> extends DataControlField<T> {
        constructor(params: CustomFieldParams);
        private params;
        createHeaderCell(): GridViewCell;
        createFooterCell(): GridViewCell;
        createItemCell(dataItem: any): GridViewCell;
    }
}
