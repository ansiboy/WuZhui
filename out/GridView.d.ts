import { Control } from "./Control";
import { DataSource, DataSourceSelectArguments } from "maishu-toolkit";
import { DataControlField, GridViewCell } from "./fields/DataControlField";
import { PagerSettings } from "./NumberPagingBar";
export declare enum GridViewRowType {
    Header = 0,
    Footer = 1,
    Data = 2,
    Paging = 3,
    Empty = 4
}
export declare class GridViewRow extends Control<HTMLTableRowElement> {
    private _rowType;
    private _gridView;
    constructor(rowType: GridViewRowType);
    get rowType(): GridViewRowType;
    get gridView(): GridView<any>;
    get cells(): GridViewCell[];
}
export declare class GridViewDataRow extends GridViewRow {
    private _dataItem;
    constructor(gridView: GridView<any>, dataItem: any);
    get dataItem(): any;
}
export interface GridViewArguments<T> {
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
    translate?: (items: T[]) => T[];
}
export declare class GridView<T> extends Control<HTMLTableElement> {
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
    rowCreated: import("./Utility").Callback1<GridView<T>, {
        row: GridViewRow;
    }>;
    private pagingBar;
    readonly selectArguments: DataSourceSelectArguments;
    constructor(params: GridViewArguments<T>);
    private createPagingBar;
    get columns(): DataControlField<T, import("./fields/DataControlField").DataControlFieldParams>[];
    get dataSource(): DataSource<T>;
    private appendEmptyRow;
    appendDataRow(dataItem: any, index?: number): GridViewDataRow;
    private on_sort;
    private appendHeaderRow;
    private appendFooterRow;
    private renderDataItems;
    private on_selectedExecuted;
    private on_updateExecuted;
    private on_insertExecuted;
    private on_deleteExecuted;
    private showEmptyRow;
    private hideEmptyRow;
}
